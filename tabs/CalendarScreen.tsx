import React, { useState, useMemo } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import CalendarHeader from "@/components/calendar/CalendarHeader";
import WeekDayHeader from "@/components/calendar/WeekDayHeader";
import CalendarBody from "@/components/calendar/CalendarBody";
import { useCalendar } from "@/hooks/useCalendar";
import { MONTH_NAMES, WEEK_DAY_NAMES } from "@/constants/calendarNames";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { GestureDetector } from "react-native-gesture-handler";
import { formatCalendarDay } from "@/utils/dateUtils";
import { useCalendarGesture } from "@/hooks/useCalendarGesture";

const CalendarScreen = () => {
  const {
    selectedDate,
    year,
    month,
    weeks,
    onSelectDate,
    goToPreviousMonth,
    goToNextMonth,
    goToPreviousWeek,
    goToNextWeek,
  } = useCalendar();

  // 각 주의 높이
  const rowHeight = 50;
  // 월 캘린더(6줄)와 주 캘린더(1줄)의 높이
  const monthCalendarHeight = rowHeight * 6;
  const weekCalendarHeight = rowHeight;

  // 현재 캘린더 모드 (false: 월 캘린더, true: 주 캘린더)
  const [isWeekView, setIsWeekView] = useState(false);

  // 애니메이션 제어용 Shared Value
  const calendarHeight = useSharedValue(monthCalendarHeight);
  const calendarTranslateY = useSharedValue(0);

  // 선택된 날짜가 포함된 주의 인덱스를 계산
  const selectedWeekIndex = useMemo(() => {
    const index = weeks.findIndex((week) =>
      week.some(
        (day) =>
          formatCalendarDay(day.year, day.month, day.day) === selectedDate
      )
    );
    return index !== -1 ? index : 1;
  }, [weeks, selectedDate]);

  const panGesture = useCalendarGesture({
    isWeekView,
    setIsWeekView,
    calendarHeight,
    calendarTranslateY,
    monthCalendarHeight,
    weekCalendarHeight,
    rowHeight,
    selectedWeekIndex,
  });

  // 외부 컨테이너: 높이만 애니메이션
  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      height: calendarHeight.value,
    };
  });

  // 내부 컨테이너: translateY 애니메이션 (선택한 주가 보이도록)
  const animatedInnerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: calendarTranslateY.value }],
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <CalendarHeader
        month={month}
        year={year}
        monthNames={MONTH_NAMES}
        onPrevious={isWeekView ? goToPreviousWeek : goToPreviousMonth}
        onNext={isWeekView ? goToNextWeek : goToNextMonth}
      />
      <WeekDayHeader weekDayNames={WEEK_DAY_NAMES} />
      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[styles.calendarContainer, animatedContainerStyle]}
        >
          <Animated.View style={animatedInnerStyle}>
            <CalendarBody
              weeks={weeks}
              selectedDate={new Date(selectedDate)}
              onSelectDate={onSelectDate}
              rowHeight={rowHeight}
              calendarType={isWeekView ? "week" : "month"}
              selectedWeekIndex={selectedWeekIndex}
            />
          </Animated.View>
        </Animated.View>
      </GestureDetector>
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
  calendarContainer: {
    overflow: "hidden", // 내부 콘텐츠가 넘치면 감춤
  },
});

export default CalendarScreen;
