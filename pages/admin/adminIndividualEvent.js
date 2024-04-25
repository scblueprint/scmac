import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native'; 
import { Picker } from '@react-native-picker/picker';
import Checkbox from 'expo-checkbox';
import { getFirestore, collection, doc, setDoc, getDoc, getDocs, updateDoc, arrayUnion } from 'firebase/firestore';
import { Dropdown } from 'react-native-element-dropdown';
import { AntDesign } from '@expo/vector-icons';
import { auth, db } from '../../firebaseConfig';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';

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
      eventData.shifts.forEach(async element => {
        const shiftDoc = doc(db, 'shifts', element);
        const shift = await getDoc(doc(db, 'shifts', element));
        // console.log(shift.data())
        arr.push({shift: shiftDoc, label: new Date(shift.data().startTime*1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) + " - " + new Date(shift.data().endTime*1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), value:new Date(shift.data().startTime*1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) + " - " + new Date (shift.data().endTime*1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })})
        // console.log(arr);
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
          // id: event.id,
          title: eventData.title,
          date: eventData.date,
          description: eventData.description,
          location: eventData.location,
          materials: eventData.materials,
          shifts: eventData.shifts,
        }

      setEvent(fetchedEvents);
      // console.log(event.data())
    }
    fetchData();
 }, []))

 const toggleMaterial = (index) => {
  const updatedMaterials = [...materials];
  updatedMaterials[index].isSelected = !updatedMaterials[index].isSelected;
  setMaterials(updatedMaterials);
};

  return (
    <ScrollView style={styles.container}>
    {/* <Text style={styles.header}>Event</Text> */}
    <View style={{flex: 1, flexDirection:'row', marginTop: "4%", alignItems: "center", justifyContent: "center", marginBottom: "3%"}}>
      <Text style={styles.title}>{event.title}</Text>
      <TouchableOpacity onPress = {()=>{nav.navigate("EditEvent",{item: item});}} style={styles.saveButton}><Text style={styles.saveButtonText}>Edit</Text></TouchableOpacity>
    </View>
    
      <Text style={styles.subtitle}>Date: {new Date(event.date).toLocaleDateString()}</Text>
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
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
      </ScrollView>
  )
}

function Availability() {
  const [selectedValueShift, setSelectedValueShift] = useState("");
  const [isMaterialSelected, setIsMaterialSelected] = useState(false);
  const [toggleValue, setToggleValue] = useState(false);
  
  return (
    <ScrollView style={styles.container}>
    {/* <Text style={styles.header}>Event</Text> */}
    <Text style={styles.timeSlot}>Time Slot 1 (00:00 - 00:00)</Text>
    <Text style={styles.timeSlotBody}>Person 1</Text>
      </ScrollView>
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
    // marginLeft: "30%",
    textAlign: 'center',
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
});
