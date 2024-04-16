import React,  { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import NavBar from '../../components/NavBar.js'
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

const EventItem = ({ item, nav }) => (
  <TouchableOpacity key={item.id} style={styles.itemContainer} onPress={()=>nav.navigate("AdminIndividualEvent", {item: item})}>
    <View style={styles.eventInfo}>
      <Text style={styles.date}>{new Date(item.date).toDateString().split(' ').slice(1).join(' ')}</Text>
      <Text style={styles.eventName}>{item.title}</Text>
      <Text style={styles.location}>{item.location}</Text>
    </View>
	<SimpleLineIcons name="arrow-right" size={24} color="black" />
  </TouchableOpacity>

);

export default function AdminEvents({navigation}) {
  const [events, setEvents] = useState([]);

  useFocusEffect(useCallback( () => {
    async function fetchData() {
      const arr = [];
      const eventsData = await getDocs(collection(db, 'events'));
      eventsData.forEach(doc => {
        arr.push(doc.data());
      })
      setEvents(arr);
      // console.log(events);
    }
    fetchData();
  }, []))

  let i = 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Events</Text>
        <AntDesign onPress={() => { navigation.navigate("CreateEvent");}} style={{marginLeft:"25%"}} name="plus" size={24} color="white" />
      </View>
      <FlatList
        data={events}
        renderItem={({ item }) => (
          <EventItem key={i++} item={item} nav={navigation} />
        )}
        // keyExtractor={item => item.title}
      />
       <NavBar navigation={navigation}/>
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