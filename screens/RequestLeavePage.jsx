import { useState, React, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, SafeAreaView,  Platform, FlatList, KeyboardAvoidingView } from 'react-native';


import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

//API ENDPOINTS
import { API_BASE_URL } from "../service/Authentication/AuthService";
import { API_BASE_URL1 } from "../service/Authentication/AuthService";

//Components
import ConfirmLeaveModal from '../components/ConfirmLeavePopup';
import { DatePickerComponent } from '../components/DatePicker'; 
import { LeaveTypeDropdown } from '../components/Dropdown';


export default function RequestLeavePage({ navigation }) {
    const [leaveStart, setLeaveStart] = useState(null);
    const [leaveEnd, setLeavEnd] = useState(null);
    const [vacationLeave, setVacationLeave] = useState("");
    const [sickLeave, setSickLeave] = useState("");
    const [leaveTypeID, setLeaveTypeID] = useState(null);

    const [reason, setReason] = useState("");
    const [numberOfDays, setNumberOfDays] = useState(0);

    const [isSubmitting, setIsSubmitting] = useState(false);
  
    useEffect(() => {

    if (isSubmitting) return;
    setIsSubmitting(true);

    const fetchEmployeeProfile = async () => {
        try {
            const token = await AsyncStorage.getItem("userToken");
  
            if (!token) {
                Alert.alert("Error", "No token found. Please sign in again.");
                return;
            }
  
          const response = await axios.get(`${API_BASE_URL}/api/employee/profile`, {
            headers: { Authorization: `Bearer ${token}` }
          });
  
          const employee = response.data;
          const vacationLeaveCredits = employee.leaveCredits.find((leave) => leave.leaveTypeID === 1)?.remainingCredits || "0";
          const sickLeaveCredits = employee.leaveCredits.find((leave) => leave.leaveTypeID === 2)?.remainingCredits || "0";
  
          setVacationLeave(vacationLeaveCredits.toString());
          setSickLeave(sickLeaveCredits.toString());

        } catch (error) {
          console.error("Error fetching employee profile:", error);
          Alert.alert("Error", "Failed to load employee data. Please try again.");
        }
      };
  
      fetchEmployeeProfile();
    }, []);
  
    const formFields = [
      {
        key: "vacationLeave",
        label: "Vacation Leave Credits:",
        component: (
          <TextInput
            style={[styles.input, styles.disabledInput]}// Add a new style for disabled input
            editable={false}
            value={vacationLeave}
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
            value={sickLeave}
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
                    <Pressable style={styles.registerButton}>
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