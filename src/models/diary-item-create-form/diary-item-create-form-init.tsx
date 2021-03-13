import { addHours, startOfDay, startOfMinute } from 'date-fns';
import { forward, sample } from 'effector';
import { diaryApi } from '../../api/dairy-api';
import { $diaryItemView, receiveDiaryItems } from '../diary/diary-model';
import { IDiaryItemView } from '../diary/diary-types';
import {
    $isOpenCreateForm,
    closeCreateForm,
    createDiaryItemFx,
    createForm,
    isOpenCreateFormChanged,
    openCreateForm,
} from './diary-item-create-form-model';

createDiaryItemFx.use(async (diaryItem) => await diaryApi.addTask(diaryItem));

$isOpenCreateForm.on(isOpenCreateFormChanged, (_, value) => value);

sample({
    source: $diaryItemView,
    clock: openCreateForm,
    target: createForm.setForm,
    fn: (diaryItemViewArr) => {
        let initValues;

        if (diaryItemViewArr.length === 0) {
            initValues = {
                keyTask: '',
                timeStart: startOfMinute(new Date()).toUTCString(),
                timeEnd: addHours(startOfMinute(new Date()), 2).toUTCString(),
                description: 'Начал работу',
            };
        }
        else {
            initValues = getInitForDataExist(diaryItemViewArr);
        }

        return initValues;
    },
});

const getInitForDataExist = (diaryItemViewArr: IDiaryItemView[]) => {
    const diaryItemLatest = diaryItemViewArr.reduce((latest, diaryItem) =>
        latest.timeStartTimestamp > diaryItem.timeStartTimestamp ? latest : diaryItem
    );

    let timeStart;
    let timeEnd;

    if (diaryItemLatest.dateTimestamp === startOfDay(new Date()).getTime()) {
        timeStart = startOfMinute(new Date(diaryItemLatest.timeEndTimestamp)).toUTCString();
        timeEnd = addHours(
            startOfMinute(new Date(diaryItemLatest.timeEndTimestamp)),
            2
        ).toUTCString();
    } else {
        timeStart = startOfMinute(new Date()).toUTCString();
        timeEnd = addHours(startOfMinute(new Date()), 2).toUTCString();
    }

    return {
        keyTask: diaryItemLatest.keyTask.toString(),
        timeStart,
        timeEnd,
        description: 'Продолжил работу',
    };
};

sample({
    source: createForm.formValidated,
    target: createDiaryItemFx,
    fn: ({ description, timeStart, keyTask, timeEnd }) => ({
        description,
        keyTask: Number(keyTask),
        timeEnd,
        timeStart,
    }),
});

sample({
    source: openCreateForm,
    target: isOpenCreateFormChanged,
    fn: () => true
});

sample({
    source: closeCreateForm,
    target: isOpenCreateFormChanged,
    fn: () => false
});

forward({
    from: createDiaryItemFx.doneData,
    to: [receiveDiaryItems],
});

forward({
    from: createDiaryItemFx.doneData,
    to: [closeCreateForm],
});

forward({
    from: closeCreateForm,
    to: createForm.reset
})