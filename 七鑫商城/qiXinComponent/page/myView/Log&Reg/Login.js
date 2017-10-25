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
import Tou from '../../../head/headBack';
//注册
import Register from './Registered';

import HttpUtlis from '../../../tool/HttpUtils';


//登录页面
export default class  login extends  Component{
    constructor(props){
        super(props);
        this.state ={
            text:'',
            phone:0,

        };


    }

    //index.php?s=/Home/APPUser/userLogin/phone/15395002189/password/1

    toLogin(){
        var url = 'http://'+ipdy+'/index.php?s=/Home/APPUser/userLogin/phone/'+this.state.phone+'/password/'+this.state.pwd;

        console.log(this.state.phone)
        HttpUtlis.get(url)
            .then(result=>{
                console.log(result)
                if(result.code==10000){
                    _loginState(1,result.data.phone)
                    this.props.navigator.pop()
                    Alert.alert(
                        '提示',
                        '登录成功',
                        [
                            {text: '确定', },
                        ])

                    //将uid用户id存入数据库
                    storage.save({
                        key: 'userinfo2',  //注意:请不要在key中使用_下划线符号!
                        rawData: {
                            uid:result.data.id,
                            phone:result.data.phone,

                        },
                        expires: null
                    });


                    //保存用户信息
                    storage.save({
                        key: 'oluser',  //注意:请不要在key中使用_下划线符号!
                        rawData: {
                            birthday:result.data.birthday,
                            idcard:result.data.personid,
                            sex:result.data.gender,
                            username:result.data.username,


                        },
                        expires: null
                    });



                }else

                {
                    Alert.alert(
                        '提示',
                        '用户不存在或密码错误',
                        [
                            {text: '确定', },
                        ])
                }



            })
            .catch(error=>{
                console.log(error)


            })
    }




    toLogin1()
    {
        fetch('http://'+ipdy+'/app_dev.php/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },

            body: 'phone='+this.state.phone+'&pwd='+this.state.pwd,


        }).then((response) => response.json())
            .then((responseJson) => {
            console.log(responseJson)
                if(responseJson.code == 10000)
                {
                    //将uid用户id存入数据库
                    storage.save({
                        key: 'userinfo2',  //注意:请不要在key中使用_下划线符号!
                        rawData: {
                            uid:responseJson.data.uid,

                        },
                        expires: null
                    });


                    if(responseJson.data.bankcardData[0]){
                        //保存银行卡
                        storage.save({
                            key: 'olback',  //注意:请不要在key中使用_下划线符号!
                            rawData: {

                                cardarea:responseJson.data.bankcardData[0].cardarea,
                                cardbank:responseJson.data.bankcardData[0].cardbank,
                                cardnum:responseJson.data.bankcardData[0].cardnum,
                                carduser:responseJson.data.bankcardData[0].carduser,
                                personid:responseJson.data.bankcardData[0].personid,

                            },
                            expires: null
                        });
                    }
                    if(responseJson.data.userData[0])
                    {
                        //保存用户信息
                        storage.save({
                            key: 'oluser',  //注意:请不要在key中使用_下划线符号!
                            rawData: {
                                birthday:responseJson.data.userData[0].birthday,
                                city:responseJson.data.userData[0].city,
                                dist:responseJson.data.userData[0].dist,
                                idcard:responseJson.data.userData[0].idcard,
                                province:responseJson.data.userData[0].province,
                                sex:responseJson.data.userData[0].sex,
                                username:responseJson.data.userData[0].username,

                            },
                            expires: null
                        });
                    }




                    _jifen;

                    fetch('http://'+ipdy+'/app_dev.php/getuserdetail/'+responseJson.data.uid+'/'+(Cy('uid='+responseJson.data.uid+'&str='+qm)))
                        .then((response) => response.json())
                        .then((responseJson) => {
                            console.log(responseJson)
                            _loginState(1,responseJson.data[0].phone)

                            //跳转到个人中心(replace)
                            this.props.navigator.pop()
                            Alert.alert(
                                '提示',
                                '登录成功',
                                [
                                    {text: '确定', },
                                ])

                                storage.save({
                                key: 'userinfo',  //注意:请不要在key中使用_下划线符号!
                                rawData: {
                                    phone:responseJson.data[0].phone,
                                },

                                // 如果不指定过期时间，则会使用defaultExpires参数
                                // 如果设为null，则永不过期
                                expires: null
                            });


                        })
                        .catch((error) => {
                            console.error(error);
                        });



                    // alert(responseJson.msg);
                }else

                {
                    Alert.alert(
                        '提示',
                        '用户不存在或密码错误',
                        [
                            {text: '确定', },
                        ])
                }



            })
            .catch((error) => {
                console.error(error);
            });


    }

    render()
    {
        return(
    <View style={{backgroundColor:'#e6e6e6',flex:1,}}>
        <Tou title="登录" navigator={this.props.navigator}/>

        <View >
        <View style={styles.text}>

            <View style={{backgroundColor:'#ffffff',width:WINWIDTH*(0.08),height:WINHEIGHT*(0.08), flex:1,justifyContent:'center',alignItems:'center'}}>
                <Image source ={require('../../../../img/yonhu.png')} style={{width:WINWIDTH*(0.06),height:WINWIDTH*(0.06), }}/>
            </View>

            <View style={{backgroundColor:'#ffffff',width:WINWIDTH*(0.08),height:WINHEIGHT*(0.08),flex:6,}}>
                <TextInput style={{height:WINHEIGHT*(0.08)}}
                           placeholder={'请输入账号'}
                           maxLength={11}
                           underlineColorAndroid={'transparent'}
                           onChangeText={(text) => this.setState({phone:text})}
            />
        </View>

    </View>


    <View style={styles.text} >

        <View style={{backgroundColor:'#ffffff',width:WINWIDTH*(0.08),height:WINHEIGHT*(0.08), flex:1,justifyContent:'center',alignItems:'center'}}>
            <Image source ={require('../../../../img/mima.png')} style={{width:WINWIDTH*(0.06),height:WINWIDTH*(0.06), }}/>
        </View>

        <View style={{backgroundColor:'#ffffff',width:WINWIDTH*(0.08),height:WINHEIGHT*(0.08),flex:6,}}>
            <TextInput style={{height:WINHEIGHT*(0.08)}}
                       placeholder={'请输入密码'}
                       maxLength={21}
                       underlineColorAndroid={'transparent'}
                       secureTextEntry={true}
                       onChangeText={(text) => this.setState({pwd:text})}
            />
        </View>
    </View>
        {/*<View style={{flexDirection:'row',marginTop:WINHEIGHT*0.001}}>*/}
            {/*<View style={{backgroundColor:'#ffffff',flex:3,height:WINHEIGHT*(0.05),alignItems:'center',justifyContent:'center'}}>*/}
                {/*<Text style={{fontSize:WINWIDTH*(0.03),color:'#696969'}}>忘记密码请联系客服(028-85190925)</Text>*/}
            {/*</View>*/}
        {/*</View>*/}
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
    <TouchableOpacity activeOpacity={0.5} onPress={this.toLogin.bind(this)} style={{height:WINHEIGHT*(0.06), width:WINWIDTH*(0.8),justifyContent:'center', alignItems:'center',}}>
            <Text style={{fontSize:WINWIDTH*(0.04),color:'#ffffff'}}>登录</Text>
    </TouchableOpacity>
    </View>


</View>
        <View style={{width:WINWIDTH,justifyContent:'center',alignItems:'center'}}>
            <View style={{width:WINWIDTH*0.9,height:WINHEIGHT*0.07,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                <Text style={{fontSize:WINWIDTH*(0.03),color:'#696969'}} onPress={this._registered.bind(this)}>新用户注册</Text>
                <Text style={{fontSize:WINWIDTH*(0.03),color:'#696969'}}>更多</Text>
            </View>
        </View>




</View>
        )
    }


    _registered(){
        const {navigator} =this.props;
        if(navigator) {
            navigator.push({
                name:'registered',
                component:Register,
            })
        }
    }




}






const styles = StyleSheet.create({
    text:{
        height:WINHEIGHT*(0.08),
        flexDirection:'row',
        marginBottom:WINHEIGHT*(0.002),
    }
})
