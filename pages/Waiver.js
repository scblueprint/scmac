
import React, { useState } from 'react';
import Checkbox from 'expo-checkbox';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';


export default function Waiver() {

    const [isChecked, setIsChecked] = useState(false);

    return (
        <View style = {styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Text style =
         {{fontSize: 40, color:'#A3A3A3'}}>
            {'<'}
        </Text>
      </TouchableOpacity>
      <Text style={styles.Waiver}>Waiver</Text>

      <View style={styles.imageContainer}>
                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    <Image
                        source={require('../assets/SCMAC-Waiver.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </ScrollView>
      </View>
      {/* <View style = {styles.rectangle}>
        <ScrollView horizontal showsHorizontalScrollIndicator={true}>
          <Image
            source={require('../assets/SCMAC-Waiver.png')}
            style={styles.image}
            resizeMode="contain"
          />
         </ScrollView>
      </View> */}


      <View style = {{ flexDirection: 'row', alignItems: 'center', width: '70%'}}>
        <Checkbox
            value={isChecked}
            onValueChange={setIsChecked}
            />
            <Text style={{fontSize: 17, fontWeight: 400, lineHeight: 20.57}}>
                I have read and agree to the terms and conditions of the waiver.
            </Text>
       </View>
        <TouchableOpacity style={styles.continueButton}>
        <Text style = {{color:"white", fontSize:25}}>Continue</Text>
      </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      paddingLeft: 25,
      backgroundColor: 'white',
    },
    backButton: {
        marginTop: 80,
        width: 54,
        height: 54,
        borderRadius: 27,
        borderWidth: 2.5,
        borderColor: '#A3A3A3',
        alignItems: 'center',
        justifyContent: 'center',
      },
      Waiver: {
        paddingTop: 35,
        paddingBottom: 25,
        fontSize: 40,
        color: '#6A466C',
        fontWeight: 600,
      },
      rectangle: {
        width: 329,
        height: 370,
        backgroundColor: '#E9E9E9',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
      },
      image: {
        // flex: 1,
        width: '100%',
        height: undefined,
        aspectRatio: 329 / 370,
      },
      continueButton: {
        marginTop: 35,
        backgroundColor: '#6A466C',
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
        width: 333,
        height: 44,
      },   
});