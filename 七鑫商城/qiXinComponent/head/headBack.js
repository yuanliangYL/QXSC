
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
    Platform,



} from 'react-native';



const  WINWIDTH = Dimensions.get('window').width;
const  WINHEIGHT = Dimensions.get('window').height;



export  default class headBack extends  Component{
    constructor(props){
        super(props);
        this.state={};
    }

    render(){
        return(
            <View>
                <View style={{width:WINWIDTH,height:Platform.OS == 'ios' ? 20: WINHEIGHT*(0.02),backgroundColor:filecolor,}}></View>

        <View style={{backgroundColor:filecolor,width:WINWIDTH,height:Platform.OS == 'ios' ? 44: WINHEIGHT*(0.06),flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>

            <View style={{width:WINWIDTH*(0.2),height:Platform.OS == 'ios' ? 44: WINHEIGHT*(0.08),flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity onPress = {() => this.props.navigator.pop()} style={{height:WINHEIGHT*0.08,width:WINWIDTH*(0.15),justifyContent:'center',alignItems:'center',}}>
                    <Text style={{color:'#ffffff',fontSize:WINWIDTH*0.035}}>返回</Text>
                </TouchableOpacity>
            </View>


            <View style={{width:WINWIDTH*(0.6),height:Platform.OS == 'ios' ? 44 : WINHEIGHT*(0.06),justifyContent:'center',alignItems:'center',}}>
                <Text style={{fontSize:WINWIDTH*(0.04),color:'#f6f6f6',backgroundColor:'transparent'}}>{this.props.title}</Text>
            </View>


            <View style={{width:WINWIDTH*(0.2),height:Platform.OS == 'ios' ? 44: WINHEIGHT*(0.06),flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity style={{height:WINHEIGHT*0.03,width:WINWIDTH*(0.15),justifyContent:'center',alignItems:'center',}}>
                    {/*<Text style={{color:'#ffffff',fontSize:WINWIDTH*0.035}}>扫一扫</Text>*/}
                </TouchableOpacity>
            </View>
        </View>
            </View>
        )
    }


}


