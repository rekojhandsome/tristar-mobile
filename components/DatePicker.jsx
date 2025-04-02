import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; 
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function DatePickerComponent({ show, date, onChange, onConfirm, placeholder = "Select Date" }) {
  const [tempDate, setTempDate] = useState(date); // Temporary state for the selected date
  const [isPickerOpen, setIsPickerOpen] = useState(false); // Control the visibility of the picker

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setTempDate(selectedDate); // Update the temporary date
      if (Platform.OS !== 'ios') {
        onConfirm(selectedDate); // Automatically confirm on Android
        setIsPickerOpen(false); // Close the picker on Android
      }
    }
  };

  return (
    <View style={styles.dropdownContainer}>
      {/* Dropdown Button */}
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setIsPickerOpen(!isPickerOpen)}
      >
        <Text style={styles.dropdownText}>
          {tempDate ? tempDate.toDateString() : placeholder}
        </Text>
        <Ionicons name="calendar-outline" size={25} />
      </TouchableOpacity>

      {/* Date Picker */}
      {isPickerOpen && (
        <View style={styles.dropdownList}>
          <DateTimePicker
            value={tempDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'inline' : 'calendar'} // Use 'inline' for iOS and 'calendar' for Android
            onChange={handleDateChange}
          />
          {Platform.OS === 'ios' && ( // Show the Confirm button only on iOS
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => {
                onConfirm(tempDate); // Pass the confirmed date back to the parent
                setIsPickerOpen(false); // Close the picker
              }}
            >
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    dropdownContainer: {
      marginBottom: 10,
    },
    dropdownButton: {
      height: 50,
      width: '100%', 
      borderWidth: 1,
      borderColor: "#ccc",
      padding: 12,
      borderRadius: 5,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#fff",
    },
    dropdownText: {
      fontSize: 14,
      color: "#000",
    },
    
    dropdownList: {
      position: "static",
      marginTop: 5,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 5,
      backgroundColor: "#fff",
      padding: 10,
    },
    confirmButton: {
      marginTop: 10,
      padding: 10,
      backgroundColor: "#007BFF",
      borderRadius: 5,
      alignItems: "center",
    },
    confirmButtonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
  });