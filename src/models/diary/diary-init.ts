import { forward } from "effector";
import { diaryApi } from "../../api/dairy-api";
import { hide } from "../diary-item-create-edit-form/diary-item-create-edit-form-model";
import { $diaryItems, $scrollTableToBottomNeed, addDiaryItemFx, fetchDiaryItemsFx, scrollTableToBottom, setScrollTableToBottom } from "./diary-model";

fetchDiaryItemsFx.use(async () => await diaryApi.getAll());

addDiaryItemFx.use(async diaryItem => await diaryApi.addTask(diaryItem));

$diaryItems.on(
    [fetchDiaryItemsFx.doneData, addDiaryItemFx.doneData],
    (_, diaryItems) => diaryItems
);

$scrollTableToBottomNeed.on(scrollTableToBottom, () => false);
$scrollTableToBottomNeed.on(setScrollTableToBottom, () => true);

forward({
    from: addDiaryItemFx.doneData,
    to: [hide, setScrollTableToBottom]
});