import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, SafeAreaView, TextInput, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { auth } from '../firebaseConfig';
import { sendPasswordResetEmail } from "firebase/auth";
import {Dimensions} from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function ForgotPassword1({navigation}) {
    const [text, setText] = useState('');
    
    const handleButtonPress = async () => {

        await sendPasswordResetEmail(auth, text).then(() => {
            Alert.alert("Password Reset Link sent to email!", "", [
                {
                  text: 'OK',
                  onPress: () => navigation.navigate("Login"),
                }
              ])
            })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode == "auth/invalid-email") Alert.alert("Invalid email");
            if (errorCode == "auth/missing-email") Alert.alert("Missing email");
            console.log(error.message)
        });
        
        

    };
    const handleTextChange = (inputText) => {
        setText(inputText);
    }
    const handleBackButton = async () => {
        navigation.navigate("Login");
    }
    return (
        <SafeAreaView style = {styles.container}>
            <TouchableOpacity style = {styles.backButton} onPress = {handleBackButton}>
                <AntDesign name="leftcircleo" size={50} color="#A3A3A3" />
            </TouchableOpacity>
            <Text style = {styles.forgotPasswordText} >Forgot Password</Text>
            <Text style = {styles.text1}>Please enter the email address that you would like your password reset information sent to.</Text>
            <Text style = {styles.text2}> Email </Text>
            <TextInput style = {styles.textInput}
                onChangeText = {handleTextChange}
                value = {text}
                autoCapitalize='none'
            />
                <TouchableOpacity style = {styles.resetButton} onPress = {handleButtonPress}> 
                    <Text style ={styles.buttonText}> Request Reset Email </Text>
                </TouchableOpacity>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'flex-start',
        marginLeft: '5%',
        marginRight: '5%'
        // backgroundColor: 'red'
    },
    forgotPasswordText: {
        fontSize: 30,
        textAlign: 'left',
        marginTop: '30%',
        paddingBottom: 10,
        color: '#6A466C',
        fontWeight: 'bold',
    },
    text1: {
        fontSize: 15,
        textAlign: 'left',
    },
    text2: {
        fontSize: 15,
        textAlign: 'left',
        paddingTop: 10,
        paddingBottom: 5,
    },
    resetButton: {
        backgroundColor: '#6A466C',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        height: "7%", 
        width: "100%",
        marginTop: "3%"
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "500",
        color: 'white',
        alignItems: 'center',
    }, 
    textInput: {
        height: 40,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginBottom: '5%',
    },
    backButton: {
        marginTop: "5%",
    },
});