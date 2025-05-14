import React from "react";
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Pressable, SafeAreaView } from "react-native";
import { Alert } from "react-native";
import { useState } from "react";

import { Login } from "../service/Authentication/AuthenticationService";

export default function SignIn({ navigation }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false); // State to track submission status

    const handleLogin= async () => {

      if (isSubmitting) return;

      const result = await Login(username,password)

        if (result.success) {
          Alert.alert("Success", "Login successful!", [
            {
              text: "Okay",
              onPress: () => navigation.navigate("LeavePage") // Navigate only after pressing OK
            }
          ]);
          console.log("Signed In!");
          isSubmitting(false);
        }
        else{
          Alert.alert("Error", "Username or Password is incorrect!");
          console.log("Error Signing In");
          isSubmitting(false);
        }
    };
   
    return (
      <SafeAreaView style={styles.background}>
        <View style={styles.background} >
            <Image style={styles.image} source={require("../assets/images/tristar-logo.png")} />
            <Text style={styles.title}>Enterprie App</Text>
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
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
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
      height:270,
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
    signInButton: {
      backgroundColor: "#3FD68F",
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: "center",
      width: 242,
      height: 45,
      marginTop:10,
    },
    signInButtonText: {
      textAlign: 'center',
      color: "white",
      fontWeight: "bold",
    },
    signUpText: {
      color: "black",
      textAlign: "center",
     paddingTop: 15
    },
    signUpLink:{
      color: "#3FD68F", 
      fontWeight: "500"
    }
  });
  