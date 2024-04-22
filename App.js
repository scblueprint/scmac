import { app, firebaseMessaging } from './firebaseConfig';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Waiver from './pages/Waiver';
import Events from './pages/events';
import IndividualEvent from './pages/individualEvent';
import Notifications from './pages/notifications';
import ForgotPassword1 from './pages/ForgotPassword1';
import Navbar from './components/NavBar';
// import AdminVolunteers from './pages/AdminVolunteers';
import CreateEventScreen from './pages/admin/createEvent';
import EditEventScreen from './pages/admin/editEvent';
import AdminEvents from './pages/admin/adminEvent';
import AdminEventDetailScreen from './pages/admin/adminIndividualEvent';
import React,  { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
const Stack = createStackNavigator();
console.log("bro..")
export default function App() {
  // persistence: getReactNativePersistence(ReactNativeAsyncStorage) //async-storage in Waiver page
  const requestUserPermission = async () => {
    console.log("HIHIHI")
    const authStatus = await firebaseMessaging.requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }

  }
  useEffect(()=>{
    console.log('App initialized checking in App.js:', app.name); // This should log '[DEFAULT]'
    if(app){
    console.log("in use effect")
    if(requestUserPermission){
      firebaseMessaging.getToken().then(token=>{
        console.log(token);
      })
    }
    else{
      console.log("Failed Token Status", authStatus)
    }

    firebaseMessaging.getInitialNotification().then(remoteMessage=>{
      if(remoteMessage){
        console.log('Notification caused app to open from quit state:',
        remoteMessage.notification,
      )
      }
    })
    firebaseMessaging.onNotificationOpenedApp(async (remoteMessage)=>{
      console.log('Notification caused app to open from background state:',
      remoteMessage.notification
    )
    })

    firebaseMessaging.setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the bavckground!', remoteMessage);
    });

    const unsubscribe = firebaseMessaging.onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }
  else{
    console.log("FAILED")
  }
  },[])
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Profile" component={Profile} options={{ animationEnabled: false, headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Notifications" component={Notifications} options={{ animationEnabled: false, headerShown: false, gestureEnabled: false }} />
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
