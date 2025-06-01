import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

//API URLs
export const API_BASE_URL = "http://192.168.100.3:5269";
export const API_BASE_URL1 = "http://192.168.29.207:5269";
export const API_BASE_URL2 = "http://192.168.100.3:5269";

export const Login = async (username, password) => {
    try{
        const response = await axios.post(`${API_BASE_URL2}/api/Account/login`,{
            username,
            password
        });

    if (response.data?.token){
        await AsyncStorage.setItem("userToken", response.data.token);
        return { success: true, user: response.data.User};
    } else {
        return { success: false, message: "Invalid response from the server"};
    }
    }
    catch (error){
        console.error("Login Error:", error.response?.data || error.message);
        return {success: false, message: error.response?.data?.message || "Login Failed"};
    }
};

export const Register = async (username, password, employeeID) => {
    try{
    employeeID = await AsyncStorage.getItem("employeeID");

    if (!employeeID){
        console.error("Employee ID not found. Please register first.");
        Alert.alert("Error", "Employee ID not found. Please register first.");
        return { success: false, message: "Employee ID not found. Please register first." };
    }

    const signUpData = {
        username,
        password,
        employeeID
    };

    const request = await axios.post(`${API_BASE_URL2}/api/Account/register`, signUpData, {
        headers: {Authorization: `Bearer ${employeeID}`,
            "Content-Type": "application/json",
    },
    });
    return {
        status: request.status,
        data: request.data,
        success: true,
    }
    }catch (error) {
        console.log("Error registering account:", error.response?.data || error.message);

        if (error.response){
            const { status, data } = error.response;

            console.log("Register response data: ", data);
            
            return {
                status,
                message: data.message,
                code: data.code,
                success: false,
            }
        }
        return { status: 500, message: "Internal Server Error" };
    }

}

export const Logout = async () => {
    try {
    await AsyncStorage.removeItem("userToken");
    console.log("Token Removed");
    }
    catch (error) {
        console.error("Error removing token:", error);
        return { success: false, message: "Logout Failed" };
    }
}

export const getToken = async () => {
    return await AsyncStorage.getItem("userToken");
}


