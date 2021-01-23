export interface IDiaryItemNew {
    timeStart: string,
    timeEnd: string,
    keyTask: number,
    desctiption: string
}

export interface IDiaryItem extends IDiaryItemNew {
    key: number
}