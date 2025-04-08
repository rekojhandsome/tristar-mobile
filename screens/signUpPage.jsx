import {View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, Pressable} from 'react-native';
import { Alert } from "react-native";
import { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

//URL ENDPOINTS
import { API_BASE_URL, Register, API_BASE_URL1 } from "../service/Authentication/AuthenticationService";

export default function SignUp({navigation}){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [employeeID, setEmployeeID] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);


  // Validate Password
 
  
  // Register Employee Account
    const handleRegister = async () => {

      if (isSubmitting) return; // Prevent multiple submissions
      setIsSubmitting(true);

      if(password !== confirmPassword) {
          Alert.alert("Password Mismatch", "Please make sure both password fields match.");
          setIsSubmitting(false);
          return;
        }

        try {
          const request = await Register(username, password, employeeID);
      
          // Handle success for both 200 and 201 status codes
          if (request.status === 200 || request.status === 201) {
            Alert.alert("Success", "Registered Successfully!", [
              {
                text: "Okay",
                onPress: () => navigation.navigate("SignIn"),
              },
            ]);
            console.log("Account registered successfully!", request.status);
          } else if (request.status === 409) {
            console.log("409 Conflict Error:", request); 
            if (request.code === "EXISTING_USERNAME") {
              Alert.alert("Error", "Username already exists.", request.message);
            } else {
              Alert.alert("Error", "Failed to register account. Please try again.", request.message);
              console.log("Error:", request.message);
            }
          } else {
            Alert.alert("Error", "Failed to register account. Please try again.");
            console.log(request.status);
          }
        } catch (error) {
          console.error("Error submitting leave request:", error);
        } finally {
          setIsSubmitting(false);
        }
      };

 return (
       <SafeAreaView style={styles.background}>
         <View style={styles.background} >
             <Image style={styles.image} source={require("../assets/images/tristar-logo.png")} />
             <Text style={styles.title}>E-Leave App</Text>
           <View style={styles.formContainer}>
             <Text style={styles.formTitle}>Create Account</Text>
             <TextInput
               style={styles.input}
               placeholder="Username"
               placeholderTextColor="#fff"
               autoCapitalize="none"
               value={username}
               onChangeText={setUsername}
             />
             <TextInput
               style={styles.input}
               placeholder="Password"
               placeholderTextColor="#fff"
               secureTextEntry
               value={password}
               onChangeText={setPassword}
             />
             <TextInput
               style={styles.input}
               placeholder="Confirm Password"
               placeholderTextColor="#fff"
               secureTextEntry
               value={confirmPassword}
               onChangeText={setConfirmPassword}
             />
             {/* Sign Up button */}
             <Pressable style={styles.signUpButton} onPress={handleRegister}>
               <Text style={styles.signUpButtonText}>Sign Up</Text>
             </Pressable>
           </View>
       </View>
       </SafeAreaView>
     );
   }
   
const styles = StyleSheet.create({
  background: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  },
  image: {
  marginTop: 80,
  height: 120,
  width: 230,
  },
  title: {
  marginBottom: 20,
  fontSize: 35,
  textAlign: "center",
  fontWeight: "800",
  color: '#70907C'
  },
  formContainer: {
    alignItems: 'center',
    height:290,
    width: 282,
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 20,
  },
  formTitle:{
    fontSize: 30,
    color: '#91CB89',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10
  },
  input: {
    width: 242,
    height: 48,
    backgroundColor: "#70907C",
    borderRadius: 10,
    paddingHorizontal: 10,
    color: "white",
    marginBottom: 5,
    fontSize: 15,
    fontWeight: 'bold'
  },
  signUpButton: {
    backgroundColor: "#3FD68F",
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: "center",
    width: 242,
    height: 45,
    marginTop:10
  },
  signUpButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  signInText: {
    color: "black",
    textAlign: "center",
    paddingTop: 15
  },
  signInLink:{
    color: "#3FD68F", 
    fontWeight: "500"
  }
   });
   