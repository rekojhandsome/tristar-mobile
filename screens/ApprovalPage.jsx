import React, { useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, Pressable, FlatList, Alert } from "react-native";
import ApprovalCard from "../components/ApprovalCard";

export default function ApprovalPage({ navigation }) {
  // Mock data for pending leave requests
  const [pendingRequests, setPendingRequests] = useState([
    {
      leaveRequestID: 1,
      leaveTypeName: "Vacation Leave",
      employeeName: "Juan Dela Cruz",
      leaveRequestItems: [
        { leaveStartFormatted: "2025-06-01", leaveEndFormatted: "2025-06-03" },
      ],
    },
     {
      leaveRequestID: 2,
      leaveTypeName: "Vacation Leave",
      employeeName: "Juan Dela Cruz",
      leaveRequestItems: [
        { leaveStartFormatted: "2025-06-01", leaveEndFormatted: "2025-06-03" },
      ],
    },
     {
      leaveRequestID: 3,
      leaveTypeName: "Vacation Leave",
      employeeName: "Juan Dela Cruz",
      leaveRequestItems: [
        { leaveStartFormatted: "2025-06-01", leaveEndFormatted: "2025-06-03" },
      ],
    },
  ]);

  const handleApprove = (leaveRequestID) => {
    Alert.alert(
      "Approval",
      "Are you sure you want to approve this leave request?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          onPress: () => {
            Alert.alert("Approved", "Leave Request successfully approved.");
            setPendingRequests(prev => prev.filter(req => req.leaveRequestID !== leaveRequestID));
          },
        },
      ]
    );
  };

const handleReject = (leaveRequestID) => {
  Alert.alert(
    "Confirm Rejection",
    "Are you sure you want to reject this leave request?",
    [
      { text: "No", style: "cancel" },
      {
        text: "Yes",
        onPress: () => {
          Alert.alert("Rejected", "Leave Request successfully rejected.");
          setPendingRequests(prev => prev.filter(req => req.leaveRequestID !== leaveRequestID));
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
        data={pendingRequests}
        keyExtractor={(item) => item.leaveRequestID.toString()}
        renderItem={({ item }) => (
          <ApprovalCard
            leaveType={item.leaveTypeName}
            leaveStart={item.leaveRequestItems[0].leaveStartFormatted}
            leaveEnd={item.leaveRequestItems[item.leaveRequestItems.length - 1].leaveEndFormatted}
            employeeName={item.employeeName}
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
    marginTop: 20,
    fontSize: 18,
    color: "gray",
  },
});
