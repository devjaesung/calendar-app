import React from "react";
import { View, StyleSheet } from "react-native";
import { CalendarDay } from "@/utils/getCalendarMatrix";
import DateCell from "./DateCell";

type CalendarBodyProps = {
  weeks: CalendarDay[][];
  selectedDate: Date; // Date 객체로 관리
  onSelectDate: (day: CalendarDay) => void;
};

const CalendarBody: React.FC<CalendarBodyProps> = ({
  weeks,
  selectedDate,
  onSelectDate,
}) => {
  // 선택된 날짜를 YYYY-MM-DD 형태로 포맷팅
  const formattedSelectedDate = `${selectedDate.getFullYear()}-${(
    selectedDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${selectedDate.getDate().toString().padStart(2, "0")}`;

  return (
    <View>
      {weeks.map((week, weekIndex) => (
        <View key={weekIndex} style={styles.weekRow}>
          {week.map((day, dayIndex) => {
            const formatted = `${day.year}-${(day.month + 1)
              .toString()
              .padStart(2, "0")}-${day.day.toString().padStart(2, "0")}`;
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
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
});

export default CalendarBody;
