import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Authentication Screens
import SignIn from "../screens/SignInPage";
import SignUp from "../screens/SignUpPage";

//Register Screen
import EmployeeRegister from "../screens/RegisterPage";

//BottomNavigation
import BottomNavbarNavigation from "./BottomTabNavigation";

//Main Screens
import AccountPage from "../screens/AccountPage";
import Homepage from "../screens/Homepage";


//Application Screens
import ApprovalPage from "../screens/ApprovalPage";
import LeavePage from "../screens/LeavePage";


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


                {/* Screens with BottomTabNavigation */}
                <Stack.Screen name="Homepage" component={BottomNavbarNavigation}/>



                {/* Register Screens */}
                <Stack.Screen name="Register" component={EmployeeRegister}/>

                {/* Application Screens */}
                <Stack.Screen name="LeavePage" component={LeavePage}/>
                <Stack.Screen name="ApprovalPage" component={ApprovalPage}/>
                

                {/* Sub Screens */}
                <Stack.Screen name="ViewModal" component={ViewModal}/>
                <Stack.Screen name="RequestLeavePage" component={RequestLeavePage}/>

            </Stack.Navigator>
        </NavigationContainer>
    );
}