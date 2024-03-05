import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, TextInput} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const ForgotPassword3 = () => {
    const [text, setText] = useState('');
    const handleButtonPress = () => {
        alert('Button Pressed');
    };
    const handleTextChange = (inputText) => {
        setText(inputText);
    }
    return (
        <View style = {styles.container}>
            <TouchableOpacity style = {styles.backButton} onPress = {handleButtonPress}>
                <AntDesign name="leftcircleo" size={50} color="#A3A3A3" />
            </TouchableOpacity>
            <Text style = {styles.forgotPasswordText} >Reset Your Password</Text>
        
        
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
    backButton: {
        position: 'relative',
        top: -80,
        left: 0,
    },
    forgotPasswordText: {
        fontSize: 30,
        textAlign: 'left',
        margin: 5,
        paddingBottom: 10,
        color: '#6A466C',
        fontWeight: 'bold',
    },
});
export default ForgotPassword3;