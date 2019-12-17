import React from 'react';
import {Alert, StyleSheet, Text, View, ScrollView } from 'react-native';
import MenuButton from '../components/MenuButton';

export default class ResultScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      results:[],
      isLoaded:false,
    }
  }

  componentDidMount() {
    fetch('http://www.json-generator.com/api/json/get/cghADpPyOG?indent=2')
      .then( res => res.json())
      .then(json => {
        this.setState({
          isLoaded:true,
          results:json,
        })
      })
  }

  
  render(){

    var { results, isLoaded } = this.state;

    if( !isLoaded )
    {
      return (
        <View style={styles.container}>
            <MenuButton navigation={this.props.navigation} />
            <Text style={styles.text}>Ładowanie...</Text>
        </View>
      );
    }

    else{

      return (
        <View style={styles.menuContainer}>
          <MenuButton navigation={this.props.navigation} />
          <ScrollView>
                  <View style={styles.resultContiner}>
                    {results.map( res =>(
                      <View  key={res.id} style={styles.result}>
                        <Text style={styles.textLabel}>
                          Nick: 
                        </Text>

                        <Text style={styles.textValue}>
                          {res.nick}    
                        </Text>

                        <Text style={styles.textLabel}>  
                          Wynik: 
                        </Text>
                        
                        <Text style={styles.textValue}>
                          {res.score}/{res.total}
                        </Text>

                        <Text style={styles.textLabel}>
                          Typ quizu: 
                        </Text>

                        <Text style={styles.textValue}>
                          {res.type}
                        </Text>

                        <Text style={styles.textLabel}>
                          Data: 
                        </Text>

                        <Text style={styles.textValue}>
                          {res.date}
                        </Text>

                      </View>
                    ) )}
                  </View>
            </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 6,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuContainer:{
    flex:3,
    justifyContent:"flex-start",
    alignItems:"flex-start",
    paddingTop:30,
    backgroundColor:"#FFAF53",
  },
  text:{
    fontSize:24,
  },
  resultContiner:{
    paddingTop:100,

  },
  result:{
    padding:10,
  },
  textLabel:{
    fontWeight:"bold",
    fontSize:24,
  },
  textValue:{
    fontSize:24,
  }
});
