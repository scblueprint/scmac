import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { auth } from '../firebaseConfig';
import { sendPasswordResetEmail } from "firebase/auth";
import { Link } from "expo-router";
import {Dimensions} from 'react-native';
import {router} from 'expo-router';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const ForgotPassword1 = () => {
    // const auth = getAuth();
    const [text, setText] = useState('');
    
    const handleButtonPress = async () => {
        // console.log("hello");

        await sendPasswordResetEmail(auth, text)
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
        router.back();

    };
    const handleTextChange = (inputText) => {
        setText(inputText);
    }
    const handleBackButton = async () => {
        router.back();
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
            <Link href="/Login">
                <TouchableOpacity style = {styles.resetButton} onPress = {handleButtonPress}> 
                    <Text style ={styles.buttonText}> Request Reset Code </Text>
                </TouchableOpacity>
            </Link>
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
        // position: 'absolute',
        // marginTop: '50%', 
        // left: screenWidth * 0.5 - (screenWidth * 0.4), 
        height: "30%", 
        width: "180%",
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        alignItems: 'center',
    }, 
    textInput: {
        height: 40,
        borderBottomColor: 'black',
        borderTopColor: 'white',
        borderLeftColor: 'white',
        borderRightColor: 'white',
        borderWidth: 1,
        marginBottom: '5%',
    },
    backButton: {
        // position: 'absolute',
        // top: screenHeight * 0.056, // 91 / 2556
        // left: screenWidth * 0.0254, // 30 / 1179
    },
});
export default ForgotPassword1;