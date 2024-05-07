import React,  { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import NavBar from '../components/NavBar.js'
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


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
  const [filtercolor, setFiltercolor] = useState("#F1F1F2");
  const [filtercolor1, setFiltercolor1] = useState("#F1F1F2");
  const [filtercolor2, setFiltercolor2] = useState("#F1F1F2");
  const [filtercolor3, setFiltercolor3] = useState("#F1F1F2");



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
      <View style={styles.filter}>
      <Ionicons name="filter-outline" size={30} color="black"/>
      <TouchableOpacity style={{backgroundColor:filtercolor,
    borderRadius: 10,
    fontSize:15,
    padding:10,}} onPress={()=>{if (filtercolor=="#A16AA4") {setFiltercolor("#F1F1F2")} else { setFiltercolor("#A16AA4")}}}>
        <Text>All</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{backgroundColor:filtercolor1,
    borderRadius: 10,
    fontSize:15,
    padding:10,}} onPress={()=>{if (filtercolor1=="#A16AA4") {setFiltercolor1("#F1F1F2")} else { setFiltercolor1("#A16AA4")}}}>
        <Text>Ceramics</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{backgroundColor:filtercolor2,
    borderRadius: 10,
    fontSize:15,
    padding:10,}} onPress={()=>{if (filtercolor2=="#A16AA4") {setFiltercolor2("#F1F1F2")} else { setFiltercolor2("#A16AA4")}}}>
        <Text>Shows</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{backgroundColor:filtercolor3,
    borderRadius: 10,
    fontSize:15,
    padding:10,}} onPress={()=>{if (filtercolor3=="#A16AA4") {setFiltercolor3("#F1F1F2")} else { setFiltercolor3("#A16AA4")}}}>
        <Text>Art Gallery</Text>
      </TouchableOpacity>
      </View>

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
  filter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    //backgroundColor: 'white',
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginHorizontal: 3,
    marginTop: 3,
  },
  filterButton: {
    borderRadius: 10,
    fontSize: 18,
    padding: 15,
  }
});
