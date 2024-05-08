import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const DATA = [
    {
      id: '1',
      name: 'Name',
      phoneNumber: 'Phone Number',
    },
    {
      id: '2',
      name: 'Name',
      phoneNumber: 'Phone Number',
    },
];
const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.circle} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.phoneNumber}>{item.phoneNumber}</Text>
      </View>
      <TouchableOpacity style={styles.seeMoreButton}>
        <Text style={styles.seeMoreButtonText}>See more →</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.moreButton}>
        <Text style={styles.moreButtonText}>...</Text>
      </TouchableOpacity>
    </View>
  );

const IndividualEventAvailability = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Event</Text>
        <View style={styles.container2}>
          <Text style={styles.text}>Event Organizers</Text>
          <TouchableOpacity style={styles.reminderButton}>
            <Text style={styles.reminderButtonText}>Send Reminder</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <View style={styles.container2}>
          <Text style={styles.text}>Time Slot 1 (00:00 - 00:00)</Text>
          <TouchableOpacity style={styles.reminderButton}>
            <Text style={styles.reminderButtonText}>Send Reminder</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />  
        <View style={styles.container2}>
          <Text style={styles.text}>Time Slot 2 (00:00 - 00:00)</Text>
          <TouchableOpacity style={styles.reminderButton}>
            <Text style={styles.reminderButtonText}>Send Reminder</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />  
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
    justifyContent: 'flex-end',
    padding: 80,
    textAlign: 'center',
    paddingBottom: 10,
    },
    container2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#ECECEC',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    text: {
        fontSize: 17,
        color: 'black',
        textAlign: 'left',
    },
    reminderButton: {
        backgroundColor: '#6A466C',
        borderRadius: 10,
        padding: 3,
        paddingHorizontal: 7,
    },
    reminderButtonText: {
        color: 'white',
        fontSize: 15,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20, 
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
      circle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'lightgrey',
        marginRight: 10,
        paddingTop: 20,
      },
      textContainer: {
        flex: 1,
      },
      name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        paddingTop: 5,
      },  
      phoneNumber: {
        fontSize: 14,
        color: 'grey',
      },
      moreButton: {
        paddingHorizontal: 10,
        marginRight: 10,
        position: 'absolute',
        top: -10,
        right: 0,
      },
      moreButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
      },
});

export default IndividualEventAvailability;
