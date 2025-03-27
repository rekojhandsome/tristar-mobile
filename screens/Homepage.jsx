import  React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Pressable  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import RequestLeavePage from "./RequestLeavePage";

export default function Homepage({navigation}){
return(
    <SafeAreaView>
        <View style={styles.header}>
            <Pressable style={styles.settingsIcon} onPress={() => console.log('Settings Pressed')}>
                <Ionicons name="settings-outline" size={25} color="white" />
            </Pressable>
            <Text style={styles.homeText}>Home</Text>
            <Text style={styles.welcomeText}>Welcome back!</Text>
        </View>

        <View style={styles.body} >
           <Text style={styles.bodyText}>You are not currently on leave.</Text>
           <Text style={styles.bodyText}>Click the Plus button to apply for leave.</Text>
                <Pressable style = {styles.circle} onPress={() => navigation.navigate("RequestLeavePage")}>
                    <Ionicons name="add-outline" size={40}  color="white" style={styles.addButton} />
                </Pressable>
        </View>
    </SafeAreaView>
)
}

const styles = StyleSheet.create({
header:{
    backgroundColor: "#70907C",
    height:313,
    width:415,
    borderBottomEndRadius: 30,
    borderBottomLeftRadius: 30,
    alignItems: 'center',
    padding: 30,
},
homeText:{
    color: 'white',
    fontSize: 24,
}, 
settingsIcon: {
    position: 'absolute',
    height: 24,
    width: 24,
    top: 30,
    right: 30
},
welcomeText:{
    color: 'white',
    fontSize:30,
    fontWeight: 'bold',
    paddingTop: 90
},
body:{
alignItems: 'center',
},
bodyText:{
    fontSize: 20,
    fontWeight: '500',
    marginTop: 20,
    paddingTop: 50,
    textAlign: 'center'
},

circle:{
 width:74,
 height:70,
 borderRadius: 100/2,
 backgroundColor: '#3FD68F',
 justifyContent: 'center',
 alignItems: 'center',
 left: 130,
 top: 30
},

})