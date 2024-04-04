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
import Test from './pages/Test';
import ForgotPassword1 from './pages/ForgotPassword1';
import ForgotPassword2 from './pages/forgotPassword2';
import ForgotPassword3 from './pages/forgotPassword3';
import Navbar from './components/NavBar';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createStackNavigator();

export default function App() {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage) //async-storage in Waiver page
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Waiver'>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        <Stack.Screen name="Notifications" component={Notifications} options={{ headerShown: false }} />
        <Stack.Screen name="Waiver" component={Waiver} options={{ headerShown: false }} />
        <Stack.Screen name="Events" component={Events} options={{ headerShown: false }} />
        <Stack.Screen name="IndividualEvent" component={IndividualEvent} options={{ headerShown: false }} />
        <Stack.Screen name="Test" component={Test} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPassword1" component={ForgotPassword1} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPassword2" component={ForgotPassword2} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPassword3" component={ForgotPassword3} options={{ headerShown: false }} />
        {/* Add more Stack.Screen components for each page */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
