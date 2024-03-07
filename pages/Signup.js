import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function Signup() {
  return (
    <View style={styles.container}>
     <TouchableOpacity style={styles.backButton}>
        <Text style =
         {{fontSize: 40, color:'#A3A3A3'}}>
            {'<'}
        </Text>
      </TouchableOpacity>
      <Text style={styles.signUp}>Sign Up</Text>
      <Text style = {{fontSize:'15px', fontWeight: 500}}>First Name</Text>
      <TextInput style={styles.input} />
      <Text style = 
      {{fontSize:'15px', fontWeight:500,paddingTop:20}}>Last Name</Text>
      <TextInput style={styles.input} />
      <Text style =
       {{fontSize:'15px', fontWeight:500, paddingTop:20}}>
        Email
      </Text>
      <TextInput style={styles.input} />
      <View style={styles.line} />
      <Text style = {{fontSize:'15px', fontWeight:500, paddingTop: 20}} >Phone Number</Text>
      <TextInput style={styles.input} />
      <View style={styles.line} />
      <Text style = {{fontSize:'15px', fontWeight:500, paddingTop: 20}} >Password</Text>
      <TextInput style={styles.input} />
      <View style={styles.line} />
      <TouchableOpacity style={styles.continueButton}>
        <Text style = {{color:"white", fontSize:'20px'}}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: -300,
    alignItems: 'flex-start',
    paddingLeft: 25,
    paddingRight: 25,
    marginBottom: '80%'
  },
  backButton: {
    marginTop: 80,
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 2.5,
    borderColor: '#A3A3A3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUp: {
    paddingTop: 35,
    paddingBottom: 35,
    fontWeight: 600,
    fontSize: 30,
    color: '#6A466C',
    fontWeight: 600,
    lineHeight: 36,
    letterSpacing: 0,
    textAlign: 'left'
  },
  input: {
    height: 40,
    width: 333,
    borderColor: '#232323',
    paddingHorizontal: 10,
    fontSize: 18,
    borderBottomWidth: 1.2
  },  
  continueButton: {
    marginTop: 35,
    backgroundColor: '#6A466C',
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    width: 333,
    height: 44,
  },
});
