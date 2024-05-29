import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Waiver from './pages/Waiver';
import Events from './pages/events';
import IndividualEvent from './pages/individualEvent';
import NotificationsScreen from './pages/notifications';
import ForgotPassword1 from './pages/ForgotPassword1';
import Navbar from './components/NavBar';
import CreateEventScreen from './pages/admin/createEvent';
import EditEventScreen from './pages/admin/editEvent';
import AdminEvents from './pages/admin/adminEvent';
import AdminEventDetailScreen from './pages/admin/adminIndividualEvent';
import AdminVolunteers from './pages/admin/adminVolunteers';
import VolunteerProfileAdmin from './pages/admin/VolunteerProfileAdmin';
import ArchivedEvents from './pages/admin/archivedEvents';
import { View, Text, Button } from 'react-native';
import * as Notifications from 'expo-notifications';

import { registerForPushNotificationsAsync } from './expoPushNotifications'
import React, { useState, useEffect, useRef } from 'react';
const Stack = createStackNavigator();

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function sendPushNotification(expoPushToken) {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'Test title',
      body: 'Test body',
      data: { testData: 'test data' },
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
  // persistence: getRfireeactNativePersistence(ReactNativeAsyncStorage) //async-storage in Waiver page
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name="Login" options={{ headerShown: false, gestureEnabled: false }} >
          {props => <Login {...props} expoPushToken={expoPushToken} />}
        </Stack.Screen>
        <Stack.Screen name="Signup" options={{ headerShown: false, gestureEnabled: false }} >
          {props => <Signup {...props} expoPushToken={expoPushToken} />}
        </Stack.Screen>
        <Stack.Screen name="Profile" component={Profile} options={{ animationEnabled: false, headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Volunteers" component={AdminVolunteers} options={{ animationEnabled: false, headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ animationEnabled: false, headerShown: false, gestureEnabled: false }} />
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
        <Stack.Screen name="AdminVolunteers" component={AdminVolunteers} options={{ headerShown: false }} />
        <Stack.Screen name="VoluteerProfile" component={VolunteerProfileAdmin} options={
          { headerShown: true, 
            headerStyle: {backgroundColor: "#6A466C", height: 100}, 
            headerBackTitle: " ", 
            headerTitleStyle: {color: "#fff", fontSize: 20}, 
            headerTitle: "Volunteer Profile",
            headerTintColor: "white"
          }}/>
        <Stack.Screen name="ArchivedEvents" component={ArchivedEvents} options={
          { headerShown: true, 
            headerStyle: {backgroundColor: "#6A466C", height: 110}, 
            headerBackTitle: " ", 
            headerTitleStyle: {color: "#fff", fontSize: 20}, 
            headerTitle: "Archived Events",
            headerTintColor: "white"
          }}/>
      </Stack.Navigator>
    </NavigationContainer>
  ); 
}
