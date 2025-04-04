import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Alert, SafeAreaView, Pressable } from "react-native";
import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";

//API ENDPOINTS
import { API_BASE_URL } from "../service/Authentication/AuthService";
import { API_BASE_URL1 } from "../service/Authentication/AuthService";


export default function AccountPage({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  
  //Leave
  const [vacationLeave, setVacationLeave] = useState("");
  const [sickLeave, setSickLeave] = useState("");
  
  const [isEditing, setIsEditing] = useState(false);
  // Fetch employee profile
  useEffect(() => {
    const fetchEmployeeProfile = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");

        if (!token) {
          Alert.alert("Error", "No token found. Please login again.");
          return;
        }

        const response = await axios.get(`${API_BASE_URL1}/api/employee/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const employee = response.data;

        const vacationLeaveCredits = employee.leaveCredits.find((leave) => leave.leaveTypeID === 1)?.remainingCredits || "0";;
        const sickLeaveCredits = employee.leaveCredits.find((leave) => leave.leaveTypeID === 2)?.remainingCredits || "0";;
        
        setFirstName(employee.firstName);
        setLastName(employee.lastName);
        setPhoneNo(employee.phoneNo || "");
        setEmail(employee.email);
        setVacationLeave(vacationLeaveCredits.toString());
        setSickLeave(sickLeaveCredits.toString());

        console.log(employee);
      } catch (error) {
        console.error("Error fetching employee profile:", error);
        Alert.alert("Error", "Failed to load employee data. Please try again.");
      }
    };

    fetchEmployeeProfile();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.headerText}>Employee Details</Text>
        <Pressable style={styles.headerButton} onPress={() => setIsEditing(!isEditing)}>
          <Text style={styles.headerText}>{isEditing? "Cancel" : "Edit"}</Text>
        </Pressable>
      </View>

        <View style={styles.form}>
            <Text style={styles.bodyText}>First Name:</Text>
            <TextInput
              style={styles.input}
              editable ={isEditing}
              value={firstName}
              onChangeText={setFirstName}
            />
            <Text style={styles.bodyText}>Last Name:</Text>
            <TextInput
              style={styles.input}
              editable ={isEditing}
              value={lastName}
              onChangeText={setLastName}
            />
            <Text style={styles.bodyText}>Contact Number:</Text>
            <TextInput
              style={styles.input}
              editable ={isEditing}
              keyboardType="number-pad"
              value={phoneNo}
              onChangeText={setPhoneNo}
            />
            <Text style={styles.bodyText}>Email Address:</Text>
            <TextInput
              style={styles.input}
              editable={isEditing}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <Text style={styles.bodyText}>Vacation Leave Credits:</Text>
            <TextInput
              style={styles.input}
              editable={false}
              keyboardType="default"
              value={vacationLeave}
            />
            <Text style={styles.bodyText}>Sick Leave Credits:</Text>
            <TextInput
              style={styles.input}
              editable={false}
              keyboardType="default"
              value={sickLeave}
            />
        
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.registerButton} disabled={!isEditing} onPress={() => console.log("Button Pressed")}>
            <Text style={styles.saveChangesButtonText}>Save Changes</Text>
          </Pressable>
        </View>
        <View>
        </View>
        
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 71,
    width: "100%",
    backgroundColor: "#70907C",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
  headerButton:{
    position: 'absolute',
    right: 30
  },
  form: {
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  formText: {
    fontSize: 30,
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  bodyText: {
    fontSize: 20,
    marginBottom: 5,
    marginTop: 5,
  },
  container: {
    flexDirection: "row",
    gap: 10,
    paddingRight: 10,
  },
  inputContainer: {
    marginBottom: 5,
    flex: 0.5,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
 
  buttonContainer: {
    paddingHorizontal: 10,
    marginTop: 25,
  },
  registerButton: {
    width: '100%',
    backgroundColor: "#3FD68F",
    padding: 15,
    borderRadius: 5,
  },
  saveChangesButtonText: {
    textAlign: 'center',
    color: "white",
    fontSize: 16,
  },
  
  
});
