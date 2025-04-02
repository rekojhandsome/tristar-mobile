import { useState, React } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, SafeAreaView, Modal, Button  } from 'react-native';

//Components
import ConfirmLeaveModal from '../components/ConfirmLeavePopup';
import DatePickerComponent from '../components/DatePicker'; 
import { LeaveTypeDropdown } from '../components/Dropdown';


export default function RequestLeavePage({navigation}){

    const [modalVisible, setModalVisible] = useState(false);

    const [selectedDate, setSelectedDate] = useState(new Date()); // State for the selected date
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false); // State to control the modal

    const [leaveTypeID, setLeaveTypeID] = useState(null); // State for department ID

    const handleConfirm = (date) => {
        setSelectedDate(date); // Update the selected date
        setIsDatePickerOpen(false); // Close the date picker
      };
    
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
                   <Text style= {styles.formText}>Leave Application form</Text>
                    {/*Leave type */}
                    <Text style={styles.leaveType}>Leave Type:</Text>
                     <LeaveTypeDropdown 
                              placeholder={"Select Leave Type"}
                              value={leaveTypeID} 
                              setValue={setLeaveTypeID}
                              />
        
                    {/*Date */}
                    <Text style={styles.leaveType}>Start of Leave:</Text>
                    {/* DatePicker Modal */}
                    <DatePickerComponent
                        show={true}
                        date={selectedDate}
                        onChange={() => {}}
                        onConfirm={(date) => setSelectedDate(date)}
                        placeholder="Select Leave Date"
                    />

                    <Text style={styles.leaveType}>End of Leave:</Text>
                    {/* DatePicker Modal */}
                    <DatePickerComponent
                        show={true}
                        date={selectedDate}
                        onChange={() => {}}
                        onConfirm={(date) => setSelectedDate(date)}
                        placeholder="Select Leave Date"
                    />

                    {/*Supervisor*/}

                    <Text style={styles.leaveType}>Supervisor:</Text>
                    <TextInput style= {styles.input} placeholder="Select Supervisor" keyboardType="email-address"
                    autoCapitalize="none">
                    </TextInput>

                    {/*Reason*/}
                    <Text style={styles.leaveType}>Reason:</Text>
                    <TextInput style= {styles.input} placeholder="Enter Reason" keyboardType="default"
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
        paddingHorizontal: 10
    },
    formText:{
        fontSize: 30,
        marginBottom: 10,
        marginTop: 10,
    },
    leaveType:{
        fontSize: 20,
        Color: 'black'
    },
    input:{
        width: "100%",
        height: 50,
        borderWidth: 1,
        backgroundColor: "#fff",
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        fontSize:20,
    },
    leaveDate: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        width: 170,
        height: 50,
        marginBottom: 10,
      },
    
    button:{
        alignItems: 'center',
        paddingTop: 40
    },
    requestButton:{
        height: 50,
        width: 200,
        backgroundColor: '#3FD68F',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    requestButtonText:{
        fontSize: 20,
        color: 'white',
        fontWeight: 'semi-bold'
    }, 
    
})