import React, { useState } from 'react';
import { Link } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Image } from 'expo-image';
import { EvilIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import {login} from "./api/users.js"
import { SafeAreaView } from 'react-native-safe-area-context';
const windowHeight = Dimensions.get('window').height; // 667
const windowWidth = Dimensions.get('window').width; // 375

export default function Login({navigation, expoPushToken}) {
  const [isEyeOpen, setIsEyeOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [pword, setPword] = useState("");

  return (
    <SafeAreaView style={styles.container}>
        <Image
            style={styles.image}
            source={require('../assets/scmac-logo.png')}
        />
        <Text style={styles.titleText}>
            Log In 
        </Text>

        <Text style={styles.emailText}>Email</Text>
        <View style={styles.emailContainer}>
        <View style={styles.envelopeIcon}>
          <EvilIcons name="envelope" size={24} color="black" />
        </View>
          <TextInput  
          style={styles.emailInput} 
          autoCapitalize='none'
          value={email} 
          placeholder="johndoe@gmail.com"
          placeholderTextColor="#808080"
          onChangeText={text => setEmail(text)}
          ></TextInput>
        </View>
        <Text style={styles.passwordText}>Password</Text>
        <View style={styles.passwordContainer}>
        <View style={styles.lockIcon}>
          <EvilIcons name="lock" size={24} color="black" />
        </View>
          <TextInput autoCapitalize='none' 
            secureTextEntry={isEyeOpen} 
            value={pword}
            style={styles.passwordInput}
            placeholder="●●●●●●●"
            placeholderTextColor="#808080"
            onChangeText={text => setPword(text)}></TextInput>
          <View style={styles.eyeIcon}>
          <TouchableOpacity
            onPress={() => setIsEyeOpen(!isEyeOpen)}
          >
            <Feather
              name={isEyeOpen ? 'eye' : 'eye-off'}
              size={16}
              color="black"
            />
          </TouchableOpacity>
        </View>
        </View>

      <View>
      <TouchableOpacity
          onPress={() => {
            navigation.navigate("ForgotPassword1")
          }}
          style={styles.forgotPasswordButton}
        >
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={async () => {
                if (email && pword) {
                var user = await login(email,pword, expoPushToken);
                if (user) {
                  setEmail("");
                  setPword("");
                  if(user.admin){
                    navigation.navigate("AdminEvents");
                  }
                  else{
                    navigation.navigate("Events");
                  }
                }
              } else {
                Alert.alert("Cannot leave field empty");
              }
              }}
            >
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>
        </View>
      <TouchableOpacity
          onPress={() => {
            navigation.navigate("Signup");
          }}
          style={styles.noAccountButton}
        >
          <Text style={styles.noAccountText}>Don't have an account? <Text style={styles.signUpText}>Sign Up</Text></Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  image: {
    width: "90%",
    height: "20%",
    contentFit: 'contain'
  },
  titleText: {
    /* Log In */
    width: "80%",
    marginTop: "10%",
    // fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 30,
    lineHeight: 36, 
    color: '#6A466C',
  },
  emailText: {
    /* Email */
    marginTop: "10%",
    marginLeft: "-70%",
    // font-family: 'Inter';
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 18,
    color: '#232323',
  },
  passwordText: {
    /* Password */
    marginTop: "10%",
    marginLeft: "-63%",
    // font-family: 'Inter',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 18,
    color: '#232323',
  },
  noAccountText: {
    marginTop: "5%",
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: '#232323',
  },
  signUpText: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: '#542656',
    fontWeight: "500"
  },
  noAccountButton: {
  },
  forgotPasswordText: {
    /* Forgot password? */
    // width: windowWidth * 0.288, // 108
    // height: windowHeight * 0.022, // 15
    fontSize: 12,
    lineHeight: 15,
    textAlign: 'center',
    color: '#542656',
  },
  forgotPasswordButton: {
    // position: 'absolute',
    // left: windowWidth * 0.68, // 255
    // top: windowHeight * 0.7436, // 496
    margin: "3.5%",
    marginLeft: "54%",
  },
  rememberMeText: {
    /* Remember me */
    position: 'absolute',
    width: windowWidth * 0.232, // 83
    height: windowHeight * 0.022, // 15
    left: windowWidth * 0.147, // 55
    top: windowHeight * 0.7436, // 496

    // font-family: 'Inter';
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 12, // 12
    lineHeight: 15, // 15
    /* identical to box height */

    color: '#232323',
  },
  lockIcon: {
    marginLeft: "-2%",
  },
  envelopeIcon: {
    marginLeft: "-2%",
    marginTop: "4%"
    /* Message_light */
    // position: 'absolute',
    // width: windowWidth * 0.056, // 21
    // height: windowHeight * 0.031, // 21
    // left: windowWidth * 0.08, // 30
    // top: windowHeight * 0.5787, // 386
  },
  eyeIcon: {
    // marginLeft: "2%",
    borderBottomColor: "black",
    borderBottomWidth: 2
  },
  checkboxIcon: {
    /* Done */
    // position: 'absolute',
    // width: windowWidth * 0.04, // 15
    // height: windowWidth * 0.04, // 15
    // left: windowWidth * 0.09, // 30
    // top: windowHeight * 0.7436, // 496
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // position: 'absolute',
    // width: windowWidth * 0.2, // Adjust the width accordingly
    // height: windowHeight * 0.031, // 21
    // left: windowWidth * 0.08, // 30
    // top: windowHeight * 0.5787, // 386
  },
  emailInput: {
    marginLeft: "2%",
    marginTop: "4%",
    width: "70%",
    borderBottomWidth: 2, // Add underline
    borderColor: '#000000', // Color of the underline
  },
  passwordContainer: {
    flexDirection: 'row',
    marginTop: "4%",
  },
  passwordInput: {
    marginLeft: "2%",
    width: "66%",
    borderBottomWidth: 2,
    borderColor: '#000000',
  },
  // Button styles
  buttonContainer: {
    width: "80%",
    alignItems: 'center',
  },
  loginButton: {
    // position: 'absolute',
    width: "100%", // 333
    marginTop: "5%",
    marginBottom: "3%",
    backgroundColor: '#6A466C',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});