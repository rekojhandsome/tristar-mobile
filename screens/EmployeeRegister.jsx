import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert, SafeAreaView, Pressable } from "react-native";
import axios from "axios";

import { CompaniesDropdown, DepartmentsDropdown } from "../components/Dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";

//API ENDPOINTS
import { API_BASE_URL } from "../service/AuthService";
import { API_BASE_URL1 } from "../service/AuthService";


export default function EmployeeRegister({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [companyID, setCompanyID] = useState(null); 
  const [departmentID, setDepartmentID] = useState(null); // State for department ID

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSaveEmployeeDetail = async () => {

    const employeeURL = `${API_BASE_URL1}/api/Employee`;

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const employeeData = {
        firstName,
        lastName,
        phoneNo,
        email,
        departmentID, // Include the selected department ID
      };

      console.log("Employee Data: ", employeeData);
      const response = await axios.post(employeeURL, employeeData);

      const employeeID = await response.data.employeeID;
      console.log("Employee ID: ", employeeID);

      AsyncStorage.setItem("employeeID", employeeID.toString());

      Alert.alert("Success", "Employee Registered Succesfully!", [
        {
          text: "Okay",
          onPress: () => {
            console.log("Employee Registered Succesfully!");
            navigation.navigate("SignUp");
          },
        },
      ]);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        console.error("An employee with the same credentials already exists", error.response.data.message);
        Alert.alert("Error", "An employee with the same credentials already exists");
        setIsSubmitting(false);
      }
      else {
      console.error(error);
      Alert.alert("Error", "Error registering employee");
      console.log("Error registering employee", error);
      setIsSubmitting(false);
    }
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Pressable style={styles.signInButton} onPress={() => navigation.navigate("SignIn")}>
            <Text style={styles.headerText }>Sign In</Text>
          </Pressable>
        <Text style={styles.headerText}>Employee Registration</Text>
      </View>

      
        <Text style={styles.formText}>Employee Details</Text>

        <View style={styles.form}>
            <Text style={styles.bodyText}>First Name:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              value={firstName}
              onChangeText={setFirstName}
            />
            <Text style={styles.bodyText}>Last Name:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your last name"
              value={lastName}
              onChangeText={setLastName}
            />
            <Text style={styles.bodyText}>Contact Number:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your contact number"
              keyboardType="number-pad"
              value={phoneNo}
              onChangeText={setPhoneNo}
            />
            <Text style={styles.bodyText}>Email Address:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email address"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          <Text style={styles.bodyText}>Company:</Text>
          <CompaniesDropdown 
          placeholder={"Select Company"}
          value={companyID} 
          setValue={setCompanyID}
          />
       
       <Text style={styles.bodyText}>Department:</Text>
          <DepartmentsDropdown 
          styles ={styles.dropdownText}
          placeholder={"Select Department"}
          value={departmentID} 
          setValue={setDepartmentID}
          />
      </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.registerButton} onPress={handleSaveEmployeeDetail}>
            <Text style={styles.registerButtonText}>Create Account</Text>
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
  signInButton:{
    position: 'absolute',
    left: 15
   },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
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
    marginTop: 30,
  },
  registerButton: {
    width: '100%',
    backgroundColor: "#3FD68F",
    padding: 15,
    borderRadius: 5,
  },
  registerButtonText: {
    textAlign: 'center',
    color: "white",
    fontSize: 16,
  },
 
 
  
});
