import React from "react";
import { View, Text, StyleSheet } from "react-native";

type WeekDayHeaderProps = {
  weekDayNames: string[];
};

const WeekDayHeader: React.FC<WeekDayHeaderProps> = ({ weekDayNames }) => {
  return (
    <View style={styles.weekRow}>
      {weekDayNames.map((day, index) => (
        <Text
          key={index}
          style={[
            styles.weekDayText,
            index === 0 && { color: "red" },
            index === 6 && { color: "#007AFF" },
          ]}
        >
          {day}
        </Text>
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
  weekDayText: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: "#999",
  },
});

export default WeekDayHeader;
