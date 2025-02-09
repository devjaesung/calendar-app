import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import CalendarHeader from "@/components/calendar/CalendarHeader";
import WeekDayHeader from "@/components/calendar/WeekDayHeader";
import CalendarGrid from "@/components/calendar/CalendarBody";
import { useCalendar } from "@/hooks/useCalendar";
import { MONTH_NAMES, WEEK_DAY_NAMES } from "@/constants/calendarNames";

const CalendarScreen = () => {
  const {
    selectedDate,
    year,
    month,
    weeks,
    onSelectDate,
    goToPreviousMonth,
    goToNextMonth,
  } = useCalendar();

  return (
    <SafeAreaView style={styles.container}>
      <CalendarHeader
        month={month}
        year={year}
        monthNames={MONTH_NAMES}
        onPrevious={goToPreviousMonth}
        onNext={goToNextMonth}
      />
      <WeekDayHeader weekDayNames={WEEK_DAY_NAMES} />
      <CalendarGrid
        weeks={weeks}
        selectedDate={new Date(selectedDate)}
        onSelectDate={onSelectDate}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: "#fff",
  },
});

export default CalendarScreen;
