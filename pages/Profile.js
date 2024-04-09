import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar.js';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {getCurrentUserData} from '../pages/api/users';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';

export default function Profile({navigation}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [interests, setInterests] = useState([]);
  
  const signOutFunc = async () => {
    signOut(auth).then(() => {
      navigation.navigate("Login");
    }).catch((error) => {
      console.log(error);
    });
  }

  useEffect( () => {
    async function fetchData() {
      data = await getCurrentUserData();
      // console.log(data);
      setFirstName(data.fname);
      setLastName(data.lname);
      setEmail(data.email);
      setPhoneNumber(data.phone);
      setGender(data.gender);
      setBirthday(data.birthday);
      setInterests(data.interests);
    }
    fetchData();
 }, [])
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
    <View style={styles.pfpCircle}>
  <Text>PFP</Text>
</View>
    <View style={styles.name}>
      <Text style={{fontSize:20}}>{firstName + " " + lastName}</Text>
        </View>
    <View style={styles.email}>
      <Text style={{fontSize:15, marginLeft:30 }}>Email: {"    " + email}</Text>
    </View>
    <View style={styles.number}>
      <Text style={{fontSize:15, marginLeft:30 }}>Phone number: {"    " + phoneNumber}</Text>
        </View>
    <View style={styles.gender}>
      <Text style={{fontSize:15, marginLeft:30 }}>Gender: {"    " + gender}</Text>
        </View>
    <View style={styles.birthday}>
      <Text style={{fontSize:15, marginLeft:30 }}>Birthday: {"    " + new Date(birthday).toDateString().split(' ').slice(1).join(' ')}</Text>
        </View>
        <View style={styles.interests}>
      <Text style={{fontSize:15, marginLeft:30 }}>Interests: {"    " + interests ? "    "+interests.join(', ') : ""}</Text>
        </View>
        <TouchableOpacity style = {styles.signOutButton} onPress={signOutFunc}> 
                    <Text style ={styles.buttonText}> Sign Out </Text>
                </TouchableOpacity>
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
  pfpCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    fontSize:30,
    backgroundColor: '#D9D9D9',
    marginBottom: 20,
    marginTop: 30,
    marginLeft: "37%",
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
  interests: {
    // width: 393,
    // height: 18,
    //backgroundColor: 'cyan',
  },
  signOutButton: {
    backgroundColor: '#EAEAEA',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderColor: "#8C8C8C",
    borderWidth: 1,
    height: "5.5%", 
    width: "80%",
    marginLeft: "10%",
    marginBottom:"62%",
    marginTop: "10%"
},
buttonText: {
    fontSize: 20,
    color: '#8C8C8C',
    alignItems: 'center',
}, 
});