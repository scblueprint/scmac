import React,  { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import NavBar from '../components/NavBar.js'
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useFocusEffect } from '@react-navigation/native';

const EventItem = ({ item, nav }) => (
  <TouchableOpacity key={item.id} style={styles.itemContainer} onPress={()=>nav.navigate("IndividualEvent", {item: item})}>
    <View style={styles.eventInfo}>
      <Text style={styles.date}>{new Date(item.data().date).toDateString().split(' ').slice(1).join(' ')}</Text>
      <Text style={styles.eventName}>{item.data().title}</Text>
      <Text style={styles.location}>{item.data().location}</Text>
    </View>
	<SimpleLineIcons name="arrow-right" size={24} color="black" />
  </TouchableOpacity>

);

export default function Events({navigation}) {
  const [events, setEvents] = useState([]);
  useFocusEffect(useCallback( () => {
    async function fetchData() {
      const arr = [];
      const eventsData = await getDocs(collection(db, 'events'));
      eventsData.forEach(doc => {
        // console.log(doc.data());
        arr.push(doc);
      })
      setEvents(arr);
    }
    fetchData();
  }, []))

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Events</Text>
      <FlatList
        data={events}
        renderItem={({ item }) => (
          <EventItem key={item.id} item={item} nav={navigation} />
        )}
        keyExtractor={item => item.id}
      />
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
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#6A466C',
    textAlign: 'center',
    justifyContent: 'flex-end',
    padding: 80,
    paddingBottom: 10,

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
