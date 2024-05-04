import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';


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



const AdminVolunteers = () => {
  const navigation = useNavigation(); //added
  const [users, setUsers] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');  // 'All' by default

  useEffect(() => {

  const fetchUsers = async () =>{
    try {
      const usersRef = collection(db, 'users') //access collection
      const snapshot = await getDocs(usersRef); //fixed: getDocs not getDoc
      const usersData = snapshot.docs.map(doc => ({
        id: doc.id, 
        fname: doc.data().fname || 'Unknown First Name',
        lname: doc.data().lname || 'Unknown Last Name',
        phone: doc.data().phone || 'Missing Phone Number',
        uid: doc.id,       
        interests: doc.data().interests || [],
  
        // ...doc.data() //each field: doc.data.field
      }));
      console.log("Users data:", usersData);
      setUsers(usersData);
    } catch (error){
      console.error("Fail to fetch users:", error);
    }
  };
    fetchUsers();
}, []);

const filterBar = users.filter(user => {
  if (activeFilter === 'All') return true;
  return user.interests.includes(activeFilter); //filter by interests
});


const renderItem = ({ item, navigation}) => {
  console.log(item); //log to see what's in item

  if (!item.fname || !item.lname || !item.phone || !item.uid) {
    console.warn("Missing data for item:", item.id);
    return null; 
  }


  return (
    <View style={styles.item}>
      <View style={styles.circle} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.fname} {item.lname} </Text>
        <Text style={styles.phoneNumber}>{item.phone}</Text>
      </View>
      <TouchableOpacity 
        style={styles.seeMoreButton} 
        onPress={() => navigation.navigate('VolunteerProfileAdmin',  { userId: item.uid })}
        >
        <Text style={styles.seeMoreButtonText}>See more →</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.moreButton}>
        <Text style={styles.moreButtonText}>...</Text>
      </TouchableOpacity>
    </View>
  );
};

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Volunteers</Text>
      <View style={styles.filterContainer}>
        {['All', 'Ceramics', 'Pottery', 'Gallery'].map(filter => (
        <TouchableOpacity
        key = {filter}
        style={[styles.button, activeFilter === filter && styles.activeButton]} 
        onPress={() => setActiveFilter(filter)}
        >
          <Text style={styles.buttonText}>{filter}</Text>
        </TouchableOpacity>
     ))}
        {/* <Text style={styles.dateHeader}>Filter By:</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Ceramics</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Shows</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Art Gallery</Text> */}
          {/* </TouchableOpacity> */}
        {/* </View> */}
      </View>
      <FlatList
          data={filterBar} //changed DATA to users
          // renderItem={renderItem}
          renderItem={({ item }) => renderItem({ item, navigation })}
          // keyExtractor={(item) => item.id}  
          keyExtractor={(item) => item.id.toString()}  
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
