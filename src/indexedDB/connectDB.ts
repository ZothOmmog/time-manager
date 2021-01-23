import * as DBConstants from './indexedDB-constants';

/**
 * Подключаемся к бд и получаем коллбэки для работы с ней.
 * @param indexedDBChanged Коллбэк, который будет вызван с экземпляром подключения к бд, если подключение пройдет успешно.
 */
export const connectDB = (
    indexedDBChanged: (db: IDBDatabase) => void
) => {
    const openRequest = indexedDB.open(
        DBConstants.DB_NAME,
        DBConstants.INDEXED_DB_CURRENT_VERSION
    );

    openRequest.onupgradeneeded = () => {
        const db = openRequest.result;

        switch(db.version) {
            case 0: //По идее при отсутствии бд должна быть эта версия, но опытным путем было выяснено, что приходит 1 версия
                
                break;
            case 1:
                const todosStore = db.createObjectStore(
                    DBConstants.TODOS_TABLE_NAME,
                    { keyPath: DBConstants.TODOS_TABLE_KEY_NAME, autoIncrement: true }
                );
                todosStore.createIndex(
                    DBConstants.TODOS_TABLE_KEY_TASK_INDEX,
                    DBConstants.TODOS_TABLE_KEY_TASK_ATR
                );

                console.log('Успешное обновление БД до 1 версии!');
                break;
            default:
                throw new Error('Ошибка при инициализации клиентской базы данных, не найдена указанная верисия');
        }
    };

    openRequest.onsuccess = () => {
        const db = openRequest.result;
        indexedDBChanged(db);

        db.onversionchange = () => {
            db.close();
            alert("База данных устарела, пожалуйста, перезагрузите страницу");
        }
    };

    openRequest.onerror = () => {
        console.error(openRequest.error);
    };
};