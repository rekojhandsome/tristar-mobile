import { useState, React, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, SafeAreaView,  Platform, FlatList, KeyboardAvoidingView, Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { GetEmployeeLeaveCredits } from "../service/Employee/EmployeeService";
import { AddLeaveRequest } from '../service/Employee/EmployeeService';

//Components
import { DatePickerComponent } from '../components/DatePicker'; 
import { LeaveTypeDropdown, StaticDropdown } from '../components/Dropdown';
import { dayTypeData } from '../Data/StaticDropdownData';


export default function RequestLeavePage({ navigation }) { 
    // Leave Credits
    const [vacationLeaveCredits, setVacationLeaveCredits] = useState(0);
    const [sickLeaveCredits, setSickLeaveCredits] = useState(0);

    //Leave Request Template
    const [leaveRequestTemplate, setLeaveRequestTemplate] = useState(null);
    // Leave Request
    const [leaveTypeID, setLeaveTypeID] = useState(null);
    const [leaveStart, setLeaveStart] = useState(null);
    const [leaveEnd, setLeavEnd] = useState(null);
    const [memo, setMemo] = useState("");
    const [dayType, setDayType] = useState(null);

    const [isSubmitting, setIsSubmitting] = useState(false);
  
     useEffect(() => {
      const loadLeaveCredits = async () => {
        try {
          const request = await GetEmployeeLeaveCredits();
          if (!request?.success) {
            console.warn("Leave credit fetch was unsuccessful");
            return;
          }
        const leaveCreditsArray = request.data;
    
          // Parse each leave type
          const vacationLeave = leaveCreditsArray.find(
            (credit) => credit.leaveTypeName === "Vacation Leave"
          );
    
          const sickLeave = leaveCreditsArray.find(
            (credit) => credit.leaveTypeName === "Sick Leave"
          );
    
          // Set remainingCredits
          setVacationLeaveCredits(vacationLeave?.remainingCredits?.toString() || "0");
          setSickLeaveCredits(sickLeave?.remainingCredits?.toString() || "0");
    
        } catch (error) {
          console.error("Error fetching leave credits: ", error.response?.data || error.message);
        }
      };
      loadLeaveCredits();
    }, []);

      useEffect(() => {
        const loadLeaveRequestTemplateFromStorage = async () => {
          const storedTemplate = await AsyncStorage.getItem("leaveRequestTemplate");
            try {
              if (storedTemplate){
                  const parsedTemplate = JSON.parse(storedTemplate);
                  setLeaveRequestTemplate(parsedTemplate);
              }
              else {
                console.log("No leave request template found in storage.");
              }
              }
            catch (error){
              console.error("Error loading leave request template from storage:", error);
            }
        };
        loadLeaveRequestTemplateFromStorage();
     },[]);

    // Apply Leave Request
    const handleAddLeaveRequest = async () => {
      // loadEmployeeLeaveRequestTemplate(); // Ensure template is loaded before submission
      // if (isSubmitting) return; // Prevent multiple submissions
      // setIsSubmitting(true);

      //Validtate inputs
      if (!leaveStart || !leaveEnd || !leaveTypeID || !memo || !dayType) {
        console.log("Missing input fields", { leaveStart, leaveEnd, leaveTypeID, memo, dayType });
        Alert.alert("Incomplete Fields", "Please fill in all fields.");
        setIsSubmitting(false);
        return;
      }

      // Validate Dates
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0); // Set time to midnight for comparison

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
      console.log("Checking leaveRequestTemplate before submission:", leaveRequestTemplate);
      if (leaveRequestTemplate === null || leaveRequestTemplate === undefined) {
          Alert.alert("Error", "Leave request template not loaded. Please try again later.");
          setIsSubmitting(false);
          return;
        }

      const leaveRequestItem = {
        leaveStart: leaveStart,
        leaveEnd: leaveEnd,
        dayType: dayType,
        memo: memo,
      };

      const payload = {
        ...leaveRequestTemplate,
        leaveTypeID: parseInt(leaveTypeID),
        leaveRequestItems: [leaveRequestItem]
      }
      
      console.log('Submitting payload:', JSON.stringify(payload, null, 2));

      try {
        const response = await AddLeaveRequest(payload);

        if (response.success){
          Alert.alert("Success", response.message);
        }
        else {
          Alert.alert("Error", response.message);
        }
      }
      catch(error){
         Alert.alert("Error", "Failed to submit leave request. Please try again.");
      }

      // //Execute API Call
      // try{
      //   const request = await AddLeaveRequest(leaveStart, leaveEnd, leaveTypeID, reason);

      //   if (request.status === 400){
      //     if(request.code === "OVERLAPPING_LEAVE"){
      //       Alert.alert("Overlapping Leave", "Leave request overlaps with an existing leave.", request.message);
      //       console.log( request.message);
      //     } else if (request.code === "INSUFFICIENT_CREDITS"){
      //       Alert.alert("Insufficient Credits", "You do not have enough leave credits.", request.message);
      //       console.log("Leave request failed due to insufficient credits.", request.message);
      //     } else {
      //       Alert.alert("Error", "Failed to submit leave request. Please try again.");
      //       console.log("Leave request failed with unknown error.", request.message);
      //     }
      //     setIsSubmitting(false);
      //     return;
      //   }
      //   if (request.status === 200){
      //     Alert.alert("Success", "Leave request submitted successfully!",
      //     [
      //       {
      //         text: "Okay",
      //         onPress: () => navigation.navigate("LeavePage")
      //       },
      //     ]
      //   );
      //     console.log("Leave request submitted successfully!");
      //   } else {
      //     Alert.alert("Error", "Failed to submit leave request. Please try again.");
      //     console.log("Failed to submit leave request.");
      //     isSubmitting(false);
      //   }
      // }catch (error) {
      //   console.error("Error submitting leave request:", error);
      // } finally {
      //     setIsSubmitting(false);
      // }
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
      },{
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
        key: "dayType",
        label: "Day Type:",
        component: (
          <StaticDropdown
            placeholder={"Select Day Type"}
            value={dayType}
            setValue={setDayType}
            editable={true}
            data={dayTypeData}
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
        key: "memo",
        label: "Reason:",
        component: (
          <TextInput
            style={styles.input}
            placeholder="Enter Reason"
            keyboardType="default"
            autoCapitalize="none"
            value={memo}
            onChangeText={setMemo}
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
                        <Text style={styles.registerButtonText}>Submit Request</Text>
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