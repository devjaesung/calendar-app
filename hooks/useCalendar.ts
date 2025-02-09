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
  };
};
