import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { doc, getDoc } from 'firebase/firestore';
import { db, storage } from '../../firebaseConfig.js';

var item = null;
var i = 0;
const EventItem = ({ item, nav }) => (
  <TouchableOpacity key={item.id} style={styles.itemContainer} onPress={()=>{
    if (admin) {nav.navigate("AdminIndividualEvent", {item: item})}
    else {nav.navigate("IndividualEvent", {item: item})}
  }}>
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

const VolunteerProfileAdmin = ({route,navigation}) => {
  const [user, setUser] = useState({"item": {"email": "", "events": [], "fname": "", "gender": "", "id": "", "interests": [], "lname": "", "phone": "", "pfp": ""}});
  const [eventsData, setEventsData] = useState([]);

  useEffect( () => {
    item = route.params;
    setUser(item);
    // console.log(item);
    async function fetchData() {
      const arr2 = [];
      if (item.item.events) {
        item.item.events.forEach(async el => {
          const eventDoc = doc(db, "events", el);
          const temp = await getDoc(eventDoc);
          const eventData = temp.data();
          eventData["id"] = el;
          // arr2.push(eventData);
        if (new Date() < new Date(eventData.endDate*1000)) arr2.push(eventData);
          setEventsData(arr2);
        });
      }
    }
    fetchData();
  }, []);
  return (
    <View style={styles.container}>
        {/* <Text style={styles.header}>Volunteer Profile</Text> */}
        <View style={styles.profileContainer}>
          <View style={styles.imageContainer}>
              {user.item.pfp && <Image source={{ uri: user.item.pfp}} style={styles.image}/>}
            </View>
            {/* <View style={styles.pfpCircle}>
                <Text>PFP</Text>
            </View> */}
        </View>
        <View style={styles.name}>
            <Text style={{fontSize:20}}>{user.item.fname} {user.item.lname}</Text>
        </View>
        <View style={styles.email}>
            <Text style={{fontSize:15, marginLeft:30, paddingBottom: 35}}>Email: {user.item.email}</Text>
        </View>
        <View style={styles.phoneNumber}>
            <Text style={{fontSize:15, marginLeft:30, paddingBottom: 35}}>Phone Number: {user.item.phone}</Text>
        </View>
        <View style={styles.gender}>
            <Text style={{fontSize:15, marginLeft:30, paddingBottom: 35}}>Gender: {user.item.gender}</Text>
        </View>
        <View style={styles.eventSignedUpFor}>
            <Text style={{fontSize:15, justifyContent: 'center', marginLeft: 120}}>Events Signed Up For:</Text>
        </View>
        <FlatList
        data={eventsData}
        renderItem={({ item }) => (
          <EventItem key={i++} item={item} nav={navigation} />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#6A466C',
    textAlign: 'center',
    justifyContent: 'flex-end',
    padding: 80,
    textAlign: 'center',
    paddingBottom: 10,
  },
  profileContainer: {
    alignItems: 'center',
    paddingTop: 30
  },
  pfpCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
  },
  eventName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },  
  phoneNumber: {
    fontSize: 14,
    color: 'grey',
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
  },
  date: {
    fontSize: 10,
    color: '#000000',
  },
  eventName: {
    fontSize: 15,
    fontWeight: 'semibold',
    color: '#000000',
  },
  location: {
    fontSize: 15,
    color: '#000000',
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
  imageContainer:{
    width: 100,
    height: 100,
    borderRadius: 50,
    fontSize:30,
    backgroundColor: '#D9D9D9',
    // marginBottom: "2%",
    // marginTop: 30,
    // marginLeft: "20%",
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
});

export default VolunteerProfileAdmin;
