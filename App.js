import { StyleSheet, Text, View } from 'react-native';
import Test from './pages/Test.js'
import Notifications from './pages/notifications.js';

export default function App() {
  return (
    <View style={styles.container}>
      <Notifications />
    </View>
  );  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});


