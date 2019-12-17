import React from 'react';
import { Platform, Dimensions} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import HomeScreen from '../screens/HomeScreen';
import ResultScreen from '../screens/ResultScreen';
import TestScreen from '../screens/TestScreen';

const WIDTH = Dimensions.get('window').width;


const DrawerConfig={
    drawerWidth: WIDTH*0.60,
    drawerBackgroundColor:"#FFCC69"
}

const DrawerNavigator = createDrawerNavigator({
    Home:{
        screen: HomeScreen,
    },
    Result:{
        screen: ResultScreen,
    },
    Test:{
        screen: TestScreen,
    },
    
},
DrawerConfig)

export default createAppContainer(DrawerNavigator);