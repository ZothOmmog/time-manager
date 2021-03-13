import { createEffect, createEvent, createStore } from "effector";
import { getCreateEditForm } from "../diary-item-create-edit-form/diary-item-create-edit-form-model";
import { IDiaryItem, IDiaryItemNew } from "../diary/diary-types";

export const createDiaryItemFx = createEffect<IDiaryItemNew, IDiaryItem[]>();

export const openCreateForm = createEvent();
export const closeCreateForm = createEvent();
export const isOpenCreateFormChanged = createEvent<boolean>();

export const $isOpenCreateForm = createStore(false);

export const createForm = getCreateEditForm();