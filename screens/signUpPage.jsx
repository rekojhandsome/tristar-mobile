import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert, SafeAreaView, Pressable } from "react-native";
import axios from "axios";

import { CompaniesDropdown, DepartmentsDropdown } from "../components/Dropdown";


export default function SignUp({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [salary, setSalary] = useState("");
  const [companyID, setCompanyID] = useState(null); 
  const [departmentID, setDepartmentID] = useState(null); // State for department ID

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSaveEmployeeDetail = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    const employeeURL = "http://192.168.29.207:5269/api/Employee";
    const signinURL = "http://192.168.29.207:5269/api/SignIn/register";

    try {
      const employeeData = {
        firstName,
        lastName,
        phoneNo,
        salary,
        departmentID, // Include the selected department ID
      };

      const employeeResponse = await axios.post(employeeURL, employeeData);
      const employeeID = employeeResponse.data.employeeID;

      const signInData = {
        username,
        password,
        employeeID,
      };

      await axios.post(signinURL, signInData);

      Alert.alert("Success", "Account Created Successfully!", [
        {
          text: "Okay",
          onPress: () => {
            console.log("Account created Successfully!");
            navigation.navigate("SignIn");
          },
        },
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to create the account");
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.headerText}>Employee Register Form</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.formText}>Employee Details</Text>

        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Text style={styles.bodyText}>First Name:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.bodyText}>Last Name:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your last name"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Text style={styles.bodyText}>Contact Number:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your contact number"
              keyboardType="number-pad"
              value={phoneNo}
              onChangeText={setPhoneNo}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.bodyText}>Salary:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your salary"
              keyboardType="number-pad"
              value={salary}
              onChangeText={setSalary}
            />
          </View>
        </View>
      <View style={styles.dropdownContainer}>
        
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

        <Text style={styles.formText}>Employee Account Details</Text>

        <Text style={styles.bodyText}>Username:</Text>
        <TextInput
          style={styles.accountInput}
          placeholder="Enter your username"
          value={username}
          onChangeText={setUsername}
        />

        <Text style={styles.bodyText}>Password:</Text>
        <TextInput
          style={styles.accountInput}
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Text style={styles.bodyText}>Confirm Password:</Text>
        <TextInput
          style={styles.accountInput}
          placeholder="Confirm your password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <View style={styles.buttonContainer}>
          <Pressable style={styles.signInButton} onPress={handleSaveEmployeeDetail}>
            <Text style={styles.signInButtonText}>Create Account</Text>
          </Pressable>
        </View>
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
    paddingTop: 15,
    paddingLeft: 15,
  },
  formText: {
    fontSize: 20,
    marginBottom: 10,
  },
  bodyText: {
    fontSize: 16,
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
  dropdownContainer: {
    marginRight:10,
  },
  accountInput: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    marginRight: 10
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  signInButton: {
    backgroundColor: "#70907C",
    padding: 15,
    borderRadius: 5,
  },
  signInButtonText: {
    color: "white",
    fontSize: 16,
  },
});
