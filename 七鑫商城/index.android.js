/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Navigator,
    TouchableOpacity,
    Dimensions, TextInput,
    AsyncStorage,
    InteractionManager,


} from 'react-native';


const WINWIDTH = Dimensions.get('window').width;
const WINHEIGHT = Dimensions.get('window').height;

import IOSANDROID from './qiXinComponent/index';


class djz extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }




    render() {
        return (
            <IOSANDROID/>
        );
    }


}


const styles = StyleSheet.create(
    {
        showTabBarStyle: {
            backgroundColor: 'white',
            height: 50
        },
        hidetabBarStyle: {
            height: 0,
            overflow: 'hidden'
        },
        sceneStyle: {
            paddingBottom: 0
        }
    }
)

AppRegistry.registerComponent('qixin', () => djz);
