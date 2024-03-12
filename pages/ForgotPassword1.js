import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { auth } from '../firebaseConfig';
import { sendPasswordResetEmail } from "firebase/auth";
import { Link } from "expo-router";

const ForgotPassword1 = () => {
    // const auth = getAuth();
    const [text, setText] = useState('');
    
    const handleButtonPress = async () => {

        await sendPasswordResetEmail(auth, text)
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });

    };
    const handleTextChange = (inputText) => {
        setText(inputText);
    }
    return (
         <View style = {styles.container}>
            <TouchableOpacity style = {styles.backButton} onPress = {handleButtonPress}>
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
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'flex-start',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 200,
    },
    forgotPasswordText: {
        fontSize: 30,
        textAlign: 'left',
        margin: 5,
        paddingBottom: 10,
        color: '#6A466C',
        fontWeight: 'bold',
    },
    text1: {
        fontSize: 15,
        textAlign: 'left',
        margin: 5,
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
        margin: 10,
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
    }, 
    textInput: {
        height: 40,
        borderBottomColor: 'black',
        borderTopColor: 'white',
        borderLeftColor: 'white',
        borderRightColor: 'white',
        borderWidth: 1,
        margin: 3,
    },
    backButton: {
        position: 'relative',
        top: -80,
        left: 0,
    },
});
export default ForgotPassword1;