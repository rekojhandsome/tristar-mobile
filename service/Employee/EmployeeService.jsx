import axios from 'axios';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// API ENDPOINTS
import { API_BASE_URL } from '../Authentication/AuthenticationService';
import { API_BASE_URL1 } from '../Authentication/AuthenticationService';


// Register Employee
export const RegisterEmployee = async (firstName,lastName,phoneNo, email, departmentID, dateHired) => {
    try {
      const employeeData ={
        firstName,
        lastName,
        phoneNo,
        email,
        departmentID,
        dateHired
      }

    const response  = await axios.post(`${API_BASE_URL1}/api/Employee`, employeeData);

    const employeeID = response.data.employeeID;
    console.log("Employee ID: ", employeeID);
    AsyncStorage.setItem("employeeID", employeeID.toString());
      
    if (response.status === 201){
      console.log("Employee registered succefully");
      return { success: true };
    } else {
      console.log("Employee registration failed", response.status);
      return { success: false };
    }

  }catch (error) {
    console.error("Error registering employee:", error);
    Alert.alert("Error", "Failed to register employee. Please try again.");
    return { success: false };
  }
}
// Fetch Employee Profile
export const GetEmployeeProfile = async () => {
  try {
    const token = await AsyncStorage.getItem("userToken");

    if (!token) {
      Alert.alert("Error", "No token found. Please sign in again.");
      return;
    }

    const response = await axios.get(`${API_BASE_URL1}/api/employee/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    return response.data;

  } catch (error) {
    console.error("Error fetching employee profile:", error);
    Alert.alert("Error", "Failed to load employee data. Please try again.");
  }
};

// Fetch Employee Leave Credits
export const GetLeaveCredits = async () => {
  try{
    const employeeData = await GetEmployeeProfile();

    if (!employeeData || !employeeData.leaveCredits){
      throw new Error("Invalid employee data or leave credits not found.");
    }

    const vacationLeaveCredits = employeeData.leaveCredits.find((leave) => leave.leaveTypeID === 1)?.remainingCredits || 0;
    const sickLeaveCredits = employeeData.leaveCredits.find((leave) => leave.leaveTypeID === 2)?.remainingCredits || 0;

    return {
      vacationLeaveCredits: vacationLeaveCredits.toString(),
      sickLeaveCredits: sickLeaveCredits.toString(),
    };
  }catch(error){
    console.error("Error fetching leave credits:", error);
    Alert.alert("Error", "Failed to load leave credits. Please try again.", error);
  }
  return {
    vacationLeaveCredits: "0",
    sickLeaveCredits: "0",
  };
}

//Employee Add Leave Request
export const AddLeaveRequest = async (leaveStart, leaveEnd, leaveTypeID, reason) => {
  try {
    const token = await AsyncStorage.getItem("userToken");

    if (!token){
      console.log("Token not found, Please login"),
      Alert.alert("Token not found", "Token not found, please login");
      return { success: false };

    }

    const employeeData = await GetEmployeeProfile();
    const employeeID = employeeData.employeeID;

    const employeeRequestLeaveData = {
      employeeID,
      leaveTypeID,
      leaveStart,
      leaveEnd,
      reason,
    }

    const response = await axios.post(`${API_BASE_URL1}/api/RequestLeave`, employeeRequestLeaveData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return {
      status: response.status,
      data: response.data,
      success: true,
    }
  }catch(error){
    console.error("Error submitting leave request:", error);
  
    if (error.response){
      const { status, data } =  error.response;
      return {
        status,
        code: data.code,
        message: data.message,
        success: false,
      }
    }
    return { status: 500, message: "Internal Server Error" };
  }

}