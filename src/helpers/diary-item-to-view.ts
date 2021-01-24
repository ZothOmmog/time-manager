import { differenceInMinutes, format, startOfDay } from "date-fns";
import { IDiaryItem, IDiaryItemView } from "../models/diary/diary-types";
import { minutesToStr } from "./minutes-to-str";

const dateFormatter = (date: string) => format(new Date(date), 'dd.MM.yyyy');
const timeFormatter = (timeStr: string) => format(new Date(timeStr), 'HH:mm');

export const diaryItemToView = (diaryItem: IDiaryItem): IDiaryItemView => ({
    key: diaryItem.key,
    date: dateFormatter(diaryItem.timeEnd),
    dateTimestamp: new Date(startOfDay(new Date(diaryItem.timeEnd))).getTime(),
    keyTask: diaryItem.keyTask,
    timeStart: timeFormatter(diaryItem.timeStart),
    timeStartTimestamp: new Date(diaryItem.timeStart).getTime(),
    timeEnd: timeFormatter(diaryItem.timeEnd),
    timeEndTimestamp: new Date(diaryItem.timeEnd).getTime(),
    duration: minutesToStr(
        differenceInMinutes(
            new Date(diaryItem.timeEnd),
            new Date(diaryItem.timeStart)
        )
    ),
    desctiption: diaryItem.desctiption
});