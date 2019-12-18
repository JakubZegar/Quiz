import React from 'react';
import {Alert, RefreshControl, StyleSheet, Dimensions, Text, View, ScrollView } from 'react-native';
import MenuButton from '../components/MenuButton';
import Constants from 'expo-constants';



export default class ResultScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      results:[],
      isLoaded:false,
      refreshing:false,
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

  _onRefresh(){
    this.setState({
      refreshing:true,
    })
    fetch('http://www.json-generator.com/api/json/get/cghADpPyOG?indent=2')
      .then( res => res.json())
      .then(json => {
        this.setState({
          isLoaded:true,
          results:json,
        })
      }).then(() => {
        this.setState({
          refreshing:false,
        })
      })
  }
  
  render(){

    var { results, isLoaded } = this.state;

    if( !isLoaded )
    {
      return (
        <View style={styles.menuContainerNoPadding}>
            <MenuButton navigation={this.props.navigation} />
            <View style={{alignSelf:"center",justifyContent:"center"}}>
              <Text style={styles.text}>Ładowanie...</Text>
            </View>
        </View>
      );
    }

    else{

      return (
        <View style={styles.menuContainerNoPadding}>
          <MenuButton navigation={this.props.navigation} />
          
          <ScrollView refreshControl={
            <RefreshControl refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}/>
          }>
                  <View style={styles.menuContainer}>
                    {results.map( res =>(
                      <View  key={res.id} style={styles.resultContainer}>
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
    flex: 1,
    backgroundColor: '#FFAF53',
    alignItems:"stretch",
    justifyContent:'space-around',
  },
  menuContainer:{
    flex:3,
    justifyContent:"center",
    alignItems:"stretch",
    padding:20,
    paddingBottom:0,
    backgroundColor:"#FFAF53",
  },
  menuContainerNoPadding:{
    flex:3,
    justifyContent:"flex-start",
    alignItems:"flex-start",
    paddingTop:30,
    paddingBottom:0,
    backgroundColor:"#FFAF53",
  },
  
  resultContainer:{

    alignItems:"center",
    justifyContent:"center",
    padding:10,
    minHeight:50,
    backgroundColor:"#E88554",
    borderColor:"#E55D4A",
    borderWidth:3,
    minHeight:230,
    borderRadius:10,
    marginBottom:15,
  },


  text:{
    fontSize:20,
    fontWeight:"bold",
  },
  
  result:{
    padding:10,
  },
  textLabel:{
    fontWeight:"bold",
    fontSize:20,
  },
  textValue:{
    fontSize:20,
    alignSelf:"center"
  }
});
