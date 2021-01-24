/**
 * Возвращает строку в формате HH:mm, где часы не имеют верхней границы
 * @param minutes кол-во минут
 */
export const minutesToStr = (minutes: number): string => {
    const mins = minutes % 60;
    const minsStr = mins < 10 ? `0${mins}`: mins.toString();
    
    return `${Math.floor(minutes / 60)}:${minsStr}`;
}