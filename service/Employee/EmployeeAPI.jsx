import axios from 'axios';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// API ENDPOINTS
import { API_BASE_URL } from '../service/Authentication/AuthService';
import { API_BASE_URL1 } from '../service/Authentication/AuthService';

export const FetchEmployeeProfile = async (setVacationLeave, setSickLeave) => {
  try {
    const token = await AsyncStorage.getItem("userToken");

    if (!token) {
      Alert.alert("Error", "No token found. Please sign in again.");
      return;
    }

    const response = await axios.get(`${API_BASE_URL1}/api/employee/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const employee = response.data;
    const vacationLeaveCredits = employee.leaveCredits.find((leave) => leave.leaveTypeID === 1)?.remainingCredits || "0";
    const sickLeaveCredits = employee.leaveCredits.find((leave) => leave.leaveTypeID === 2)?.remainingCredits || "0";

    setVacationLeave(vacationLeaveCredits.toString());
    setSickLeave(sickLeaveCredits.toString());
  } catch (error) {
    console.error("Error fetching employee profile:", error);
    Alert.alert("Error", "Failed to load employee data. Please try again.");
  }
};