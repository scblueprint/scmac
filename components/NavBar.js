// import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';

import Icon from 'react-native-vector-icons/Ionicons';

const Navbar = () => {
  return (
    <View style={styles.navbarContainer}>
      <TouchableOpacity
        style={styles.navItem}
      >
        <Icon name="calendar-outline" size={25} color="#4F4F4F" />
        <Text style={styles.navText}>Events</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
      >
        <Icon name="notifications-outline" size={25} color="#4F4F4F" />
        <Text style={styles.navText}>Notifications</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
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
