
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
//支付宝支付
import ZFB from './payZhiFuBao';
//现金支付
import XJ from './payXianJin';
//积分支付
import JF from './payJiFen';
//混合支付
import HH from './payhybrid'


export  default class payMerchants extends  Component{
    constructor(props){
        super(props);
        this.state={
            choose:'',
        };

        console.log(this.props.bid)
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
        if(obj==3){
            this.setState({
                choose:3,
            })
        }
        if(obj==4){
            this.setState({
                choose:4,
            })
        }

    }


    _next(obj){
        if(obj==1){
            //线上支付
            this.props.navigator.push({
                name:'payxs',
                component:ZFB,
                params:{
                    bid:this.props.bid,
                }
            })
        }
        if(obj==2){
            this.props.navigator.push({
                name:'payxj',
                component:XJ,
                params:{
                    bid:this.props.bid,
                }
            })
        }
        if(obj==3){
            this.props.navigator.push({
                name:'payjf',
                component:JF,
                params:{
                    bid:this.props.bid,
                    phone:this.props.phone,
                }
            })
        }
        if(obj==4){
            this.props.navigator.push({
                name:'payh',
                component:HH,
                params:{
                    bid:this.props.bid,
                    phone:this.props.phone,
                }
            })
        }
    }


    render(){
        return(
            <View style={{flex:1,backgroundColor:'#e5e5e5'}}>
                    <Tou title="选择支付方式" navigator={this.props.navigator}/>
                <TouchableOpacity onPress={this._choose.bind(this,1)} style={{width:WINWIDTH,height:WINHEIGHT*0.08,flexDirection:'row',backgroundColor:'#ffffff',alignItems:'center',}}>
                    <View style={{width:WINWIDTH*0.4,}}>
                        <View style={{width:WINWIDTH*0.05,height:WINWIDTH*0.05,borderRadius:20,borderWidth:1,borderColor:filecolor,marginLeft:WINWIDTH*0.1,justifyContent:'center',alignItems:'center'}}>
                            <View style={{width:WINWIDTH*0.02,height:WINWIDTH*0.02,borderRadius:10,backgroundColor:this.state.choose==1?filecolor:'#ffffff'}}>

                            </View>
                        </View>
                    </View>

                    <Text style={{fontSize:WINWIDTH*0.04,color:'#696969',marginLeft:WINWIDTH*0.05}}>
                        线上支付(支付宝)
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
                        线下支付(现金)
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={this._choose.bind(this,3)} style={{width:WINWIDTH,height:WINHEIGHT*0.08,flexDirection:'row',backgroundColor:'#ffffff',alignItems:'center',marginTop:WINHEIGHT*0.002}}>
                    <View style={{width:WINWIDTH*0.4,}}>
                        <View style={{width:WINWIDTH*0.05,height:WINWIDTH*0.05,borderRadius:20,borderWidth:1,borderColor:filecolor,marginLeft:WINWIDTH*0.1,justifyContent:'center',alignItems:'center'}}>
                            <View style={{width:WINWIDTH*0.02,height:WINWIDTH*0.02,borderRadius:10,backgroundColor:this.state.choose==3?filecolor:'#ffffff'}}>

                            </View>
                        </View>
                    </View>


                    <Text style={{fontSize:WINWIDTH*0.04,color:'#696969',marginLeft:WINWIDTH*0.05}}>
                        积分支付
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={this._choose.bind(this,4)} style={{width:WINWIDTH,height:WINHEIGHT*0.08,flexDirection:'row',backgroundColor:'#ffffff',alignItems:'center',marginTop:WINHEIGHT*0.002}}>
                    <View style={{width:WINWIDTH*0.4,}}>
                        <View style={{width:WINWIDTH*0.05,height:WINWIDTH*0.05,borderRadius:20,borderWidth:1,borderColor:filecolor,marginLeft:WINWIDTH*0.1,justifyContent:'center',alignItems:'center'}}>
                            <View style={{width:WINWIDTH*0.02,height:WINWIDTH*0.02,borderRadius:10,backgroundColor:this.state.choose==4?filecolor:'#ffffff'}}>

                            </View>
                        </View>
                    </View>


                    <Text style={{fontSize:WINWIDTH*0.04,color:'#696969',marginLeft:WINWIDTH*0.05}}>
                        混合支付
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


