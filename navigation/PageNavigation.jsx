import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Authentication Screens
import SignIn from "../screens/Authentication-Screens/SignInPage";
import SignUp from "../screens/Authentication-Screens/SignUpPage";

//Register Screen
import EmployeeRegister from "../screens/Authentication-Screens/RegisterPage";

//BottomNavigation
import BottomNavbarNavigation from "./BottomTabNavigation";


//Application Screens
import ApprovalPage from "../screens/Approval/ApprovalPage";
import LeavePage from "../screens/Leave/LeavePage";


import RequestLeavePage from "../screens/Leave/RequestLeavePage";
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
                <Stack.Screen name="BottomTabNavigation" component={BottomNavbarNavigation}/>



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