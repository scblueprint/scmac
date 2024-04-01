import { StyleSheet, Text, View } from 'react-native';
import NavBar from '../components/NavBar.js'
export default function Profile({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
    <View style={styles.pfpCircle}>
  <Text>PFP</Text>
</View>
    <View style={styles.name}>
      <Text style={{fontSize:20}}>Firstname Lastname</Text>
        </View>
    <View style={styles.email}>
      <Text style={{fontSize:15, marginLeft:30 }}>Email</Text>
    <View style={styles.number}>
    </View>
      <Text style={{fontSize:15, marginLeft:30 }}>Phone number</Text>
        </View>
    <View style={styles.gender}>
      <Text style={{fontSize:15, marginLeft:30 }}>Gender</Text>
        </View>
    <View style={styles.birthday}>
      <Text style={{fontSize:15, marginLeft:30 }}>Birthday</Text>
        </View>
    <NavBar navigation={navigation}/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#6A466C',
    textAlign: 'center',
    padding: 80,
    paddingBottom: 10,
  },
  pfpCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    fontSize:30,
    backgroundColor: '#D9D9D9',
    marginBottom: 20,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
  },
  email: {
    // marginTop:10,
    // fontSize: 15,
    // width: 393,
    // height: 18,
    //backgroundColor: 'yellow',
  },
  number: {
    // marginTop:10,
    // paddingBottom: 4,
    // width: 393,
    // height: 18,
    //backgroundColor: 'red',
  },
  gender: {
    // marginTop:10,
    // paddingBottom: 4,
    // width: 393,
    // height: 18,
    //backgroundColor: 'blue',
  },
  birthday: {
    // marginTop:10,
    // width: 393,
    // height: 18,
    //backgroundColor: 'cyan',
  },
});