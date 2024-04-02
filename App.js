import { StyleSheet, Text, View } from 'react-native';
import Test from './pages/Test.js'
import CreateEventScreen from './pages/createEvent.js';
import AdminEventDetailScreen from './pages/adminIndividualEvent.js';

export default function App() {
  return (
    <AdminEventDetailScreen/>
    // <CreateEventScreen/>
    // <View style={styles.container}>
      // {/* <Text>Open up App.js to start working on your app!</Text> */}
    // </View>
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


