import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";

export const DatePickerComponent = ({ placeholder = "Select Date", value, onConfirm, editable = true }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [tempDate, setTempDate] = useState(value || new Date()); // Use value as the initial date

  const handleDateChange = (event, date) => {
    if (date) {
      setTempDate(date);
      if (Platform.OS === "android") {
        onConfirm(date); // Update the parent state
        setModalVisible(false);
      }
    }
  };

  const handleConfirm = () => {
    // Always call onConfirm with the selected date, even if it's the same as the current date
    onConfirm(tempDate);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Button to Open Modal */}
      <TouchableOpacity
        style={[styles.dropdownButton, !editable && styles.disabledButton]} // Apply disabled style if not editable
        onPress={() => editable && setModalVisible(true)} // Only open modal if editable
        disabled={!editable} // Disable the button if not editable
      >
        <Text style={styles.dropdownText}>
          {value ? value.toDateString() : placeholder}
        </Text>
        <Ionicons name="calendar-outline" size={25} />
      </TouchableOpacity>

      {/* iOS Modal for Date Picker */}
      {Platform.OS === "ios" && (
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <DateTimePicker
                value={tempDate}
                mode="date"
                display="inline"
                onChange={handleDateChange}
              />

              {/* Confirm Button (Only for iOS) */}
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleConfirm} // Call handleConfirm
              >
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {/* Android Date Picker */}
      {Platform.OS === "android" && isModalVisible && (
        <DateTimePicker
          value={tempDate}
          mode="date"
          display="calendar"
          onChange={(event, date) => {
            if (date) {
              setTempDate(date);
              onConfirm(date); // Update the parent state
              setModalVisible(false);
            } else {
              setModalVisible(false); // Close the picker if canceled
            }
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  dropdownButton: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    borderRadius: 5,
    width: "100%",
  },
  disabledButton: {
    backgroundColor: "#f0f0f0", // Optional: Change background color when disabled
    borderColor: "#ddd", // Optional: Change border color when disabled
  },
  dropdownText: {
    fontSize: 20,
    color: "#000",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  confirmButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  confirmButtonText: {
    color: "white",
    fontSize: 16,
  },
});