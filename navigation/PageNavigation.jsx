import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Authentication Screens
import SignIn from '../screens/signInPage';
import SignUp from '../screens/signUpPage';

//BottomNavigation
import BottomNavbarNavigation from "./BottomTabNavigation";

import RequestLeavePage from "../screens/RequestLeavePage";
import ViewModal from "../components/LeavePopUp";


const Stack = createNativeStackNavigator();
 
export default function Navigation(){
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false} }>
                {/* Authentication Screens */}
                <Stack.Screen name="SignIn" component={SignIn}/>
                <Stack.Screen name="SignUp" component={SignUp}/>

                {/* Main Screens */}
                <Stack.Screen name="RequestLeavePage" component={RequestLeavePage} />


                {/* Sub Screens */}
                <Stack.Screen name="ViewModal" component={ViewModal} />


                {/* Screens with BottomTabNavigation */}
                <Stack.Screen name="LeavePage" component={BottomNavbarNavigation} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}