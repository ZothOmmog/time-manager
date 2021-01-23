import { TODOS_TABLE_KEY_TASK_INDEX, TODOS_TABLE_NAME } from '../indexedDB/indexedDB-constants';
import { differenceInMinutes, isEqual, startOfDay } from 'date-fns';
import { IDiaryItem } from '../models/diary/diary-types';
import { IAgregateTaskInfo } from '../models/tasks/tasks-types';
import { connectDB } from '../indexedDB/connectDB';

const openTodosTableTransaction = (db: IDBDatabase) => {
    const transaction = db.transaction(TODOS_TABLE_NAME, 'readonly');
    return transaction.objectStore(TODOS_TABLE_NAME);
};

const getAgregateTaskInfo = (dalyTableItemTask: IDiaryItem): IAgregateTaskInfo => {
    const timeStart = new Date(dalyTableItemTask.timeStart);
    const timeEnd = new Date(dalyTableItemTask.timeEnd);

    const dayStart = startOfDay(timeStart);
    const duration = differenceInMinutes(timeEnd, timeStart);
    
    return {
        key: dalyTableItemTask.keyTask,
        durationAll: duration,
        durationToday: isEqual(dayStart, startOfDay(new Date())) ? duration : 0
    };
};

const cursorHandler = (
    request: IDBRequest<IDBCursorWithValue | null>,
    resolve: (value: IAgregateTaskInfo[]) => void,
    reject: (e: any) => void
) => {
    const agregateTaskInfoMap = new Map<IDBValidKey, IAgregateTaskInfo>();

    return () => {
        try {
            const cursor = request.result;

            if (cursor) {
                const agregateTaskInfoExisting = agregateTaskInfoMap.get(cursor.key);

                if (agregateTaskInfoExisting) {
                    const { durationAll, durationToday } = getAgregateTaskInfo(cursor.value);

                    agregateTaskInfoExisting.durationAll += durationAll;
                    agregateTaskInfoExisting.durationToday += durationToday;
                }
                else {
                    const task = getAgregateTaskInfo(cursor.value);
                    agregateTaskInfoMap.set(cursor.key, task);
                }
                
                cursor.continue();
            }
            else {
                resolve(Array.from(agregateTaskInfoMap.values()));
            }
        }
        catch(e) {
            reject(e);
        }
    }
};

export const getAgreateTasksData = async () => {
    const db = await new Promise<IDBDatabase>(resolve => {
        connectDB(resolve);
    });

    const tasksKeysAll = await new Promise<IDBValidKey[]>(resolve => {
        const todosStore = openTodosTableTransaction(db);
        const keyTaskIndex = todosStore.index(TODOS_TABLE_KEY_TASK_INDEX);

        const request = keyTaskIndex.getAllKeys();

        request.onsuccess = () => {
            if (request.result == null) resolve([]);
            else resolve(request.result);
        }
    });

    tasksKeysAll.forEach(taskKey => {
        if (typeof taskKey !== 'number') 
            throw new Error(`Таск с номером ${taskKey} имеет тип ${typeof taskKey}, в то время, как все номера тасков должны иметь тип number`);
    })

    return await new Promise<IAgregateTaskInfo[]>((resolve, reject) => {
        try {
            const todosStore = openTodosTableTransaction(db);
            const keyTaskIndex = todosStore.index(TODOS_TABLE_KEY_TASK_INDEX);
            const request = keyTaskIndex.openCursor();
            request.onsuccess = cursorHandler(request, resolve, reject);
        }
        catch(e) {
            reject(e);
        }
    });
}