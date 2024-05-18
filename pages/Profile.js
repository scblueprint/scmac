import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar.js';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, FlatList } from 'react-native';
import {getCurrentUserData} from '../pages/api/users';
import { auth, db } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import Checkbox from 'expo-checkbox';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { doc, getDoc, getDocs, snapshotEqual, updateDoc, query, collection, where, documentId, arrayRemove } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker'; 
// import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';
import { storage } from '../firebaseConfig.js';
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import { SimpleLineIcons, AntDesign } from '@expo/vector-icons';

export default function Profile({navigation}) {
  const [uid, setUid] = useState("");
  const [admin, setAdmin] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [interests, setInterests] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const [pottery, setPottery] = useState(false);
  const [gallery, setGallery] = useState(false);
  const [events, setEvents] = useState(false);
  const [facilities, setFacilities] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  // const [image, setImage] = useState(null); //added
  const [uploading, setUploading] = useState(false);
  const [downloadURL, setImageURL] = useState("");
  const [eventsData, setEventsData] = useState([]);
 
  let i = 0;

  const signOutFunc = async () => {
    signOut(auth).then(() => {
      navigation.navigate("Login");
    }).catch((error) => {
      console.log(error);
    });
  }

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
    
  const pickImage = async () =>{
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All, //all:img, videos
        aspect: [4,3],
        quality: 1,
      });
      if (!result.canceled){
        setImageURL(result.assets[0].uri);
        await uploadMedia(result.assets[0].uri);
        // console.log(image)
      }
  };

  //upload media files
  const uploadMedia = async (img) => {
    setUploading(true);
    const response = await fetch(img);
    const blob = await response.blob();

    const storageRef = ref(storage, uid);
    const uploadTask = uploadBytesResumable(storageRef, blob);

      getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
        console.log(downloadURL);
        setImageURL(downloadURL);
        // setImage(downloadURL);
      })
    

    Alert.alert('Photo Uploaded!');
};
  useEffect( () => {
    async function fetchData() {
      data = await getCurrentUserData();
      // console.log(data);
      const arr2 = [];
      if (data.events) {
      data.events.forEach(async el => {
        // console.log(el);
        const eventDoc = doc(db, "events", el);
        const temp = await getDoc(eventDoc);
        // const temp = await getDoc(doc(db, "events", data.events[0]));
        const eventData = temp.data();
        eventData["id"] = el;
        // arr2.push(eventData);
        if (new Date() < new Date(eventData.endDate*1000)) arr2.push(eventData);
        // console.log(eventData);
        setEventsData(arr2);
      });
    }
      // console.log(eventsData);
      setAdmin(data.admin);
      setFirstName(data.fname);
      setLastName(data.lname);
      setEmail(data.email);
      setPhoneNumber(data.phone);
      setGender(data.gender);
      setBirthday(data.birthday*1000);
      setInterests(data.interests);
      data.interests.forEach((el) => {
        if (el === "Pottery") setPottery(!pottery);
        if (el === "Gallery") setGallery(!gallery);
        if (el === "Events") setEvents(!events);
        if (el === "Facilities") setFacilities(!facilities);
      })
      setUid(data.uid);
      setImageURL(data.pfp);
    }
    fetchData();
 }, [])

 const EventItem = ({ item, nav }) => (                                    
  <TouchableOpacity key={item.id} style={styles.itemContainer} onPress={()=>{
    if (admin) {nav.navigate("AdminIndividualEvent", {item: item})}
    else {nav.navigate("IndividualEvent", {item: item})}
  }}>
    <AntDesign name="delete" size={24} color="black" onPress={() => {
      Alert.alert('Are you sure you want to drop out of this event?', '', [
        {
          text: 'Cancel',
          // onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: async () => {
          if (item.shifts.length !== 0) {
            const q = query(
              collection(db, "shifts"),
              where(documentId(), "in", 
                item.shifts
              ),
            );
            const productsDocsSnap = await getDocs(q);
      
            productsDocsSnap.forEach(async (document) => {
              // console.log(doc.id)
              if (document.data().user.includes(auth.currentUser.uid)) {
                console.log(document.id)

              await updateDoc(doc(db, "shifts", document.id), {
                user: arrayRemove(auth.currentUser.uid)
              })

              await updateDoc(doc(db, "users", auth.currentUser.uid), {
                events: arrayRemove(item.id)
              })

              data = await getCurrentUserData();
              const arr2 = [];
              if (data.events) {
              data.events.forEach(async el => {
                const eventDoc = doc(db, "events", el);
                const temp = await getDoc(eventDoc);
                const eventData = temp.data();
                eventData["id"] = el;
                if (new Date() < new Date(eventData.endDate*1000)) arr2.push(eventData);
                setEventsData(arr2);
              });
              }
            }
            });

          }
        }},
      ]);}
      } />
    <View style={styles.eventInfo}>
      {/* <Text style={styles.date}>{new Date(item.date).toDateString().split(' ').slice(1).join(' ')}</Text> */}
      <Text style={styles.date}>{new Date(item.date * 1000).toLocaleString('en-US', {
        weekday: 'short', // 'Fri'
        month: 'short',   // 'May'
        day: 'numeric',   // '03',
        year: '2-digit',
        hour: '2-digit',  // '02' or '14'
        minute: '2-digit' // '30'
    })}</Text>
      <Text style={styles.eventName}>{item.title}</Text>
      <Text style={styles.location}>{item.location}</Text>
    </View>
	<SimpleLineIcons name="arrow-right" size={24} color="black" />
  </TouchableOpacity>
);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
        <TouchableOpacity style = {styles.editButton}
          onPress ={async () => {if(isEditable){
              const arr = [];
              if (pottery) arr.push("Pottery");
              if (gallery) arr.push("Gallery");
              if (events) arr.push("Events");
              if (facilities) arr.push("Facilities");
              setInterests(arr);

              //HANDLE ERROR HANDLING HERE (CHECK ONCE THEY EDIT IF THEY ARE VALID EMAIL, NUMBER, ETC)
              
              const userDoc = doc(db, "users", auth.currentUser.uid);
              if (!firstName || !lastName|| !email|| !phoneNumber) {
                Alert.alert("Cannot leave field empty. Click edit again to learn more");
              }
              else {
                await updateDoc(userDoc, {
                  fname: firstName,
                  lname: lastName,
                  email: email,
                  phone: phoneNumber,
                  pfp: downloadURL,
                  gender: gender,
                  birthday: birthday / 1000,
                  interests: arr
                });
            }
          } 
          setIsEditable(!isEditable)}}>
          <Text style={styles.editText}>{isEditable?"Save":"Edit"}</Text>
        </TouchableOpacity>
      </View>
          <TouchableOpacity style={styles.selectButton} onPress={() => {if(isEditable) pickImage()}}>
            <View style={styles.imageContainer}>
              {downloadURL && <Image source={{ uri: downloadURL}} style={styles.image}/>}
            </View>
          </TouchableOpacity>
    <View style={styles.name}>
      <View style={{flexDirection:'row'}}>
        <TextInput style={{fontSize: 20, fontStyle:isEditable?"italic":"normal", backgroundColor:isEditable?"#D9D9D9":"#fff"}} editable={isEditable} onChangeText={setFirstName}>{firstName}</TextInput>
        <Text> </Text>
        <TextInput style={{fontSize: 20, fontStyle:isEditable?"italic":"normal", backgroundColor:isEditable?"#D9D9D9":"#fff"}} editable={isEditable} onChangeText={setLastName}>{lastName}</TextInput>
      </View>
    </View>
    <View style={styles.email}>
        <Text style={{fontSize:15, marginLeft:30 }}>Email:     </Text>
        <TextInput style={{fontStyle:isEditable?"italic":"normal", backgroundColor:isEditable?"#D9D9D9":"#fff"}} editable={isEditable} onChangeText={setEmail}>{email}</TextInput>
    </View>
    <View style={styles.number}>
      <Text style={{fontSize:15, marginLeft:30 }}>Phone number:     </Text>
      <TextInput style={{fontStyle:isEditable?"italic":"normal", backgroundColor:isEditable?"#D9D9D9":"#fff"}} editable={isEditable} onChangeText={setPhoneNumber}>{phoneNumber}</TextInput>
    </View>
    <View style={styles.gender}>
      <Text style={{fontSize:15, marginLeft:30 }}>Gender:     </Text>
      <TextInput style={{fontStyle:isEditable?"italic":"normal", backgroundColor:isEditable?"#D9D9D9":"#fff"}} editable={isEditable} onChangeText={setGender}>{gender}</TextInput>
    </View>
    <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />
    <View style={styles.birthday}>
      <Text style={{fontSize:15, marginLeft:30 }}>Birthday:     </Text>
      
      <TextInput style={{fontStyle:isEditable?"italic":"normal", backgroundColor:isEditable?"#D9D9D9":"#fff"}} editable={false} onPressIn={()=> {if(isEditable)showDatePicker()}}>{new Date(birthday).toDateString().split(' ').slice(1).join(' ')}</TextInput>
    </View>
    <View style={styles.interests}>
      <Text style={{fontSize:15, marginLeft:30 }}>Interests:     <Text style={{fontSize:15, marginLeft:30 }}>{!isEditable?interests ? interests.join(', ') : "":""}</Text></Text>
      {!isEditable ? (
        <View></View>
    ): (<View>
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
      </View>)}
      
    </View>
    <View style={{height:"25%"}}>
    <Text style={{fontSize:15, textAlign: 'center', marginTop: '5%' }}>Events signed up for:</Text>
      <FlatList
          data={eventsData}
          renderItem={({ item }) => (
            <EventItem key={i++} item={item} nav={navigation} />
          )}
          keyExtractor={item => item.id}
        /> 
    </View>
      
      <TouchableOpacity style = {styles.signOutButton} onPress={signOutFunc}> 
        <Text style ={styles.buttonText}> Sign Out </Text>
      </TouchableOpacity>
      <View style={{position: "absolute", bottom:0, width:"100%"}}>
        <NavBar navigation={navigation}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: "row",
    backgroundColor: '#6A466C',
    textAlign: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    paddingBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: "55%",
    marginBottom: "2%"
  },
  editText: {
    fontSize: 18, 
    fontWeight: '400',
    color: 'white',
    marginLeft:"45%",
    marginTop: "2%"
  },
  imageContainer:{
    width: 100,
    height: 100,
    borderRadius: 50,
    fontSize:30,
    backgroundColor: '#D9D9D9',
    marginBottom: 20,
    marginTop: 30,
    marginLeft: "37%",
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'relative'
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    // position: 'absolute',
  },
  name: {
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
  },
  email: {
    marginBottom: "1%",
    flexDirection:'row'
  },
  number: {
    marginBottom: "1%",

    flexDirection:'row'
  },
  gender: {
    marginBottom: "1%",
    flexDirection:'row'
  },
  birthday: {
    marginBottom: "1%",
    flexDirection:'row'
  },
  interests: {
    marginBottom: "1%",
    flexDirection:'row'
  },
  signOutButton: {
    backgroundColor: '#EAEAEA',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderColor: "#8C8C8C",
    borderWidth: 1,
    height: "5.5%", 
    width: "80%",
    marginLeft: "10%",
    marginTop: "7%",
    // marginBottom: "200%",
  },
  buttonText: {
      fontSize: 20,
      color: '#8C8C8C',
      alignItems: 'center',
  }, 
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: "3%",
  },
  checkbox: {
    marginRight: 8,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 16,
    // height: "10%"
  },
  date: {
    fontSize: 16,
    color: '#000000',
  },
  eventName: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#000000',
  },
  location: {
    fontSize: 21,
    color: '#000000',
  },
});