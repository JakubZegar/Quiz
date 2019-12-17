import React from 'react';
import { StyleSheet, Alert,Text, View, AsyncStorage, TouchableHighlightBase } from 'react-native';
import DrawerNavigator from './navigation/DrawerNavigator';
import TermsScreen from './screens/TermsScreen';
import SplashScreen from './screens/SplashScreen';

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.handler = this.handler.bind(this)
    this.state = { 
      isLoading: true,
      termsShown:false,
     }
  }

  handler() {
    this.setState({
      termsShown:true
    })
  }


  performTimeConsumingTask = async() => {
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        2000
      )
    );
  }

  async componentDidMount() {
    const data = await this.performTimeConsumingTask();
    if (data !== null) {
      this.setState({ isLoading: false });
    }
  }

  render(){
  
    if (this.state.isLoading) {
      return <SplashScreen />;
    }

   if(this.state.termsShown==false) { 
     {
       return <TermsScreen handler = {this.handler}/>
     }
   }

  

    return (
      <View style={styles.container}>
        <DrawerNavigator/>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
