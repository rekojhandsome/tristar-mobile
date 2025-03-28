import React from "react";
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Pressable, SafeAreaView } from "react-native";
import { Alert } from "react-native";
import { useState } from "react";
import axios from "axios";
import { Login } from "../service/AuthService";


export default function SignIn({ navigation }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin= async () => {
      const result = await Login(username,password)
    

        if (result.success) {
          Alert.alert("Success", "Login successful!", [
            {
              text: "OK",
              onPress: () => navigation.navigate("LeavePage") // Navigate only after pressing OK
            }
          ]);
          console.log("Signed In!");
        }
        else{
          Alert.alert("Error", "Username or Password is incorrect!");
          console.log("Error Signing In");
        }
    };
    return (
      <SafeAreaView style={styles.background}>
        <View style={styles.background} >
          <Text style={styles.title}>Banana Highland Corp. E-Leave App</Text>
            <Image style={styles.image} source={require("../assets/images/banana.png")} />
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Sign In</Text>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#fff"
              keyboardType="email-address"
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
            {/* Sign-In Button */}
            <Pressable style={styles.signInButton} onPress={handleLogin}>
              <Text style={styles.signInButtonText}>Sign In</Text>
            </Pressable>
    
            {/* Navigation to Sign Up */}
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.signUpText}> Don't have an account? <Text style={styles.signUpLink}>Register here</Text>
            </Text>
            </TouchableOpacity>
          </View>
      </View>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: "#70907C",
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontSize: 30,
      textAlign: "center",
      color: "white",
      fontWeight: "bold",
      marginHorizontal: 40
    },
    image: {
      height: 120,
      width: 120,
      marginBottom: 20,
    },
    formContainer: {
      alignItems: 'center',
      height:240,
      width: 282,
      backgroundColor: "#FFFFFF",
      padding: 10,
      borderRadius: 20,
    },
    formTitle:{
      fontSize: 40,
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
      paddingHorizontal: 15,
      color: "white",
      marginBottom: 5,
      fontSize: 15,
      fontWeight: 'bold'
      
    },
    signInButton: {
      backgroundColor: "#3FD68F",
      borderRadius: 15,
      alignItems: "center",
      width: 122,
      height: 35,
      paddingTop: 5,
      marginTop:5
    },
    signInButtonText: {
      color: "white",
      fontSize: 12,
      fontWeight: "bold",
      paddingTop:6
    },
    signUpText: {
      color: "black",
      textAlign: "center",
     paddingTop: 8
    },
    signUpLink:{
      color: "#3FD68F", 
      fontWeight: "500"
    }
  });
  