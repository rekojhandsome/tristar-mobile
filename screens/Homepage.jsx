import  React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Pressable  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import RequestLeavePage from "./RequestLeavePage";

export default function Homepage({navigation}){
return(
    <SafeAreaView>
        <View style={styles.header}>
            <Text style={styles.headerText}>Homepage</Text>
        </View>

<View style={styles.body}>
        <View style={styles.dashboard}>
            <Text style={styles.dashboardText}>Hello, Admin!</Text>
        </View>
</View>
        
    </SafeAreaView>
)
}

const styles = StyleSheet.create({
header:{
    backgroundColor: "#70907C",
    height:70,
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
},
headerText:{
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
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
    backgroundColor: '#E5E5E5',
    borderRadius: 20,
},
dashboardText:{
    fontSize: 30,
    fontWeight: '600',
    color: '#70907C',
    marginLeft: 20,
},

})