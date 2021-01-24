import { addHours, startOfDay, startOfMinute } from "date-fns";
import { forward, guard, sample } from "effector";
import { $diaryItemView, addDiaryItemFx } from "../diary/diary-model";
import { $visibleType, createEditForm, hide, visibleChange } from "./diary-item-create-edit-form-model";

$visibleType.on(visibleChange, (_, visible) => visible);
$visibleType.on(hide, () => '');

visibleChange.watch(value => console.log(value))

const visibleCreate = guard({
    source: visibleChange,
    filter: (visibleType) => visibleType === 'create'
});

forward({
    from: hide,
    to: createEditForm.resetErrors
});

sample({
    source: $diaryItemView,
    clock:  visibleCreate,
    target: createEditForm.setForm,
    fn: diaryItemViewArr => {
        const diaryItemLatest = diaryItemViewArr.reduce(
            (latest, diaryItem) => latest.timeStartTimestamp > diaryItem.timeStartTimestamp ? latest : diaryItem
        );
        
        let startTime;
        let endTime;

        if (diaryItemLatest.dateTimestamp === startOfDay(new Date()).getTime()) {
            startTime = startOfMinute(new Date(diaryItemLatest.timeEndTimestamp)).toUTCString();
            endTime = addHours(startOfMinute(new Date(diaryItemLatest.timeEndTimestamp)), 2).toUTCString();
        }
        else {
            startTime = startOfMinute(new Date()).toUTCString();
            endTime = addHours(startOfMinute(new Date()), 2).toUTCString();
        }

        return {
            keyTask: diaryItemLatest.keyTask.toString(),
            startTime,
            endTime,
            description: 'Продолжил работу'
        };
    }
})

sample({
    source: createEditForm.formValidated,
    target: addDiaryItemFx,
    fn: ({ description, endTime, keyTask, startTime }) => ({
        desctiption: description,
        keyTask: Number(keyTask),
        timeEnd: endTime,
        timeStart: startTime
    })
});

createEditForm.formValidated.watch((values) => console.log(values));