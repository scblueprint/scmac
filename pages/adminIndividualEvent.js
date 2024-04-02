import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CheckBox from 'expo-checkbox';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

export default function AdminEventDetailScreen() {
  return (
    // <ScrollView style={styles.container}>
    // <Text style={styles.header}>Event</Text>
    // </ScrollView>
    <MyTabs/>
  );
};

function MyTabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator style={{marginTop: "10%"}}>
      <Tab.Screen name="Details" component={Details} />
      <Tab.Screen name="Availability" component={Availability} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

function Details() {
  const [selectedValueShift, setSelectedValueShift] = useState("");
    const [isMaterialSelected, setIsMaterialSelected] = useState(false);
    const [toggleValue, setToggleValue] = useState(false);
  return (
    <ScrollView style={styles.container}>
    <Text style={styles.header}>Event</Text>
    <Text style={styles.title}>Event Name</Text>
      <Text style={styles.subtitle}>Date</Text>
      <Text style={styles.subtitle}>Location</Text>
      <Text style={styles.sectionTitle}>Event Description</Text>
      <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...</Text>
      <Text style={styles.sectionTitle}>Select a Work Shift</Text>
       <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedValueShift}
          onValueChange={(itemValue, itemIndex) => setSelectedValueShift(itemValue)}
          style={styles.picker}
          dropdownIconColor={"#000000"}
          mode={"dropdown"}
          prompt={"select"}
        >
          <Picker.Item label="Morning Shift" value="morning" />
          <Picker.Item label="Afternoon Shift" value="afternoon" />
          <Picker.Item label="Night Shift" value="night" />
        </Picker>
      </View>
      <Text style={styles.sectionTitle}>Materials Checklist</Text>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={isMaterialSelected}
          onValueChange={setIsMaterialSelected}
          style={styles.checkbox}
        />
        <Text style={styles.label}>Item 1</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={isMaterialSelected}
          onValueChange={setIsMaterialSelected}
          style={styles.checkbox}
        />
        <Text style={styles.label}>Item 2</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={isMaterialSelected}
          onValueChange={setIsMaterialSelected}
          style={styles.checkbox}
        />
        <Text style={styles.label}>Item 3</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={isMaterialSelected}
          onValueChange={setIsMaterialSelected}
          style={styles.checkbox}
        />
        <Text style={styles.label}>Item 4</Text>
      </View>
      <Text style={styles.sectionTitle}>Comments</Text>
      <TextInput style={styles.textInput} multiline placeholder="Additional comments" />
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
    <Text style={styles.header}>Event</Text>
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
    marginVertical: 10,
    textAlign: 'center',

  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    marginVertical: 5,
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '500',
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 10,
  },
  description: {
    fontSize: 16,
    marginLeft: 10,
    marginRight: 10,
    fontWeight: '400',

  },
  label: {
    fontSize: 16,
    marginBottom: 10,
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
    height: "20%",
    padding: "2%"
  }
});
