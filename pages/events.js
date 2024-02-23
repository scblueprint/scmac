import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import NavBar from '../components/NavBar.js'

const eventsData = [
  // Replace with your actual events data
  { id: '1', date: 'Date', eventName: 'Event Name', location: 'Location' },
  { id: '2', date: 'Date', eventName: 'Event Name', location: 'Location' },
  { id: '3', date: 'Date', eventName: 'Event Name', location: 'Location' },
];

const EventItem = ({ date, eventName, location }) => (
  <TouchableOpacity style={styles.itemContainer}>
    <View style={styles.eventInfo}>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.eventName}>{eventName}</Text>
      <Text style={styles.location}>{location}</Text>
    </View>
	<SimpleLineIcons name="arrow-right" size={24} color="black" />
  </TouchableOpacity>

);

export default function Events() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Events</Text>
      <FlatList
        data={eventsData}
        renderItem={({ item }) => (
          <EventItem date={item.date} eventName={item.eventName} location={item.location} />
        )}
        keyExtractor={item => item.id}
      />
    <NavBar />
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
    justifyContent: 'flex-end', // Align vertically to bottom
    padding: 80,
    paddingBottom: 10, // Add padding at the bottom if needed for visual appeal

  },
  itemContainer: {
    flexDirection: 'row', // Align items in a row
    justifyContent: 'space-between', // Distribute space between the text and the icon
    alignItems: 'center', // Center items vertically
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
