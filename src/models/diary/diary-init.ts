import { forward } from "effector";
import { diaryApi } from "../../api/dairy-api";
import { hide } from "../diary-item-create-edit-form/diary-item-create-edit-form-model";
import { $diaryItems, addDiaryItemFx, fetchDiaryItemsFx } from "./diary-model";

fetchDiaryItemsFx.use(async () => await diaryApi.getAll());

addDiaryItemFx.use(async diaryItem => await diaryApi.addTask(diaryItem));

$diaryItems.on(
    [fetchDiaryItemsFx.doneData, addDiaryItemFx.doneData],
    (_, diaryItems) => diaryItems
);

forward({
    from: addDiaryItemFx.doneData,
    to: hide
});