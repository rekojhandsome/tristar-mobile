import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, Pressable, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { GetEmployeeLeaveRequest } from "../service/Employee/EmployeeService";
import { Logout } from "../service/Authentication/AuthenticationService";
import LeaveRequestCard from "../components/LeaveRequestCard"; // Import the LeaveRequestCard component

import ViewModal from "../components/LeavePopUp";
export default function LeavePage({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    const loadEmployeeLeaveRequest = async () => {
      try {
        const request = await GetEmployeeLeaveRequest(); // Fetch leave requests from backend
        const leaveRequests = request.map((request) => ({
          leaveType: request.leaveType.leaveTypeName || "Unknown",
          leaveStart: request.leaveStart,
          leaveEnd: request.leaveEnd,
          leaveStatus: request.leaveStatus,
          reason: request.reason,
        }));
        setLeaveRequests(leaveRequests);
        console.log("Fetched leave requests:", leaveRequests);
      } catch (error) {
        console.error("Error fetching leave requests:", error);
        Alert.alert("Error", "Failed to load leave requests. Please try again.");
      }
    };

    loadEmployeeLeaveRequest();
  }, []); // Runs once when the component is mounted

  const handleLogout = async () => {
    Alert.alert("Confirm", "Confirm Logout?", [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: async () => {
          const result = await Logout();
          if (result?.success || result === undefined) {
            console.log("Logged Out Successfully!");
            navigation.navigate("SignIn"); // Navigate to SignIn page
          } else {
            Alert.alert("Error", "Failed to log out. Please try again.");
            console.log("Error Logging Out");
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.headerText}>Leave</Text>
        <Pressable style={styles.addButton}>
          <Ionicons
            name="add-outline"
            size={35}
            color={"white"}
            onPress={() => navigation.navigate("RequestLeavePage")}
          />
        </Pressable>
        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </Pressable>
      </View>
      <View style={styles.body}>
        <Text style={styles.bodyText}>Leave History</Text>
      </View>
      <View style={styles.bodyContainer}>
        {leaveRequests.length === 0 ? (
          <Text>No leave requests available</Text>
        ) : (
          leaveRequests.map((request, index) => (
            <LeaveRequestCard
              key={index}
              leaveType={request.leaveType}
              leaveStart={request.leaveStart}
              leaveEnd={request.leaveEnd}
              leaveStatus={request.leaveStatus}
              onViewPress={() => navigation.navigate("LeaveRequestDetails", { requestID: request.leaveRequestID })}
            />
          ))
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 71,
    width: "100%",
    backgroundColor: "#70907C",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
  addButton: {
    position: "absolute",
    right: 30,
    top: 20,
  },
  logoutButton: {
    position: "absolute",
    left: 15,
  },
  logoutButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  body: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  bodyText: {
    fontSize: 30,
  },
  bodyContainer: {
    width: "100%",
    paddingHorizontal: 10,
  },
});
