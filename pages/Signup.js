import React from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import {signup} from "./api/users.js";
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { faL } from '@fortawesome/free-solid-svg-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const items = [{
  id: '0',
  name: 'Potter'
}, {
  id: '1',
  name: 'Gallery'
}, {
  id: '2',
  name: 'Events'
},
{
  id: '3',
  name: 'Facilities'
},
{
  id: '4',
  name: 'Other'
}
];

export default function Signup({navigation, expoPushToken}) {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(0);
  const [pword, setPword] = useState("");
  const [pottery, setPottery] = useState(false);
  const [gallery, setGallery] = useState(false);
  const [events, setEvents] = useState(false);
  const [facilities, setFacilities] = useState(false);
  const [birthday, setBirthday] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isEyeOpen, setIsEyeOpen] = useState(true);

  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  };

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

  return (
    <ScrollView contentContainerStyle={styles.container}>
     <TouchableOpacity style={{marginTop: "20%"}} onPress={()=>navigation.navigate("Login")}>
                <AntDesign name="leftcircleo" size={50} color="#A3A3A3" />
            </TouchableOpacity>
      <Text style={styles.signUp}>Sign Up</Text>
      <Text style = {{fontSize:15, fontWeight: 500}}>First Name</Text>
      <TextInput 
      style={styles.input}
        onChangeText={text => setFname(text)}
       />
      <Text style = 
      {{fontSize:15, fontWeight:500,paddingTop:20}}>Last Name</Text>
      <TextInput style={styles.input}
         onChangeText={text => setLname(text)}
       />
      <Text style =
       {{fontSize:15, fontWeight:500, paddingTop:20}}>
        Email
      </Text>
      <TextInput style={styles.input}
              onChangeText={text => setEmail(text)}
              autoCapitalize='none'
      />
      <View style={styles.line} />
      <Text style = {{fontSize:15, fontWeight:500, paddingTop: 20}} >Phone Number</Text>
      <TextInput style={styles.input} 
               onChangeText={text => setPhone(text)}

      />
      <View style={styles.line} />
      <View style={{flexDirection:'row'}}>
      <Text style = {{fontSize:15, fontWeight:500, paddingTop: 20}} >Password</Text>
      <TouchableOpacity
      style={{marginTop:"6%", marginLeft: "3%"}}
            onPress={() => setIsEyeOpen(!isEyeOpen)}
          >
            <Feather
              name={isEyeOpen ? 'eye' : 'eye-off'}
              size={16}
              color="black"
            />
          </TouchableOpacity>
      </View>
      <TextInput style={styles.input} 
               onChangeText={text => setPword(text)}
              autoCapitalize='none'
              autoComplete='password'
              secureTextEntry={isEyeOpen} 
      />
      
<DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />
      <View style={styles.birthday}>
        <Text style={{fontSize:15, fontWeight:500 }}>Birthday: </Text>
        
        <TextInput style={{textDecorationLine: 'underline', fontWeight:500}} editable={false} onPressIn={()=> showDatePicker()} placeholder='Choose Date'>{birthday ? new Date(birthday).toDateString().split(' ').slice(1).join(' ') : ""}</TextInput>
      </View>
      
      <Text style = {{fontSize:15, fontWeight:500, paddingTop: 20}}>Select Interests</Text>
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

      <TouchableOpacity 
      style={styles.continueButton}
              onPress={async () =>  {
                if (fname && lname && email && pword && birthday && phone) {
                  const arr = [];
                  if (pottery) arr.push("Pottery");
                  if (gallery) arr.push("Gallery");
                  if (events) arr.push("Events");
                  if (facilities) arr.push("Facilities");
                  const item = await signup(email, pword, fname, lname, phone, arr, birthday, expoPushToken);
                  if (item) navigation.navigate("Waiver", {item: item})
                } else {
                  Alert.alert("Cannot leave field empty");
                }
              }}
      >
        <Text style = {{color:"white", fontSize:20}}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: -300,
    alignItems: 'flex-start',
    paddingLeft: 25,
    paddingRight: 25,
    // marginBottom: '80%'
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
    fontWeight: "600",
    fontSize: 30,
    color: '#6A466C',
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
    marginTop: "6%",
    backgroundColor: '#6A466C',
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    width: 333,
    height: 44,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: "3%",
    marginLeft: "1%"
  },
  checkbox: {
    marginRight: 8,
  },
  birthday: {
    marginTop: "6%",
    marginBottom: "1%",
    flexDirection:'row',
  },
});
