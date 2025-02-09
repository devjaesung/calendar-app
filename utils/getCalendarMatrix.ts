export type CalendarDay = {
  day: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
};

/**
 연도와 월에 따라 42셀(6주)의 달력 데이터를 생성
 */
export const getCalendarMatrix = (
  year: number,
  month: number
): CalendarDay[][] => {
  const firstDayOfMonth = new Date(year, month, 1);
  const startDay = firstDayOfMonth.getDay();
  const startDate = new Date(year, month, 1 - startDay);
  const days: CalendarDay[] = [];

  for (let i = 0; i < 42; i++) {
    const cellDate = new Date(startDate);
    cellDate.setDate(startDate.getDate() + i);
    days.push({
      day: cellDate.getDate(),
      month: cellDate.getMonth(),
      year: cellDate.getFullYear(),
      isCurrentMonth:
        cellDate.getMonth() === month && cellDate.getFullYear() === year,
    });
  }

  const weeks: CalendarDay[][] = [];
  for (let i = 0; i < 42; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return weeks;
};
