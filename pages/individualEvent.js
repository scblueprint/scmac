import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import Navbar from '../components/NavBar';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDocs } from 'firebase/firestore';
import { firebaseConfig } from '../firebaseConfig';
import { db } from '../firebaseConfig';

export default function EventDetailScreen() {
    const [selectedValueShift, setSelectedValueShift] = useState("");
    const [events, setEvents] = useState([]);
    const [isMaterialSelected, setIsMaterialSelected] = useState(false);
    const [materials, setMaterials] = useState([]);
    
  useEffect(() => {
    const fetchEvents = async () => {
      const eventsCollection = await getDocs(collection(db,'events'));
      const querySnapshot = await eventsCollection.docs.map(doc => {
        const data = doc.data();
  
      const fetchedEvents = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          date: data.date,
          description: data.description,
          location: data.location,
          materials: data.materials,
          shifts: data.shifts,
        };
      });
  
      setEvents(fetchedEvents);
    });
  
    fetchEvents();
    [];
    
  }

  const toggleMaterial = (index) => {
    const updatedMaterials = [...materials];
    updatedMaterials[index].isSelected = !updatedMaterials[index].isSelected;
    setMaterials(updatedMaterials);
  };

  return (
    <ScrollView style={styles.container}>
      {events.map(event => (
        <View key={event.id}>
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.subtitle}>{new Date(event.date.seconds * 1000).toLocaleDateString()}</Text>
          <Text style={styles.subtitle}>{event.location}</Text>
          <Text style={styles.sectionTitle}>Event Description</Text>
          <Text style={styles.description}>{event.description}</Text>
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
          {event.materials.map((material, index) => (
            <View key={index} style={styles.checkboxContainer}>
              <CheckBox
                value={material.isSelected || false}
                onValueChange={() => toggleMaterial(index)}
                style={styles.checkbox}
              />
              <Text style={styles.label}>{material.item}</Text>
            </View>
          ))}
          <Text style={styles.sectionTitle}>Comments</Text>
          <TextInput style={styles.textInput} multiline placeholder="Additional comments" />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

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