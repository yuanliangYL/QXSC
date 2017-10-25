
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
//头
import Tou from '../head/headBack';
//QR
import QR from '../page/qr';



const  WINWIDTH = Dimensions.get('window').width;
const  WINHEIGHT = Dimensions.get('window').height;

import Cy from 'crypto-js/md5';




export  default class payhybrid2 extends  Component{
    constructor(props){
        super(props);
        this.state={};

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
    }


    componentDidMount() {

        console.log(this.props.bid)
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

                console.log('http://' + ipdy + '/app_dev.php/sh/getscorenow/'+ret.uid+'/'+(Cy('uid='+ret.uid+'&str='+qm)))

                fetch('http://' + ipdy + '/app_dev.php/sh/getscorenow/'+ret.uid+'/'+(Cy('uid='+ret.uid+'&str='+qm)))
                        .then((response) => response.json())
                        .then((responseJson) => {
                            console.log(responseJson)
                            this.setState({
                                yue:responseJson.hongbao,
                            })

                        })
                        .catch((error) => {

                        });


                // (Number.parseFloat(this.state.integral)
                // (Number.parseFloat(this.state.cash)

            }

        }).catch(err => {

            //如果没有找到数据且没有同步方法，
            //或者有其他异常，则在catch中返回
        })






    }


    _save(){
        if(this.state.integral&&this.state.cash>0){
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

                    let count = parseInt(this.state.integral) + parseInt(this.state.cash );
                    let countStr = count.toString();

                    fetch('http://' + ipdy + '/app_dev.php/sh/afterscandealorder/' + this.props.bid + '/' + (Cy('bid=' + this.props.bid + '&str=' + qm)) + '/' +countStr+ '_' + this.props.bid + '_' + ret.uid + '_' + this.state.cash + '_2_'+this.state.integral+'_'+this.state.cash+'_2')
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


                    // (Number.parseFloat(this.state.integral)
                    // (Number.parseFloat(this.state.cash)

                }

            }).catch(err => {

                //如果没有找到数据且没有同步方法，
                //或者有其他异常，则在catch中返回
            })
        }else {
            Alert.alert(
                '提示',
                '请输入正确金额',
                [

                    {text: '确定', },
                ])
        }


    }

    render(){
        return(
            <View style={{flex:1,backgroundColor:'#e5e5e5',}}>
                <Tou title="选择支付方式" navigator={this.props.navigator}/>

                <View style={{flexDirection:'row',marginTop:WINHEIGHT*0.002}}>
                    <View style={{backgroundColor:'#ffffff',flex:3,height:WINHEIGHT*(0.07),justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontSize:WINWIDTH*(0.04)}}>积分</Text>
                    </View>
                    <View style={{backgroundColor:'#ffffff',flex:7,height:WINHEIGHT*(0.07),justifyContent:'center',alignItems:'center'}}>
                        <TextInput
                            placeholder={'请输入金额 (当前余额'+this.state.yue+')'}
                            underlineColorAndroid={'transparent'}
                            keyboardType={'numeric'}
                            maxLength={6}
                            onChangeText={(text) => this.setState({integral:text})}
                            style={{height:WINHEIGHT*(0.06),fontSize:WINWIDTH*(0.035),width:WINWIDTH*(0.65)}}
                        />
                    </View>
                </View>


                <View style={{flexDirection:'row',marginTop:WINHEIGHT*0.002}}>
                    <View style={{backgroundColor:'#ffffff',flex:3,height:WINHEIGHT*(0.07),justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontSize:WINWIDTH*(0.04)}}>现金</Text>
                    </View>
                    <View style={{backgroundColor:'#ffffff',flex:7,height:WINHEIGHT*(0.07),justifyContent:'center',alignItems:'center'}}>
                        <TextInput
                            placeholder={'请输入金额'}
                            underlineColorAndroid={'transparent'}
                            keyboardType={'numeric'}
                            maxLength={6}
                            onChangeText={(text) => this.setState({cash:text})}
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


