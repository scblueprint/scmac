import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar.js';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import {getCurrentUserData} from '../pages/api/users';
import { auth, db } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import Checkbox from 'expo-checkbox';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { doc, updateDoc } from 'firebase/firestore';

export default function Profile({navigation}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [interests, setInterests] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const [pottery, setPottery] = useState(false);
  const [gallery, setGallery] = useState(false);
  const [events, setEvents] = useState(false);
  const [facilities, setFacilities] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  
  const signOutFunc = async () => {
    signOut(auth).then(() => {
      navigation.navigate("Login");
    }).catch((error) => {
      console.log(error);
    });
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    // console.warn("A date has been picked: ", date);
    setBirthday(date);
    hideDatePicker();
  };

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
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
        <TouchableOpacity style = {styles.editButton}
          onPress ={async () => {if(isEditable){
              const arr = [];
              if (pottery) arr.push("Pottery");
              if (gallery) arr.push("Gallery");
              if (events) arr.push("Events");
              if (facilities) arr.push("Facilities");
              setInterests(arr);

              //HANDLE ERROR HANDLING HERE (CHECK ONCE THEY EDIT IF THEY ARE VALID EMAIL, NUMBER, ETC)
              
              const userDoc = doc(db, "users", auth.currentUser.uid);
              await updateDoc(userDoc, {
                fname: firstName,
                lname: lastName,
                email: email,
                phone: phoneNumber,
                gender: gender,
                birthday: typeof birthday === 'number'? birthday: Math.floor(birthday.getTime() / 1000),
                interests: interests
              });
          } 
          setIsEditable(!isEditable)}}>
          <Text style={styles.editText}>{isEditable?"Save":"Edit"}</Text>
        </TouchableOpacity>
      </View>
    <View style={styles.pfpCircle}>
  <Text>PFP</Text>
</View>
    <View style={styles.name}>
      <View style={{flexDirection:'row'}}>
        <TextInput style={{fontSize: 20, fontStyle:isEditable?"italic":"normal", backgroundColor:isEditable?"#D9D9D9":"#fff"}} editable={isEditable} onChangeText={setFirstName}>{firstName}</TextInput>
        <Text> </Text>
        <TextInput style={{fontSize: 20, fontStyle:isEditable?"italic":"normal", backgroundColor:isEditable?"#D9D9D9":"#fff"}} editable={isEditable} onChangeText={setLastName}>{lastName}</TextInput>
      </View>
    </View>
    <View style={styles.email}>
        <Text style={{fontSize:15, marginLeft:30 }}>Email:     </Text>
        <TextInput style={{fontStyle:isEditable?"italic":"normal", backgroundColor:isEditable?"#D9D9D9":"#fff"}} editable={isEditable} onChangeText={setEmail}>{email}</TextInput>
    </View>
    <View style={styles.number}>
      <Text style={{fontSize:15, marginLeft:30 }}>Phone number:     </Text>
      <TextInput style={{fontStyle:isEditable?"italic":"normal", backgroundColor:isEditable?"#D9D9D9":"#fff"}} editable={isEditable} onChangeText={setPhoneNumber}>{phoneNumber}</TextInput>
    </View>
    <View style={styles.gender}>
      <Text style={{fontSize:15, marginLeft:30 }}>Gender:     </Text>
      <TextInput style={{fontStyle:isEditable?"italic":"normal", backgroundColor:isEditable?"#D9D9D9":"#fff"}} editable={isEditable} onChangeText={setGender}>{gender}</TextInput>
    </View>
    <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />
    <View style={styles.birthday}>
      <Text style={{fontSize:15, marginLeft:30 }}>Birthday:     </Text>
      
      <TextInput style={{fontStyle:isEditable?"italic":"normal", backgroundColor:isEditable?"#D9D9D9":"#fff"}} editable={false} onPressIn={()=> {if(isEditable)showDatePicker()}}>{new Date(birthday * 1000).toDateString().split(' ').slice(1).join(' ')}</TextInput>
    </View>
    <View style={styles.interests}>
      <Text style={{fontSize:15, marginLeft:30 }}>Interests:     <Text style={{fontSize:15, marginLeft:30 }}>{!isEditable?interests ? interests.join(', ') : "":""}</Text></Text>
      {!isEditable ? (
        <View></View>
    ): (<View>
        <View style={styles.checkboxContainer}>
        <Checkbox
          value={pottery}
          onValueChange={() => setPottery(!pottery)}
          style={styles.checkbox}
        />
        <Text style={{fontSize:15, fontWeight:400}}>Pottery</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <Checkbox
          value={gallery}
          onValueChange={() => setGallery(!gallery)}
          style={styles.checkbox}
        />
        <Text style={{fontSize:15, fontWeight:400}}>Gallery</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <Checkbox
          value={events}
          onValueChange={() => setEvents(!events)}
          style={styles.checkbox}
        />
        <Text style={{fontSize:15, fontWeight:400}}>Events</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <Checkbox
          value={facilities}
          onValueChange={() => setFacilities(!facilities)}
          style={styles.checkbox}
        />
        <Text style={{fontSize:15, fontWeight:400}}>Facilities</Text>
      </View>
      </View>)}
    </View>


      <TouchableOpacity style = {styles.signOutButton} onPress={signOutFunc}> 
        <Text style ={styles.buttonText}> Sign Out </Text>
      </TouchableOpacity>
      <View style={{position: "absolute", bottom:0, width:"100%"}}>
        <NavBar navigation={navigation}/>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: "row",
    backgroundColor: '#6A466C',
    textAlign: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    paddingBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: "55%",
    marginBottom: "2%"
  },
  editText: {
    fontSize: 18, 
    fontWeight: '400',
    color: 'white',
    marginLeft:"45%",
    marginTop: "2%"
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
    marginBottom: "1%",
    flexDirection:'row'
  },
  number: {
    marginBottom: "1%",

    flexDirection:'row'
  },
  gender: {
    marginBottom: "1%",
    flexDirection:'row'
  },
  birthday: {
    marginBottom: "1%",
    flexDirection:'row'
  },
  interests: {
    marginBottom: "1%",
    flexDirection:'row'
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
    marginTop: "10%"
},
buttonText: {
    fontSize: 20,
    color: '#8C8C8C',
    alignItems: 'center',
}, 
checkboxContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: "3%",
},
checkbox: {
  marginRight: 8,
},
});