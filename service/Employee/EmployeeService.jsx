import axios from 'axios';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// API ENDPOINTS
import { API_BASE_URL } from '../Authentication/AuthenticationService';
import { API_BASE_URL1 } from '../Authentication/AuthenticationService';

// Fetch Employee Profile
export const GetEmployeeProfile = async (firstName, lastName, phoneNo, email) => {
  try {
    const token = await AsyncStorage.getItem("userToken");

    if (!token) {
      Alert.alert("Error", "No token found. Please sign in again.");
      return;
    }

    const response = await axios.get(`${API_BASE_URL}/api/employee/profile`, {
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
    Alert.alert("Error", "Failed to load leave credits. Please try again.");
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

    const response = await axios.post(`${API_BASE_URL}/api/RequestLeave`, employeeRequestLeaveData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    });
    if (response.status === 200) {
      Alert.alert("Success", "Leave request submitted successfully.");
    }
  }catch(error){
    console.error("Error submitting leave request:", error);
    Alert.alert("Error", "Failed to submit leave request. Please try again.");
    
  }

}