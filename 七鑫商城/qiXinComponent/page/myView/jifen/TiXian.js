
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



export  default class  TiXian extends  Component{
    constructor(props){
        super(props);
        this.state={
        };
    }


    ///usertixian/{uid}/{sign}
    _tixian(){
        if(this.state.num>0){
            storage.load({
                key: 'userinfo2',
                // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的同步方法
                autoSync: true,
                // syncInBackground(默认为true)意味着如果数据过期，
                // 在调用同步方法的同时先返回已经过期的数据。
                // 设置为false的话，则始终强制返回同步方法提供的最新数据(当然会需要更多等待时间)。
                syncInBackground: false
            }).then(ret => {

                    console.log('http://'+ipdy+'/app_dev.php/usertixian/'+ret.uid+'/'+(Cy('uid='+ret.uid+'&str='+qm)))

                    fetch('http://'+ipdy+'/app_dev.php/usertixian/'+ret.uid+'/'+(Cy('uid='+ret.uid+'&str='+qm)), {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },

                        body: 'money=' + this.state.num,


                    }).then((response) => response.json())
                        .then((responseJson) => {
                            console.log(responseJson)

                            if (responseJson.code == 10000) {
                                Alert.alert(
                                    '提示',
                                    responseJson.msg,
                                    [
                                        {text: '确定'},
                                    ])
                                this.props.navigator.replace({name: 'my'})
                            }else if (responseJson.code == 10001){
                                Alert.alert(
                                    '提示',
                                    responseJson.msg,
                                    [
                                        {text: '确定'},
                                    ])
                            }
                            else if (responseJson.code == 10002){
                                Alert.alert(
                                    '提示',
                                    responseJson.msg,
                                    [
                                        {text: '确定'},
                                    ])
                            }
                            else if (responseJson.code == 10003){
                                Alert.alert(
                                    '提示',
                                    responseJson.msg,
                                    [
                                        {text: '确定'},
                                    ])
                            }
                            else if (responseJson.code == 10004){
                                Alert.alert(
                                    '提示',
                                    responseJson.msg,
                                    [
                                        {text: '确定'},
                                    ])
                            }
                            else if (responseJson.code == 10005){
                                Alert.alert(
                                    '提示',
                                    responseJson.msg,
                                    [
                                        {text: '确定'},
                                    ])
                            }
                            else if (responseJson.code == 10006){
                                Alert.alert(
                                    '提示',
                                    responseJson.msg,
                                    [
                                        {text: '确定'},
                                    ])
                            }



                        })
                        .catch((error) => {
                            console.error(error);

                        });

                // console.log(ret.phone)
            }).catch(err => {
                Alert.alert(
                    '提示',
                    '未登录',
                    [
                        {text: '确定'},
                    ])
            })
        }else {
            Alert.alert(
                '提示',
                '金额不正确',
                [
                    {text: '确定'},
                ])
        }




    }
    render(){
        return(
            <View style={{flex:1,backgroundColor:'#e5e5e5'}}>
                <View style={styles.text} >

                    <View style={{backgroundColor:'#ffffff',width:WINWIDTH*(0.08),height:WINHEIGHT*(0.08), flex:1,justifyContent:'center',alignItems:'center'}}>
                        <Image source ={require('../../../img/qian.png')} style={{width:WINWIDTH*(0.06),height:WINWIDTH*(0.06), }}/>
                    </View>

                    <View style={{backgroundColor:'#ffffff',width:WINWIDTH*(0.08),height:WINHEIGHT*(0.08),flex:6,}}>
                        <TextInput style={{height:WINHEIGHT*(0.08)}}
                                   placeholder={'请输入数额'}
                                   maxLength={8}
                                   underlineColorAndroid={'transparent'}
                                   onChangeText={(text) => this.setState({num:text})}
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
                        <TouchableOpacity onPress={this._tixian.bind(this)} activeOpacity={0.5} style={{height:WINHEIGHT*(0.06), width:WINWIDTH*(0.8),justifyContent:'center', alignItems:'center',}}>
                            <Text style={{fontSize:WINWIDTH*(0.04),color:'#ffffff'}}>提现</Text>
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
        marginBottom:WINHEIGHT*(0.01),
        marginTop:70,


    }



})