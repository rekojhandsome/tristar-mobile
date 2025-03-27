import { SafeAreaView, View, Text, StyleSheet, Pressable } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
export default function NotificationPage(){
    return(
        <SafeAreaView>
            <View style={styles.header}>
                <Text style={styles.headerText}>Notifications</Text>
            </View>
                <View style={styles.body}>
                    <Text style={styles.bodyText}>Recent</Text>
                </View>
                <View style={styles.bodyContainer}>
                    <View style={styles.container}>
                        <Ionicons name="checkmark-circle-outline" size={40} color={'green'} style={styles.containerIcon}/>
                        <Text style={styles.containerText}>Your leave application has been approved!</Text>
                        <Ionicons name="ellipsis-vertical-outline" size={30} color={'grey'} style={styles.containerIcon1}/>

                    </View>
                </View>
                <View style={styles.body}>
                    <Text style={styles.bodyText}>Previous</Text>
                </View>
                <View style={styles.bodyContainer}>
                    <View style={styles.container}>
                        <Ionicons name="close-circle-outline" size={40} color={'red'} style={styles.containerIcon}/>
                        <Text style={styles.containerText}>Your leave application has been approved!</Text>
                        <Ionicons name="ellipsis-vertical-outline" size={30} color={'grey'} style={styles.containerIcon1}/>
                    </View>
                </View>
                <View style={styles.bodyContainer}>
                    <View style={styles.container}>
                        <Ionicons name="checkmark-circle-outline" size={40} color={'green'} style={styles.containerIcon}/>
                        <Text style={styles.containerText}>Your leave application has been approved!</Text>
                        <Ionicons name="ellipsis-vertical-outline" size={30} color={'grey'} style={styles.containerIcon1}/>
                    </View>
                </View>
                <View style={styles.bodyContainer}>
                    <View style={styles.container}>
                        <Ionicons name="checkmark-circle-outline" size={40} color={'green'} style={styles.containerIcon}/>
                        <Text style={styles.containerText}>Your leave application has been approved!</Text>
                        <Ionicons name="ellipsis-vertical-outline" size={30} color={'grey'} style={styles.containerIcon1}/>
                    </View>
                </View>
                <View style={styles.bodyContainer}>
                    <View style={styles.container}>
                        <Ionicons name="close-circle-outline" size={40} color={'red'} style={styles.containerIcon}/>
                        <Text style={styles.containerText}>Your leave application has been rejected!</Text>
                        <Ionicons name="ellipsis-vertical-outline" size={30} color={'grey'} style={styles.containerIcon1}/>
                    </View>
                </View>
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
body:{
    paddingHorizontal: 10,
    paddingVertical: 10
},
bodyText:{
    fontSize:20,
    fontWeight: '500'
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
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 10
},
containerIcon:{
    position: 'absolute',
    paddingHorizontal: 15
},
containerIcon1:{
    right: 5
},
containerText:{
    fontSize: 18,
    left: 60
}
});