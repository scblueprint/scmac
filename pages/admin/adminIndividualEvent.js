import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, FlatList } from 'react-native'; 
import { Picker } from '@react-native-picker/picker';
import Checkbox from 'expo-checkbox';
import { getFirestore, collection, doc, setDoc, getDoc, getDocs, updateDoc, arrayUnion, addDoc, deleteDoc } from 'firebase/firestore';
import { Dropdown } from 'react-native-element-dropdown';
import { AntDesign } from '@expo/vector-icons';
import { auth, db } from '../../firebaseConfig';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { Octicons, Entypo } from '@expo/vector-icons';
import OptionsMenu from "react-native-options-menu";
import { createEvent } from '../api/event';

const Tab = createMaterialTopTabNavigator();
var nav = null;
var item = null;
export default function AdminEventDetailScreen({route, navigation}) {
  useFocusEffect(useCallback( () => {
  }, []))
  item  = route.params;
  // console.log(item)
  nav = navigation;
  return (
    <MyTabs/>
  );
};

function MyTabs() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
      <Tab.Screen options={{
        tabBarStyle:{backgroundColor:"#6A466C", borderTopColor:"black"},
        tabBarLabelStyle:{color:"white"},
        }} name="Details" component={Details} />
      <Tab.Screen options={{
        tabBarStyle:{backgroundColor:"#6A466C", borderTopColor:"black"},
        tabBarLabelStyle:{color:"white"},
        }} name="Availability" component={Availability} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

function Details() {
  const [selectedValueShift, setSelectedValueShift] = useState("");
  const [isMaterialSelected, setIsMaterialSelected] = useState(false);
  const [value, setValue] = useState(null);
  const [event, setEvent] = useState({});
  const [materials, setMaterials] = useState([]);
  const [shiftsData, setShiftsData] = useState([]);

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value && (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      </View>
    );
  };

  useFocusEffect(useCallback( () => {
    async function fetchData() {
      const arr = [];
      const arr2 = [];
      // const { item } = route.params;
      // console.log(item);
      // const event = item;
      const eventData = item.item;
      // console.log(eventData.shifts)
      eventData.shifts.forEach(async element => {
        const shiftDoc = doc(db, 'shifts', element);
        const shift = await getDoc(doc(db, 'shifts', element));
      //   console.log(new Date(shift.data().startTime*1000).toLocaleString('en-US', {
      //     weekday: 'short', // 'Fri'
      //     month: 'short',   // 'May'
      //     day: 'numeric',   // '03'
      //     hour: '2-digit',  // '02' or '14'
      //     minute: '2-digit' // '30'
      // }))
        arr.push({shift: shiftDoc, label: new Date(shift.data().startTime*1000).toLocaleString('en-US', {
          weekday: 'short', // 'Fri'
          month: 'short',   // 'May'
          day: 'numeric',   // '03'
          hour: '2-digit',  // '02' or '14'
          minute: '2-digit' // '30'
      }) + " - " + new Date(shift.data().endTime*1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), value:new Date(shift.data().startTime*1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) + " - " + new Date (shift.data().endTime*1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })})
        // console.log(arr.sort());
      });
      arr.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.date) - new Date(a.date);
      });
      setShiftsData(arr);

      eventData.materials.forEach(async element => {
        const el = {...element,
                    isSelected: false};
        if(!element.user) arr2.push(el);
      });
      // console.log(materials);
      setMaterials(arr2);
      
      const fetchedEvents = {
          id: eventData.id,
          title: eventData.title,
          date: eventData.date,
          endDate: eventData.endDate,
          description: eventData.description,
          location: eventData.location,
          materials: eventData.materials,
          shifts: eventData.shifts,
        }

      setEvent(fetchedEvents);
      // console.log(event.date);
    }
    fetchData();
 }, []))

 const toggleMaterial = (index) => {
  const updatedMaterials = [...materials];
  updatedMaterials[index].isSelected = !updatedMaterials[index].isSelected;
  setMaterials(updatedMaterials);
};

const myIcon = (<Entypo name="dots-three-vertical" size={24} color="black" />);

const duplicateEvent = async () => {
  // console.log("duplicate");
  // console.log(event.date, event.endDate, event.description, event.materials, event.shifts, event.title, event.location);
  const doc = await addDoc(collection(db, "events"), event);
  // console.log(doc);
  const eventData = await getDoc(doc);
  // console.log(item);
  // console.log(eventData.id);
  const dataEvent = eventData.data();
  dataEvent["id"] = eventData.id;
  const data = {item: dataEvent}
  // console.log(data);
  nav.navigate("EditEvent",{item: data});
}

const deleteEvent = async () => {
  Alert.alert('Are you sure you want to delete this event?', '', [
    {
      text: 'Cancel',
      // onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'OK', onPress: async () => {
      await deleteDoc(doc(db, "events", item.item.id));
      // console.log(item.item.id);
      nav.navigate("AdminEvents");}},
  ]);
}

  return (
    <ScrollView style={styles.container}>
    {/* <Text style={styles.header}>Event</Text> */}
    
    <View style={{flex: 1, flexDirection:'row', justifyContent: 'center', alignItems: 'center', marginVertical: "3%"}}>
    <Text style={styles.title}>{event.title}</Text>
    <Octicons name="pencil" size={24} color="black" style={{position: 'absolute',justifyContent: 'flex-end', right: '11%'}} onPress = {()=>{nav.navigate("EditEvent",{item: item});}} />
    {/* <TouchableOpacity onPress = {()=>{nav.navigate("EditEvent",{item: item});}} style={styles.saveButton}><Text style={styles.saveButtonText}>Edit</Text></TouchableOpacity> */}
    <View style={{position: 'absolute',justifyContent: 'flex-end', right: '2%'}}>
      <OptionsMenu
        customButton={myIcon}
        buttonStyle={{ resizeMode: "contain" }}
        destructiveIndex={1}
        options={["Duplicate", "Delete", "Cancel"]}
        actions={[duplicateEvent, deleteEvent, () => {}]}/>
    </View>
  </View>
    
      {/* <Text style={styles.subtitle}>Date: {new Date(event.date).toLocaleDateString()}</Text> */}
      <Text style={styles.subtitle}>Start Date: {event.date}</Text>
      <Text style={styles.subtitle}>End Date: {event.endDate}</Text>
      <Text style={styles.subtitle}>Location: {event.location}</Text>
      <Text style={styles.sectionTitle}>Event Description: </Text>
      <Text style={styles.description}>{event.description}</Text>
      <Text style={styles.sectionTitle}>Select a Work Shift</Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={shiftsData}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select item"
          searchPlaceholder="Search..."
          value={value}
          onChange={item => {
            setValue(item);
          }}
          renderItem={renderItem}
      />
      <Text style={styles.sectionTitle}>Materials Checklist</Text>
      {materials ? materials.map((material,index) => (
            <View key={index} style={styles.checkboxContainer}>
              <Checkbox
                value={materials[index].isSelected || false}
                onValueChange={() => toggleMaterial(index)}
                style={styles.checkbox}
              />
              <Text style={styles.label}>{material ? material.item : ""}</Text>
            </View>
          )):null}
      <Text style={styles.sectionTitle}>Comments</Text>
      <TextInput onChangeText={text => setDesc(text)} style={styles.textInput} multiline placeholder="Additional comments" />
      <TouchableOpacity style={styles.button} onPress={async ()=> 
            {
              // console.log(value.shift);
              await updateDoc(value.shift, {
              user: arrayUnion(auth.currentUser.uid),
          });
          // console.log(event.id)
          const eventDoc = doc(db, "events", event.id);
          // console.log(eventDoc);
          let index = 0;
          const arr = [];
          materials.map(m => {
            if (!m.user) {
              if (materials[index].isSelected)
                m.user = auth.currentUser.uid;
              index++;
            }
            arr.push(m);
          })
          // console.log(arr)
          await updateDoc(eventDoc, {
            materials: arr
          });
          await updateDoc(doc(db, "users", auth.currentUser.uid), {
            events: arrayUnion(event.id)
          });
          Alert.alert("Successfully Signed Up for " + event.title + "!");
          nav.navigate("AdminEvents");
          }}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
      </ScrollView>
  )
}

const DATA = [
  {
    id: '1',
    name: 'Name',
    phoneNumber: 'Phone Number',
  },
  {
    id: '2',
    name: 'Name',
    phoneNumber: 'Phone Number',
  },
];

const renderItem = ({ item }) => (
  <View style={styles.item}>
    <View style={styles.circle} />
    <View style={styles.textContainer}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.phoneNumber}>{item.phoneNumber}</Text>
    </View>
    <TouchableOpacity style={styles.seeMoreButton}>
      <Text style={styles.seeMoreButtonText}>See more →</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.moreButton}>
      <Text style={styles.moreButtonText}>...</Text>
    </TouchableOpacity>
  </View>
);

function Availability() {
  const [selectedValueShift, setSelectedValueShift] = useState("");
  const [isMaterialSelected, setIsMaterialSelected] = useState(false);
  const [toggleValue, setToggleValue] = useState(false);

  return (
    // <ScrollView contentContainerStyle={styles.container}>
    <View contentContainerStyle={styles.container}>
        <View style={styles.container2}>
          <Text style={styles.text}>Event Organizers</Text>
          <TouchableOpacity style={styles.reminderButton}>
            <Text style={styles.reminderButtonText}>Send Reminder</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <View style={styles.container2}>
          <Text style={styles.text}>Time Slot 1 (00:00 - 00:00)</Text>
          <TouchableOpacity style={styles.reminderButton}>
            <Text style={styles.reminderButtonText}>Send Reminder</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />  
        <View style={styles.container2}>
          <Text style={styles.text}>Time Slot 2 (00:00 - 00:00)</Text>
          <TouchableOpacity style={styles.reminderButton}>
            <Text style={styles.reminderButtonText}>Send Reminder</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />  
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#F8F8F8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#6A466C',
    textAlign: 'center',
    justifyContent: 'flex-end', // Align vertically to bottom
    padding: 80,
    paddingBottom: 10, // Add padding at the bottom if needed for visual appeal
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
    // marginRight: '20%'
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    marginVertical: "2%",
    marginLeft: "5%",
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '500',
    marginVertical: "2%",
    marginLeft: "5%",
  },
  description: {
    fontSize: 16,
    marginLeft: "5%",
    marginBottom: "2%",
    fontWeight: '400',
  },
  label: {
    fontSize: 16,
    // marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row', // Align items in a row
    alignItems: 'center', // Center items vertically
    paddingLeft: 20, // Add padding to the left of the checkbox container specifically
    marginBottom: 3, // Add some space between this item and the next
  },
  checkbox: {
    marginRight: 8, // Add some space between the checkbox and the label
  },
  pickerContainer: {
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 20,
    backgroundColor: "#F1F1F2",
  },
  picker: {
    width: '100%',
  },
  textInput: {
    height: 100,
    textAlignVertical: 'top',
    textAlign: 'left',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10, 
    fontSize: 16,
    borderRadius: 5,
    backgroundColor: "#F1F1F2",
    margin: 10,
  },
  button: {
    backgroundColor: '#6A466C',
    padding: 15,
    margin: 10,
    borderRadius: 5,
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  timeSlot: {
    backgroundColor: "#b9b9bd",
    height: "80%",
    padding: "2%"
  },
  saveButton: {
    position: 'absolute',
    alignItems: 'flex-end',
    // marginLeft: '20%',
    right: "5%",
  },
  saveButtonText: {
    fontSize: 18,
    color: "#6A466C"
  },
  dropdown: {
    marginLeft: "4%",
    marginBottom:"2%",
    height: "7%",
    width: "90%",
    backgroundColor: 'F1F1F2',
    borderRadius: 12,
    borderWidth: 1,
    borderColor:"8E8E93",
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center', 
    paddingLeft: 20, 
    marginBottom: 3, 
  },
  checkbox: {
    marginRight: 8,
  },
  container2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ECECEC',
    paddingHorizontal: 10,
    paddingVertical: 10,
},
text: {
    fontSize: 17,
    color: 'black',
    textAlign: 'left',
},
reminderButton: {
    backgroundColor: '#6A466C',
    borderRadius: 10,
    padding: 3,
    paddingHorizontal: 7,
},
reminderButtonText: {
    color: 'white',
    fontSize: 15,
},
item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20, 
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'lightgrey',
    marginRight: 10,
    paddingTop: 20,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    paddingTop: 5,
  },  
  phoneNumber: {
    fontSize: 14,
    color: 'grey',
  },
  moreButton: {
    paddingHorizontal: 10,
    marginRight: 10,
    position: 'absolute',
    top: -10,
    right: 0,
  },
  moreButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
