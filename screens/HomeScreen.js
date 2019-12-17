import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MenuButton from '../components/MenuButton';


export default class HomeScreen extends React.Component {
  render(){
    return (
      <View style={styles.menuContainer}>
        <MenuButton navigation={this.props.navigation} />
        
        <Text style={styles.text}>Home elo</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuContainer:{
    flex:3,
    justifyContent:"flex-start",
    alignItems:"flex-start",
    padding:20,
    paddingTop:30,
    backgroundColor:"#F6EBC5",
  },
  text:{
    fontSize:24,
  },
});
