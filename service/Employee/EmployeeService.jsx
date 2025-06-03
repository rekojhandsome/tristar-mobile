import axios from 'axios';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// API ENDPOINTS
import { MAIN_API_URL } from '../Authentication/AuthenticationService';

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
export const RegisterEmployee = async (employeeData) => {
  try{
    const request  = await axios.post(`${MAIN_API_URL}/api/Employee/register-employee`, employeeData);
    const employeeID = request.data.employeeID;
    console.log("Employee ID: ", employeeID);
    AsyncStorage.setItem("employeeID", employeeID.toString());
      
    if (request.status === 200){
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

    const request = await axios.get(`${MAIN_API_URL}/api/Account/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    return request.data;

  } catch (error) {
    Alert.alert("Error", "Failed to load employee data. Please try again.");
  }
};

      
export const GetEmployeeLeaveCredits = async () => {
  try{
  const token = await GetToken();
  if (!token) return [];
  
  const request = await axios.get(`${MAIN_API_URL}/api/LeaveCredits/get-leave-credits`, {
  headers: { Authorization: `Bearer ${token}`,
  "Content-Type": "application/json" },
  });

  return {
    status: request.status,
    data: request.data,
    success: true,
  }
  } catch (error) {
    Alert.alert("Error", "Failed to load leave credits. Please try again.");
  }
}

// Add Leave Request
export const AddLeaveRequest = async (LeaveRequestHeader) => {
  try {
    const token = await GetToken();
    if (!token) return {success: false};

    const request = await axios.post(`${MAIN_API_URL}/api/LeaveRequestHeader/leave-request`, LeaveRequestHeader, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      }
    );
      return {
        success: true,
        message: request.data?.message || "Leave request submitted successfully.",
        data: request.data,
      }
  }catch (error){
    return {
      status: error.response?.status,
      success: false,
      message:
        error.response?.data?.message ||"An unexpected error occurred while submitting the leave request.",
    };
  }
}
  // // Patch Employee Details
// export const PatchEmployeeDetails = async (updatedData) => {
//   try {
//     const token = await GetToken();
//     if (!token) return { success: false };

//     const request = await axios.patch(`${API_BASE_URL1}api/Employee`, updatedData,{
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       });

//     return {
//       status: request.status,
//       data: request.data,
//       success: true,
//     };
//   } catch (error){
//     console.error("Error updating employee details:", error);

//     if (error.request){
//       const { status, data} = error.request;
//       return {
//         status,
//         code: data.code,
//         message: data.message,
//         success: false,
//       }
//     }

//     return { status: 500, message: "Internal Server Error" };
//   }
// }

export const GetEmployeeLeaveRequest = async () => {
  try {
    // Retrieve the token from AsyncStorage
    const token = await GetToken();
    if (!token) {
      return [];
    }
    // Fetch leave requests from the backend
    const request = await axios.get(`${MAIN_API_URL}/api/LeaveRequestHeader/leave-request-by-employee`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return request.data; // Return the array of leave requests
  } catch (error) {
    return {success: false, message: request.data?.message};
  }
};

export const GetEmployeeLeaveRequestTemplate = async () => {
  const template = 0;
  try{
  const token = await GetToken();
  if (!token) return [];
    const request = await axios.get(`${MAIN_API_URL}/api/LeaveRequestHeader/${template}`,{
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

export const GetLeaveRequestForApproval = async () =>{
  try {
    const token = await GetToken();
    if (!token) return [];

    const request = await axios.get(`${MAIN_API_URL}/api/LeaveRequestHeader/get-leave-requests-by-signatory`, {
      headers:  
      { Authorization: `Bearer ${token}`, 
      "Content-Type": "application/json" 
      }
    })
    return request.data;
  } catch (error){
    return []
  }
}
export const PatchLeaveRequest = async (leaveRequestID, isSigned) => {
  try {
    const token = await GetToken();
    if (!token) return { success: false, message: "No token found" };

    const response = await axios.patch(
      `${MAIN_API_URL}/api/LeaveRequestSignatory/patch-leave-request`,
      {
        leaveRequestID,
        isSigned,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return { success: true, message: response.data?.message || "Success" };
  } catch (error) {
    console.error("PatchLeaveRequest error:", error);
    return {
      success: false,
      message:
        error.response?.data?.message || error.message || "Unexpected error",
    };
  }
};