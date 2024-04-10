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
import CreateEventScreen from './pages/admin/createEvent';
import EditEventScreen from './pages/admin/editEvent';
import AdminEvents from './pages/admin/adminEvent';
import AdminEventDetailScreen from './pages/admin/adminIndividualEvent';

const Stack = createStackNavigator();

export default function App() {
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

        <Stack.Screen name="AdminEvents" component={AdminEvents} options={{ headerShown: false }} />
        <Stack.Screen name="CreateEvent" component={CreateEventScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EditEvent" component={EditEventScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AdminIndividualEvent" component={AdminEventDetailScreen} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
