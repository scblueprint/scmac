import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import NavBar from '../components/NavBar.js'

const adminVolunteers = () => {
    return (
        <View style={styles.container}>
          <Text style={styles.header}>Volunteers</Text>
          <View style={{ flex: 1 }}>
            <View style={styles.filterContainer}>
              <Text style={styles.dateHeader}>Filter By:</Text>
              <TouchableOpacity style={styles.ceramics}>
                <Text style={styles.ceramicText}>Ceramics</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.shows}>
                <Text style={styles.showText}>Shows</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.art}>
                <Text style={styles.artText}>Art Gallery</Text>
                </TouchableOpacity>
              <FlatList
                data={notifications}
                renderItem={renderNotificationItem}
                //keyExtractor={(item) => item.id.toString()} 
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
              />
            </View>
          </View>
          <NavBar navigation={navigation}/>
        </View>
    );
};
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
    filterContainer: { // The whole thing
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
