import React,  { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import NavBar from '../../components/NavBar.js'
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { getCurrentUserData } from '../api/users.js';

export default function ArchivedEvents({navigation}) {
  const [admin, setAdmin] = useState(false);
  const [events, setEvents] = useState([]);

  useFocusEffect(useCallback( () => {
    async function fetchData() {
      const arr = [];
      data = await getCurrentUserData();
      setAdmin(data.admin);
      const eventsData = await getDocs(collection(db, 'events'));
      eventsData.forEach(doc => {
        var temp = doc.data();
        temp.id = doc.id;
        if (!(new Date() < new Date(temp.date*1000))) arr.push(temp);
        // console.log(!(new Date() < new Date(temp.date)))
      })
      setEvents(arr);
    //   console.log(events);
    }
    fetchData();
  }, []))

  const EventItem = ({ item, nav }) => (
    <TouchableOpacity key={item.id} style={styles.itemContainer} onPress={()=>{if (admin) {nav.navigate("AdminIndividualEvent", {item: item})}
    else {nav.navigate("IndividualEvent", {item: item})}}}>
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

  let i = 0;

  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <Text style={styles.headerText}>Events</Text>
        <Feather name="inbox" size={24} color="white" style={{marginLeft:"20%"}} />
        <AntDesign onPress={() => { navigation.navigate("CreateEvent");}} style={{marginLeft:"5%"}} name="plus" size={24} color="white" />
      </View> */}
      <FlatList
        data={events}
        renderItem={({ item }) => (
          <EventItem key={i++} item={item} nav={navigation} />
        )}
        // keyExtractor={item => item.id}
      />
       {/* <NavBar navigation={navigation}/> */}
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
    marginLeft: "35%"
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