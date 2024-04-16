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
  {
    id: '3',
    name: 'Name',
    phoneNumber: 'Phone Number',
  },
  {
    id: '4',
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

const AdminVolunteers = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Volunteers</Text>
      <View style={styles.filterContainer}>
        <Text style={styles.dateHeader}>Filter By:</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Ceramics</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Shows</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Art Gallery</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <TouchableOpacity style={styles.button2}>
          <Text style={styles.exportButton}>Export as CSV</Text>
        </TouchableOpacity>
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
    marginBottom: 20, // Corrected spelling here
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
  filterContainer: {
    marginTop: 10,
    padding: 10,
    flexDirection: 'row'
    // backgroundColor: 'rgba(255, 0, 0, 0.3)',
  },
  dateHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: '#939393',
    fontSize: 16,
    fontWeight: 'bold',
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'lightgrey',
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
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
  seeMoreButton: {
    position: 'absolute',
    top: 12,
    right: -45,
    marginRight: 60,
  },
  seeMoreButtonText: {
    color: '#6A466C',
    fontWeight: 'bold',
  },
  button2: {
    backgroundColor: '#6A466C',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 2,
    width: 160,
    marginHorizontal: 120,
    marginVertical: 120,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  exportButton: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AdminVolunteers;
