import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, Pressable, Alert, FlatList } from "react-native";
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
      const request = await GetEmployeeLeaveRequest(); // Probably returns an array directly

      const leaveRequests = request.map((leaveRequest) => {
        const items = leaveRequest.leaveRequestItems;

        const earliestStartDate = items.reduce((min, item) =>
          new Date(item.leaveStart) < new Date(min.leaveStart) ? item : min
        );

        const latestEndDate = items.reduce((max, item) =>
          new Date(item.leaveEnd) > new Date(max.leaveEnd) ? item : max
        );

        return {
          leaveRequestID: leaveRequest.leaveRequestID,
          leaveType: leaveRequest.leaveTypeName,
          leaveStart: earliestStartDate.leaveStartFormatted,
          leaveEnd: latestEndDate.leaveEndFormatted,
          leaveStatus: leaveRequest.leaveStatus,
        };
      });

      setLeaveRequests(leaveRequests);
    } catch (error) {
      console.error("Error fetching leave requests:", error);
      Alert.alert("Error", "Failed to load leave requests. Please try again.");
    }
  };
  loadEmployeeLeaveRequest();
}, []);

  return (
    <SafeAreaView style={{flex: 1}}>
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
        <Pressable style={styles.logoutButton} onPress={() => navigation.navigate("Homepage")}>
          <Text style={styles.logoutButtonText}>Homepage</Text>
        </Pressable>
      </View>
      <FlatList
        data={leaveRequests}
        keyExtractor={(item) => item.leaveRequestID.toString()}
        renderItem={({item}) => (
          <LeaveRequestCard
            leaveType={item.leaveType}
            leaveStart={item.leaveStart}
            leaveEnd={item.leaveEnd}
            leaveStatus={item.leaveStatus}
          />
        )}
        ListEmptyComponent ={<Text style={styles.emptyText}>No leave request available.</Text>}
        contentContainerStyle={styles.flatlistContent}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
     />
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
    paddingVertical: 10
  },
  bodyText: {
    fontSize: 30,
  },
  flatlistContent: {
    width: "100%",
    paddingHorizontal: 10,
    paddingBottom: 10
  },
  emptyText:{
    textAlign: 'center',
    marginTop: 50,
    fontSize: 30,
    color: 'gray'
  }
});
