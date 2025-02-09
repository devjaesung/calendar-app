import { useState, useMemo, useEffect } from "react";
import { getCalendarMatrix, CalendarDay } from "@/utils/getCalendarMatrix";
import { formatDate, formatCalendarDay } from "@/utils/dateUtils";

export const useCalendar = () => {
  const today = new Date();
  const formattedToday = formatDate(today);
  const [selectedDate, setSelectedDate] = useState<string>(formattedToday);
  const [year, setYear] = useState<number>(today.getFullYear());
  const [month, setMonth] = useState<number>(today.getMonth());

  // 현재 연도와 월에 대한 달력 행렬 계산
  const weeks = useMemo(() => getCalendarMatrix(year, month), [year, month]);

  const selectedWeekIndex = useMemo(() => {
    return weeks.findIndex((week) =>
      week.some(
        (day) =>
          formatCalendarDay(day.year, day.month, day.day) === selectedDate
      )
    );
  }, [weeks, selectedDate]);

  // 날짜 선택 핸들러
  const onSelectDate = (day: CalendarDay) => {
    if (!day.isCurrentMonth) {
      setYear(day.year);
      setMonth(day.month);
    }
    const formatted = formatCalendarDay(day.year, day.month, day.day);
    setSelectedDate(formatted);
  };

  useEffect(() => {
    setMonth(today.getMonth());
  }, []);

  const goToNextWeek = () => {
    if (selectedWeekIndex < weeks.length - 1) {
      const nextWeek = weeks[selectedWeekIndex + 1];
      if (nextWeek && nextWeek.length > 0) {
        setSelectedDate(
          formatCalendarDay(
            nextWeek[0].year,
            nextWeek[0].month,
            nextWeek[0].day
          )
        );
      }
    }
  };

  const goToPreviousWeek = () => {
    if (selectedWeekIndex > 0) {
      const prevWeek = weeks[selectedWeekIndex - 1];
      if (prevWeek && prevWeek.length > 0) {
        setSelectedDate(
          formatCalendarDay(
            prevWeek[0].year,
            prevWeek[0].month,
            prevWeek[0].day
          )
        );
      }
    }
  };

  // 이전 달로 이동
  const goToPreviousMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  // 다음 달로 이동
  const goToNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  return {
    selectedDate,
    year,
    month,
    weeks,
    onSelectDate,
    goToPreviousMonth,
    goToNextMonth,
    goToPreviousWeek,
    goToNextWeek,
    selectedWeekIndex,
  };
};
