import { useState,  } from 'react';
import  React from "react";
import { View, Text, StyleSheet, TextInput, Pressable, SafeAreaView, Modal  } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ConfirmLeaveModal from '../components/ConfirmLeavePopup';

export default function RequestLeavePage({navigation}){

    const [modalVisible, setModalVisible] = useState(false);

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
                    <TextInput style= {styles.input} placeholder="Select leave Type" keyboardType="default"
                    autoCapitalize="none">
                    </TextInput>

                    {/*Date */}
                    <Text style={styles.leaveType}>Select Date:</Text>
                    <View style={styles.date}>
                        <View style={styles.leaveDate}>
                            <TextInput placeholder="DD/MM/YYYY" autoCapitalize="none" />
                            <Ionicons name="calendar-outline" size={25} color="black" style={styles.calendarIcon} />
                        </View>
                        <View style={styles.leaveDate}>
                            <TextInput placeholder="DD/MM/YYYY" autoCapitalize="none" />
                            <Ionicons name="calendar-outline" size={25} color="black" style={styles.calendarIcon} />
                        </View>
                    </View>
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

                    {/*File Attachment */}
                    <Text style={styles.leaveType}>File Attachment:</Text>
                    <TextInput style= {styles.input} placeholder="Upload Files" keyboardType="default"
                    autoCapitalize="none">
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
        justifyContent: 'space-between',
       
    },
    leaveButton:{
        position: 'absolute',
        left: 15,
    },
    titleContainer:{
        flex: 1,
        alignItems: 'center',
        
    },
    headerText:{
        fontSize: 20,
        color: 'white',
        marginTop: 20
    },
    
    form:{
        paddingTop: 15,
        paddingLeft: 15,
    },
    formText:{
        fontSize: 30,
        fontStyle: 'bold',
        marginBottom: 20,
    },
    leaveType:{
        fontSize: 20,
        Color: 'black'
    },
    input:{
        width: 380,
        height: 60,
        borderWidth: 1,
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
    date:{
        flexDirection: 'row',
        gap: 40
    },
   
    calendarIcon:{
        right: 10,
        position: 'absolute'
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