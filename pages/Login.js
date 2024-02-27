import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Image } from 'expo-image';

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
});