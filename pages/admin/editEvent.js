import React, { useState, setState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CheckBox from 'expo-checkbox';
import { Entypo } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {editEvent, getShiftData} from '../api/event'
import { Dropdown } from 'react-native-element-dropdown';
let nextId = 0;
let nextShiftsId = 0;

const DATA = [
  { label: 'Ceramics', value: '1' },
  { label: 'Show', value: '2' },
  { label: 'Gallery', value: '3' },
];

export default function EditEventScreen({route, navigation}) {
    const { item } = route.params;
    // console.log("WELKFJWELKJFELWJFLKEWJFELKWJFLKj")
    // console.log(item.item)
    const [selectedValueShift, setSelectedValueShift] = useState("");
    const [isMaterialSelected, setIsMaterialSelected] = useState(false);
    const [materials, setMaterials] = useState(item.item.materials.filter(item => item.user=="").map((item, index) => ({ id: nextId++, name: item.item, selected: false })));
    const [shifts, setShifts] = useState([]);
    const [isEventStartPickerVisible, setEventStartPickerVisibility] = useState(false);
    const [isEventEndPickerVisible, setEventEndPickerVisibility] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [eventStart, setEventStart] = useState(item.item.date);
    const [eventEnd, setEventEnd] = useState(item.item.endDate);
    const [editingTimeShiftID, setEditingTimeShiftID] = useState("");
    const [editingType, setEditingType] = useState("");
    const [desc, setDesc] = useState(item.item.description);
    const [location, setLocation] = useState(item.item.location);
    const [name, setName] = useState(item.item.title);
    const [isDateTimePickerVisible, setDateTimePickerVisibility] = useState(false);
    const [value, setValue] = useState(item.item.category);

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {/* {console.log(item.value)}
        {console.log(value)} */}
        {item.value === value && (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
        {/* <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          /> */}
      </View>
    );
  };


    const showEventStartPicker = () => {
      setEventStartPickerVisibility(true);
  };
  
  const hideEventStartPicker = () => {
      setEventStartPickerVisibility(false);
  };
  
  const handleEventStartConfirm = (date) => {
    setEventStart(`${Math.floor(date.getTime() / 1000)
  //     .toLocaleString('en-US', 
  //   {
  //     weekday: 'short', // 'Fri'
  //     month: 'short',   // 'May'
  //     day: 'numeric',   // '03'
  //     hour: '2-digit',  // '02' or '14'
  //     minute: '2-digit' // '30'
  // })
}`);};
  
  const showEventEndPicker = () => {
      setEventEndPickerVisibility(true);
  };
  
  const hideEventEndPicker = () => {
      setEventEndPickerVisibility(false);
  };
  
  const handleEventEndConfirm = (date) => {
      setEventEnd(`${Math.floor(date.getTime() / 1000)
    //     .toLocaleString('en-US', {
    //     weekday: 'short', // 'Fri'
    //     month: 'short',   // 'May'
    //     day: 'numeric',   // '03'
    //     hour: '2-digit',  // '02' or '14'
    //     minute: '2-digit' // '30'
    // })
  }`);
      hideEventEndPicker();
  };
  
  const showDateTimePicker = (index, type) => {
      setEditingTimeShiftID(index);
      setEditingType(type);
      setDateTimePickerVisibility(true);
  };
  
  const hideDateTimePicker = () => {
      setDateTimePickerVisibility(false);
  };
  
  const handleDateTimeConfirm = (dateTime) => {
    const timestamp = Math.floor(dateTime.getTime() / 1000);
    setShifts(shifts.map((shift, index) => {
        if (index === editingTimeShiftID) {
            return {
                ...shift, // Spread the existing properties
                [editingType === "start" ? "startTime" : "endTime"]: timestamp // Update only the relevant field
            };
        }
        return shift;
    }));
    hideDateTimePicker();
};
  
  const addShift = () => {
      setShifts([...shifts, { id: nextShiftsId++, start: null, end: null }]);
  };
  
  const deleteShift = (index) => {
      setShifts(shifts.filter((_, i) => i !== index));
  };
  
  const isEmpty = (value) => {
      return (value == null || (typeof value === "string" && value.trim().length === 0));
  };

  useEffect(() => {
    async function fetchData() {
      // You can await here
      // console.log("KJWEHFKJEWHFJEHWKF")
      var shiftData = await getShiftData(item.item.shifts);
      console.log(shiftData)
      setShifts(shiftData)
      // ...
    }
    fetchData();
  }, []);

  return (
    <ScrollView style={styles.container}>
           <DateTimePickerModal
                isVisible={isEventStartPickerVisible}
                mode="datetime"
                onConfirm={handleEventStartConfirm}
                onCancel={hideEventStartPicker}
            />

            <DateTimePickerModal
                isVisible={isEventEndPickerVisible}
                mode="datetime"
                onConfirm={handleEventEndConfirm}
                onCancel={hideEventEndPicker}
            />

            <DateTimePickerModal
                isVisible={isDateTimePickerVisible}
                mode="datetime"
                onConfirm={handleDateTimeConfirm}
                onCancel={hideDateTimePicker}
            />

<TouchableOpacity style={styles.saveButton} onPress={async () => {
  if (isEmpty(name)) {
    Alert.alert("Event Name Required");
    return;
}
if (eventStart == "Choose Start Date and Time") {
  Alert.alert("Start Date Required");
  return;
}
if (eventEnd == "Choose End Date and Time") {
  Alert.alert("End Date Required");
  return;
}
if (isEmpty(desc)) {Alert.alert("Description Required"); return;}
                  await editEvent(item.item.id, eventStart, eventEnd, desc, materials, shifts, name, location, value);
                  navigation.goBack();
                  navigation.goBack();
                }}><Text style={styles.saveButtonText}>Save</Text></TouchableOpacity>

            <TextInput style={styles.eventTextInput} onChangeText={text => setName(text)} placeholder={name==""?"Event Name": name} />

            <TouchableOpacity style={styles.date} onPress={showEventStartPicker}>
                <Entypo name="calendar" size={30} color="black" />
                <Text style={styles.subtitle}>{new Date(eventStart * 1000).toLocaleString('en-US', {
        weekday: 'short', // 'Fri'
        month: 'short',   // 'May'
        day: 'numeric',   // '03',
        year: '2-digit',
        hour: '2-digit',  // '02' or '14'
        minute: '2-digit' // '30'
    })}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.date} onPress={showEventEndPicker}>
                <Entypo name="calendar" size={30} color="black" />
                <Text style={styles.subtitle}>{new Date(eventEnd * 1000).toLocaleString('en-US', {
        weekday: 'short', // 'Fri'
        month: 'short',   // 'May'
        day: 'numeric',   // '03',
        year: '2-digit',
        hour: '2-digit',  // '02' or '14'
        minute: '2-digit' // '30'
    })}</Text>
            </TouchableOpacity>

            <View style={styles.location}>
                <SimpleLineIcons name="location-pin" size={30} color="black" />
                <TextInput onChangeText={text => setLocation(text)} style={styles.locationInput} placeholder={location==""?"Add Location": location} />
            </View>


            <Text style={styles.sectionTitle}>Work Shifts</Text>
            {shifts.map((shift, index) => {
              return(
                <View style={styles.shiftContainer} key={index}>
                    <TouchableOpacity onPress={() => showDateTimePicker(index, "start")}>
                        <Text>{shift.startTime ? new Date(shift.startTime * 1000).toLocaleString() : "Set Start Time"}</Text>
                    </TouchableOpacity>
                    <Text> - </Text>
                    <TouchableOpacity onPress={() => showDateTimePicker(index, "end")}>
                        <Text>{shift.endTime ? new Date(shift.endTime * 1000).toLocaleString() : "Set End Time"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteShift(index)}>
                        <AntDesign name="delete" size={25} color="black" />
                    </TouchableOpacity>
                </View>
            )})}

            <TouchableOpacity onPress={addShift}>
                <Text>Add Shift</Text>
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
      <Text style={styles.sectionTitle}>Event Category</Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={DATA}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select item"
              searchPlaceholder="Search..."
              value={value}
              onChange={item => {
                // console.log(item)
                setValue(item);
              }}
              renderItem={renderItem}
            />
      <Text style={styles.sectionTitle}>Event Description</Text>
      <TextInput style={styles.textInput} onChangeText={text => setDesc(text)} multiline placeholder={desc} />
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
  dropdown: {
    marginLeft: "4%",
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
    fontSize: 25,
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
    paddingTop: 5,
    paddingBottom: 5,
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
