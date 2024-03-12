import { StyleSheet, Text, View } from 'react-native';
import Test from './pages/Test.js'
import Signup from './pages/Signup.js'
export default function App() {
  return (
    <Signup />
  );  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
});


