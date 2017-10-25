
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

const  WINWIDTH = Dimensions.get('window').width;
const  WINHEIGHT = Dimensions.get('window').height;

import Cy from 'crypto-js/md5';
import Alipay from 'rn-alipay';
export  default class payhybrid1 extends  Component{
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

    componentDidMount() {
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


    //支付宝
    sendData(obj,obj2,obj3){


        let timestamp = (new Date()).valueOf();
        const privateKey = 'MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAOKehxAQ1/6AAvJMojQGqnFMY8jfGGWheiehWCkSS67u/tBFh7Gxj2hwgkIzg7/vKLTdPa2g1Q/mq975AuGxXeDgRc1sFiAuwjoCXsW6ww0/ewoj4kkmGxvlLFHpjI70PwCicGMg22ZMsfRjiezuRTth4Ozithabw3CymDYBCOIvAgMBAAECgYBynW7+BybXBvN2jJ+05HIr31DQdVUngaYAiS/HhgNVNHcX6zKYAo/faJfY16kY1+Kkpwjc2e0on6fpm9ODRmuNrvoie9kYuhB0Ka9X+H+morvnRXbWnh6SOkqjc7b6sbWEhvyvOWblHbwaoOcsixdHr8EUWN13wRr6sYybUbTpoQJBAPLrObzai02z62kTswhDBKI5HLn5fWP0M4dN3FrjjyytyrZavMVEf8Fri5FUAqZZdkSDN45fSCcOS+KLansgh9kCQQDu0ppPsoxnwicJ17Ah49eZPLjGnsolAJzDaN1XdyI4e1YMNF81hxBGxkKJQcBu+M0TyHnUKbJuUohs0zfReL1HAkBK2OF8aBYeBf7V7ITwWb32wgQw5UeWYary2LG5q3309UONdl3NpnJ6xUlGqQz79nqzV37ptkAEEKqfDffsIjTZAkEAviYInvP2PpajJn8IybLy8hsas2myYQu/xQY1VXKRWI86z7TTKXdESlWInGgxoymNfvbbqUUZwCUOYjc59ho/+QJAKHYFBrinwljGAFWEXq7Yy/ekdhUSX2Z0eQc1febQvxH694cuW1oZxrLPBhIsvKBSuKgLX4YORkpKvBpKUEaKuQ==';

        //取用户uid
        storage.load({
            key: 'userinfo2',
            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的同步方法
            autoSync: true,
            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用同步方法的同时先返回已经过期的数据。
            // 设置为false的话，则始终强制返回同步方法提供的最新数据(当然会需要更多等待时间)。
            syncInBackground: false
        }).then(ret => {
            if (ret.uid) {


                const data = {
                    privateKey,
                    partner: '2088421207746445',
                    seller: '2088421207746445',
                    outTradeNO:obj+'_3_'+timestamp, //订单ID（由商家自行制定）
                    subject: '支付宝付款',//商品标题
                    body: '商品信息', //商品描述
                    totalFee:this.state.zhifubao, //商品价格
                    notifyURL: 'http://'+zfb+'/notify_url.php', //回调URL
                    service: 'mobile.securitypay.pay',
                    paymentType: '1',
                    inputCharset: 'utf-8',
                    itBPay: '30m',
                    showURL: 'm.alipay.com',
                    appSchemeIOS: 'testapp20',
                    //应用注册scheme,在AlixPayDemo-Info.plist定义URL types


                };
                // console.log(data.outTradeNO);


                // console.log(this.props.num)
                // console.log(this.props.pid)
                // console.log(this.props.price1)
                // console.log(this.props.ship1)


                Alipay.pay(data).then((msg) => {
                    console.log(msg)
                    fetch('http://' + ipdy + '/app_dev.php/sh/judgepaysuccess/'+obj+'/'+obj2+'/'+obj3)
                        .then((response) => response.json())
                        .then((responseJson) => {
                            console.log(responseJson)
                            if(responseJson.data==1){
                                Alert.alert(
                                    '提示',
                                    '支付成功',
                                    [

                                        {text: '确定', },
                                    ])
                            }
                            if(responseJson.data==0){
                                Alert.alert(
                                    '提示',
                                    '未支付',
                                    [

                                        {text: '确定', },
                                    ])
                            }
                        })
                        .catch((error) => {

                        });

                }, (e) => {
                    console.log(e);
                });
            }
        }).catch(err => {
            //如果没有找到数据且没有同步方法，
            //或者有其他异常，则在catch中返回
        })

    }


    _save(){
        if(this.state.zhifubao&&this.state.cash>0){
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

                    let count = parseInt(this.state.zhifubao) + parseInt(this.state.cash );
                    let countStr = count.toString();



                    console.log('http://' + ipdy + '/app_dev.php/sh/afterscandealorder/' + this.props.bid + '/' + (Cy('bid=' + this.props.bid + '&str=' + qm)) + '/' +countStr+ '_' + this.props.bid + '_' + ret.uid + '_' + this.state.cash + '_2_'+this.state.zhifubao+'_'+this.state.cash+'_1')

                    fetch('http://' + ipdy + '/app_dev.php/sh/afterscandealorder/' + this.props.bid + '/' + (Cy('bid=' + this.props.bid + '&str=' + qm)) + '/' +countStr+ '_' + this.props.bid + '_' + ret.uid + '_' + this.state.cash + '_2_'+this.state.zhifubao+'_'+this.state.cash+'_1')
                        .then((response) => response.json())
                        .then((responseJson) => {
                            console.log(responseJson)
                            if(responseJson.code==10000){
                                this.sendData(responseJson.orderid,this.props.bid,(Cy('bid=' + this.props.bid + '&str=' + qm)));
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
                alert('ddddd')
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
                        <Text style={{fontSize:WINWIDTH*(0.04)}}>支付宝</Text>
                    </View>
                    <View style={{backgroundColor:'#ffffff',flex:7,height:WINHEIGHT*(0.07),justifyContent:'center',alignItems:'center'}}>
                        <TextInput
                            placeholder={'请输入金额'}
                            underlineColorAndroid={'transparent'}
                            keyboardType={'numeric'}
                            maxLength={6}
                            onChangeText={(text) => this.setState({zhifubao:text})}
                            style={{height:WINHEIGHT*(0.06),fontSize:WINWIDTH*(0.035),width:WINWIDTH*(0.65)}}
                        />
                    </View>
                </View>


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


