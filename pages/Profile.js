import React, { useState, useEffect} from 'react';
import NavBar from '../components/NavBar.js';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import {getCurrentUserData} from '../pages/api/users'
export default function Profile({navigation}) {
  // Do the rest of the fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  // Do the rest of the fields
  useEffect( () => {
    async function fetchData() {
      data = await getCurrentUserData("KV9qEliUXBccf63FLFaTA6lOdMH2");
      console.log(data);
      setFirstName(data.fname);
      setLastName(data.lname);
      setEmail(data.email);
      setPhoneNumber(data.phone);
      setGender(data.gender);
      setBirthday(data.birthday);
    }
    fetchData();
 }, [])
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
      <TouchableOpacity style = {styles.editButton}
      onPress ={() => setIsEditable(!isEditable)}>
        <Text style={styles.editText}>Edit</Text>
      </TouchableOpacity>
    <View style={styles.pfpCircle}>
  <Text>PFP</Text>
</View>
    <View style={styles.name}>
      <Text style={{fontSize:20}}>{firstName + " " + lastName}</Text>
        </View>
    <View style={styles.email}>
      <Text style={{fontSize:15, marginLeft:30 }}>Email: </Text><TextInput editable ={isEditable}>{"    " + email}</TextInput> 
    </View>
    <View style={styles.number}>
      <Text style={{fontSize:15, marginLeft:30 }}>Phone number: </Text><TextInput editable = {isEditable}>{"    " + phoneNumber} </TextInput> 
        </View>
    <View style={styles.gender}>
      <Text style={{fontSize:15, marginLeft:30 }}>Gender: </Text><TextInput editable = {isEditable}>{"    " + gender}</TextInput> 
        </View>
    <View style={styles.birthday}>
      <Text style={{fontSize:15, marginLeft:30 }}>Birthday: </Text><TextInput editable = {isEditable}>{"    " + birthday}</TextInput>
        </View>
    <NavBar navigation={navigation}/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#6A466C',
    textAlign: 'center',
    padding: 80,
    paddingBottom: 10,
  },
  editButton: {
    fontSize: 20, 
    fontWeight: 'bold',
    color: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  pfpCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    fontSize:30,
    backgroundColor: '#D9D9D9',
    marginBottom: 20,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
  },
  email: {
    // marginTop:10,
    // fontSize: 15,
    // width: 393,
    // height: 18,
    //backgroundColor: 'yellow',
  },
  number: {
    // marginTop:10,
    // paddingBottom: 4,
    // width: 393,
    // height: 18,
    //backgroundColor: 'red',
  },
  gender: {
    // marginTop:10,
    // paddingBottom: 4,
    // width: 393,
    // height: 18,
    //backgroundColor: 'blue',
  },
  birthday: {
    // marginTop:10,
    // width: 393,
    // height: 18,
    //backgroundColor: 'cyan',
  },
});