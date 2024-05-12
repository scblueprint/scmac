// import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import {auth} from "../firebaseConfig"
import {getCurrentUserData} from '../pages/api/users';
import Icon from 'react-native-vector-icons/Ionicons';

const Navbar = ({navigation}) => {
  const [admin, setAdmin] = useState();

  useEffect( () => {
    async function fetchData() {
      data = await getCurrentUserData();
      setAdmin(data.admin);
      console.log(data.admin);
    }
    fetchData();
  }, []);

  return (
    <View style={styles.navbarContainer}>
      <TouchableOpacity
        style={styles.navItem}
        
        onPress={() => {
          if (admin) {
            navigation.navigate("AdminEvents");
          }
          else {
            navigation.navigate("Events");
          }
        }}
        //if admin go to admin events
      >
        <Icon name="calendar-outline" size={25} color="#4F4F4F" />
        <Text style={styles.navText}>Events</Text>
        
      </TouchableOpacity>

        <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("Notifications")}
      >
        <Icon name="notifications-outline" size={25} color="#4F4F4F" />
        <Text style={styles.navText}>Notifications</Text>
        
      </TouchableOpacity>

        {admin ? 
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("Volunteers")}
      >
        <Icon name="people-outline" size={25} color="#4F4F4F" />

        <Text style={styles.navText}>Volunteers</Text>
        
      </TouchableOpacity>
: ""}
      

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("Profile")}
      >
        <Icon name="person-outline" size={25} color="#4F4F4F" />
        <Text style={styles.navText}>Profile</Text>
        
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbarContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    justifyContent: 'space-around',
    paddingVertical: 30, //increased because too short for iOS screens
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    color: '#4F4F4F',
    fontSize: 12,
  },
});

export default Navbar;
