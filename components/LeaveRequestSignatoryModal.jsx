import React from "react";
import { Modal, View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";

export default function LeaveProgressModal({ visible, onClose, signatories }) {
  const getStatusText = (isSigned) => {
    if (isSigned === true) return "Signed";
    if (isSigned === false) return "Rejected";
    return "Not Signed";
  };

  const getStatusColor = (isSigned) => {
    if (isSigned === true) return "#4caf50"; // green
    if (isSigned === false) return "#f44336"; // red
    return "#ff9800"; // orange
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Signatories</Text>
          <ScrollView style={styles.scrollContainer}>
            {signatories.map((signatory, index) => (
              <View key={index} style={styles.signatoryCard}>
                <View style={styles.signatoryInfo}>
                  <Text style={styles.signatoryName}>
                    {signatory.signatoryName} ({signatory.positionName})
                  </Text>
                  <Text
                    style={[
                      styles.statusText,
                      { color: getStatusColor(signatory.isSigned) },
                    ]}
                  >
                    {getStatusText(signatory.isSigned)}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
  },
  modalContent: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 20,
    width: "80%",
    maxHeight: "80%",

  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "center",
  },
  scrollContainer: {
    marginBottom: 20,
  },
  signatoryCard: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 10,
  },
  signatoryInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signatoryName: {
    fontSize: 16,
  },
  statusText: {
    fontWeight: "700",
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: "#70907C",
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
