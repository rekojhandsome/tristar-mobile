import React, { useState } from "react";
import { View, Text,Modal, TouchableOpacity, StyleSheet, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";

export const DatePickerComponent = ({ placeholder = "Select Leave Date", onConfirm }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null); // Keep null for placeholder
  const [tempDate, setTempDate] = useState(new Date()); // Temporary state for iOS

  const handleDateChange = (event, date) => {
    if (date) {
      setTempDate(date);
      if (Platform.OS === "android") {
        setSelectedDate(date); // Set date immediately on Android
        onConfirm(date);
        setModalVisible(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Button to Open Modal */}
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.dropdownText}>
          {selectedDate ? selectedDate.toDateString() : (placeholder || "Select Leave Date")}
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
                onPress={() => {
                  setSelectedDate(tempDate); // Update selected date on confirm
                  onConfirm(tempDate);
                  setModalVisible(false);
                }}
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
          value={selectedDate || new Date()}
          mode="date"
          display="calendar"
          onChange={handleDateChange}
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
  dropdownText: {
    fontSize: 16,
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
