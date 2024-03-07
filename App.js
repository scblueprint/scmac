import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Login from './pages/Login';
import Signup from './pages/Signup.js'
import Waiver from './pages/Waiver.js';
import Profile from './pages/Profile.js';

export default function App() {
  return (
    // <Login/>
    // <Signup/>
    <Waiver/>
    // <Profile/>
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
