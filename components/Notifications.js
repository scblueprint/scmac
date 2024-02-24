import React from "react";
import {View, Text, StyleSheet} from 'react-native';

const Notifications = () => {
    return (
        <View style = {styles.container}>
            <View style = {styles.background}></View>
            <View style = {styles.titleContain}>
                <Text style={styles.title}>Notifications</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleContain:{
        position: 'absolute',
        alignItems: 'center',
        top: 100,
    },
    background: { //need to figure out cuz the purple doesn't show (Notifications backgrnd color) 
        position: 'absolute',
        backgroundColor: '#e6e6fa', 
        height:100,
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Notifications;