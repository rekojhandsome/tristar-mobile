import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert, SafeAreaView, Pressable, FlatList, KeyboardAvoidingView, Platform } from "react-native";
import axios from "axios";

// Components
import { CompaniesDropdown, DepartmentsDropdown } from "../components/Dropdown";
import { DatePickerComponent } from "../components/DatePicker";

// JWT Token
import AsyncStorage from "@react-native-async-storage/async-storage";

// API ENDPOINTS
import { API_BASE_URL } from "../service/Authentication/AuthenticationService";
import { API_BASE_URL1 } from "../service/Authentication/AuthenticationService";
import { RegisterEmployee } from "../service/Employee/EmployeeService";


export default function EmployeeRegister({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [companyID, setCompanyID] = useState(null);
  const [departmentID, setDepartmentID] = useState(null);
  const [dateHired, setDateHired] = useState(null);


  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegisterEmployee = async () => {

    if (isSubmitting) return;
    setIsSubmitting(true);

    try{
      const result = await RegisterEmployee(firstName, lastName, phoneNo, email, departmentID, dateHired);

      if (result.success){
        Alert.alert("Success", "Employee registered successfully",
        [
          {
            text: "Okay",
            onPress: () => {
              navigation.navigate("SignUp");
            }
          }
        ]),
        console.log("Employee registered successfuly", result);
        setIsSubmitting(false);
      } else {
        Alert.alert("Error", "Failed to register employee. Please try again.");
        console.log("Failed to register employee", result);
        setIsSubmitting(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        console.error("An employee with the same credentials already exists", error.response.data.message);
        Alert.alert("Error", "An employee with the same credentials already exists");
        setIsSubmitting(false);
      } else {
        console.error(error);
        Alert.alert("Error", "Error registering employee");
        console.log("Error registering employee", error);
        console.log("Sending employee data:", employeeData);
        setIsSubmitting(false);
      }
    }
  };

  // Define form fields as an array of objects
  const formFields = [
    { key: "company", label: "Company:", component: <CompaniesDropdown placeholder={"Select Company"} value={companyID} setValue={setCompanyID} /> },
    { key: "department", label: "Department:", component: <DepartmentsDropdown placeholder={"Select Department"} value={departmentID} setValue={setDepartmentID} /> },
    { key: "dateHired", label: "Date Hired:", component: <DatePickerComponent value={dateHired} onConfirm={(date) => setDateHired(date)} placeholder="Select Date"/> },
    { key: "firstName", label: "First Name:", component: <TextInput style={styles.input} placeholder="Enter your name" value={firstName} onChangeText={setFirstName} /> },
    { key: "lastName", label: "Last Name:", component: <TextInput style={styles.input} placeholder="Enter your last name" value={lastName} onChangeText={setLastName} /> },
    { key: "email", label: "Email Address:", component: <TextInput style={styles.input} placeholder="Enter your email address" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} /> },
    { key: "phoneNo", label: "Contact Number:", component: <TextInput style={styles.input} placeholder="Enter your contact number" keyboardType="number-pad" value={phoneNo} onChangeText={setPhoneNo} /> },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
    {/* Fixed Header */}
    <View style={styles.header}>
      <Pressable style={styles.signInButton} onPress={() => navigation.navigate("SignIn")}>
        <Text style={styles.headerText}>Sign In</Text>
      </Pressable>
      <Text style={styles.headerText}>Employee Registration</Text>
    </View>
  
    {/* Scrollable Content */}
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
          <Text style={styles.formText}>Employee Details</Text> // Only the "Employee Details" text remains in the header of the list
        }
        ListFooterComponent={
          <View style={styles.buttonContainer}>
            <Pressable style={styles.registerButton} onPress={handleRegisterEmployee}>
              <Text style={styles.registerButtonText}>Create Account</Text>
            </Pressable>
          </View>
        }
        nestedScrollEnabled={true}
        contentContainerStyle={{ paddingBottom: 20 }} // Enable nested scrolling
        showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
      />
    </KeyboardAvoidingView>
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
  signInButton: {
    position: "absolute",
    left: 15,
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
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    fontSize: 20
  },
  buttonContainer: {
    paddingHorizontal: 10,
    marginTop: 20,
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
    fontSize: 16,
  },
});