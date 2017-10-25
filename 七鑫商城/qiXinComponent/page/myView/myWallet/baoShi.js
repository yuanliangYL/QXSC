
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

const  WINWIDTH = Dimensions.get('window').width;
const  WINHEIGHT = Dimensions.get('window').height;

import Tou from '../../../head/headBack';

import TiXianJiLu from './tiXian';

import Myteam   from './team';

import MyBonus from './jiangJin';


import HttpUtlis from '../../../tool/HttpUtils';

import BaoshiList from './baoshiList';


export  default class baoShi extends  Component{
    constructor(props){
        super(props);
        this.state={};
    }

    _next(obj){
        if(obj==1){
            this.props.navigator.push({
                name:'baoshilist',
                component:BaoshiList,
                params:{

                }
            })
        }
        if(obj==2){

        }

    }






    render(){
        return(
            <View style={{backgroundColor:'#e6e6e6',flex:1}}>
                <Tou title="我的宝石" navigator={this.props.navigator}/>
                {/*<View style={{width:WINWIDTH,height:WINHEIGHT*0.2,backgroundColor:filecolor}}>*/}
                    {/*<View style={{width:WINWIDTH,height:WINHEIGHT*0.07,flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:WINHEIGHT*0.1}}>*/}
                        {/*<View style={{justifyContent:'center',alignItems:'center',width:WINWIDTH*0.5,height:WINHEIGHT*0.07,borderRightWidth:1,borderRightColor:'#ffffff'}}>*/}
                            {/*<Text style={{fontSize:WINWIDTH*0.035,color:'#ffffff'}}>赠送宝石</Text>*/}
                            {/*<Text style={{fontSize:WINWIDTH*0.035,color:'#ffffff'}}>0.00</Text>*/}
                        {/*</View>*/}

                        {/*<View style={{justifyContent:'center',alignItems:'center',width:WINWIDTH*0.5,height:WINHEIGHT*0.07,}}>*/}
                            {/*<Text style={{fontSize:WINWIDTH*0.035,color:'#ffffff'}}>待领取宝石</Text>*/}
                            {/*<Text style={{fontSize:WINWIDTH*0.035,color:'#ffffff'}}>0.00</Text>*/}
                        {/*</View>*/}
                    {/*</View>*/}
                {/*</View>*/}

                <View style={{width:WINWIDTH,justifyContent:'center',alignItems:'center',marginTop:WINHEIGHT*0.02,backgroundColor:'#ffffff'}}>
                    <TouchableOpacity onPress={this._next.bind(this,1)} style={{width:WINWIDTH*0.9,height:WINHEIGHT*0.08,backgroundColor:'#ffffff',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                        <Text style={{fontSize:WINWIDTH*0.035,}}>赠送宝石详情</Text>
                        <Text style={{fontSize:WINWIDTH*0.035,}}>></Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this._next.bind(this,2)} style={{width:WINWIDTH*0.9,height:WINHEIGHT*0.08,backgroundColor:'#ffffff',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                        <Text style={{fontSize:WINWIDTH*0.035,}}>赠送宝石计算规则</Text>
                        <Text style={{fontSize:WINWIDTH*0.035,}}>></Text>
                    </TouchableOpacity>



                </View>





            </View>
        )
    }


}


























