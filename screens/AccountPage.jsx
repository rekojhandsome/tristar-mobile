import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Alert, SafeAreaView, Pressable,FlatList, KeyboardAvoidingView, Platform } from "react-native";
import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";

// Components
import { StaticDropdown } from "../components/Dropdown";
import { DatePickerComponent } from "../components/DatePicker";

//API Service
import { GetEmployeeLeaveCredits, GetEmployeeProfile, GetLeaveCredits, PatchEmployeeDetails } from "../service/Employee/EmployeeService";

// Static data
import { civilStatusData, genderData, suffixData } from "../Data/StaticDropdownData";
import { Logout } from "../service/Authentication/AuthenticationService";


export default function AccountPage({ navigation }) {
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
  const [departmentName, setDepartmentName] = useState(null);
  const [companyName, setCompanyName] = useState(null);
  const [positionName, setPositionName] = useState(null);

  //Leave Credits
  const [vacationLeaveCredits, setVacationLeaveCredits] = useState(0);
  const [sickLeaveCredits, setSickLeaveCredits] = useState(0);

  useEffect(() => {
  const loadEmployeeProfile = async () => {
    try {
      const employeeData = await GetEmployeeProfile();

      setBirthDate(employeeData.birthDate ? new Date(employeeData.birthDate) : null);
      setFirstName(employeeData.firstName);
      setMiddleName(employeeData.middleName);
      setLastName(employeeData.lastName);
      setSuffix(employeeData.suffix);
      setDateHired(employeeData.dateHired ? new Date(employeeData.dateHired) : null);
      setGender(employeeData.gender);
      setCivilStatus(employeeData.civilStatus);
      setContactNo(employeeData.contactNo);
      setEmail(employeeData.email);
      setDepartmentName(employeeData.departmentName);
      setCompanyName(employeeData.companyName);
      setPositionName(employeeData.positionName);
    }
    catch (error) {
      console.error("Error loading employee profile:", error);
      Alert.alert("Error", "Failed to load employee data. Please try again.");
    }
  }
  loadEmployeeProfile();
  }, []);

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

const handleLogout = async () => {
  Alert.alert("Logout", "Confirm logout?",[
    {
      text: 'Cancel',
      style: 'cancel',
    },
    {
      text: 'Logout',
      onPress: async () => {
        try {
          await Logout();
          Alert.alert("Logout", "Logged out successfully.");
          navigation.navigate("SignIn");
        }
        catch (error) {
          Alert.alert("Error", "Failed to logout. Please try again.");
        }
      }
    }
  ])
}
 
  const formFields = [
    {
      key: "vacationLeaveCredits",
      label: "Vacation Leave Credits",
      component: (
        <TextInput
          style={styles.input} // Dynamic background color
          editable={false}
          value={vacationLeaveCredits}
        />
      ),
    },
    {
      key: "sickLeaveCredits",
      label: "Sick Leave Credits",
      component: (
        <TextInput
          style={styles.input} // Dynamic background color
          editable={false}
          value={sickLeaveCredits}
        />
      ),
    },
    {
      key: "companyName",
      label: "Company Name:",
      component: (
        <TextInput
          style={styles.input}
          editable={false}
          value={companyName}
          onChangeText={setCompanyName}
        />
      )
    },
    {
      key: "departmentName",
      label: "Department Name:",
      component: (
        <TextInput
          style={styles.input}
          editable={false}
          value={departmentName}
          onChangeText={setDepartmentName}
        />
      ),
    },
    {
      key: "positionName",
      label: "Position Name:",
      component: (
        <TextInput
          style={styles.input}
          editable={false}
          value={positionName}
          onChangeText={setPositionName}
        />
      ),
    },
    {
      key: "dateHired",
      label: "Date Hired:",
      component: (
        <DatePickerComponent
          editable={false}
          value={dateHired}
          onConfirm={(date) => setDateHired(date)}
        />
      ),
    },
    {
      key: "birthDate",
      label: "Birth Date:",
      component: (
        <DatePickerComponent
          editable={false}
          value={birthDate}
          onConfirm={(date) => setBirthDate(date)}
        />
      ),
    },
    {
      key: "firstName",
      label: "First Name",
      component: (
        <TextInput
          style={styles.input} // Dynamic background color
          editable={false}
          value={firstName}
          onChangeText={setFirstName}
        />
      ),
    },
    {
      key: "middleName",
      label: "Middle Name",
      component: (
        <TextInput
          style={styles.input}
          editable={false}
          value={middleName}
          onChangeText={setMiddleName}
        />
      ),
    },
    {
      key: "lastName",
      label: "Last Name",
      component: (
        <TextInput
          style={styles.input} // Dynamic background color
          editable={false}
          value={lastName}
          onChangeText={setLastName}
        />
      ),
    },
    {
      key: "suffix",
      label: "Suffix:",
      component: (
        <StaticDropdown
          editable={false}
          data={suffixData} // Static data for suffixes
          value={suffix}
          setValue={setSuffix}
          placeholder="Select Suffix"
        />
      ),
    },
    {
      key: "gender",
      label: "Gender:",
      component: (
        <StaticDropdown
          editable={false}
          data={genderData} // Static data for gender
          value={gender}
          setValue={setGender}
          placeholder="Select Gender"
        />
      ),
    },
    {
      key: "civilStatus",
      label: "Civil Status:",
      component: (
        <StaticDropdown
          editable={false}
          data={civilStatusData} // Static data for civil status
          value={civilStatus}
          setValue={setCivilStatus}
          placeholder="Select Civil Status"
        />
      ),
    },
    {
      key: "contactNo",
      label: "Contact Number:",
      component: (
        <TextInput
          style={styles.input}
          editable={false}
          keyboardType="number-pad"
          value={contactNo}
          onChangeText={setContactNo}
        />
      ),
    },
    {
      key: "email",
      label: "Email Address:",
      component: (
        <TextInput
          style={styles.input}
          editable={false}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      ),
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Employee Details</Text>
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
                ListFooterComponent={
                  <View style={styles.buttonContainer}>
                    <Pressable style={styles.logoutButton} onPress={handleLogout}>
                      <Text style={styles.logoutButtonText}>Logout</Text>
                    </Pressable>
                  </View> 
                }
                nestedScrollEnabled={true}
                contentContainerStyle={{ paddingBottom: 10 }} // Enable nested scrolling
                showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
              />
            </KeyboardAvoidingView>
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
    fontSize: 20,
    
  },
  buttonContainer: {
    paddingHorizontal: 10,
  },
  
  logoutButton:{
    width: '100%',
    backgroundColor: "#FF6347",
    padding: 15,
    borderRadius: 5,
    marginTop: 5,
  },
  logoutButtonText: {
    textAlign: 'center',
    color: "white",
    fontSize: 16,
  },
  
  
});
