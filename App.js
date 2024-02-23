import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Event from './pages/Events'
import IndividualEvent from './pages/IndividualEvent'

export default function App() {
  return (
    <IndividualEvent />
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
