import React from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { CalendarDay } from "@/utils/getCalendarMatrix";

type DateCellProps = {
  day: CalendarDay;
  dayIndex: number;
  selected: boolean;
  onSelect: (day: CalendarDay) => void;
};

const DateCell: React.FC<DateCellProps> = ({
  day,
  dayIndex,
  selected,
  onSelect,
}) => {
  //현재 달이 아니면 회색 글씨로 표시
  const dayTextStyle = [
    styles.dayText,
    day.isCurrentMonth ? {} : styles.nonCurrentMonthText,
  ];

  return (
    <Pressable style={styles.dayCell} onPress={() => onSelect(day)}>
      <View style={[styles.dateWrapper, selected && styles.selectedCircle]}>
        <Text style={dayTextStyle}>{day.day}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  dayCell: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 2,
  },
  dateWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedCircle: {
    borderWidth: 2,
    borderColor: "#007AFF",
  },
  dayText: {
    fontSize: 16,
    color: "black",
  },
  nonCurrentMonthText: {
    fontSize: 16,
    color: "#aaa",
  },
});

export default DateCell;
