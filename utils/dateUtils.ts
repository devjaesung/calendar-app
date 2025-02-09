// 날짜를 "YYYY-MM-DD" 포맷으로 변환
export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// CalendarDay 객체를 받아 "YYYY-MM-DD" 포맷으로 변환
export const formatCalendarDay = (
  year: number,
  month: number,
  day: number
): string => {
  const m = (month + 1).toString().padStart(2, "0");
  const d = day.toString().padStart(2, "0");
  return `${year}-${m}-${d}`;
};
