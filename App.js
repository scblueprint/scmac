import { StyleSheet, Text, View } from 'react-native';

import ForgotPassword1 from './pages/ForgotPassword1';

export default function App() {
  return (
    <View style={styles.container}>
      <ForgotPassword1/>
      <StatusBar style="auto" />
    </View>
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
