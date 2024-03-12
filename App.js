import { StyleSheet, Text, View } from 'react-native';
import Test from './pages/Test.js'
import ForgotPassword1 from './pages/ForgotPassword1.js';

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    // </View>
    <ForgotPassword1/>
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


