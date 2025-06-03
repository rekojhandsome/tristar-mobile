// LeaveRequestCard.jsx
import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import LeaveReqeustSignatoryModal from "./LeaveRequestSignatoryModal";

export default function LeaveRequestCard({
  leaveType,
  leaveStart,
  leaveEnd,
  leaveStatus,
  signatories,
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.textContainer}>
          <Text style={styles.leaveText}>Leave Type: {leaveType}</Text>
          <Text style={styles.dateText}>Start of Leave: {leaveStart}</Text>
          <Text style={styles.dateText}>End of Leave:  {leaveEnd}</Text>
          <Text
            style={[
              styles.approveText,
              leaveStatus === "Approved"
                ? styles.approved
                : leaveStatus === "Pending"
                ? styles.pendingText
                : styles.rejectedText,
            ]}
          >
            {leaveStatus}
          </Text>
        </View>
        <Pressable
          style={styles.button}
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={styles.buttonText}>View</Text>
        </Pressable>
      </View>

      <LeaveReqeustSignatoryModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        signatories={signatories}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxHeight: 150,
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 0.1,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
  },
  leaveText: {
    fontSize: 16,
    color: "rgba(0, 0, 0, 0.5)",
    fontWeight: "600",
  },
  dateText: {
    fontSize: 16,
    paddingTop: 5,
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
  button: {
    width: 85,
    height: 30,
    backgroundColor: "#2CAD71",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
});
