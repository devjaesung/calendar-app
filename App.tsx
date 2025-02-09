import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import HomeScreen from "./tabs/HomeScreen";
import CalendarScreen from "./tabs/CalendarScreen";
import LibraryScreen from "./tabs/LibraryScreen";
import MyPageScreen from "./tabs/MyPageScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";

type IconName =
  | "home"
  | "home-outline"
  | "calendar"
  | "calendar-outline"
  | "person"
  | "person-outline";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color }) => {
              if (route.name === "LIBRARY") {
                return <FontAwesome5 name="dumbbell" size={24} color={color} />;
              } else {
                let iconName: IconName = "home";
                if (route.name === "HOME") {
                  iconName = focused ? "home" : "home-outline";
                } else if (route.name === "CALENDAR") {
                  iconName = focused ? "calendar" : "calendar-outline";
                } else if (route.name === "MY PAGE") {
                  iconName = focused ? "person" : "person-outline";
                }
                return <Ionicons name={iconName} size={24} color={color} />;
              }
            },
          })}
        >
          <Tab.Screen name="HOME" component={HomeScreen} />
          <Tab.Screen name="CALENDAR" component={CalendarScreen} />
          <Tab.Screen name="LIBRARY" component={LibraryScreen} />
          <Tab.Screen name="MY PAGE" component={MyPageScreen} />
        </Tab.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
