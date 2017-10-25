
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

import Tou from '../../../head/headBack';
import HttpUtlis from '../../../tool/HttpUtils';

export  default class topUp extends  Component{
    constructor(props){
        super(props);
        this.state={};
    }

    _save(){


    }


    componentDidMount() {

    }

    //http://www.ygfj168.com/index.php?s=/Home/APPGoods/requestCharge/uid/37/money/3000/sign/123123

    sendData(){


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
                    outTradeNO:'1_'+this.state.data+'_'+timestamp, //订单ID（由商家自行制定）
                    subject:'在线充值',//商品标题
                    body: '充值', //商品描述
                    totalFee: this.state.money, //商品价格
                    notifyURL: 'http://www.ygfj168.com/notify.php', //回调URL

                    service: 'mobile.securitypay.pay',
                    paymentType: '1',
                    inputCharset: 'utf-8',
                    itBPay: '30m',
                    showURL: 'm.alipay.com',
                    appSchemeIOS: 'testapp20',
                    //应用注册scheme,在AlixPayDemo-Info.plist定义URL types


                    // partner: '2088421207746445',
                    // seller: '2088421207746445',
                    // outTradeNO:ret.uid+'_2_'+this.props.pid+'_'+this.state.id+'_'+this.props.num+'_'+timestamp, //订单ID（由商家自行制定）
                    // subject: 'ddddd',//商品标题
                    // body: '商品信息', //商品描述
                    // totalFee: '0.1', //商品价格
                    // notifyURL: 'http://'+zfb+'/notify_url.php', //回调URL
                    // service: 'mobile.securitypay.pay',
                    // paymentType: '1',
                    // inputCharset: 'utf-8',
                    // itBPay: '30m',
                    // showURL: 'm.alipay.com',
                    // appSchemeIOS: 'testapp20',
                    //


                };
                console.log(data.outTradeNO);


                // console.log(this.props.num)
                // console.log(this.props.pid)
                // console.log(this.props.title)
                // console.log(this.props.ship1)


                Alipay.pay(data).then((msg) => {
                    console.log(msg)
                    // console.log(error)

                    var url = 'http://'+ipdy+'/index.php?s=/Home/APPGoods/judgePaySuccess/uid/'+ret.uid+'/charge_id/'+this.state.data+'/sign/'+(Cy('charge_id='+this.state.data+'&uid='+ret.uid+'&key='+qm))

                    HttpUtlis.get(url)
                        .then(result=>{
                            console.log(result)
                            if(result.slug==1){
                                Alert.alert(
                                    '提示',
                                    '支付成功',
                                    [

                                        {text: '确定', },
                                    ])
                            }
                            if(result.slug==0){
                                Alert.alert(
                                    '提示',
                                    '未支付',
                                    [

                                        {text: '确定', },
                                    ])
                            }

                        })
                        .catch(error=>{
                            console.log(error)

                        })

                }, (e) => {
                    console.log(e);
                });
            }
        }).catch(err => {
            //如果没有找到数据且没有同步方法，
            //或者有其他异常，则在catch中返回
        })

    }

    topup(){
        storage.load({
            key: 'userinfo2',
            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的同步方法
            autoSync: true,
            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用同步方法的同时先返回已经过期的数据。
            // 设置为false的话，则始终强制返回同步方法提供的最新数据(当然会需要更多等待时间)。
            syncInBackground: true
        }).then(ret => {

            var url = 'http://'+ipdy+'/index.php?s=/Home/APPGoods/requestCharge/uid/'+ret.uid+'/money/'+this.state.money+'/sign/'+(Cy('money='+this.state.money+'&uid='+ret.uid+'&key='+qm))

            HttpUtlis.get(url)
                .then(result=>{
                    console.log(result)
                    if(result.code==10000){
                        this.setState({
                            data:result.data,

                        })
                        this.sendData()
                    }

                })
                .catch(error=>{
                    console.log(error)

                })

        }).catch(err => {


            //如果没有找到数据且没有同步方法，
            //或者有其他异常，则在catch中返回
        })

    }


    render(){
        return(
            <View style={{backgroundColor:'#e6e6e6',flex:1,}}>
                <Tou title="在线充值" navigator={this.props.navigator}/>

                <View style={styles.text}>

                    <View style={{backgroundColor:'#ffffff',width:WINWIDTH*(0.08),height:WINHEIGHT*(0.08), flex:1,justifyContent:'center',alignItems:'center'}}>
                        <Image source ={require('../../../../img/yonhu.png')} style={{width:WINWIDTH*(0.06),height:WINWIDTH*(0.06), }}/>
                    </View>

                    <View style={{backgroundColor:'#ffffff',width:WINWIDTH*(0.08),height:WINHEIGHT*(0.08),flex:6,}}>
                        <TextInput style={{height:WINHEIGHT*(0.08)}}
                                   placeholder={'请输入充值金额'}
                                   maxLength={11}
                                   underlineColorAndroid={'transparent'}
                                   onChangeText={(text) => this.setState({money:text})}
                        />
                    </View>

                </View>

                <View style={{justifyContent:'center', alignItems:'center',}}>
                    <View style={{
                            marginTop:WINHEIGHT*(0.08),
                            justifyContent:'center',
                            alignItems:'center',
                            backgroundColor:filecolor,
                            height:WINHEIGHT*(0.06),
                            width:WINWIDTH*(0.8),
                            borderRadius:5,
                        }}>
                        <TouchableOpacity activeOpacity={0.5} onPress={this.topup.bind(this)} style={{height:WINHEIGHT*(0.06), width:WINWIDTH*(0.8),justifyContent:'center', alignItems:'center',}}>
                            <Text style={{fontSize:WINWIDTH*(0.04),color:'#ffffff'}}>确定充值</Text>
                        </TouchableOpacity>
                    </View>


                </View>



            </View>
        )
    }

}




const styles = StyleSheet.create({
    text:{
        height:WINHEIGHT*(0.08),
        flexDirection:'row',
        marginBottom:WINHEIGHT*(0.002),
        marginTop:WINHEIGHT*0.002,


    }



})


