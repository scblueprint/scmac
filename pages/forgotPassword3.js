import { StyleSheet, Text, TouchableOpacity, View, Alert, TextInput, SafeAreaView} from 'react-native';
import React, { useState } from 'react';
import { AntDesign } from 'react-native-vector-icons';




// const SingularNumberInput = props => {
    
//     const [number, setNumber] = useState(0);
    

// };

export default function ForgotPassword3() {
    
    const [text1, onChangeText1] = React.useState('');
    
    const [text2, onChangeText2] = React.useState('');

    const handlePress = () => {
        Alert.alert('Button Pressed', 'You pressed the button!');
    };

    const handleButtonPress = () => {
        Alert.alert('Button Pressed', 'You pressed the button!');
    };
    return (
        <View style={styles.container}>

            <SafeAreaView>
                <TextInput
                    style={styles.passwordletter}
                    onChangeText={onChangeText1}
                    value={text1}
                />
            </SafeAreaView>

        
            <SafeAreaView>
                <TextInput
                    style={styles.passwordletter2}
                    onChangeText={onChangeText2}
                    value={text2}
                />
            </SafeAreaView>

            <View style={styles.line1}></View>
            <View style={styles.line2}></View>


            <TouchableOpacity style = {styles.backButton} onPress = {handleButtonPress}>
                <AntDesign name="leftcircleo" size={50} color="#A3A3A3" />
            </TouchableOpacity>

            <Text style={styles.forgotPasswordTitle}>Reset Your Password</Text>

            <Text style={styles.recoveryCodeText}>Your password must be at least six characters and cannot contain spaces or match your email address.</Text>

            <Text style={styles.firstpassword}>Enter new password</Text>

            <Text style={styles.secondpassword}>Confirm new password</Text>


            {/* confirm rectangle */}
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
        backgroundColor: 'transparent',
    },
    forgotPasswordTitle: {
        position: 'absolute',
        right: '-32%',
        top: '25%',
        fontWeight: '600',
        fontSize: 30,
        lineHeight: 36,
        color: '#6A466C',
    },
    recoveryCodeText: {
        position: 'absolute',
        width: '90%',
        left: '-44%',
        top: '35%',
        fontWeight: '400',
        fontSize: 15,
        lineHeight: 18,
        color: '#000000',
    },

    backButton: {
        position: 'absolute',
        height: 50,
        top: '12%',
        left: '-45%',

    },

    line1: {
        position: 'absolute',
        width: '89%',
        borderWidth: 1,
        borderColor: '#232323',
        left: '-45%',
        top: '62%',
    },


    line2: {
        position: 'absolute',
        width: '89%',
        borderWidth: 1,
        borderColor: '#232323',
        left: '-45%',
        top: '53%',
    },

    rectangleconfirm: {
        position: 'absolute',
        top: '65%',
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

    passwordletter: {
        position: 'absolute',
        height: 15,
        top: -12,
        margin: 12,
        left: '-50%',
        width: '70%',
        borderWidth: 1,
        fontSize: 18,
        borderColor: 'transparent',
        padding: 10,
    },

    passwordletter2: {
        position: 'absolute',
        height: 120,
        margin: 12,
        left: '-50%',
        width: '70%',
        borderWidth: 1,
        fontSize: 18,
        borderColor: 'transparent',
        padding: 10,
    },

    firstpassword: {
        position: 'absolute',
        width: '90%',
        left: '-44%',
        top: '46%',
        fontWeight: '400',
        fontSize: 15,
        lineHeight: 18,
        color: '#000000',
    },

    secondpassword: {
        position: 'absolute',
        width: '90%',
        left: '-44%',
        top: '56%',
        fontWeight: '400',
        fontSize: 15,
        lineHeight: 18,
        color: '#000000',
    }

});