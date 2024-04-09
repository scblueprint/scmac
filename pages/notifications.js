import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Navbar from '../components/NavBar';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDocs , getDoc} from 'firebase/firestore';
import { firebaseConfig } from '../firebaseConfig';
import { auth, db } from '../firebaseConfig';
import NavBar from '../components/NavBar.js'

//Initialize Firebase app

const notificationsCollection = collection(db, 'notifications');

export default function Notifications({navigation}) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        //Fetch the user document
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        const userSnapshot = await getDoc(userDocRef);
  
        if (userSnapshot.exists()) {
          //Get the IDs from the user 
          const { notifications } = userSnapshot.data();
  
          if (notifications && notifications.length > 0) {
            //Fetch each notification document
            const notificationsData = await Promise.all(
              notifications.map(async notificationId => {
                const notificationDocRef = doc(db, 'notifications', notificationId);
                const notificationSnapshot = await getDoc(notificationDocRef);
                if (notificationSnapshot.exists()) {
                  const notificationData = notificationSnapshot.data();
                  return {
                    id: notificationSnapshot.id,
                    description: notificationData.description,
                    dateTime: new Date(notificationData.date).toLocaleString([], {
                      month: '2-digit',
                      day: '2-digit',
                      year: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    })
                  };
                } else {
                  console.warn(`Notification with ID ${notificationId} not found`);
                  return null;
                }
              })
            );
  
            //Filter out null values (notifs not found)
            const filteredNotificationsData = notificationsData.filter(notification => notification !== null);
            setNotifications(filteredNotificationsData);
          } else {
            console.log('No notifications found for this user');
          }
        } else {
          console.log('User document not found');
        }
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
            //keyExtractor={(item) => item.id.toString()} 
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
      </View>
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