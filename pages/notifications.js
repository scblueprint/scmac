import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Navbar from '../components/NavBar';


export default function Notifications() {
  const sampleNotification = [
    {id: 1},
    {id: 2},
    {id: 3},
  ];

  const renderNotificationItem = ({item}) => (
    <View style = {styles.notification}>
      <View style={styles.imageContainer}>
        <View style={styles.imagePlaceholder} />
      </View>
      <View style = {styles.notifText}>
        <Text style = {styles.text}>Notification Description</Text>
        <Text style = {styles.dateTime}>Date/Time</Text>
      </View>
    <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>...</Text>
    </TouchableOpacity>
    </View>
  );


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>
      <View style = {{flex: 1}}>
      <View style={styles.notificationContainer}>
        <Text style={styles.dateHeader}>Today</Text>
        <FlatList
        data = {sampleNotification}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
        </View>
      </View>
      <Navbar />
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
    textAlign: 'center',
    paddingBottom: 10, // Add padding at the bottom if needed for visual appeal

  },
  notificationContainer: { //The whole thing
    marginTop: 10,
  },
  dateHeader:{ 
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 8,
  },
  notification: {
    flexDirection: 'row', //Notif Description and date/time
    padding: 10,
    alignItems: 'center',
  },
  text: { //Notification Description
    fontSize: 17,
    fontWeight: 'bold',
    flex: 0.8,

  },
  button: {
    padding: 15,
    marginLeft: 'auto', //Push the button to right end
  },
  buttonText:{
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  dateTime: {
    fontSize: 15,
    color: 'gray',
    marginRight: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#E9E8E8', 
    marginVertical: 5,
  },
  imageContainer: {
    marginRight: 10,
  },
  imagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'lightgray',
  },


});
