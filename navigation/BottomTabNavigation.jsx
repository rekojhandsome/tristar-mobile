import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import Homepage from "../screens/Main-Screens/Homepage";
import AccountPage from "../screens/Main-Screens/AccountPage";

// Screen names
const homepageName = 'Homepage';
const accountName = 'Account';

const Tab = createBottomTabNavigator();

export default function BottomNavbarNavigation() {
  return (
    <Tab.Navigator
      initialRouteName={homepageName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'ellipse-outline';

          if (route.name === homepageName) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === accountName) {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarStyle: {
          height: 60,
          backgroundColor: "#70907C",
          paddingTop: 5,
        },
        tabBarInactiveTintColor: 'white',
        tabBarActiveTintColor: "rgba(255, 255, 255, 0.5)",
        tabBarLabelStyle: { fontSize: 10 },
      })}
    >
      <Tab.Screen name={homepageName} component={Homepage} />
      <Tab.Screen name={accountName} component={AccountPage} />
    </Tab.Navigator>
  );
}
