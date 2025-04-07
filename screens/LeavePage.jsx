import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Pressable, Alert } from "react-native";
import { useState } from "react";

import Ionicons from 'react-native-vector-icons/Ionicons';

import ViewModal from "../components/LeavePopUp";
import { Logout } from "../service/Authentication/AuthenticationService";

export default function LeavePage({navigation}){
    const [modalVisible, setModalVisible] = useState(false);

    const handleLogout = async () => {
       Alert.alert("Confirm", "Confirm Logout?",[
        {
           text: "No",
            style: "cancel" 
        },
        {
            text: "Yes",
            onPress: () => {
              // Wrap the async logic in a synchronous function
              (async () => {
                const result = await Logout();
                if (result?.success || result === undefined) { // Adjusted for Logout not returning success
                  console.log("Logged Out Successfully!");
                  navigation.navigate("SignIn"); // Navigate to SignIn page
                } else {
                  Alert.alert("Error", "Failed to log out. Please try again.");
                  console.log("Error Logging Out");
                }
              })();
            },
          },
       ])
    }
    return (
        <SafeAreaView>
            <View style={styles.header}>
                <Text style={styles.headerText}>Leave</Text>
                <Pressable style={styles.addButton}>
                    <Ionicons name="add-outline" size={35} color={'white'} onPress={() => navigation.navigate("RequestLeavePage")}/>
                </Pressable>
                <Pressable style={styles.logoutButton}onPress={handleLogout}>
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </Pressable>
            </View>
            <View style={styles.body}>
                <Text style={styles.bodyText}>Leave History</Text>
            </View>
            <View style={styles.bodyContainer}>
                <View style={styles.container}>
                    <View style={styles.containerText}>
                        <Text style={styles.leaveText}>Sick Leave</Text>
                        <Text style={styles.dateText}>11/12/23 - 13/12/23</Text>
                        <Text style={[styles.approveText, styles.pendingText]}>Pending</Text>
                        <Pressable style={styles.containerButton} onPress={() => setModalVisible(true)}>
                            <Text style={styles.containerButtonText}>View</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
            <View style={styles.bodyContainer}>
                <View style={styles.container}>
                    <View style={styles.containerText}>
                        <Text style={styles.leaveText}>Sick Leave</Text>
                        <Text style={styles.dateText}>11/12/23 - 13/12/23</Text>
                        <Text style={styles.approveText}>Approved</Text>
                        <Pressable style={styles.containerButton} onPress={() => setModalVisible(true)}>
                            <Text style={styles.containerButtonText}>View</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
            <View style={styles.bodyContainer}>
                <View style={styles.container}>
                    <View style={styles.containerText}>
                        <Text style={styles.leaveText}>Sick Leave</Text>
                        <Text style={styles.dateText}>11/12/23 - 13/12/23</Text>
                        <Text style={[styles.approveText, styles.rejectedText]}>Rejected</Text>
                        <Pressable style={styles.containerButton} onPress={() => setModalVisible(true)}>
                            <Text style={styles.containerButtonText}>View</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
            <View style={styles.bodyContainer}>
                <View style={styles.container}>
                    <View style={styles.containerText}>
                        <Text style={styles.leaveText}>Sick Leave</Text>
                        <Text style={styles.dateText}>11/12/23 - 13/12/23</Text>
                        <Text style={styles.approveText}>Approved</Text>
                        <Pressable style={styles.containerButton} onPress={() => setModalVisible(true)}>
                            <Text style={styles.containerButtonText}>View</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
            <View style={styles.bodyContainer}>
                <View style={styles.container}>
                    <View style={styles.containerText}>
                        <Text style={styles.leaveText}>Sick Leave</Text>
                        <Text style={styles.dateText}>11/12/23 - 13/12/23</Text>
                        <Text style={styles.approveText}>Approved</Text>
                        <Pressable style={styles.containerButton} onPress={() => setModalVisible(true)}>
                            <Text style={styles.containerButtonText}>View</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
            <View style={styles.bodyContainer}>
                <View style={styles.container}>
                    <View style={styles.containerText}>
                        <Text style={styles.leaveText}>Sick Leave</Text>
                        <Text style={styles.dateText}>11/12/23 - 13/12/23</Text>
                        <Text style={[styles.approveText, styles.rejectedText]}>Rejected</Text>
                        <Pressable style={styles.containerButton} onPress={() => setModalVisible(true)}>
                            <Text style={styles.containerButtonText}>View</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
            
            {/* Modal */}
            <ViewModal visible={modalVisible} onClose={() => setModalVisible(false)} />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    header:{
        height: 71,
        width: '100%',
        backgroundColor: "#70907C",
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText:{
        fontSize: 20,
        fontWeight: '600',
        color: 'white'
    },
    addButton:{
        position: 'absolute',
        right:30,
        top:20
    },
    logoutButton:{
        position: 'absolute',
        left: 15
    },
    logoutButtonText:{
        color: 'white',
        fontSize: 20,
        fontWeight: '600'
    },

    body:{
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    bodyText:{
        fontSize: 25,
        fontWeight: '700'
    },
    bodyContainer:{
        width: '100%',
        paddingHorizontal: 10,
    },
    container:{
        width: 390,
        height: 80,
        borderWidth: 0.1,
        backgroundColor: 'white',
        borderRadius: 5,
        marginBottom: 10
    },
    containerText:{
        paddingLeft: 10,
        paddingTop: 5,
    },
    leaveText:{
        fontSize: 20,
        color: "rgba(0, 0, 0, 0.5)",
        fontWeight: '600'
    },
    dateText:{
        paddingTop: 5,
        fontSize: 20
    },
    approveText:{
        paddingTop: 5,
        fontSize: 20,
        color: '#2CAD71',
        fontWeight: '700'
    },
    pendingText:{
        color: '#ED8E2F',
    },
    rejectedText:{
        color: '#F85557'
    },
    containerButton:{
    width: 85,
    height: 30,
    backgroundColor: '#2CAD71',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 15,
    top: 25
    },
    containerButtonText:{
        color: 'white'
    }

})