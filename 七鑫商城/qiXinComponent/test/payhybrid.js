
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



const  WINWIDTH = Dimensions.get('window').width;
const  WINHEIGHT = Dimensions.get('window').height;


//头
import Tou from '../head/headBack';
//支付宝加积分
import ZfbJf from './payhybrid1';
//积分加现金
import JfXj from './payhybrid2';

export  default class payDetailde extends  Component{
    constructor(props){
        super(props);
        this.state={};
    }

    _choose(obj){
        if(obj==1){
            this.setState({
                choose:1,
            })
        }
        if(obj==2){
            this.setState({
                choose:2,
            })

        }
    }

    _next(obj){

        if(obj==1){
            this.props.navigator.push({
                name:'payhy1',
                component:ZfbJf,
                params:{
                    bid:this.props.bid,
                }
            })
        }
        if(obj==2){
            this.props.navigator.push({
                name:'payhy2',
                component:JfXj,
                params:{
                    bid:this.props.bid,
                }
            })
        }
    }



    render(){
        return(
            <View style={{flex:1,backgroundColor:'#e5e5e5',}}>
                <Tou title="选择支付方式" navigator={this.props.navigator}/>
                <TouchableOpacity onPress={this._choose.bind(this,1)} style={{width:WINWIDTH,height:WINHEIGHT*0.08,flexDirection:'row',backgroundColor:'#ffffff',alignItems:'center',}}>
                    <View style={{width:WINWIDTH*0.4,}}>
                        <View style={{width:WINWIDTH*0.05,height:WINWIDTH*0.05,borderRadius:20,borderWidth:1,borderColor:filecolor,marginLeft:WINWIDTH*0.1,justifyContent:'center',alignItems:'center'}}>
                            <View style={{width:WINWIDTH*0.02,height:WINWIDTH*0.02,borderRadius:10,backgroundColor:this.state.choose==1?filecolor:'#ffffff'}}>

                            </View>
                        </View>
                    </View>

                    <Text style={{fontSize:WINWIDTH*0.04,color:'#696969',marginLeft:WINWIDTH*0.05}}>
                        支付宝+积分
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._choose.bind(this,2)} style={{width:WINWIDTH,height:WINHEIGHT*0.08,flexDirection:'row',backgroundColor:'#ffffff',alignItems:'center',marginTop:WINHEIGHT*0.002}}>
                    <View style={{width:WINWIDTH*0.4,}}>
                        <View style={{width:WINWIDTH*0.05,height:WINWIDTH*0.05,borderRadius:20,borderWidth:1,borderColor:filecolor,marginLeft:WINWIDTH*0.1,justifyContent:'center',alignItems:'center'}}>
                            <View style={{width:WINWIDTH*0.02,height:WINWIDTH*0.02,borderRadius:10,backgroundColor:this.state.choose==2?filecolor:'#ffffff'}}>

                            </View>
                        </View>
                    </View>

                    <Text style={{fontSize:WINWIDTH*0.04,color:'#696969',marginLeft:WINWIDTH*0.05}}>
                        积分+现金
                    </Text>
                </TouchableOpacity>

                <View style={{width:WINWIDTH,height:WINHEIGHT*0.2,alignItems:'center',marginTop:WINHEIGHT*0.02,justifyContent:'center',}}>
                    <TouchableOpacity onPress={this._next.bind(this,this.state.choose)} style={{borderRadius:10,width:WINWIDTH*0.7,height:WINHEIGHT*0.08,backgroundColor:filecolor,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontSize:WINWIDTH*0.04,color:'#ffffff'}}>
                            下一步
                        </Text>

                    </TouchableOpacity>

                </View>
            </View>
        )
    }


}


