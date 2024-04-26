import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';

const DATA = [
    // Replace with your actual events data
    { id: '1', date: 'Date', eventName: 'Event Name', location: 'Location' },
    { id: '2', date: 'Date', eventName: 'Event Name', location: 'Location' },
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

const VolunteerProfileAdmin = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.header}>Volunteer Profile</Text>
        <View style={styles.profileContainer}>
            <View style={styles.pfpCircle}>
                <Text>PFP</Text>
            </View>
        </View>
        <View style={styles.name}>
            <Text style={{fontSize:20}}>FirstName  LastName</Text>
        </View>
        <View style={styles.email}>
            <Text style={{fontSize:15, marginLeft:30, paddingBottom: 35}}>Email </Text>
        </View>
        <View style={styles.phoneNumber}>
            <Text style={{fontSize:15, marginLeft:30, paddingBottom: 35}}>Phone Number </Text>
        </View>
        <View style={styles.gender}>
            <Text style={{fontSize:15, marginLeft:30, paddingBottom: 35}}>Gender </Text>
        </View>
        <View style={styles.eventSignedUpFor}>
            <Text style={{fontSize:15, justifyContent: 'center', marginHorizontal: 120}}>Events Signed Up For</Text>
        </View>
        <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <EventItem date={item.date} eventName={item.eventName} location={item.location} />
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
});

export default VolunteerProfileAdmin;
