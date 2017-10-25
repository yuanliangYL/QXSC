
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Navigator,
    TouchableOpacity,
    TextInput,
    Dimensions,
    Alert,



} from 'react-native';

import Cy from 'crypto-js/md5';
import Alipay from 'rn-alipay';

const  WINWIDTH = Dimensions.get('window').width;
const  WINHEIGHT = Dimensions.get('window').height;



export  default class payZhiFuBao extends  Component{
    constructor(props){
        super(props);
        this.state={};
    }

    _save(){


    }


    componentDidMount() {

    }




    render(){
        return(
            <View style={{backgroundColor:'#e6e6e6',flex:1,marginTop:64}}>


            </View>
        )
    }


}


