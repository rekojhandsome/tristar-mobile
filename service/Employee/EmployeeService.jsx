import axios from 'axios';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// API ENDPOINTS
import { API_BASE_URL, API_BASE_URL2 } from '../Authentication/AuthenticationService';
import { API_BASE_URL1 } from '../Authentication/AuthenticationService';
import { civilStatusData } from '../../Data/StaticDropdownData';

const GetToken = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token){
      Alert.alert("Error", "No token found. Please sign in again.");
      return null;
    }
    return token;
  } catch (error){
    console.error("Error retrieving token:", error);
    Alert.alert("Error", "Failed to retrieve token. Please try again.");
    return null;
  }
}

// Register Employee
export const RegisterEmployee = async ( departmentID, dateHired, firstName, middleName, lastName, suffix, birthDate, gender, civilStatus, contactNo, email) => {
    try {
      const employeeData ={
        firstName,
        middleName,
        lastName,
        suffix,
        birthDate,
        gender,
        civilStatus,
        contactNo,
        email,
        departmentID,
        dateHired
      }

    const request  = await axios.post(`${API_BASE_URL1}/api/Employee`, employeeData);

    const employeeID = request.data.employeeID;
    console.log("Employee ID: ", employeeID);
    AsyncStorage.setItem("employeeID", employeeID.toString());
      
    if (request.status === 201){
      console.log("Employee registered succefully");
      return { success: true };
    } else {
      console.log("Employee registration failed", request.status);
      return { success: false };
    }

  }catch (error) {
    console.error("Error registering employee:", error);
    return { success: false };
  }
}
// Fetch Employee Profile
export const GetEmployeeProfile = async () => {
  try {
    const token = await GetToken();
    if (!token) return;

    const request = await axios.get(`${API_BASE_URL2}/api/Account/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    return request.data;

  } catch (error) {
    console.error("Error fetching employee profile:", error);
    Alert.alert("Error", "Failed to load employee data. Please try again.");
  }
};

// // Fetch Employee Leave Credits
// export const GetLeaveCredits = async () => {
//   try{
//     const employeeData = await GetEmployeeProfile();

//     if (!employeeData || !employeeData.leaveCredits){
//       throw new Error("Invalid employee data or leave credits not found.");
//     }

//     const vacationLeaveCredits = employeeData.leaveCredits.find((leave) => leave.leaveTypeID === 1)?.remainingCredits || 0;
//     const sickLeaveCredits = employeeData.leaveCredits.find((leave) => leave.leaveTypeID === 2)?.remainingCredits || 0;

//     return {
//       vacationLeaveCredits: vacationLeaveCredits.toString(),
//       sickLeaveCredits: sickLeaveCredits.toString(),
//     };
//   }catch(error){
//     console.error("Error fetching leave credits:", error);
//     Alert.alert("Error", "Failed to load leave credits. Please try again.", error);
//   }
//   return {
//     vacationLeaveCredits: "0",
//     sickLeaveCredits: "0",
//   };
// }

      
export const GetEmployeeLeaveCredits = async () => {
  try{
  const token = await GetToken();
  if (!token) return [];
  
  const request = await axios.get(`${API_BASE_URL2}/api/LeaveCredits/get-leave-credits`, {
  headers: { Authorization: `Bearer ${token}`,
  "Content-Type": "application/json" },
  });

  return {
    status: request.status,
    data: request.data,
    success: true,
  }
  } catch (error) {
    console.error("Error fetching leave credits:", error);
    Alert.alert("Error", "Failed to load leave credits. Please try again.");
  }
}

//Employee Add Leave Request
export const AddLeaveRequest = async (leaveStart, leaveEnd, leaveTypeID, reason) => {
  try {
    const token = await GetToken();
    if (!token) return { success: false };  

    const employeeData = await GetEmployeeProfile();
    const employeeID = employeeData.employeeID;

    const employeeRequestLeaveData = {
      employeeID,
      leaveTypeID,
      leaveStart,
      leaveEnd,
      reason,
    }

    const request = await axios.post(`${API_BASE_URL1}/api/RequestLeave`, employeeRequestLeaveData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return {
      status: request.status,
      data: request.data,
      success: true,
    }
  }catch(error){
    console.error("Error submitting leave request:", error);
  
    if (error.request){
      const { status, data } =  error.request;
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

// Patch Employee Details
export const PatchEmployeeDetails = async (updatedData) => {
  try {
    const token = await GetToken();
    if (!token) return { success: false };

    const request = await axios.patch(`${API_BASE_URL1}api/Employee`, updatedData,{
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      });

    return {
      status: request.status,
      data: request.data,
      success: true,
    };
  } catch (error){
    console.error("Error updating employee details:", error);

    if (error.request){
      const { status, data} = error.request;
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

export const GetEmployeeLeaveRequest = async () => {
  try {
    // Retrieve the token from AsyncStorage
    const token = await GetToken();
    if (!token) {
      return [];
    }
    // Fetch leave requests from the backend
    const request = await axios.get(`${API_BASE_URL2}/api/LeaveRequestHeader/leave-request-by-employee`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return request.data; // Return the array of leave requests
  } catch (error) {
    console.error("Error fetching leave requests:", error);
    Alert.alert("Error", "Failed to load leave requests. Please try again.");
    return [];
  }
};

export const GetEmployeeLeaveRequestTemplate = async () => {
  const template = 0;
  try{
  const token = await GetToken();
  if (!token) return [];

    const request = await axios.get(`${API_BASE_URL2}/api/LeaveRequestHeader/${template}`,{
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    })
    return request.data;
  }catch (error) {
    console.error("Error fetching employee leave request template:", error);
    Alert.alert("Error", "Failed to load leave request template. Please try again.");
    return null;
  }
}