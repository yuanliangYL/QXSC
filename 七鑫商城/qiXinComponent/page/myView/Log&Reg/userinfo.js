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



import Cy from 'crypto-js/md5';

//头
import Tou from '../../../head/headBack';
//修改资料
import XiuGai from './modifyUser';
//修改密码
import XGmiMa from './xiuGai';

//个人详情
class  userinfo extends  Component{
    constructor(props){
        super(props);
        this.state ={
        phone:'',

        }



        // 读取uid
        storage.load({
            key: 'userinfo2',
            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的同步方法
            autoSync: true,
            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用同步方法的同时先返回已经过期的数据。
            // 设置为false的话，则始终强制返回同步方法提供的最新数据(当然会需要更多等待时间)。
            syncInBackground: false
        }).then(ret => {
            if(ret.phone){
                this.setState({
                    phone:ret.phone
                })

            }
            console.log(ret.phone)
        }).catch(err => {
            //如果没有找到数据且没有同步方法，
            //或者有其他异常，则在catch中返回
        })




    }


    componentDidMount()
    {
        // this._user()
    }

    _user(){
        // 读取
        storage.load({
            key: 'userinfo2',

            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的同步方法
            autoSync: true,

            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用同步方法的同时先返回已经过期的数据。
            // 设置为false的话，则始终强制返回同步方法提供的最新数据(当然会需要更多等待时间)。
            syncInBackground: true
        }).then(ret => {
            //如果找到数据，则在then方法中返回

            console.log('http://'+ipdy+'/app_dev.php/getuserdetail/'+ret.uid+'/'+(Cy('uid='+ret.uid+'&str='+qm)))

            fetch('http://'+ipdy+'/app_dev.php/getuserdetail/'+ret.uid+'/'+(Cy('uid='+ret.uid+'&str='+qm)))
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson)


                })
                .catch((error) => {
                    console.error(error);
                });


        }).catch(err => {
            //如果没有找到数据且没有同步方法，
            //或者有其他异常，则在catch中返回
            console.warn(err.message);
        })



    }


    //修改密码
    _xiugai(){
        this.props.navigator.push({
            name:'xiugai',
            component:XGmiMa,
            params:{
            }
        })

    }
    //修改个人信息
    _modifyuser(){
        this.props.navigator.push({
            name:'modify',
            component:XiuGai,
            params:{
            }
        })

    }
    //退出登录确定
    quitLogin(){
        Alert.alert(
            '提示',
            '是否退出登录',
            [
                {text: '确定',onPress:this.quit.bind(this) },

                {text: '取消',},
            ])
    }

    //清楚缓存
    _huancun(){
        Alert.alert(
            '提示',
            '缓存已清除',
            [
                {text: '取消', },
                {text: '确定',  },
            ])
        storage.remove({
            key: 'version'


        });
        storage.remove({
            key: 'lbscity'


        });


    }


    //退出登录
    quit(){
        storage.remove({
            key: 'userinfo',
        })

        storage.remove({
            key: 'userinfo2',
        })
        _loginState(0)

        this.props.navigator.pop();

    }
    //重置二级密码123456
    _twopwd(){
        storage.load({
            key: 'userinfo',
            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的同步方法
            autoSync: true,
            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用同步方法的同时先返回已经过期的数据。
            // 设置为false的话，则始终强制返回同步方法提供的最新数据(当然会需要更多等待时间)。
            syncInBackground: true
        }).then(ret => {
            if (ret) {

                console.log('http://'+ipdy+'/app_dev.php/sh/getslugofejpassword/' + ret.uid + '/1/' + (Cy('id='+ret.uid+'&slug=1&str='+qm)))


                fetch('http://'+ipdy+'/app_dev.php/sh/getslugofejpassword/' + ret.uid + '/1/' + (Cy('id='+ret.uid+'&slug=1&str='+qm)))

                    .then((response) => response.json())
                    .then((responseJson) => {
                        console.log(responseJson)

                        if(responseJson.code==10000){
                            this.props.navigator.push({
                                name:'jiumima',

                            })
                        }else if(responseJson.code==10001){
                            this.props.navigator.push({
                                name: 'twopwd',

                            })
                        }

                    })
                    .catch((error) => {
                        Alert.alert(
                            '提示',
                            '网络异常',
                            [
                                {text: '确定', },
                            ])

                    })


            }

            // console.log(ret)
        }).catch(err => {
            Alert.alert(
                '提示',
                '请登录后操作',
                [
                    {text: '确定', },
                ])

            //如果没有找到数据且没有同步方法，
            //或者有其他异常，则在catch中返回
        })

    }



    render(){
        return(
            <View style={{backgroundColor:'#e6e6e6',flex:1}}>
                <Tou title="个人中心" navigator={this.props.navigator}/>

                <View style={{marginTop:WINHEIGHT*(0.02),flexDirection:'row'}}>

                    <View style={{backgroundColor:'#ffffff',height:WINHEIGHT*(0.06),flex:3,alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontSize:WINWIDTH*(0.04),color:'#696969'}}>账户名称</Text>
                    </View>

                    <View style={{backgroundColor:'#ffffff',height:WINHEIGHT*(0.06),flex:7,alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontSize:WINWIDTH*(0.04),color:'#696969'}}>{this.state.phone}</Text>
                    </View>
                </View>




                {/*修改个人资料*/}
                <View style={{marginTop:WINHEIGHT*(0.02),flexDirection:'row'}}>

                    <View style={{backgroundColor:'#ffffff',height:WINHEIGHT*(0.06),flex:3,alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontSize:WINWIDTH*(0.04),color:'#696969'}}>个人资料</Text>
                    </View>

                    <View style={{backgroundColor:'#ffffff',height:WINHEIGHT*(0.06),flex:7,alignItems:'center',justifyContent:'center'}}>
                        <View>
                            <TouchableOpacity onPress={this._modifyuser.bind(this)} style={{backgroundColor:'#ffffff',width:WINWIDTH*(0.2),height:WINHEIGHT*(0.045),justifyContent:'center',alignItems:'center',borderRadius:3,borderWidth:1,borderColor:filecolor}}>
                                <Text style={{fontSize:WINWIDTH*(0.03),color:filecolor}}>点击修改</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>

                {/*修改密码*/}
                {/*<View style={{marginTop:WINHEIGHT*(0.001),flexDirection:'row'}}>*/}

                    {/*<View style={{backgroundColor:'#ffffff',height:WINHEIGHT*(0.06),flex:3,alignItems:'center',justifyContent:'center'}}>*/}
                        {/*<Text style={{fontSize:WINWIDTH*(0.04),color:'#696969'}}>修改密码</Text>*/}
                    {/*</View>*/}

                    {/*<View style={{backgroundColor:'#ffffff',height:WINHEIGHT*(0.06),flex:7,alignItems:'center',justifyContent:'center'}}>*/}
                        {/*<View>*/}
                            {/*<TouchableOpacity onPress={this._xiugai.bind(this)} style={{backgroundColor:'#ffffff',width:WINWIDTH*(0.2),height:WINHEIGHT*(0.045),justifyContent:'center',alignItems:'center',borderRadius:3,borderWidth:1,borderColor:filecolor}}>*/}
                                {/*<Text style={{fontSize:WINWIDTH*(0.03),color:filecolor}}>点击修改</Text>*/}
                            {/*</TouchableOpacity>*/}
                        {/*</View>*/}
                    {/*</View>*/}

                {/*</View>*/}

                {/*重置二级密码*/}
                {/*<View style={{marginTop:WINHEIGHT*(0.001),flexDirection:'row'}}>*/}

                    {/*<View style={{backgroundColor:'#ffffff',height:WINHEIGHT*(0.06),flex:3,alignItems:'center',justifyContent:'center'}}>*/}
                        {/*<Text style={{fontSize:WINWIDTH*(0.04),color:'#696969'}}>二级密码</Text>*/}
                    {/*</View>*/}

                    {/*<View style={{backgroundColor:'#ffffff',height:WINHEIGHT*(0.06),flex:7,alignItems:'center',justifyContent:'center'}}>*/}
                        {/*<View>*/}
                            {/*<TouchableOpacity onPress={this._twopwd.bind(this)} style={{backgroundColor:'#ffffff',width:WINWIDTH*(0.2),height:WINHEIGHT*(0.045),justifyContent:'center',alignItems:'center',borderRadius:3,borderWidth:1,borderColor:filecolor}}>*/}
                                {/*<Text style={{fontSize:WINWIDTH*(0.03),color:filecolor}}>设置密码</Text>*/}
                            {/*</TouchableOpacity>*/}
                        {/*</View>*/}
                    {/*</View>*/}

                {/*</View>*/}

                {/*清除缓存*/}
                <View style={{marginTop:WINHEIGHT*(0.001),flexDirection:'row'}}>

                    <View style={{backgroundColor:'#ffffff',height:WINHEIGHT*(0.06),flex:3,alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontSize:WINWIDTH*(0.04),color:'#696969'}}>清除缓存</Text>
                    </View>

                    <View style={{backgroundColor:'#ffffff',height:WINHEIGHT*(0.06),flex:7,alignItems:'center',justifyContent:'center'}}>
                        <View>
                            <TouchableOpacity onPress={this._huancun.bind(this)} style={{backgroundColor:'#ffffff',width:WINWIDTH*(0.2),height:WINHEIGHT*(0.045),justifyContent:'center',alignItems:'center',borderRadius:3,borderWidth:1,borderColor:filecolor}}>
                                <Text style={{fontSize:WINWIDTH*(0.03),color:filecolor}}>清除缓存</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>




                <TouchableOpacity onPress={this.quitLogin.bind(this)}>
                    <View style={{justifyContent:'center',flexDirection:'row'}}>
                        <View style={{
                            marginTop:WINHEIGHT*(0.08),
                            justifyContent:'center',
                            alignItems:'center',
                            backgroundColor:filecolor,
                            height:WINHEIGHT*(0.06),
                            width:WINWIDTH*(0.8),
                            borderRadius:5,
                        }}>
                            <Text style={{fontSize:16,color:'#ffffff'}}>退出登录</Text>

                        </View>
                    </View>
                </TouchableOpacity>





            </View>
        )
    }
}


const styles = StyleSheet.create({
    text: {
        height: WINHEIGHT * (0.08),
        flexDirection: 'row',
        marginBottom: WINHEIGHT * (0.01),
    }



})

export default userinfo;