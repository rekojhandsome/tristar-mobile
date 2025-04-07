import { useState, React, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, SafeAreaView,  Platform, FlatList, KeyboardAvoidingView, Alert } from 'react-native';


import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

//API ENDPOINTS
import { API_BASE_URL } from "../service/Authentication/AuthenticationService";
import { API_BASE_URL1 } from "../service/Authentication/AuthenticationService";

import { GetLeaveCredits } from "../service/Employee/EmployeeService";
import { AddLeaveRequest } from '../service/Employee/EmployeeService';

//Components
import ConfirmLeaveModal from '../components/ConfirmLeavePopup';
import { DatePickerComponent } from '../components/DatePicker'; 
import { LeaveTypeDropdown } from '../components/Dropdown';


export default function RequestLeavePage({ navigation }) { 
    // Leave Credits
    const [vacationLeaveCredits, setVacationLeaveCredits] = useState("");
    const [sickLeaveCredits, setSickLeaveCredits] = useState("");

    // Leave Request
    const [leaveTypeID, setLeaveTypeID] = useState(null);
    const [leaveStart, setLeaveStart] = useState(null);
    const [leaveEnd, setLeavEnd] = useState(null);
    const [reason, setReason] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);
  
    // Fetch Leave Credits
    useEffect(() => {
    const loadLeaveCredits = async () => {
      try {
        const { vacationLeaveCredits, sickLeaveCredits } = await GetLeaveCredits();
          setVacationLeaveCredits(vacationLeaveCredits);
          setSickLeaveCredits(sickLeaveCredits);
          console.log("Current leave credits:", "Vacation Leave: ",vacationLeaveCredits, "Sick Leave: ",sickLeaveCredits);
          }
      catch (error) {
        console.error("Error loading leave credits: ", error)
        }
        };
      loadLeaveCredits();
    },[]);

    // Apply Leave Request
    const handleAddLeaveRequest = async () => {
      if (isSubmitting) return; // Prevent multiple submissions
      setIsSubmitting(true);

      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0); // Set time to midnight for comparison

      //Validtate inputs
      if (!leaveStart || !leaveEnd || !leaveTypeID || !reason) {
        Alert.alert("Incomplete Fields", "Please fill in all fields.");
        setIsSubmitting(false);
        return;
      }
      if (leaveStart < currentDate) {
        Alert.alert("Error", "Start date must be the current date or later.");
        setIsSubmitting(false);
        return;
      }

      if (leaveStart > leaveEnd) {
        Alert.alert("Error", "Start date must be before the end date.");
        setIsSubmitting(false);
        return;
      }
      //Execute API Call
      try{
        const request = await AddLeaveRequest(leaveStart, leaveEnd, leaveTypeID, reason);

        if (request.status === 400){
          Alert.alert("Conflict of Dates", "Leave request already exists for the selected dates.");
          setIsSubmitting(false);
          return;
        }
        if (request.status === 200){
          Alert.alert("Success", "Leave request submitted successfully!",
          [
            {
              text: "Okay",
              onPress: () => navigation.navigate("LeavePage")
            },
          ]
        );
          console.log("Leave request submitted successfully!");
        } else {
          Alert.alert("Error", "Failed to submit leave request. Please try again.");
          console.log("Failed to submit leave request.");
        }
      }catch (error) {
        console.error("Error submitting leave request:", error);
      } finally {
          setIsSubmitting(false);
      }
    };
  
    const formFields = [
      {
        key: "vacationLeave",
        label: "Vacation Leave Credits:",
        component: (
          <TextInput
            style={[styles.input, styles.disabledInput]}// Add a new style for disabled input
            editable={false}
            value={vacationLeaveCredits}
          />
        ),
      },
      {
        key: "sickLeave",
        label: "Sick Leave Credits:",
        component: (
          <TextInput
            style={[styles.input, styles.disabledInput]}
            editable={false}
            value={sickLeaveCredits}
          />
        ),
      },
      {
        key: "leaveType",
        label: "Leave Type:",
        component: (
          <LeaveTypeDropdown
            placeholder={"Select Leave Type"}
            value={leaveTypeID}
            setValue={setLeaveTypeID}
          />
        ),
      },
      {
        key: "startDate",
        label: "Start of Leave:",
        component: (
          <DatePickerComponent
            value={leaveStart}
            onConfirm={(date) => setLeaveStart(date)}
          />
        ),
      },
      {
        key: "endDate",
        label: "End of Leave:",
        component: (
          <DatePickerComponent
            value={leaveEnd}
            onConfirm={(date) => setLeavEnd(date)}
          />
        ),
      },
      {
        key: "reason",
        label: "Reason:",
        component: (
          <TextInput
            style={styles.input}
            placeholder="Enter Reason"
            keyboardType="default"
            autoCapitalize="none"
            value={reason}
            onChangeText={setReason}
          />
        ),
      },
    ];
  
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Pressable style={styles.leaveButton} onPress={() => navigation.navigate("LeavePage")}>
            <Text style={styles.headerText}>Leave</Text>
          </Pressable>
          <Text style={styles.headerText}>Request Leave</Text>
        </View>
  
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
          <FlatList
            data={formFields}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <View style={styles.form}>
                <Text style={styles.bodyText}>{item.label}</Text>
                {item.component}
              </View>
            )}
            ListHeaderComponent={
                <Text style={styles.formText}>Leave Application Form</Text> // Only the "Employee Details" text remains in the header of the list
            }
            ListFooterComponent={
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.registerButton} onPress={handleAddLeaveRequest}>
                        <Text style={styles.registerButtonText}>Request Leave</Text>
                    </Pressable>
                </View>
            }
            nestedScrollEnabled={true}  // Enable nested scrolling
            showsVerticalScrollIndicator={false} // Hide vertical scroll indicator  
            contentContainerStyle={{ paddingBottom: 20 }} // Enable nested scrolling
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

const styles = StyleSheet.create({
    header:{
        width: '100%',
        height: 65,
        alignItems: 'center',
        backgroundColor: '#70907C',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: "600",
        color: "white",
      },
    leaveButton:{
        position: 'absolute',
        left: 15,
    },
    form:{
        paddingHorizontal: 10,
        marginBottom: 5
    },
    formText:{
        fontSize: 30,
        marginBottom: 10,
        marginTop: 10,
        paddingHorizontal: 10,
    },
    bodyText:{
        fontSize: 20,
        marginBottom: 5,
        marginTop: 5,
    },
    input:{
        width: "100%",
        height: 50,
        borderWidth: 1,
        backgroundColor: "#fff",
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize:20,
    },
    disabledInput: {
        color: "#a9a9a9", // Grey text color
      },
    buttonContainer: {
        paddingHorizontal: 10,
        marginTop: 10,
      },
    registerButton: {
        width: "100%",
        backgroundColor: "#3FD68F",
        padding: 15,
        borderRadius: 5,
      },
    registerButtonText: {
        textAlign: "center",
        color: "white",
        fontSize: 20,
    },
})