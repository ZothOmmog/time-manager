export interface IDiaryItemNew {
    /** Формат: UTCString */
    timeStart: string,
    /** Формат: UTCString */
    timeEnd: string,
    keyTask: number,
    desctiption: string
}

export interface IDiaryItem extends IDiaryItemNew {
    key: number
}

export interface IDiaryItemView extends IDiaryItem {
    /** Формат: дд.мм.гггг */
    date: string,
    /** таймстамп даты для сортировки и фильтрации */
    dateTimestamp: number,
    /** Формат: чч:мм */
    timeStart: string,
    /** таймстамп даты и времени начала для сортировки и фильтрации */
    timeStartTimestamp: number,
    /** Формат: чч:мм */
    timeEnd: string,
    /** Формат: [чч]:мм */
    duration: string
}