import { forward } from "effector";
import { diaryApi } from "../../api/dairy-api";
import { $diaryItems, $scrollTableToBottomNeed, fetchDiaryItemsFx, receiveDiaryItems, scrollTableToBottom, setScrollTableToBottom } from "./diary-model";

fetchDiaryItemsFx.use(async () => await diaryApi.getAll());

$diaryItems.on(
    receiveDiaryItems,
    (_, diaryItems) => diaryItems
);

$scrollTableToBottomNeed.on(scrollTableToBottom, () => false);
$scrollTableToBottomNeed.on(setScrollTableToBottom, () => true);

forward({
    from: fetchDiaryItemsFx.doneData,
    to: receiveDiaryItems
});