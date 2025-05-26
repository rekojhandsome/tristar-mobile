// ApprovalCard.jsx
import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function ApprovalCard({ leaveType, leaveStart, leaveEnd, employeeName, onApprove, onReject }) {
  return (
    <View style={styles.card}>
      <Text style={styles.type}>Leave Type: {leaveType}</Text>
      <Text style={styles.date}>Start: {leaveStart}</Text>
      <Text style={styles.date}>End: {leaveEnd}</Text>
      <Text style={styles.employee}>Requested by: {employeeName}</Text>

      <View style={styles.buttons}>
        <Pressable style={styles.approveButton} onPress={onApprove}>
          <Text style={styles.buttonText}>Approve</Text>
        </Pressable>
        <Pressable style={styles.rejectButton} onPress={onReject}>
          <Text style={styles.buttonText}>Reject</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  type: {
    fontSize: 18,
    fontWeight: "600",
    color: "#444",
  },
  date: {
    fontSize: 16,
    marginTop: 4,
  },
  employee: {
    fontSize: 16,
    marginTop: 4,
  },
  buttons: {
    flexDirection: "row",
    marginTop: 12,
    justifyContent: "space-between",
  },
  approveButton: {
    backgroundColor: "#2CAD71",
    padding: 10,
    borderRadius: 6,
    flex: 0.48,
    alignItems: "center",
  },
  rejectButton: {
    backgroundColor: "#F85557",
    padding: 10,
    borderRadius: 6,
    flex: 0.48,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
});
