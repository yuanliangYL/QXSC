
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


//头
import Tou from '../head/headBack';
//qr页面
import QR from '../page/qr';


export  default class payXianJin extends  Component{
    constructor(props){
        super(props);
        this.state={

        };

        console.log(this.props.bid)



    }

    _save(){
        if(this.state.allcount>0){
            storage.load({
                key: 'userinfo2',
                // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的同步方法
                autoSync: true,
                // syncInBackground(默认为true)意味着如果数据过期，
                // 在调用同步方法的同时先返回已经过期的数据。
                // 设置为false的话，则始终强制返回同步方法提供的最新数据(当然会需要更多等待时间)。
                syncInBackground: true
            }).then(ret => {
                if(ret){
                    fetch('http://' + ipdy + '/app_dev.php/sh/afterscandealorder/' + this.props.bid + '/' + (Cy('bid=' + this.props.bid + '&str=' + qm)) + '/' + this.state.allcount + '_' + this.props.bid + '_' + ret.uid + '_' + this.state.allcount + '_3_0_0_0')
                        .then((response) => response.json())
                        .then((responseJson) => {
                            console.log(responseJson)
                            if(responseJson.code==10000){
                                this.props.navigator.push({
                                    name:'qr',
                                    component:QR,
                                    params:{
                                        qrdata:'http://' + ipdy + '/app_dev.php/sh/businesssaoyisao/'+this.props.bid+'/'+(Cy('bid='+this.props.bid+'&str='+qm))+'/'+responseJson.orderid,
                                    }

                                })
                            }

                            if(responseJson.code==10002){
                                Alert.alert(
                                    '提示',
                                    responseJson.msg,
                                    [

                                        {text: '确定', },
                                    ])
                            }
                            if(responseJson.code==10003){
                                Alert.alert(
                                    '提示',
                                    responseJson.msg,
                                    [

                                        {text: '确定', },
                                    ])
                            }
                            if(responseJson.code==10004){
                                Alert.alert(
                                    '提示',
                                    responseJson.msg,
                                    [

                                        {text: '确定', },
                                    ])
                            }
                            if(responseJson.code==10005){
                                Alert.alert(
                                    '提示',
                                    responseJson.msg,
                                    [

                                        {text: '确定', },
                                    ])
                            }
                            if(responseJson.code==10006){
                                Alert.alert(
                                    '提示',
                                    responseJson.msg,
                                    [

                                        {text: '确定', },
                                    ])
                            }


                        })
                        .catch((error) => {

                        });

                }

            }).catch(err => {
                alert('dddddd')
                //如果没有找到数据且没有同步方法，
                //或者有其他异常，则在catch中返回
            })
        }else {
            Alert.alert(
                '提示',
                '请输入正确的金额',
                [

                    {text: '确定', },
                ])
        }

    }

    render(){
        return(
            <View style={{backgroundColor:'#e6e6e6',flex:1,}}>
                <Tou title="选择支付方式" navigator={this.props.navigator}/>
                <View style={{flexDirection:'row',marginTop:10}}>
                    <View style={{backgroundColor:'#ffffff',flex:3,height:WINHEIGHT*(0.07),justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontSize:WINWIDTH*(0.04)}}>线下支付</Text>
                    </View>
                    <View style={{backgroundColor:'#ffffff',flex:7,height:WINHEIGHT*(0.07),justifyContent:'center',alignItems:'center'}}>
                        <TextInput
                            placeholder={'请输入金额'}
                            underlineColorAndroid={'transparent'}
                            keyboardType={'numeric'}
                            maxLength={6}
                            onChangeText={(text) => this.setState({allcount:text})}
                            style={{height:WINHEIGHT*(0.06),fontSize:WINWIDTH*(0.035),width:WINWIDTH*(0.65)}}
                        />
                    </View>
                </View>


                <View style={{justifyContent:'center',flexDirection:'row'}}>
                    <TouchableOpacity onPress={this._save.bind(this)} style={{
                            marginTop:WINHEIGHT*(0.08),
                            justifyContent:'center',
                            alignItems:'center',
                            backgroundColor:filecolor,
                            height:WINHEIGHT*(0.06),
                            width:WINWIDTH*(0.8),
                            borderRadius:5,
                        }}>
                        <Text style={{fontSize:16,color:'#ffffff'}}>确定</Text>

                    </TouchableOpacity>
                </View>

            </View>
        )
    }


}


