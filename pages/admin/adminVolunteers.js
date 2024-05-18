import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db, storage } from '../../firebaseConfig.js';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import Papa from 'papaparse';
import * as FileSystem from 'expo-file-system';
import { PermissionsAndroid, Platform } from 'react-native';
import { Alert } from 'react-native';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Navbar from '../../components/NavBar';

const AdminVolunteers = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    async function fetchUsers() {
      try {
        const usersRef = collection(db, 'users');
        const snapshot = await getDocs(usersRef);
        const usersData = snapshot.docs.map(doc => ({
          id: doc.id,
          fname: doc.data().fname || 'Unknown First Name',
          lname: doc.data().lname || 'Unknown Last Name',
          phone: doc.data().phone || 'Missing Phone Number',
          interests: doc.data().interests || [],
          email: doc.data().email,
          gender: doc.data().gender,
          events: doc.data().events || [],
          pfp: doc.data().pfp || "",
        }));
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUsers();
  }, []);

const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: "App Storage Permission",
                message: "App needs access to storage to save files",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );
        return (granted === PermissionsAndroid.RESULTS.GRANTED);
    }
    return true; // 
};

const exportAndUploadCSV = async (users) => {
  const hasPermission = await requestStoragePermission();
  if (!hasPermission) {
      Alert.alert('Permission Denied', 'Cannot write files without storage permission.');
      return;
  }

  try {
      // generate csv
      const csvString = Papa.unparse(users);

      // save csv 
      const fileName = 'users.csv';
      const fileUri = FileSystem.documentDirectory + fileName;
      await FileSystem.writeAsStringAsync(fileUri, csvString, { encoding: FileSystem.EncodingType.UTF8 });

      // raed the file into a blob
      const blob = await fetch(fileUri).then(res => res.blob());

      // referece to the firebase storage
      const storageRef = ref(getStorage(), `uploads/${fileName}`);

      // upload the blob to firebase storage
      const snapshot = await uploadBytes(storageRef, blob);

      //get the download URL..
      const downloadURL = await getDownloadURL(snapshot.ref);

      Alert.alert('Upload Successful', `CSV uploaded to Firebase. URL: ${downloadURL}`);
  } catch (error) {
      console.error('Failed to export or upload CSV:', error);
      Alert.alert('Export/Upload Failed', error.toString());
  }
};

  const fetchCSVUrl = async () => {
    const storage = getStorage();
    const pathReference = ref(storage, 'path/to/save/users.csv');
  
    getDownloadURL(pathReference)
      .then((url) => {
        // 
        console.log("Download URL:", url);
        Alert.alert('File URL', url);
      })
      .catch((error) => {
        console.error("Failed to get download URL:", error);
      });
  };
  
  

  const exportUsersToCSV = async () => {
    if (Platform.OS === 'android') {
      const permission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
      if (permission !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Permission Denied', 'Cannot write files without permission.');
        return;
      }
    }

    const csv = Papa.unparse(users);
    const fileUri = FileSystem.documentDirectory + 'users.csv';
    await FileSystem.writeAsStringAsync(fileUri, csv, { encoding: FileSystem.EncodingType.UTF8 });
    Alert.alert('Export Successful', `CSV saved to ${fileUri}`);
  };
  

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      {/* <View style={styles.circle} /> */}
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.fname} {item.lname}</Text>
        <Text style={styles.phoneNumber}>{item.phone}</Text>
      </View>
      <TouchableOpacity 
        style={styles.seeMoreButton} 
        onPress={() => navigation.navigate('VoluteerProfile', { item: item })}
        // onPress={() => navigation.navigate('VoluteerProfile')}
      >
        <Text style={styles.seeMoreButtonText}>See more →</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Volunteers</Text>
      <View style={styles.filterContainer}>
        {['All', 'Ceramics', 'Pottery', 'Gallery'].map(filter => (
          <TouchableOpacity
            key={filter}
            style={[styles.button, activeFilter === filter && styles.activeButton]} 
            onPress={() => setActiveFilter(filter)}
          >
            <Text style={styles.buttonText}>{filter}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={users.filter(user => activeFilter === 'All' || (user.interests && user.interests.includes(activeFilter)))}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 10, marginTop: "2%", marginLeft: "2%" }}
      />
      <View style={styles.exportButtonContainer}>
      <TouchableOpacity style={styles.button2} onPress={exportUsersToCSV}>
        <Text style={styles.exportButton}>Export as CSV</Text>
      </TouchableOpacity>
    </View>
        <Navbar navigation={navigation}/>
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
    marginLeft: "5%"
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 2,
    width: 160,
    marginHorizontal: 120,
    marginVertical: 40,
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