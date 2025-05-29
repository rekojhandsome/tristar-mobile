import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, Pressable, FlatList, Alert } from "react-native";
import ApprovalCard from "../../components/ApprovalCard";
import { GetLeaveRequestForApproval, PatchLeaveRequest } from "../../service/Employee/EmployeeService";

export default function ApprovalPage({ navigation }) {
  
  const [leaveRequestForApproval, setLeaveRequestForApproval] = useState([]);

 // ✅ Moved outside so it can be reused
  const loadLeaveRequestForApproval = async () => {
    try {
      const response = await GetLeaveRequestForApproval();
      setLeaveRequestForApproval(response);
    } catch (error) {
      console.error("Error fetching leave requests for approval:", error);
      Alert.alert("Error", "Failed to load leave requests. Please try again.");
    }
  };

  useEffect(() => {
    loadLeaveRequestForApproval();
  }, []);

 const handleApprove = (leaveRequestID) => {
  Alert.alert(
    "Confirm",
    "Are you sure you want to approve this leave request?",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: async () => {
          const isApprove = true;
          const result = await PatchLeaveRequest(leaveRequestID, isApprove);
          console.log("Approve Result:", result);

          if (result.success) {
            Alert.alert("Approved", result.message || "Leave Request successfully approved.");
            await loadLeaveRequestForApproval();
          } else {
            Alert.alert("Error", result.message || "Failed to approve leave request.");
          }
        },
      },
    ]
  );
};

const handleReject = (leaveRequestID) => {
  Alert.alert(
    "Confirm",
    "Are you sure you want to reject this leave request?",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: async () => {
          console.log("Rejecting ID:", leaveRequestID);
          const isApprove = false;
          const result = await PatchLeaveRequest(leaveRequestID, isApprove);
          console.log("Reject Result:", result);

          if (result.success) {
            Alert.alert("Rejected", result.message || "Leave Request successfully rejected.");
            await loadLeaveRequestForApproval();
          } else {
            Alert.alert("Error", result.message || "Failed to reject leave request.");
          }
        },
      },
    ]
  );
};

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Approval Page</Text>
        <Pressable style={styles.headerButton} onPress={() => navigation.navigate("Homepage")}>
          <Text style={styles.headerButtonText}>Go back</Text>
        </Pressable>
      </View>

      <FlatList
        contentContainerStyle={styles.listContainer}
        data={leaveRequestForApproval}
        keyExtractor={(item) => item.leaveRequestID.toString()}
        renderItem={({ item }) => (
          <ApprovalCard
          leaveRequestID={item.leaveRequestID}
            leaveType={item.leaveTypeName}
            leaveStart={item.leaveRequestItems[0].leaveStartFormatted}
            leaveEnd={item.leaveRequestItems[item.leaveRequestItems.length - 1].leaveEndFormatted}
            employeeName={item.firstName + " " + item.lastName}
            onApprove={() => handleApprove(item.leaveRequestID)}
            onReject={() => handleReject(item.leaveRequestID)}
          />
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No pending leave requests.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 71,
    backgroundColor: "#70907C",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
  headerButton: {
    position: "absolute",
    left: 15,
  },
  headerButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  listContainer: {
    padding: 15,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 30,
    color: "gray",
  },
});
