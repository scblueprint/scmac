import React, { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { collection, getDocs, query, doc, setDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from './firebaseConfig';  // Ensure you have this config file for Firebase initialization

import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Waiver from './pages/Waiver';
import Events from './pages/events';
import IndividualEvent from './pages/individualEvent';
import NotificationPage from './pages/notifications';
import ForgotPassword1 from './pages/ForgotPassword1';
import Navbar from './components/NavBar';
import CreateEventScreen from './pages/admin/createEvent';
import EditEventScreen from './pages/admin/editEvent';
import AdminEvents from './pages/admin/adminEvent';
import AdminEventDetailScreen from './pages/admin/adminIndividualEvent';
import AdminVolunteers from './pages/admin/adminVolunteers';
import VolunteerProfileAdmin from './pages/admin/VolunteerProfileAdmin';
import ArchivedEvents from './pages/admin/archivedEvents';


const Stack = createStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

function handleRegistrationError(errorMessage) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      handleRegistrationError('Permission not granted to get push token for push notification!');
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError('Project ID not found');
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(pushTokenString);
      return pushTokenString;
    } catch (e) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError('Must use physical device for push notifications');
  }
}

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(undefined);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await registerForPushNotificationsAsync();
        setExpoPushToken(token ?? '');
        if (token) {
          const userRef = doc(db, 'users', user.uid); // Ensure 'users' collection exists in Firestore
          await setDoc(userRef, { expoPushToken: token }, { merge: true });
        }
      }
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      unsubscribeAuth();
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current,
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Profile" component={Profile} options={{ animationEnabled: false, headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Volunteers" component={AdminVolunteers} options={{ animationEnabled: false, headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Notifications" component={NotificationPage} options={{ animationEnabled: false, headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Waiver" component={Waiver} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Events" component={Events} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="IndividualEvent" component={IndividualEvent} options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#6A466C", height: 100 },
          headerBackTitle: " ",
          headerTitleStyle: { color: "#fff", fontSize: 20 },
          headerTitle: "Event",
          headerTintColor: "white"
        }} />
        <Stack.Screen name="ForgotPassword1" component={ForgotPassword1} options={{ headerShown: false }} />
        <Stack.Screen name="AdminEvents" component={AdminEvents} options={{ animationEnabled: false, headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="CreateEvent" component={CreateEventScreen} options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#6A466C", height: 100 },
          headerBackTitle: " ",
          headerTitleStyle: { color: "#fff", fontSize: 20, fontWeight: "bold" },
          headerTitle: "Create Event",
          headerTintColor: "white"
        }} />
        <Stack.Screen name="EditEvent" component={EditEventScreen} options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#6A466C", height: 100 },
          headerBackTitle: " ",
          headerTitleStyle: { color: "#fff", fontSize: 20 },
          headerTitle: "Edit Event",
          headerTintColor: "white"
        }} />
        <Stack.Screen name="AdminIndividualEvent" component={AdminEventDetailScreen} options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#6A466C", height: 100 },
          headerBackTitle: " ",
          headerTitleStyle: { color: "#fff", fontSize: 20 },
          headerTitle: "Event",
          headerTintColor: "white"
        }} />
        <Stack.Screen name="AdminVolunteers" component={AdminVolunteers} options={{ headerShown: false }} />
        <Stack.Screen name="VoluteerProfile" component={VolunteerProfileAdmin} options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#6A466C", height: 100 },
          headerBackTitle: " ",
          headerTitleStyle: { color: "#fff", fontSize: 20 },
          headerTitle: "Volunteer Profile",
          headerTintColor: "white"
        }} />
        <Stack.Screen name="ArchivedEvents" component={ArchivedEvents} options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#6A466C", height: 110 },
          headerBackTitle: " ",
          headerTitleStyle: { color: "#fff", fontSize: 20 },
          headerTitle: "Archived Events",
          headerTintColor: "white"
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
