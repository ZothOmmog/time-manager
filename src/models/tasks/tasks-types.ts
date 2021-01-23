export interface IAgregateTaskInfo {
    key: number;
    /**
     * В минутах
     */
    durationAll: number;
    /**
     * В минутах
     */
    durationToday: number;
}

export interface IDetailTaskInfo {
    date: string;
    duration: string;
}