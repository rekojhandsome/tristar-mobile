// LeaveRequestCard.jsx
import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function LeaveRequestCard({ leaveType, leaveStart, leaveEnd, leaveStatus, onViewPress }){
  return (
    <View style={styles.container}>
      <View style={styles.containerText}>
        <Text style={styles.leaveText}>Leave Type: {leaveType}</Text>
        <Text style={styles.dateText}>Leave Start: {new Date(leaveStart).toLocaleDateString()}</Text>
        <Text style={styles.dateText}>Leave End:  {new Date(leaveEnd).toLocaleDateString()}</Text>
        <Text style={[styles.approveText, leaveStatus === "Approved" ? styles.approved : leaveStatus === "Pending" ? styles.pendingText : styles.rejectedText]}>
          {leaveStatus}
        </Text>
      </View>
      <Pressable style={styles.containerButton} onPress={onViewPress}>
        <Text style={styles.containerButtonText}>View</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 120,
    borderWidth: 0.1,
    backgroundColor: "white",
    borderRadius: 5,
    marginBottom: 10,
    paddingVertical: 10
  },
  containerText: {
    paddingLeft: 10,
    paddingTop: 5,
  },
  leaveText: {
    fontSize: 20,
    color: "rgba(0, 0, 0, 0.5)",
    fontWeight: "600",
  },
  dateText: {
    paddingTop: 5,
    fontSize: 20,
  },
  approveText: {
    paddingTop: 5,
    fontSize: 20,
    fontWeight: "700",
  },
  pendingText: {
    color: "#ED8E2F",
  },
  approved: {
    color: "#2CAD71",
  },
  rejectedText: {
    color: "#F85557",
  },
  containerButton: {
    width: 85,
    height: 30,
    backgroundColor: "#2CAD71",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 15,
    top: 50,
  },
  containerButtonText: {
    color: "white",
  },
});
