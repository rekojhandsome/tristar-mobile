import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";

export const DatePickerComponent = ({ placeholder, onConfirm }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showPicker, setShowPicker] = useState(false); // For Android

  const handleDateChange = (event, date) => {
    if (date) {
      setSelectedDate(date);
      if (Platform.OS === "android") {
        setShowPicker(false); // Close picker automatically
        onConfirm(date); // Confirm immediately on Android
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Button to Open Modal (iOS) / Show Picker (Android) */}
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() =>
          Platform.OS === "ios" ? setModalVisible(true) : setShowPicker(true)
        }
      >
        <Text style={styles.dropdownText}>
          {selectedDate ? selectedDate.toDateString() : placeholder}
        </Text>
        <Ionicons name="calendar-outline" size={25} />
      </TouchableOpacity>

      {/* Android Date Picker (Appears Inline) */}
      {showPicker && Platform.OS === "android" && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          display="calendar"
          onChange={handleDateChange}
        />
      )}

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
                value={selectedDate || new Date()}
                mode="date"
                display="inline"
                onChange={handleDateChange}
              />

              {/* Confirm Button (Only for iOS) */}
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => {
                  onConfirm(selectedDate);
                  setModalVisible(false);
                }}
              >
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    borderRadius: 5,
    width: '100%',
  },
  dropdownText: {
    fontSize: 16,
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

