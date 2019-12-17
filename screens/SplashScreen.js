import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class SplashScreen extends React.Component {
    render() {

      return (
        <View style={styles.container}>
          <Image source={require('../assets/images/reactLogo.png')} />
        </View>
      );
    }
}


const styles = StyleSheet.create({
        container:{
            flex:1,
            backgroundColor: 'white',
            alignItems:'center',
            justifyContent:'center',
         },
      
        textStyle: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',

      },
  });

