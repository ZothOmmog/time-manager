import { createEffect, createEvent, createStore } from "effector";
import { diaryItemToView } from "../../helpers/diary-item-to-view";
import { IDiaryItem, IDiaryItemNew, IDiaryItemView } from "./diary-types";

export const fetchDiaryItemsFx = createEffect<void, IDiaryItem[]>();
export const addDiaryItemFx = createEffect<IDiaryItemNew, IDiaryItem[]>();

export const scrollTableToBottom = createEvent();
export const setScrollTableToBottom = createEvent();

export const $diaryItems = createStore<IDiaryItem[]>([]);

export const $scrollTableToBottomNeed = createStore(false);

export const $diaryItemView = $diaryItems.map<IDiaryItemView[]>(
    state => state.map(diaryItemToView)
);