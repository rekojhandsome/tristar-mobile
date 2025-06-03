import { View, Text, StyleSheet, TouchableOpacity, Pressable, Image  } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';


import { GetEmployeeProfile } from '../../service/Employee/EmployeeService';

export default function Homepage({navigation}){

    const [employeeName, setEmployeeName] = useState("");

     useEffect(() => {
    const loadEmployeeProfile = async () => {
      try {
        const employeeData = await GetEmployeeProfile();
        setEmployeeName(employeeData.firstName);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };
    loadEmployeeProfile(); 
  }, []); 
    

return(
    <SafeAreaView>
        <View style={styles.header}>
            <Image style={styles.image} source={require("../../assets/images/tristar_logo.png")} />
            <Text style={styles.headerText}>Homepage</Text>
        </View>

        <View style={styles.body}>
                <View style={styles.dashboard}>
                    <Text style={styles.dashboardText}>Hello, {employeeName}!</Text>
                </View>
                <View style={styles.applicationContainer}>
                    <View style={styles.application}>
                        <Pressable onPress={() => navigation.navigate("LeavePage")}>
                        <Ionicons name="calendar-number-outline" size={60} color="#70907C" />
                        <Text style={styles.applicationText}>Leave</Text>
                        </Pressable>
                    </View>
                    <View style={styles.application}>
                        <Pressable onPress={() => navigation.navigate("ApprovalPage")}>
                        <Ionicons name="document-attach-outline" size={60} color="#70907C" />
                        <Text style={styles.applicationText}>Approval</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
    </SafeAreaView>
)
}

const styles = StyleSheet.create({
header:{
    height:70,
    width:'100%',
    justifyContent: 'center',
},
headerText:{
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '700',
    color: '#70907C',
},
    image:{
    position: 'absolute',
    height: 50,
    width: 100,
    left: 10
},
body:{
    paddingHorizontal: 10  
},
dashboard:{
    marginTop: 20,
    height: 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'baseline',
    backgroundColor: '#70907C',
    borderRadius: 10,
},
dashboardText:{
    fontSize: 30,
    fontWeight: '600',
    color: 'white',
    marginLeft: 20,
},

applicationContainer:{
    width: '100%',
    paddingVertical: 20,
    flexDirection: 'row',
},
application:{
    alignItems: 'center',
    paddingInlineEnd: 50,
},
applicationText:{
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    color: '#70907C',
    marginTop: 5,
    marginBottom: 10,
}



})