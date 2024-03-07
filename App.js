import { StatusBar } from 'expo-status-bar';
<<<<<<< HEAD
import { StyleSheet, Text, View } from 'react-native';
import Signup from './pages/Signup';
import {Image} from 'react-native';

export default function App() {
  return (
      <View style={styles.container}>
        <Signup/>
        <StatusBar style="auto" />
      </View>
=======
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Login from './pages/Login';

export default function App() {
  return (
    <Login/>
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
>>>>>>> b0bb6e3729d2d9cec1794a60448b3a6f8d9e07f8
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
