import { differenceInMinutes, format } from "date-fns";
import { IDiaryItem, IDiaryItemView } from "../models/diary/diary-types";
import { minutesToStr } from "./minutes-to-str";

const dateFormatter = (date: string) => format(new Date(date), 'dd.MM.yyyy');
const timeFormatter = (timeStr: string) => format(new Date(timeStr), 'HH:mm');

export const diaryItemToView = (diaryItem: IDiaryItem): IDiaryItemView => ({
    key: diaryItem.key,
    date: dateFormatter(diaryItem.timeEnd),
    keyTask: diaryItem.keyTask,
    timeStart: timeFormatter(diaryItem.timeStart),
    timeEnd: timeFormatter(diaryItem.timeEnd),
    duration: minutesToStr(
        differenceInMinutes(
            new Date(diaryItem.timeEnd),
            new Date(diaryItem.timeStart)
        )
    ),
    desctiption: diaryItem.desctiption
});