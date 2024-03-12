import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Navbar from '../components/NavBar';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDocs } from 'firebase/firestore';
import { firebaseConfig } from '../firebaseConfig';
import { db } from '../firebaseConfig';


//Initialize Firebase app

const notificationsCollection = collection(db, 'notifications');

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const snapshot = await getDocs(notificationsCollection);
        const notificationsData = snapshot.docs.map(doc => {
          const data = doc.data();
          // Convert timestamp to readable 
          const dateTime = new Date(data.dateTime).toLocaleString();
          return { ...data, dateTime }; 
        });
        setNotifications(notificationsData);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const renderNotificationItem = ({ item }) => (
    <View style={styles.notification}>
      <View style={styles.imageContainer}>
        <View style={styles.imagePlaceholder} />
      </View>
      <View style={styles.notifText}>
        <Text style={styles.text}>{item.description}</Text>
        <Text style={styles.dateTime}>{item.dateTime}</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>...</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>
      <View style={{ flex: 1 }}>
        <View style={styles.notificationContainer}>
          <Text style={styles.dateHeader}>Today</Text>
          <FlatList
            data={notifications}
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
  notificationContainer: { // The whole thing
    flex: 1,
    marginTop: 10,
  },
  dateHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 8,
  },
  notification: {
    flex: 1,
    flexDirection: 'row', // Notif Description and date/time
    padding: 10,
    alignItems: 'center',
  },
  text: { // Notification Description
    fontSize: 17,
    fontWeight: 'bold',
    flex: 0.8,
  },
  button: {
    padding: 15,
    marginLeft: 'auto', // Push the button to right end
  },
  buttonText: {
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