import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const API_BASE_URL = "http://192.168.100.3:5269";
export const API_BASE_URL1 = "http://192.168.29.207:5269";

export const Login = async (username, password) => {
    try{
        const response = await axios.post(`${API_BASE_URL}/api/Authentication/login`,{
            username,
            password
        });

        console.log("API Response:", response.data);

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

export const Logout = async () => {
    await AsyncStorage.removeItem("userToken");
}

export const getToken = async () => {
    return await AsyncStorage.getItem("userToken");
}


