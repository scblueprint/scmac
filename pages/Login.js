import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { EvilIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const windowHeight = Dimensions.get('window').height; // 667
const windowWidth = Dimensions.get('window').width; // 375

export default function Login() {
    // console.log(windowHeight);
    // console.log(windowWidth);

  return (
    <View style={styles.container}>
        <Image
            style={styles.image}
            source={require('../assets/scmac-logo.png')}
        />
        <Text style={styles.titleText}>
            Log In 
        </Text>
        <Text style={styles.emailText}>
            Email
        </Text>
        <Text style={styles.passwordText}>
            Password
        </Text>
        <Text style={styles.noAccountText}>
            Don't have an account? Sign Up
        </Text>
        <Text style={styles.forgotPasswordText}>
            Forgot password?
        </Text>
        <View style={styles.lockIcon}>
          <EvilIcons name="lock" size={24} color="black" />
        </View>
        <View style={styles.envelopeIcon}>
          <EvilIcons name="envelope" size={24} color="black" />
        </View>
        <View style={styles.eyeIcon}>
          <Feather name="eye" size={16} color="black" />
        </View>
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
  image: {
    position: 'absolute',
    width: windowWidth * 0.93, // 350
    height: windowHeight * 0.1819, // 121.33
    left: (windowWidth * 0.5 - 350 / 2 + 0.5),
    top: windowHeight * 0.1, // 90
  },
  titleText: {
    /* Log In */
    position: 'absolute',
    width: windowWidth * 0.2346, // 88
    height: windowHeight * 0.539 , // 36
    left: windowWidth * 0.08, // 30
    top: windowHeight * 0.4363, // 291
    // fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 30,
    lineHeight: 36, 
    color: '#6A466C',
  },
  emailText: {
    /* Email */
    position: 'absolute',
    width: windowWidth * 0.104, // 39
    height: windowHeight * 0.027, // 18
    left: windowWidth * 0.08, // 30
    top: windowHeight * 0.529, // 357

    // font-family: 'Inter';
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 18,
    color: '#232323',
  },
  passwordText: {
    /* Password */
    position: 'absolute',
    width: windowWidth * 0.1893, // 71
    height: windowHeight * 0.0270, // 18
    left: windowWidth * 0.08, // 30
    top: windowHeight * 0.648, // 432

    // font-family: 'Inter',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 18,
    color: '#232323',
  },
  noAccountText: {
    /* Don’t have an account? Sign Up */
    position: 'absolute',
    width: windowWidth * 0.68, // 255
    height: windowHeight * 0.028, // 19
    left: windowWidth * 0.184, // 69
    top: windowHeight * 0.912, // 608

    // font-family: 'Inter';
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    // letterSpacing: '0.025em',
    color: '#232323',
  },
  forgotPasswordText: {
    /* Forgot password? */
    position: 'absolute',
    width: windowWidth * 0.288, // 108
    height: windowHeight * 0.022, // 15
    left: windowWidth * 0.68, // 255
    top: windowHeight * 0.7436, // 496

    // font-family: 'Inter';
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 15,
    /* identical to box height */
    textAlign: 'center',
    // letter-spacing: 0.025em;

    color: '#542656',
  },
  // rememberMeText: {
  //   /* Remember me */
  //   position: 'absolute',
  //   width: , // 83
  //   height: , // 15
  //   left: , // 55
  //   top: windowHeight * 0.7436, // 496

  //   // font-family: 'Inter';
  //   fontStyle: 'normal',
  //   fontWeight: 400,
  //   fontSize: 12px, // 12
  //   lineHeight: 15px, // 15
  //   /* identical to box height */

  //   color: '#232323',
  // },
  lockIcon: {
    /* Lock_light */
    position: 'absolute',
    width: windowWidth * 0.056, // 21
    height: windowHeight * 0.031, // 21
    left: windowWidth * 0.08, // 30
    top: windowHeight * 0.6912, // 461
  },
  envelopeIcon: {
    /* Message_light */
    position: 'absolute',
    width: windowWidth * 0.056, // 21
    height: windowHeight * 0.031, // 21
    left: windowWidth * 0.08, // 30
    top: windowHeight * 0.5787, // 386
  },
  eyeIcon: {
    /* Message_light */
    position: 'absolute',
    width: windowWidth * 0.056, // 21
    height: windowHeight * 0.031, // 21
    left: windowWidth * 0.912, // 342
    top: windowHeight * 0.6912, // 461
  }
});