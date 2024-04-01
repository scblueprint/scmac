import React, { useState, setState } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CheckBox from 'expo-checkbox';
import { Entypo } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

let nextId = 0;

export default function CreateEventScreen() {
    const [selectedValueShift, setSelectedValueShift] = useState("");
    const [isMaterialSelected, setIsMaterialSelected] = useState(false);
    const [materials, setMaterials] = useState([]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Create Event</Text>
      <TouchableOpacity style={styles.saveButton}><Text style={styles.saveButtonText}>Save</Text></TouchableOpacity>
      <TextInput style={styles.eventTextInput} placeholder="Event Name"></TextInput>
      <TouchableOpacity style={styles.date}>
        <Entypo name="calendar" size={"30%"} color="black" />
        <Text style={styles.subtitle}>Day, Date</Text>
      </TouchableOpacity>
      <View style={styles.location}>
        <SimpleLineIcons name="location-pin" size={"30%"} color="black" />
        <TextInput style={styles.locationInput} placeholder="Add Location"></TextInput>
      </View>
      <Text style={styles.sectionTitle}>Work Shifts</Text>
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
        <Text style={styles.label}>Add Option</Text>
      </View>
      <Text style={styles.sectionTitle}>Materials Checklist</Text>
      <ScrollView>
      {materials.map((material, index) => (
          <View style={styles.checkboxContainer} key={index}>
            <CheckBox
          value={isMaterialSelected}
          onValueChange={setIsMaterialSelected}
          style={styles.checkbox}
        />
        <TextInput style={styles.label} placeholder='Material'>{material.name}</TextInput>
        <TouchableOpacity onPress={() => {let index1 = index; console.log(index1); setMaterials(
                materials.filter((material) =>
                  material.index !== index1,
                  console.log(m.index)
                )
              );}}>
            <AntDesign name="delete" size={"20%"} color="black" style={{marginLeft: "15%"}} />
        </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity style={styles.checkboxContainer} onPress={() => {setMaterials([
          ...materials,
          { id: nextId++, name: "", selected: false }
        ]);}}>
        <CheckBox
          style={styles.checkbox}
        />
        <Text style={styles.addLabel}>Add Option</Text>
      </TouchableOpacity>
      </ScrollView>
      <View style={styles.checkboxContainer}>
      </View>
      <Text style={styles.sectionTitle}>Event Description</Text>
      <TextInput style={styles.textInput} multiline placeholder="Add Event Description" />
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
    marginBottom: 10
  },
  addLabel: {
    fontSize: 16,
    marginBottom: 10,
    color: "#8E8E93"
  },
  checkboxContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
    paddingLeft: 20, 
    marginBottom: 3,
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
  eventTextInput: {
    height: '5%',
    textAlign: 'center',
    borderColor: '#ccc',
    borderRadius: 3,
    backgroundColor: "#F1F1F2",
    margin: "5%",
    fontSize: "20%",
    padding: 10, 
    borderWidth: 1,
  },
  locationInput: {
    width: '85%',
    textAlign: 'left',
    borderColor: '#ccc',
    borderRadius: 3,
    backgroundColor: "#F1F1F2",
    fontSize: "15%",
    paddingLeft: "2%", 
    borderWidth: 1,
    marginLeft: "3%"
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
  date: {
    marginTop: '-1%',
    margin: "2%",
    marginLeft: "5%",
    flexDirection: 'row'
  },
  location: {
    margin: "2%",
    marginLeft: "5%",
    flexDirection: 'row',
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
  saveButton: {
    alignItems: 'flex-end',
    marginTop: '3%',
    marginRight: '3%'
  },
  saveButtonText: {
    fontSize: "18%",
    color: "#6A466C"
  }
});
