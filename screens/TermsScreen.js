import React from 'react';
import { Alert, StyleSheet, Text, View, Image, Button, AsyncStorage } from 'react-native';


export default class SplashScreen extends React.Component {

    
    showValue = async() =>{
        await AsyncStorage.removeItem('isShown')
        this.props.handler();
    }

    render() {

      return (
        
        <View style={styles.container}>
            <View style={styles.terms}>
                <Text style={styles.textStyle}>Regulamin</Text>
                <Text style={styles.paragraphStyle}>1. Bądź grzeczny</Text>
            </View>
            <View style={styles.acceptButtonContainer}>
            <Button
                title="No dobra, niech będzie"
                style={styles.acceptButton}
                onPress={() => this.showValue() }
                />
            </View>
        </View>

      );
    }

    

}

const styles = StyleSheet.create({
    container:{
            flex:5,
            backgroundColor: '#FFAF53',
         },
      
    textStyle: {
        color: 'black',
        fontSize: 40,
        fontWeight: 'bold',
      },
    paragraphStyle:{
          color:'black',
          fontSize:24,
      },
    acceptButtonContainer:{
          flex:1,
      },
    terms:{
          flex:5,
          alignItems:'center',
          justifyContent:'center',
      }
  });
