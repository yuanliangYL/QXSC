
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
    ListView,
    Alert,


} from 'react-native';

import Cy from 'crypto-js/md5';
import Alipay from 'rn-alipay';

const  WINWIDTH = Dimensions.get('window').width;
const  WINHEIGHT = Dimensions.get('window').height;

import Modal from 'react-native-modalbox';

//头
import Tou from '../../../qiXinComponent/head/headBack';


export  default class qiXinZhuanGongPay extends  Component{
    constructor(props){
        super(props);
        var ds =new ListView.DataSource({rowHasChanged:(r1,r2)=> r1!==r2});
        this.state={
            dataSource: ds,
            id:'',//地址id
            uid:'',


            city:'安徽省合肥市',
            paytype:0,
            alltotal:(Number.parseFloat(this.props.num)*Number.parseFloat(this.props.price1))+Number.parseFloat(this.props.ship1),




        };


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
                this.setState({
                    uid:ret.uid,
                })
            }
        }).catch(err => {
            //如果没有找到数据且没有同步方法，
            //或者有其他异常，则在catch中返回
        })

    }




    weixin(){

    }





    componentDidMount() {

        //地址列表
        fetch('http://' + ipdy + '/app_dev.php/getaddressofmember/' + this.props.uid + '/' + (Cy('uid=' + this.props.uid + '&str='+qm)))
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({dataSource:this.state.dataSource.cloneWithRows(responseJson.data),});
            }).catch((error) => {
        })

        this._data()

    }
    //*****
    _data(){

        fetch('http://' + ipdy + '/app_dev.php/buyproduct/'+ this.props.uid +'/'+this.props.pid+'/'+this.state.id+'/'+this.props.ship1+'/'+this.props.num+'/'+this.props.price1+'/'+this.state.paytype+'/'+(Cy('uid='+this.props.uid+'&str='+qm)))
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                if(responseJson.code==10000){
                    this.sendData();
                }

            }).catch((error) => {
        })
    }

    changeSource(obj){

        this.setState({
            id:obj.id,

        })

    }

    _pay(obj){

        if(!this.state.id){
            Alert.alert(
                '提示',
                '请选择收货地址',
                [
                    {text: '确定', },
                ])
        }else {
            this.setState({
                paytype:obj,
            });

            if(this.props.zhekou==0&&this.props.tejia==0){
                var allprice = this.props.price1
            }else if(this.props.zhekou==0){
                var allprice = this.props.tejia
            }else {
                var allprice = this.props.price1*(this.props.zhekou/10)
            }


            fetch('http://' + ipdy + '/app_dev.php/buyproduct/'+ this.props.uid +'/'+this.props.pid+'/'+this.state.id+'/'+this.props.ship1+'/'+this.props.num+'/'+allprice+'/'+obj+'/'+(Cy('uid='+this.props.uid+'&str='+qm)))
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson)
                    if(obj==1){

                        if(responseJson.code==10000){
                            this.sendData();
                            this.refs.pay.close();
                        }

                    }else if(obj==3){
                        if(responseJson.code==10000){
                            Alert.alert(
                                '提示',
                                responseJson.msg,
                                [
                                    {text: '确定', onPress:()=>this.props.navigator.pop()},
                                ])
                        }else if(responseJson.code==10002){
                            Alert.alert(
                                '提示',
                                responseJson.msg,
                                [
                                    {text: '确定', },
                                ])

                        }
                        else if(responseJson.code==10003){
                            Alert.alert(
                                '提示',
                                responseJson.msg,
                                [
                                    {text: '确定', },
                                ])

                        }
                        else if(responseJson.code==10004){
                            Alert.alert(
                                '提示',
                                responseJson.msg,
                                [
                                    {text: '确定', },
                                ])

                        }






                        this.refs.pay.close();

                    }else if(obj==3){

                    }


                }).catch((error) => {
            })

        }






    }
    //财富币支付
    hongbao(){
        if(!this.state.id){
            Alert.alert(
                '提示',
                '请选择收货地址',
                [
                    {text: '确定', },
                ])
        }else {
            this._pay(3)
        }



    }

    //modal确定二级密码判断
    _sure(){
        storage.load({
            key: 'userinfo2',
            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的同步方法
            autoSync: true,
            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用同步方法的同时先返回已经过期的数据。
            // 设置为false的话，则始终强制返回同步方法提供的最新数据(当然会需要更多等待时间)。
            syncInBackground: true
        }).then(ret => {
            if (ret) {


                fetch('http://' + ipdy + '/app_dev.php/sh/compareoldpassword/' + ret.uid + '/1/' + this.state.redpwd + '/' + (Cy('id=' + ret.uid + '&slug=1&str='+qm)))

                    .then((response) => response.json())
                    .then((responseJson) => {
                        console.log(responseJson)

                        if (responseJson.code == 10000) {
                            this._pay(2)
                            this.refs.twopwd.close();

                        }else if(responseJson.code==10001){
                            Alert.alert(
                                '提示',
                                '二级密码错误',
                                [
                                    {text: '确定',},
                                ])

                        }

                    })
                    .catch((error) => {
                        Alert.alert(
                            '提示',
                            '网络异常',
                            [
                                {text: '确定',},
                            ])

                    })


            }

            // console.log(ret)
        }).catch(err => {
            alert('sdssd')
            //如果没有找到数据且没有同步方法，
            //或者有其他异常，则在catch中返回
        })
    }



    //支付宝
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
                    outTradeNO:ret.uid+'_2_'+this.props.pid+'_'+this.state.id+'_'+this.props.num+'_'+timestamp, //订单ID（由商家自行制定）
                    subject: this.props.title,//商品标题
                    body: '商品信息', //商品描述
                    totalFee: this.state.alltotal, //商品价格
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
                }, (e) => {
                    console.log(e);
                });
            }
        }).catch(err => {
            //如果没有找到数据且没有同步方法，
            //或者有其他异常，则在catch中返回
        })

    }

    _renderRow(rowData){
        return(

            <TouchableOpacity activeOpacity={1} style={{backgroundColor:'#ffffff',
            }} onPress={this.changeSource.bind(this,rowData)} >
                <View style={{

                    width:WINWIDTH,
                    height:WINHEIGHT*(0.2),
                    borderBottomColor:'#e6e6e6',
                    borderBottomWidth:1,
                    padding:WINWIDTH*(0.03),

                }}>
                    <View style={{flexDirection:'row',height:WINHEIGHT*(0.04)}}>
                        <View style={{flexDirection:'row',backgroundColor:'#ffffff',height:WINHEIGHT*(0.04),width:WINWIDTH*(0.75)}}>
                            <Text style={{
                                color:'#DC143C',
                                marginLeft:WINWIDTH*(0.03),
                                fontSize:WINWIDTH*(0.03),
                                marginTop:WINHEIGHT*(0.01),
                            }}>{rowData.realname}</Text>

                            <Text style={styles.TX3}>{rowData.phone}</Text>
                        </View>
                        <View style={{backgroundColor:'#ffffff',width:WINWIDTH*(0.12),justifyContent:'center',alignItems:'center'}}>

                            <Image source={this.state.id==rowData.id?require('../../../img/xuanzhong.png'):require('../../../img/weixuanzhong.png')}
                                   style={{width:WINWIDTH*(0.07),height:WINWIDTH*(0.07)}}
                            />
                        </View>
                    </View>
                    <View style={{flex:1,backgroundColor:'#f5f5f5',marginTop:5}}>
                        <Text style={styles.TX3}>地址:{rowData.address}</Text>
                    </View>
                </View>


            </TouchableOpacity>
        )


    }








    //this.props.num



    render(){
        return(
            <View style={{flex:1,backgroundColor:'#ffffff'}}>
                <Tou title="选择支付方式" navigator={this.props.navigator}/>
                <ScrollView style={{backgroundColor:'#e6e6e6',marginBottom:WINHEIGHT*(0.06)}}>

                    {/*商品信息*/}
                    <View style={{flexDirection:'row',justifyContent:'space-between',padding:WINWIDTH*(0.03),backgroundColor:'#ffffff',marginTop:WINHEIGHT*(0.01)}}>
                        <Text style={{fontSize:WINWIDTH*(0.04),color:'#696969',}}>商品信息</Text>
                        <Text style={{fontSize:WINWIDTH*(0.04),color:'#DC143C',}}></Text>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between',padding:WINWIDTH*(0.03),backgroundColor:'#ffffff',}}>
                        <Text style={{fontSize:WINWIDTH*(0.04),color:'#696969',}}>实付金额</Text>
                        {
                            this.props.zhekou==0&&this.props.tejia==0?
                                <Text style={{fontSize:WINWIDTH*(0.035),color:'#DC143C',}}>原价¥{this.props.price1*this.props.num}元</Text>
                                :
                                this.props.zhekou==0?
                                <View>
                                    <Text style={{fontSize:WINWIDTH*(0.035),color:'#696969',}}>原价:¥{this.props.price1*this.props.num}元</Text>
                                    <Text style={{fontSize:WINWIDTH*(0.035),color:'#DC143C',}}>特价¥{this.props.tejia*this.props.num}元</Text>
                                </View>

                                    :
                                    <View>
                                        <Text style={{fontSize:WINWIDTH*(0.035),color:'#696969',}}>原价:¥{this.props.price1*this.props.num}元</Text>
                                        <Text style={{fontSize:WINWIDTH*(0.035),color:'#DC143C',}}>折扣价¥{(this.props.price1*(this.props.zhekou/10))*this.props.num}元  </Text>
                                    </View>

                        }

                        {/*<Text style={{fontSize:WINWIDTH*(0.04),color:'#DC143C',}}>¥{this.props.price1*this.props.num}元</Text>*/}
                    </View>

                    <View style={{flexDirection:'row',justifyContent:'space-between',padding:WINWIDTH*(0.03),backgroundColor:'#ffffff',}}>
                        <Text style={{fontSize:WINWIDTH*(0.04),color:'#696969',}}>运费</Text>
                        <Text style={{fontSize:WINWIDTH*(0.04),color:'#DC143C',}}>{this.props.ship1}元</Text>
                    </View>
                    {/*收货地址信息*/}
                    <View style={{flexDirection:'row',justifyContent:'space-between',padding:WINWIDTH*(0.03),backgroundColor:'#ffffff',marginTop:WINHEIGHT*(0.01)}}>
                        <Text style={{fontSize:WINWIDTH*(0.04),color:'#696969',}}>收货地址列表</Text>
                    </View>
                    <ListView style={{marginTop:WINHEIGHT*(0.01),marginBottom:50}}
                              dataSource={this.state.dataSource}
                              renderRow={this._renderRow.bind(this)}
                              enableEmptySections = {true}

                    />




                </ScrollView>
                <View style={{justifyContent:'center', alignItems:'center',position:'absolute',
                    bottom:0,}}>

                    <View style={{
                        justifyContent:'center',
                        alignItems:'center',
                        backgroundColor:filecolor,
                        height:WINHEIGHT*(0.07),
                        width:WINWIDTH,

                    }}>
                        <TouchableOpacity onPress={()=>this.refs.pay.open()} style={{height:WINHEIGHT*(0.08), width:WINWIDTH,justifyContent:'center', alignItems:'center',}}
                        >
                            <Text style={{fontSize:16,color:'#ffffff'}}>提交订单</Text>
                        </TouchableOpacity>
                    </View>
                </View>




                <Modal animationType={'none'} style={{width:WINWIDTH,height:WINHEIGHT*(0.25),backgroundColor:'#f5f5f5',justifyContent:'center',alignItems:'center',borderRadius:10}} position={"bottom"} ref={"pay"}>





                    {/*<TouchableOpacity onPress={this._pay.bind(this,1)}style={{width:WINWIDTH*0.8,height:WINHEIGHT*0.06,backgroundColor:'#ffffff',justifyContent:'center',flexDirection:'row',alignItems:'center',borderRadius:5,shadowColor:'#515151',shadowOffset:{width:1,height:1},shadowRadius:1,*/}
                            {/*shadowOpacity: 1.0,}}>*/}
                        {/*<View style={{justifyContent:'center',alignItems:'center',width:40,height:30}}>*/}
                            {/*<Image source={require('../../../img/zhifubao.png')} style={{width:30,height:30}} />*/}
                        {/*</View>*/}
                        {/*<Text style={{fontSize:WINWIDTH*0.04,color:'#696969',fontWeight:'bold',marginLeft:10}}>支付宝支付</Text>*/}
                    {/*</TouchableOpacity>*/}






                    {/*<TouchableOpacity onPress={this.weixin.bind(this,3)} style={{width:WINWIDTH*0.8,height:WINHEIGHT*0.06,backgroundColor:'#ffffff',justifyContent:'center',flexDirection:'row',alignItems:'center',borderRadius:5,shadowColor:'#515151',shadowOffset:{width:1,height:1},shadowRadius:1,shadowOpacity: 1.0,marginTop:10}}>*/}
                    {/*<View style={{justifyContent:'center',alignItems:'center',width:40,height:30}}>*/}
                    {/*<Image source={require('../../../img/weixin.png')} style={{width:30,height:30}} />*/}
                    {/*</View>*/}
                    {/*<Text style={{fontSize:WINWIDTH*0.04,color:'#696969',marginLeft:10,fontWeight:'bold'}}>微信支付</Text>*/}
                    {/*</TouchableOpacity>*/}






                    <TouchableOpacity onPress={this.hongbao.bind(this)} style={{width:WINWIDTH*0.8,height:WINHEIGHT*0.06,backgroundColor:'#ffffff',justifyContent:'center',flexDirection:'row',alignItems:'center',borderRadius:5,shadowColor:'#515151',shadowOffset:{width:1,height:1},shadowRadius:1,shadowOpacity: 1.0,marginTop:10}}>
                        <View style={{justifyContent:'center',alignItems:'center',width:40,height:30}}>
                            <Image source={require('../../../img/hongbao.png')} style={{width:30,height:30}} />
                        </View>
                        <Text style={{fontSize:WINWIDTH*0.04,color:'#696969',marginLeft:10,fontWeight:'bold'}}>乐福分支付</Text>
                    </TouchableOpacity>











                </Modal>


                {/*二级密码modal*/}
                <Modal animationType={'none'} style={{width:WINWIDTH*(0.8),height:WINHEIGHT*(0.25),backgroundColor:'#ffffff',borderRadius:5,alignItems:'center',marginTop:1}}  ref={"twopwd"}>
                    <View style={{alignItems:'center',justifyContent:'center',backgroundColor:'#ffffff',height:WINHEIGHT*(0.15),flex:1,}}>
                        {/*<Text style={{color:'#696969',fontSize:WINWIDTH*0.035}}>二级密码</Text>*/}
                        <TextInput
                            style={{
                                height:WINHEIGHT*(0.08),
                                borderColor: '#595959',
                                borderWidth: 1,
                                borderRadius: 5,
                                width:WINWIDTH*(0.7),
                                marginTop:10,
                            }}
                            onChangeText={(text) => this.setState({redpwd:text})}
                            placeholder={'请输入二级密码'}
                            keyboardType={'numeric'}
                            secureTextEntry={true}
                            underlineColorAndroid={'transparent'}
                            maxLength={6}
                        />

                    </View>


                    <TouchableOpacity style={{height:WINHEIGHT*(0.05),backgroundColor:'#ffffff',flex:1,justifyContent:'center',alignItems:'center',width:WINWIDTH*(0.8),borderTopWidth:1,borderTopColor:'#e6e6e6',}}
                                      onPress={this._sure.bind(this,this.props.bid)}
                    >
                        <Text style={{fontSize:WINWIDTH*(0.035),color:filecolor,fontWeight:'bold'}}>确定</Text>
                    </TouchableOpacity>










                </Modal>
            </View>

        )
    }

    _lbs(){

        fetch('http://api.map.baidu.com/geocoder/v2/?callback=&output=json&address='+encodeURIComponent('合肥市')+'&ak=7D4G5gyrX3tlsI0yN5qfqj1ukTBn9mO5')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)

            })
            .catch((error) => {

            })



        fetch('http://api.map.baidu.com/geocoder/v2/?callback=&location=39.983424,116.322987&output=json&pois=1&ak=7D4G5gyrX3tlsI0yN5qfqj1ukTBn9mO5')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)

            })
            .catch((error) => {

            })
    }


}


const styles = StyleSheet.create({

    TX:{
        marginLeft:WINWIDTH*(0.03),
        fontSize:WINWIDTH*(0.035),

    },
    TX1:{
        color:'#696969',
        marginLeft:WINWIDTH*(0.03),
        fontSize:WINWIDTH*(0.03),
        marginTop:WINHEIGHT*(0.01),

    },
    TX2:{
        color:'#696969',
        marginLeft:WINWIDTH*(0.05),
        fontSize:WINWIDTH*(0.03),
        marginTop:WINHEIGHT*(0.01),


    },
    TX3:{
        color:'#696969',
        marginLeft:WINWIDTH*(0.03),
        fontSize:WINWIDTH*(0.03),
        marginTop:WINHEIGHT*(0.01),
        width:WINWIDTH*(0.55),

    }


});
