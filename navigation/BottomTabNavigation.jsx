import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from 'react-native-vector-icons/Ionicons';


//Screens
import Homepage from "../screens/Homepage";
import LeavePage from "../screens/LeavePage";
import AccountPage from "../screens/AccountPage";
import RequestLeavePage from "../screens/RequestLeavePage";
import NotificationPage from "../screens/NotificationPage";

//Screen names
const leaveName = 'Leave'
const accountName = 'Account'
const notificationName = 'Notification'

const Tab = createBottomTabNavigator();


export default function BottomNavbarNavigation(){
    return(
        <Tab.Navigator initialRouteName ={leaveName}screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
                let iconName;
                let rn = route.name;
                
                 if (rn === leaveName){
                    iconName = focused ? 'list-outline' : 'list'
                }
                else if (rn === accountName){
                    iconName = focused ? 'person-circle-outline' : 'person-circle'
                }
                else if (rn === notificationName){
                    iconName = focused ? 'notifications-outline' : 'notifications'
                }
                return <Ionicons name={iconName} size={size} color={color}/>
            },
            headerShown: false,
            tabBarStyle: {width: 434, height: 60, backgroundColor: "#70907C", paddingTop: 5},
            tabBarInactiveTintColor: 'white',
            tabBarActiveTintColor: "rgba(255, 255, 255, 0.5)",
            tabBarLabelStyle: {  fontSize: 10}, 

        })}>
            <Tab.Screen name={leaveName} component={LeavePage}/>
            <Tab.Screen name={accountName} component={AccountPage}/>
            <Tab.Screen name={notificationName} component={NotificationPage}/>
        </Tab.Navigator>
    )
}

 