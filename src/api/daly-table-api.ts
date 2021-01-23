import { connectDB } from "../indexedDB/connectDB";
import { TODOS_TABLE_NAME } from "../indexedDB/indexedDB-constants";
import { IDiaryItem, IDiaryItemNew } from "../models/diary/diary-types";

const addTask = async (dalyItem: IDiaryItemNew) => {
    const db = await new Promise<IDBDatabase>((resolve) => {
        connectDB(resolve);
    });

    return new Promise<IDiaryItem[]>((resolve, reject) => {
        const transaction = db.transaction(TODOS_TABLE_NAME, "readwrite");
        const todosTable = transaction.objectStore(TODOS_TABLE_NAME);
        todosTable.add(dalyItem);

        const request = todosTable.getAll();
        request.onsuccess = () => {
            if (request.result === undefined) resolve([]);
            else resolve(request.result);
        };
    });
}

const updateTask = async (dalyItem: IDiaryItem) => {
    const db = await new Promise<IDBDatabase>((resolve) => {
        connectDB(resolve);
    });

    return new Promise<IDiaryItem[]>((resolve, reject) => {
        const transaction = db.transaction(TODOS_TABLE_NAME, "readwrite");
        const todosTable = transaction.objectStore(TODOS_TABLE_NAME);
        todosTable.put(dalyItem);

        const request = todosTable.getAll();
        request.onsuccess = () => {
            if (request.result === undefined) resolve([]);
            else resolve(request.result);
        };
    });
}

const getAll = async () => {
    const db = await new Promise<IDBDatabase>((resolve) => {
        connectDB(resolve);
    });

    return new Promise<IDiaryItem[]>((resolve, reject) => {
        const transaction = db.transaction(TODOS_TABLE_NAME, "readwrite");
        const todosTable = transaction.objectStore(TODOS_TABLE_NAME);
        const request = todosTable.getAll();
        request.onsuccess = () => {
            if (request.result === undefined) resolve([]);
            else resolve(request.result);
        };
    });
}

export const dalyTableApi = {
    addTask,
    getAll,
    updateTask
}