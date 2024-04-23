import { app } from './firebaseConfig';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Waiver from './pages/Waiver';
import Events from './pages/events';
import IndividualEvent from './pages/individualEvent';
import NotificationsPage from './pages/notifications';
import ForgotPassword1 from './pages/ForgotPassword1';
import Navbar from './components/NavBar';
// import AdminVolunteers from './pages/AdminVolunteers';
import CreateEventScreen from './pages/admin/createEvent';
import EditEventScreen from './pages/admin/editEvent';
import AdminEvents from './pages/admin/adminEvent';
import AdminEventDetailScreen from './pages/admin/adminIndividualEvent';
import React,  { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import * as messaging from 'firebase/messaging';
import * as Notifications from 'expo-notifications';

const Stack = createStackNavigator();
console.log("bro..")
export default function App() {
  // persistence: getReactNativePersistence(ReactNativeAsyncStorage) //async-storage in Waiver page
  const requestUserPermission = async () => {
    await app;

    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log("Authorization status:", authStatus);
      // Get the token after getting permission
      messaging()
        .getToken()
        .then(token => console.log(token));
    }
  };
  
  useEffect(() => {
    requestUserPermission();
  }, []);
  
  // Set up the notification handler for the app
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
  
  // Handle user clicking on a notification and open the screen
  const handleNotificationClick = async (response) => {
    const screen = response?.notification?.request?.content?.data?.screen;
    if (screen !== null) {
      navigation.navigate(screen);
    }
  };
  
  // Listen for user clicking on a notification
  const notificationClickSubscription =
    Notifications.addNotificationResponseReceivedListener(
      handleNotificationClick
    );
  
  // Handle user opening the app from a notification (when the app is in the background)
  messaging().onNotificationOpenedApp((remoteMessage) => {
    console.log(
      "Notification caused app to open from background state:",
      remoteMessage.data.screen,
      navigation
    );
    if (remoteMessage?.data?.screen) {
      navigation.navigate(`${remoteMessage.data.screen}`);
    }
  });
  
  // Check if the app was opened from a notification (when the app was completely quit)
  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        console.log(
          "Notification caused app to open from quit state:",
          remoteMessage.notification
        );
        if (remoteMessage?.data?.screen) {
          navigation.navigate(`${remoteMessage.data.screen}`);
        }
      }
    });
  
  // Handle push notifications when the app is in the background
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log("Message handled in the background!", remoteMessage);
    const notification = {
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
      data: remoteMessage.data, // optional data payload
    };
  
    // Schedule the notification with a null trigger to show immediately
    await Notifications.scheduleNotificationAsync({
      content: notification,
      trigger: null,
    });
  });
  
  // Handle push notifications when the app is in the foreground
  const handlePushNotification = async (remoteMessage) => {
    const notification = {
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
      data: remoteMessage.data, // optional data payload
    };
  
    // Schedule the notification with a null trigger to show immediately
    await Notifications.scheduleNotificationAsync({
      content: notification,
      trigger: null,
    });
  };
  
  // Listen for push notifications when the app is in the foreground
  const unsubscribe = messaging().onMessage(handlePushNotification);
  
  // Clean up the event listeners
  return () => {
    unsubscribe();
    notificationClickSubscription.remove();
  };


    

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Profile" component={Profile} options={{ animationEnabled: false, headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Notifications" component={NotificationsPage} options={{ animationEnabled: false, headerShown: false, gestureEnabled: false }} />
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
