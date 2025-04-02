import { useState, React, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, SafeAreaView, Modal, Button  } from 'react-native';


import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

//API ENDPOINTS
import { API_BASE_URL } from "../service/AuthService";
import { API_BASE_URL1 } from "../service/AuthService";

//Components
import ConfirmLeaveModal from '../components/ConfirmLeavePopup';
import { DatePickerComponent } from '../components/DatePicker'; 
import { LeaveTypeDropdown } from '../components/Dropdown';


export default function RequestLeavePage({navigation}){

    const [modalVisible, setModalVisible] = useState(false);

    const [selectedDate, setSelectedDate] = useState(new Date()); // State for the selected date
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false); // State to control the modal

    const [vacationLeave, setVacationLeave] = useState("");
    const [sickLeave, setSickLeave] = useState("");

    const [leaveTypeID, setLeaveTypeID] = useState(null); // State for LeaveType ID

    const handleConfirm = (date) => {
        setSelectedDate(date); // Update the selected date
        setIsDatePickerOpen(false); // Close the date picker
      };
    
      // Fetch employee profile
  useEffect(() => {
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
        const vacationLeaveCredits = employee.leaveCredits.find((leave) => leave.leaveTypeID ===1)?.remainingCredits || "0";
        const sickLeaveCredits = employee.leaveCredits.find((leave)=> leave.leaveTypeID === 2)?.remainingCredits || "0";

        setVacationLeave(vacationLeaveCredits.toString());
        setSickLeave(sickLeaveCredits.toString());
        

    console.log(employee);
          } catch (error) {
            console.error("Error fetching employee profile:", error);
            Alert.alert("Error", "Failed to load employee data. Please try again.");
          }
        }; fetchEmployeeProfile();
    }, []);
    return(
        <SafeAreaView>
            <View style ={styles.header}>
                 <Pressable style={styles.leaveButton} onPress={() => navigation.navigate("LeavePage")}>
                    <Text style={styles.headerText }>Leave</Text>
                </Pressable>
                <View styles={styles.titleContainer}>
                    <Text style={styles.headerText}>Request leave</Text>
                </View>
            </View>
                <View style= {styles.form}>
                   <Text style= {styles.formText}>Leave Application Form</Text>
                    {/*Leave type */}

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


                    <Text style={styles.bodyText}>Leave Type:</Text>
                     <LeaveTypeDropdown 
                              placeholder={"Select Leave Type"}
                              value={leaveTypeID} 
                              setValue={setLeaveTypeID}
                              />
        
                    {/*Date */}
                    <Text style={styles.bodyText}>Start of Leave:</Text>
                    {/* DatePicker Modal */}
                    <DatePickerComponent
                        show={true}
                        date={selectedDate}
                        onChange={() => {}}
                        onConfirm={(date) => setSelectedDate(date)}
                        placeholder="Select Leave Date"
                    />

                    <Text style={styles.bodyText}>End of Leave:</Text>
                    {/* DatePicker Modal */}
                    <DatePickerComponent
                        show={true}
                        date={selectedDate}
                        onChange={() => {}}
                        onConfirm={(date) => setSelectedDate(date)}
                        placeholder="Select Leave Date"
                    />
                    {/*Reason*/}
                    <Text style={styles.bodyText}>Reason:</Text>
                    <TextInput 
                    style= {styles.input} 
                    placeholder="Enter Reason" 
                    keyboardType="default"
                    autoCapitalize="none" >
                    </TextInput>
                </View>
                    <View style= {styles.button}>
                        <Pressable style={styles.requestButton}>
                            <Text style={styles.requestButtonText} onPress={() => setModalVisible(true)}>Request Leave</Text>
                        </Pressable>
                    </View>
            <ConfirmLeaveModal visible={modalVisible} onClose={() => setModalVisible(false)}/>
        </SafeAreaView>
    )
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
    button:{
        paddingHorizontal: 10,
        marginTop: 30,
    },
    requestButton:{
        height: 50,
        width: '100%',
        backgroundColor: '#3FD68F',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    requestButtonText:{
        fontSize: 20,
        color: 'white',
    }, 
    
})