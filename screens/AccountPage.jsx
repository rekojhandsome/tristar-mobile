import React from "react";
import { View, Text, SafeAreaView, StyleSheet, Pressable } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function AccountPage(){
    return (
        <SafeAreaView>
            <View style={styles.header}>
                <Text style={styles.headerText}>Account</Text>
                    <Pressable style={styles.settingsIcon} onPress={() => console.log('Settings Pressed')}>
                        <Ionicons name="settings-outline" size={25} color="white" />
                    </Pressable>
                <Ionicons name="person-circle-outline" size={105} color="white" />
                    <View style={styles.accountInfo}>
                        <Text style={styles.adminName}>John Paul Pendo</Text>
                        <Text style={styles.adminJob}>Programmer</Text>
                        <Text style={styles.leaveInfo}>Leave Credits:</Text>
                        <Text style={styles.leaveInfo}>100</Text>
                    </View>
                <Pressable>
                    <Text>Request Leave</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
header:{
    width:415,
    height:300,
    borderBottomRightRadius:50,
    borderBottomLeftRadius: 50,
    backgroundColor:'#70907C',
    alignItems: 'center',
    padding: 30,
    
},
headerText:{
    color: 'white',
    fontSize: 24,
    fontWeight: '500'
},
settingsIcon: {
    position: 'absolute',
    height: 24,
    width: 24,
    top: 30,
    right: 30
},
accountInfo:{
    alignItems: 'center',
},
adminName:{
    fontSize: 32,
    color: 'white',
},
adminJob:{
    fontSize: 20,
    color: "rgba(255, 255, 255, 0.7)",
},
leaveInfo:{
    color: 'white',
    fontSize: 28
}
});