import { guard, sample } from "effector";
import { $diaryItemView } from "../diary/diary-model";
import { $visibleType, createEditForm, visibleChange } from "./diary-item-create-edit-form-model";

$visibleType.on(visibleChange, (_, visible) => visible);

visibleChange.watch(value => console.log(value))

const visibleCreate = guard({
    source: visibleChange,
    filter: (visibleType) => visibleType === 'create'
});

sample({
    source: $diaryItemView,
    clock:  visibleCreate,
    target: createEditForm.setForm,
    fn: diaryItemViewArr => {
        const { keyTask } = diaryItemViewArr.reduce(
            (latest, diaryItem) => latest.timeStartTimestamp > diaryItem.timeStartTimestamp ? latest : diaryItem
        );

        return {
            keyTask: keyTask.toString()
        };
    }
})

createEditForm.setForm.watch((values) => console.log(values));