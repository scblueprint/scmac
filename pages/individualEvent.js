import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CheckBox from 'expo-checkbox';
import DropDownPicker from 'react-native-dropdown-picker';

export default function EventDetailScreen() {
    const [selectedValueShift, setSelectedValueShift] = useState("");
    const [isMaterialSelected, setIsMaterialSelected] = useState(false)
      const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
             {label: 'First', value: 1},                  
             {label: 'Second', value: 2},
             {label: 'Third', value: 3},
               ]);
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Event</Text>
      <Text style={styles.title}>Event Name</Text>
      <Text style={styles.subtitle}>Date</Text>
      <Text style={styles.subtitle}>Location</Text>
      <Text style={styles.sectionTitle}>Event Description</Text>
      <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...</Text>
      <Text style={styles.sectionTitle}>Select a Work Shift</Text>
       <>
<DropDownPicker
  open={open}
  value={value}
  items={items}
  setOpen={setOpen}
  setValue={setValue}
  setItems={setItems}
  placeholder={"Select"}
  style={{
    backgroundColor: "#F1F1F2",
    borderWidth: 1,
    borderColor: "#dcdcdc",
    width: "90%",
    paddingHorizontal: 10,
    marginHorizontal: "5%",
    marginVertical: 5,
    borderRadius: 10,

  }}
  placeholderStyle={{
    color: "#808080",
  }}
  dropDownContainerStyle={{
  borderColor: "#ccc",
  width: "90%", // Set this to match the width of the main container
  marginHorizontal: "5%", 
  }}
/>

      </>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
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

});
