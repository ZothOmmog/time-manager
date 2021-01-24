import { forward } from "effector";
import { fetchDiaryItemsFx } from "../diary/diary-model";
import { AppGate } from "./app-model";

forward({
    from: AppGate.open,
    to: fetchDiaryItemsFx
});