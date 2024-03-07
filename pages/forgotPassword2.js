import { StyleSheet, Text, TouchableOpacity, View, Alert, TextInput, SafeAreaView} from 'react-native';
import React, { useState } from 'react';
import { AntDesign } from 'react-native-vector-icons';



// const SingularNumberInput = props => {
    
//     const [number, setNumber] = useState(0);
    

// };

export default function ForgotPassword2() {
    
    const [number, setNumber] = useState("11");

    const handleInputChange = (text) => {
        const numericvalue = text.replace(/[^0-9]/g,"");
        setNumber(numericvalue);

    };

    const [number2, setNumber2] = useState("11");

    const handleInputChange2 = (text) => {
        const numericvalue2 = text.replace(/[^0-9]/g,"");
        setNumber2(numericvalue2);

    };
    
    const handlePress = () => {
        Alert.alert('Button Pressed', 'You pressed the button!');
    };
    
    const handleButtonPress = () => {
        Alert.alert('Button Pressed', 'You pressed the button!');
    };

    return (
        <View style={styles.container}>
            
            <TouchableOpacity style = {styles.backButton} onPress = {handleButtonPress}>
                <AntDesign name="leftcircleo" size={50} color="#A3A3A3" />
            </TouchableOpacity>
            

            <Text style={styles.forgotPasswordTitle}>Forgot Password</Text>
            <Text style={styles.recoveryCodeText}>Please enter the recovery code that was sent to the email address you provided.</Text>
            <Text style={styles.recoveryCodeLabel}>Recovery Code</Text>

            {/* Lines */}
            <View style={styles.line1}></View>
            <View style={styles.line2}></View>
            <View style={styles.line3}></View>
            <View style={styles.line4}></View>
            <View style={styles.line5}></View>
            <View style={styles.line6}></View>



            <View> 
                <TextInput 
                    style={styles.numberinput}
                    keyboardType='numeric'
                    onChangeText={handleInputChange}
                    value={number}
                    maxLength={3}  //setting limit of input
                />
                

            <View> 
                <TextInput 
                    style={styles.numberinput2}
                    keyboardType='numeric'
                    onChangeText={handleInputChange2}
                    value={number2}
                    maxLength={3}  //setting limit of input
                />
            </View>

            {/*  minus between recovery code */}
            <Text style={styles.minusSign}>-</Text>
            
            {/* confirm rectangle */}
            </View>
            
            <TouchableOpacity onPress={handlePress} style={styles.rectangleconfirm}>
                <Text style={styles.confirmText}>Confirm</Text>
            </TouchableOpacity>
        </View>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF0000',
    },
    forgotPasswordTitle: {
        position: 'absolute',
        right: '-16%',
        top: '25%',
        fontWeight: '600',
        fontSize: 30,
        lineHeight: 36,
        color: '#6A466C',
    },
    recoveryCodeText: {
        position: 'absolute',
        width: '90%',
        left: '-45%',
        top: '35%',
        fontWeight: '400',
        fontSize: 15,
        lineHeight: 18,
        color: '#000000',
    },
    recoveryCodeLabel: {
        position: 'absolute',
        width: '40%',
        left: '-44%',
        top: '45%',
        fontWeight: '500',
        fontSize: 15,
        lineHeight: 18,
        color: '#232323',
    },
    line1: {
        position: 'absolute',
        width: '10%',
        borderWidth: 1,
        borderColor: '#232323',
        left: '-45%',
        top: '59.7%',
    },
    line2: {
        position: 'absolute',
        width: '10%',
        height: 0,
        borderWidth: 1,
        borderColor: '#232323',
        left: '-32%',
        top: '59.7%',
    },
    line3: {
        position: 'absolute',
        width: '10%',
        height: 0,
        borderWidth: 1,
        borderColor: '#232323',
        left: '-19%',
        top: '59.7%',
    },
    line4: {
        position: 'absolute',
        width: '10%',
        height: 0,
        borderWidth: 1,
        borderColor: '#232323',
        left: '5%',
        top: '59.7%',
    },
    line5: {
        position: 'absolute',
        width: '10%',
        height: 0,
        borderWidth: 1,
        borderColor: '#232323',
        left: '19%',
        top: '59.7%',
    },
    line6: {
        position: 'absolute',
        width: '10%',
        height: 0,
        borderWidth: 1,
        borderColor: '#232323',
        left: '33%',
        top: '59.7%',
    },
    minusSign: {
        position: 'absolute',
        left: '-4%',
        top: '53%',
        fontWeight: '500',
        fontSize: 34,
        lineHeight: 41,
        color: '#000000',
    },
    rectangleconfirm: {
        position: 'absolute',
        top: '62%',
        left: '-49%',
        width: '90%',
        padding: 15,
        margin: 10,
        backgroundColor: '#6A466C',
        borderRadius: 8,
    },

    confirmText: {
        color: 'white',
        fontSize: 18,
        left: '37%',
        fontWeight: 'bold',
    },

    backButton: {
        position: 'absolute',
        height: 50,
        top: '12%',
        left: '-45%',

    },
    numberinput: {
        position: 'absolute',
        width: '45%',
        color: 'black',
        borderWidth: 2,
        fontWeight: '800',
        backgroundColor: 'transparent',
        textAlign: 'left',
        fontSize: 40,
        borderColor: 'transparent',
        left: '-44%',
        letterSpacing: '25%',
        top: 10,
    
    },

    numberinput2: {
        position: 'absolute',
        width: '45%',
        color: 'black',
        borderWidth: 2,
        fontWeight: '800',
        backgroundColor: 'transparent',
        textAlign: 'left',
        fontSize: 40,
        borderColor: 'transparent',
        left: '7%',
        letterSpacing: '24%',
        top: 10,
    
    }

});
