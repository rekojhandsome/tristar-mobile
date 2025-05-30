import { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, Pressable, Alert, FlatList } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";


//Components
import { LeaveStatusDropdown } from "../../components/Dropdown";
import { GetEmployeeLeaveRequest, GetEmployeeLeaveRequestTemplate } from "../../service/Employee/EmployeeService";
import LeaveRequestCard from "../../components/LeaveRequestCard"; // Import the LeaveRequestCard component
import { leaveStatusData } from "../../Data/StaticDropdownData";


export default function LeavePage({ navigation }) {
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [leaveRequestTemplate, setLeaveRequestTemplate] = useState([]);

    // State for the status filter
    const [statusFilter, setStatusFilter] = useState("Recent");

 useEffect(() => {
  const loadEmployeeLeaveRequest = async () => {
    try {
      const request = await GetEmployeeLeaveRequest(); // Probably returns an array directly
      console.log("Leave Requests:", JSON.stringify(request, null, 2)); // Log the entire response for debugging

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

    const loadEmployeeLeaveRequestTemplate = async () => {
        try {
          const response = await GetEmployeeLeaveRequestTemplate();
          setLeaveRequestTemplate(response);
          await AsyncStorage.setItem("leaveRequestTemplate", JSON.stringify(response, null, 2));
        }
        catch (error) {
          console.error("Error fetching leave request template:", error);
          Alert.alert("Error", "Failed to load leave request template. Please try again.");
        }
      };
      useEffect(() => {
        loadEmployeeLeaveRequestTemplate();
      }, []);

      let filteredLeaveRequests = [...leaveRequests]; // clone to avoid mutating state

if (statusFilter === "Pending" || statusFilter === "Approved" || statusFilter === "Rejected") {
  filteredLeaveRequests = filteredLeaveRequests.filter((req) => req.leaveStatus === statusFilter);
} else if (statusFilter === "Recent") {
  filteredLeaveRequests.sort((a, b) => new Date(b.leaveStart) - new Date(a.leaveStart));
}

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
      <View style={styles.leaveStatusContainer}>
        <Text style={styles.leaveStatusText}>Sort By:</Text>
      <LeaveStatusDropdown
        data={leaveStatusData}
        value={statusFilter}
        setValue={setStatusFilter}
      />
      </View>
      <FlatList
        data={filteredLeaveRequests}
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
        style ={styles.body}/>
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
  leaveStatusContainer:{
    marginTop: 10,
    paddingHorizontal: 10,
    flexDirection:"row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  leaveStatusText:{
    fontSize: 16,
    marginRight: 10,
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
