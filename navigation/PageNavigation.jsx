import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Authentication Screens
import SignIn from "../screens/SignInPage";
import SignUp from "../screens/SignUpPage";
import EmployeeRegister from "../screens/EmployeeRegisterPage";

//BottomNavigation
import BottomNavbarNavigation from "./BottomTabNavigation";

import RequestLeavePage from "../screens/RequestLeavePage";
import ViewModal from "../components/LeavePopUp";
import AccountPage from "../screens/AccountPage";


const Stack = createNativeStackNavigator();
 
export default function Navigation(){
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false} }>
                {/* Authentication Screens */}
                <Stack.Screen name="SignIn" component={SignIn}/>
                <Stack.Screen name="SignUp" component={SignUp}/>

                {/* Register Screens */}
                <Stack.Screen name="Register" component={EmployeeRegister}/>

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