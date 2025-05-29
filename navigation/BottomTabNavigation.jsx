import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from 'react-native-vector-icons/Ionicons';


//Screens
import Homepage from "../screens/Main-Screens/Homepage";
import AccountPage from "../screens/Main-Screens/AccountPage";


//Screen names
const homepageName = 'Homepage'
// const leaveName = 'Leave'
const accountName = 'Account'
// const notificationName = 'Notification'

const Tab = createBottomTabNavigator();


export default function BottomNavbarNavigation(){
    return(
        <Tab.Navigator initialRouteName ={homepageName}screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
                let iconName;
                let rn = route.name;
                
                 if (rn === homepageName){
                    iconName = focused ? 'home-outline' : 'home'
                }
                else if (rn === accountName){
                    iconName = focused ? 'person-circle-outline' : 'person-circle'
                }
                return <Ionicons name={iconName} size={size} color={color}/>
            },
            headerShown: false,
            tabBarStyle: {width: 434, height: 60, backgroundColor: "#70907C", paddingTop: 5},
            tabBarInactiveTintColor: 'white',
            tabBarActiveTintColor: "rgba(255, 255, 255, 0.5)",
            tabBarLabelStyle: {  fontSize: 10}, 

        })}>
            <Tab.Screen name={homepageName} component={Homepage}/>
            <Tab.Screen name={accountName} component={AccountPage}/>
        </Tab.Navigator>
    )
}

 