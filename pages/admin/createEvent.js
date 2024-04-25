import React, { useState, setState } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CheckBox from 'expo-checkbox';
import { Entypo } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {createEvent} from "../api/event.js"
let nextId = 0;
let nextShiftsId = 0;
//anirudh and karti
export default function CreateEventScreen({navigation}) {
    const [selectedValueShift, setSelectedValueShift] = useState("");
    const [isMaterialSelected, setIsMaterialSelected] = useState(false);
    const [materials, setMaterials] = useState([]);
    const [shifts, setShifts] = useState([]);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [dateDay, setDateDay] = useState("Day, Date");
    const [editingTimeShiftID, setEditingTimeShiftID] = useState("");
    const [editingType, setEditingType] = useState("");
    const [desc, setDesc] = useState("");
    const [location, setLocation] = useState("");
    const [name, setName] = useState("");



  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    // console.warn("A date has been picked: ", date);
    setDateDay(date.toDateString());
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (time) => {
    // console.warn("A time has been picked: ", time);
    const updatedShifts = shifts.map((s, i) => {
      if (i === editingTimeShiftID) {
        const toTimestamp = date => Math.floor(date.getTime() / 1000);
        if (editingType === "start"){
          s.start = toTimestamp(time).toString();
        }
        else{
          s.end = toTimestamp(time).toString();
        }
        return s;
      } else return s;
    });
    setShifts(updatedShifts);
    hideTimePicker();
  };

  function isEmpty(value) {
    return (value == null || (typeof value === "string" && value.trim().length === 0));
  }

  return (
    <ScrollView style={styles.container}>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
      />
      {/* <Text style={styles.header}>Create Event</Text> */}

      <TouchableOpacity style={styles.saveButton}><Text style={styles.saveButtonText}>Save</Text></TouchableOpacity>
      
      <TextInput style={styles.eventTextInput} onChangeText={text => setName(text)} placeholder="Event Name"></TextInput>
      
      <TouchableOpacity style={styles.date} onPress={showDatePicker}>
        <Entypo name="calendar" size={30} color="black" />
        <Text style={styles.subtitle}>{dateDay}</Text>
      </TouchableOpacity>

      <View style={styles.location}>
        <SimpleLineIcons name="location-pin" size={30} color="black" />
        <TextInput onChangeText={text => setLocation(text)} style={styles.locationInput} placeholder="Add Location"></TextInput>
      </View>

      <Text style={styles.sectionTitle}>Work Shifts</Text>
      {shifts.map((shift, index) => (
          <View style={styles.checkboxContainer} key={index}>
            <TouchableOpacity style={styles.shift} onPress={() => {showTimePicker(); setEditingTimeShiftID(index); setEditingType("start")}}>
            <Text> {shift.start ? new Date(parseInt(shift.start)*1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) :  "Choose Time"} </Text>
        </TouchableOpacity>
        <Text style={styles.dash}> - </Text>
        <TouchableOpacity style={styles.shift} onPress={() => {showTimePicker(); setEditingTimeShiftID(index); setEditingType("end")}}>
          <Text> {shift.end ? new Date(parseInt(shift.end)*1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) :  "Choose Time"} </Text>

        </TouchableOpacity>
        <TouchableOpacity onPress={() => {setShifts(
          shifts.slice(0,index).concat(shifts.slice(index+1))
              );}}>
            <AntDesign name="delete" size={25} color="black" style={{marginLeft: "15%", marginTop: "5%"}} />
        </TouchableOpacity>
          </View>
        ))}

      <TouchableOpacity style={styles.checkboxContainer} onPress={() => {setShifts([
          ...shifts,
          { id: nextShiftsId++, name: "", start: null, end: null }
        ]);}}>
        <Text style={styles.addShiftLabel}>Add Shift</Text>
      </TouchableOpacity>


      <Text style={styles.sectionTitle}>Materials Checklist</Text>
      <View>
      {materials.map((material, index) => (
          <View style={styles.checkboxContainer} key={index}>
            <CheckBox
            disabled
          value={isMaterialSelected}
          onValueChange={setIsMaterialSelected}
          style={styles.checkbox}
        />
        <TextInput style={styles.label} onChangeText={newText => material.name = newText} key={material.id} placeholder='Material'>{material.name}</TextInput>
        <TouchableOpacity onPress={() => {setMaterials(
          materials.slice(0,index).concat(materials.slice(index+1))
              );}}>
            <AntDesign name="delete" size={20} color="black" style={{marginLeft: "15%"}} />
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
        <Text style={styles.addLabel}>Add Material</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.checkboxContainer}>
      </View>
      <Text style={styles.sectionTitle}>Event Description</Text>
      <TextInput onChangeText={text => setDesc(text)} style={styles.textInput} multiline placeholder="Add Event Description" />
      <TouchableOpacity 
          onPress={async () => {
            if (isEmpty(name)) {Alert.alert("Event Name Required"); return;}
            await createEvent(dateDay, desc, materials, shifts, name, location);
            navigation.navigate("AdminEvents");
          }}
      style={styles.button}>
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
    color: "#8E8E93",
  },
  addShiftLabel: {
    fontSize: 16,
    marginTop: "2%",
    color: "#8E8E93",
  },
  checkboxContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
    paddingLeft: 20, 
    marginBottom: 3,
  },
  shift: {
    backgroundColor: "gray",
    borderWidth: 2,
    borderRadius: 5,
    padding: "2%"
  },
  shiftContainer: {
    flexDirection: 'row',
  },
  dash: {
    fontSize: 25
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
    height: '6%',
    textAlign: 'center',
    borderColor: '#ccc',
    borderRadius: 3,
    backgroundColor: "#F1F1F2",
    margin: "5%",
    fontSize: 20,
    // padding: 10, 
    borderWidth: 1,
  },
  locationInput: {
    width: '85%',
    textAlign: 'left',
    borderColor: '#ccc',
    borderRadius: 3,
    backgroundColor: "#F1F1F2",
    fontSize: 15,
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
    fontSize: 18,
    color: "#6A466C"
  }
});
