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
  const [salary, setSalary] = useState("");
  const [companyID, setCompanyID] = useState(null); 
  const [departmentID, setDepartmentID] = useState(null); // State for department ID

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSaveEmployeeDetail = async () => {

    const employeeURL = `${API_BASE_URL}/api/Employee`;

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const employeeData = {
        firstName,
        lastName,
        phoneNo,
        salary,
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
            <Text style={styles.bodyText}>Salary:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your salary"
              keyboardType="number-pad"
              value={salary}
              onChangeText={setSalary}
            />
          <Text style={styles.bodyText}>Company:</Text>
          <CompaniesDropdown 
          placeholder={"Select Company"}
          value={companyID} 
          setValue={setCompanyID}
          />
       
       <Text style={styles.bodyText}>Department:</Text>
          <DepartmentsDropdown 
          placeholder={"Select Department"}
          value={departmentID} 
          setValue={setDepartmentID}
          />
      </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.registerButton} onPress={handleSaveEmployeeDetail}>
            <Text style={styles.signInButtonText}>Create Account</Text>
          </Pressable>
        </View>
        <View>
        <Pressable onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.signUpText}> Already Registered? <Text style={styles.signUpLink}>Sign Up</Text>
        </Text>
        </Pressable>
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
    marginTop: 20,
  },
  registerButton: {
    width: '100%',
    backgroundColor: "#3FD68F",
    padding: 15,
    borderRadius: 5,
  },
  signInButtonText: {
    textAlign: 'center',
    color: "white",
    fontSize: 16,
  },
  signUpText: {
    color: "black",
    textAlign: "center",
   paddingTop: 15
  },
  signUpLink:{
    color: "#3FD68F", 
    fontWeight: "500"
  },
  
});
