import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert, SafeAreaView, Pressable, FlatList, KeyboardAvoidingView, Platform } from "react-native";
import axios from "axios";

// Components
import { CompaniesDropdown, DepartmentsDropdown, PositionsDropdown, StaticDropdown } from "../../components/Dropdown";
import { DatePickerComponent } from "../../components/DatePicker";


//API SERVICE
import { RegisterEmployee } from "../../service/Employee/EmployeeService";
import { civilStatusData, genderData, suffixData } from "../../Data/StaticDropdownData";


export default function EmployeeRegister({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [suffix, setSuffix] = useState("");
  const [birthDate, setBirthDate] = useState(null);
  const [gender, setGender] = useState(null);
  const [civilStatus, setCivilStatus] = useState(null);
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [dateHired, setDateHired] = useState(null);
  const [companyID, setCompanyID] = useState(null);
  const [departmentID, setDepartmentID] = useState(null);
  const [positionID, setPositionID] = useState(null);
  


  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegisterEmployee = async () => {

    if (isSubmitting) return;
    setIsSubmitting(true);

     const employeeData ={
        firstName,
        middleName,
        lastName,
        suffix,
        birthDate,
        gender,
        civilStatus,
        contactNo,
        email,
        departmentID,
        dateHired,
        positionID,
        companyID
      }
    try{
      const result = await RegisterEmployee(employeeData);

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
        console.log("Employee registered successfuly!", result);
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
        Alert.alert("Error", "Error registering employee");
        console.log("Error registering employee", error);
        setIsSubmitting(false);
      }
    }
  };

  // Define form fields as an array of objects
  const formFields = [
    { key: "company", label: "Company:", component: <CompaniesDropdown placeholder={"Select Company"} value={companyID} setValue={setCompanyID} /> },
    { key: "department", label: "Department:", component: <DepartmentsDropdown placeholder={"Select Department"} value={departmentID} setValue={setDepartmentID} /> },
    { key: "position", label: "Position:", component: <PositionsDropdown placeholder={"Select Position"} value={positionID} setValue={setPositionID} /> },
    { key: "dateHired", label: "Date Hired:", component: <DatePickerComponent value={dateHired} onConfirm={(date) => setDateHired(date)} placeholder="Select Date"/> },
    { key: "firstName", label: "First Name:", component: <TextInput style={styles.input} placeholder="Enter your name" value={firstName} onChangeText={setFirstName}/> },
    { key: "middleName", label: "Middle Name:", component: <TextInput style={styles.input} placeholder="Enter your middle name" value={middleName} onChangeText={setMiddleName}/>},
    { key: "lastName", label: "Last Name:", component: <TextInput style={styles.input} placeholder="Enter your last name" value={lastName} onChangeText={setLastName} /> },
    { key: "suffix", label: "Suffix:", component: <StaticDropdown  data={suffixData} placeholder={"Select suffix"} value={suffix} setValue={setSuffix} /> },
    { key: "birthDate", label: "Birth Date:", component: <DatePickerComponent value={birthDate} onConfirm={(date) => setBirthDate(date)} placeholder="Select Date"/>},
    { key: "gender", label: "Gender:", component: <StaticDropdown data={genderData} placeholder={"Select Gender"} value={gender} setValue={setGender} /> },
    { key: "civilStatus", label: "Civil Status:", component: <StaticDropdown  data={civilStatusData} placeholder={"Select your status"} value={civilStatus} setValue={setCivilStatus} /> },
    { key: "contactNo", label: "Contact Number:", component: <TextInput style={styles.input} placeholder="Enter your contact number" keyboardType="number-pad" value={contactNo} onChangeText={setContactNo}/> },
    { key: "email", label: "Email Address:", component: <TextInput style={styles.input} placeholder="Enter your email address" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail}/> },
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
        ListFooterComponent={
          <View style={styles.buttonContainer}>
            <Pressable style={styles.registerButton} onPress={handleRegisterEmployee}>
              <Text style={styles.registerButtonText}>Register</Text>
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
    fontSize: 16,
  },
});