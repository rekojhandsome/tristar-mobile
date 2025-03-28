import {View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, Pressable} from 'react-native';
import { Alert } from "react-native";
import { useState } from 'react';
import axios from 'axios';

export default function SignUp({navigation}){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSaveSignUp = async () => {

    const registerAPI = "http://192.168.29.207:5269/api/SignIn/register";

    try{
    if (isSubmitting) return;
    setIsSubmitting(true);

     if (password !== confirmPassword) {
          Alert.alert("Error", "Passwords do not match!");
          setIsSubmitting(false);
          return;
        }

    const signUpData = {
        username,
        password,
    };  

    console.log("SignUp Data: ", signUpData);
    await axios.post(registerAPI, signUpData);
    
    Alert.alert("Success", "Account Created Successfully!", [
            {
              text: "Okay",
              onPress: () => {
                console.log("Account created Successfully!");
                navigation.navigate("SignIn");
              },
            },
          ]);
    }catch (error){
        if (axios.isAxiosError(error) && error.response?.status === 409) {
            console.error("Username already exists", error.response.data.message);
            Alert.alert("Error", "Username already exists");
            setIsSubmitting(false);
        }
        else {
          Alert.alert("Error", "Error creating account");
          console.log("Error creating account", error);
        }
    }
}
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
             {/* Sign-In Button */}
             <Pressable style={styles.signUpButton} onPress={handleSaveSignUp}>
               <Text style={styles.signUpButtonText}>Sign Up</Text>
             </Pressable>
             {/* Navigation to Sign Up */}
             <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
             <Text style={styles.signInText}> Already have an account? <Text style={styles.signInLink}>Sign In</Text>
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
    height:320,
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
   