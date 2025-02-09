import { useEffect } from "react";
import Animated, { withTiming, runOnJS } from "react-native-reanimated";
import { Gesture } from "react-native-gesture-handler";

export interface UseCalendarGestureProps {
  isWeekView: boolean;
  setIsWeekView: (value: boolean) => void;
  calendarHeight: Animated.SharedValue<number>;
  calendarTranslateY: Animated.SharedValue<number>;
  monthCalendarHeight: number;
  weekCalendarHeight: number;
  rowHeight: number;
  selectedWeekIndex: number;
}

export const useCalendarGesture = ({
  isWeekView,
  setIsWeekView,
  calendarHeight,
  calendarTranslateY,
  monthCalendarHeight,
  weekCalendarHeight,
  rowHeight,
  selectedWeekIndex,
}: UseCalendarGestureProps) => {
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      if (!isWeekView) {
        // 월 캘린더 상태: 위로 스와이프 시 높이 감소
        const newHeight = monthCalendarHeight + event.translationY;
        calendarHeight.value = Math.max(
          weekCalendarHeight,
          Math.min(monthCalendarHeight, newHeight)
        );
      } else {
        // 주 캘린더 상태: 아래로 스와이프 시 높이 증가
        const newHeight = weekCalendarHeight + event.translationY;
        calendarHeight.value = Math.max(
          weekCalendarHeight,
          Math.min(monthCalendarHeight, newHeight)
        );
      }
    })
    .onEnd(() => {
      const midPoint = (monthCalendarHeight + weekCalendarHeight) / 2;
      if (calendarHeight.value < midPoint) {
        // 높이가 중간값보다 작으면 주 캘린더 상태로 전환
        calendarHeight.value = withTiming(weekCalendarHeight, {
          duration: 300,
        });
        calendarTranslateY.value = withTiming(-selectedWeekIndex * rowHeight, {
          duration: 300,
        });
        if (!isWeekView) {
          runOnJS(setIsWeekView)(true);
        }
      } else {
        // 높이가 중간값보다 크면 월 캘린더 상태로 복원
        calendarHeight.value = withTiming(monthCalendarHeight, {
          duration: 300,
        });
        calendarTranslateY.value = withTiming(0, { duration: 300 });
        if (isWeekView) {
          runOnJS(setIsWeekView)(false);
        }
      }
    });

  // 주간 변경 시 애니메이션 처리
  useEffect(() => {
    if (isWeekView) {
      calendarHeight.value = withTiming(weekCalendarHeight, { duration: 300 });
      calendarTranslateY.value = withTiming(-selectedWeekIndex * rowHeight, {
        duration: 300,
      });
    } else {
      calendarHeight.value = withTiming(monthCalendarHeight, { duration: 300 });
      calendarTranslateY.value = withTiming(0, { duration: 300 });
    }
  }, [selectedWeekIndex, isWeekView]);

  return panGesture;
};
