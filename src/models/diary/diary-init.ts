import { diaryApi } from "../../api/dairy-api";
import { $diaryItems, fetchDiaryItemsFx } from "./diary-model";

fetchDiaryItemsFx.use(async () => await diaryApi.getAll());

$diaryItems.on(
    fetchDiaryItemsFx.doneData,
    (_, diaryItems) => diaryItems
);