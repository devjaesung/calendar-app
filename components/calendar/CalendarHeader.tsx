import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

type CalendarHeaderProps = {
  month: number;
  year: number;
  monthNames: string[];
  onPrevious: () => void;
  onNext: () => void;
};

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  month,
  year,
  monthNames,
  onPrevious,
  onNext,
}) => {
  return (
    <View style={styles.header}>
      <Pressable onPress={onPrevious}>
        <Text style={styles.navButton}>
          <Ionicons name="chevron-back" size={24} color="#007AFF" />
        </Text>
      </Pressable>
      <Text style={styles.headerText}>
        {monthNames[month]} {year}
      </Text>
      <Pressable onPress={onNext}>
        <Text style={styles.navButton}>
          <Ionicons name="chevron-forward" size={24} color="#007AFF" />
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  navButton: {
    fontSize: 24,
    paddingHorizontal: 16,
    color: "#007AFF",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default CalendarHeader;
