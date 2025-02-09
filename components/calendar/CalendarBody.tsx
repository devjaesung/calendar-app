import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import { CalendarDay } from "@/utils/getCalendarMatrix";
import DateCell from "./DateCell";
import { formatDate, formatCalendarDay } from "@/utils/dateUtils";

type CalendarBodyProps = {
  weeks: CalendarDay[][];
  selectedDate: Date; // Date 객체로 관리
  onSelectDate: (day: CalendarDay) => void;
  rowHeight?: number;
  calendarType: "month" | "week";
  selectedWeekIndex: number;
};

const CalendarBody: React.FC<CalendarBodyProps> = ({
  weeks,
  selectedDate,
  onSelectDate,
  rowHeight = 60,
  calendarType,
  selectedWeekIndex,
}) => {
  // 선택된 날짜를 YYYY-MM-DD 형태로 포맷팅
  const formattedSelectedDate = formatDate(selectedDate);

  return (
    <>
      {weeks.map((week, weekIndex) => {
        // 선택된 주와의 인덱스 차이에 따라 딜레이 적용
        const delay = Math.abs(weekIndex - selectedWeekIndex) * 100;

        // 각 주 행에 적용할 애니메이션 스타일
        const animatedStyle = useAnimatedStyle(() => {
          // 월 캘린더이면 모든 행이 rowHeight, 주 캘린더이면 선택된 주만 rowHeight 유지
          const targetHeight =
            calendarType === "month"
              ? rowHeight
              : weekIndex === selectedWeekIndex
              ? rowHeight
              : 0;
          const targetOpacity =
            calendarType === "month"
              ? 1
              : weekIndex === selectedWeekIndex
              ? 1
              : 0;
          return {
            height: withDelay(
              delay,
              withTiming(targetHeight, { duration: 300 })
            ),
            opacity: withDelay(
              delay,
              withTiming(targetOpacity, { duration: 300 })
            ),
          };
        }, [calendarType, weekIndex, selectedWeekIndex]);

        return (
          <Animated.View
            key={weekIndex}
            style={[styles.weekRow, animatedStyle]}
          >
            {week.map((day, dayIndex) => {
              const formatted = formatCalendarDay(day.year, day.month, day.day);
              const isSelected = formattedSelectedDate === formatted;
              return (
                <DateCell
                  key={dayIndex}
                  day={day}
                  dayIndex={dayIndex}
                  selected={isSelected}
                  onSelect={onSelectDate}
                />
              );
            })}
          </Animated.View>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 0,
    overflow: "hidden", // 높이 애니메이션 시 내부 내용이 넘치지 않도록 설정
    minHeight: 50, // 최소 높이 설정
  },
});

export default CalendarBody;
