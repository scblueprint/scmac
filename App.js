import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Waiver from './pages/Waiver';
import Events from './pages/events';
import IndividualEvent from './pages/individualEvent';
import NotificationPage from './pages/notifications';
import ForgotPassword1 from './pages/ForgotPassword1';
import Navbar from './components/NavBar';
// import AdminVolunteers from './pages/AdminVolunteers';
import CreateEventScreen from './pages/admin/createEvent';
import EditEventScreen from './pages/admin/editEvent';
import AdminEvents from './pages/admin/adminEvent';
import AdminEventDetailScreen from './pages/admin/adminIndividualEvent';
import messaging from '@react-native-firebase/messaging';
import Notifications from 'expo-notifications';
const Stack = createStackNavigator();
import { useEffect } from 'react';
export default function App() {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    let token = '';
    if (enabled) {
      token = (await messaging().getToken()).toString();
      console.log('FCM Token:', token);
    } else {
      console.log('REQUEST PERMISSION DENIED');
    }
    return token;
  }

  // Set up FCM and handle incoming messages
  useEffect(() => {
    async function getNewFCMToken() {
      try {
        const token = await requestUserPermission();
        console.log('Token:', token);
      } catch (error) {
        console.error('Error getting new FCM token:', error);
      }
    }

    getNewFCMToken();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe; // Clean up the subscription
  }, []);
  return (
    
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Profile" component={Profile} options={{ animationEnabled: false, headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Notifications" component={NotificationPage} options={{ animationEnabled: false, headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Waiver" component={Waiver} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Events" component={Events} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="IndividualEvent" component={IndividualEvent} options={
          { headerShown: true, 
            headerStyle: {backgroundColor: "#6A466C", height: 100}, 
            headerBackTitle: " ", 
            headerTitleStyle: {color: "#fff", fontSize: 20}, 
            headerTitle: "Event",
            headerTintColor: "white"
          }}/>
        <Stack.Screen name="ForgotPassword1" component={ForgotPassword1} options={{ headerShown: false }} />
        <Stack.Screen name="AdminEvents" component={AdminEvents} options={{ animationEnabled: false, headerShown: false, gestureEnabled: false}} />
        <Stack.Screen name="CreateEvent" component={CreateEventScreen} options={
          { headerShown: true, 
            headerStyle: {backgroundColor: "#6A466C", height: 100}, 
            headerBackTitle: " ", 
            headerTitleStyle: {color: "#fff", fontSize: 20, fontWeight: "bold"}, 
            headerTitle: "Create Event",
            headerTintColor: "white"
          }}/>
        <Stack.Screen name="EditEvent" component={EditEventScreen} options={
          { headerShown: true, 
            headerStyle: {backgroundColor: "#6A466C", height: 100}, 
            headerBackTitle: " ", 
            headerTitleStyle: {color: "#fff", fontSize: 20}, 
            headerTitle: "Edit Event",
            headerTintColor: "white"
          }}/>
        <Stack.Screen name="AdminIndividualEvent" component={AdminEventDetailScreen} options={
          { headerShown: true, 
            headerStyle: {backgroundColor: "#6A466C", height: 100}, 
            headerBackTitle: " ", 
            headerTitleStyle: {color: "#fff", fontSize: 20}, 
            headerTitle: "Event",
            headerTintColor: "white"
          }}/>
      </Stack.Navigator>
    </NavigationContainer>
  ); 
}
