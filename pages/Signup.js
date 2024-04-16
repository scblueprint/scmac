import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import {signup} from "./api/users.js";
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import Checkbox from 'expo-checkbox';
import { faL } from '@fortawesome/free-solid-svg-icons';

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

export default function Signup({navigation}) {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(0);
  const [pword, setPword] = useState("");
  const [pottery, setPottery] = useState(false);
  const [gallery, setGallery] = useState(false);
  const [events, setEvents] = useState(false);
  const [facilities, setFacilities] = useState(false);

  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  };

  return (
    <View style={styles.container}>
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
      <Text style = {{fontSize:15, fontWeight:500, paddingTop: 20}} >Password</Text>
      <TextInput style={styles.input} 
               onChangeText={text => setPword(text)}
              autoCapitalize='none'
      />
      
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
                const arr = [];
                if (pottery) arr.push("Pottery");
                if (gallery) arr.push("Gallery");
                if (events) arr.push("Events");
                if (facilities) arr.push("Facilities");
                const item = await signup(email, pword, fname, lname, phone);
                navigation.navigate("Waiver", {item: item})
              }}
      >
        <Text style = {{color:"white", fontSize:20}}>Continue</Text>
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
});
