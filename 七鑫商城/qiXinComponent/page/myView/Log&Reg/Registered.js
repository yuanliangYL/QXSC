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
import Tou from '../../../head/headBack';

import HttpUtlis from '../../../tool/HttpUtils';


//注册页面
export default class  registered extends  Component{



    constructor(props){
        super(props);
        this.state ={
            pwd:'',
            repwd:'',
            phone:'',
            code:'',
            id:'',//验证码id
            yqcode:'',//邀请码


        };
    }

    _code(){
        var url = 'http://'+ipdy+'/index.php?s=/Home/APPUser/sendNoteForVerify/phone/'+this.state.phone;

        console.log(this.state.phone)
        HttpUtlis.get(url)
            .then(result=>{
                console.log(result)

                this.setState({
                                    id:result.data.nid,
                            })
                            Alert.alert(
                                '提示',
                                '验证码已发送',
                                [
                                    {text: '确定'},
                                ])


            })
            .catch(error=>{
                console.log(error)
                Alert.alert(
                            '提示',
                            '验证码获取失败',
                            [
                                {text: '确定'},
                            ])
            })
    }

        // fetch('http://'+ipdy+'/app_dev.php/generatenoteforuserlogin/'+this.state.phone)
        //
        //     .then((response) => response.json())
        //     .then((responseJson) => {
        //         console.log(responseJson)
        //         this.setState({
        //                 id:responseJson.data.id,
        //         })
        //         Alert.alert(
        //             '提示',
        //             '验证码已发送',
        //             [
        //                 {text: '确定'},
        //             ])
        //
        //
        //     })
        //     .catch((error) => {
        //         Alert.alert(
        //             '提示',
        //             '验证码获取失败',
        //             [
        //                 {text: '确定'},
        //             ])
        //
        //     })


//    index.php?s=/Home/APPUser/registerToBeUser/nid/3/phone/15395001179/code/897360/yaoqingren//password/1/repassword/1


//    index.php?s=/Home/APPUser/sendNoteForVerify/phone/15395002189

//注册判断
    toRegister(){

        if (this.state.phone.length !== 11 || !this.state.id) {
            Alert.alert(
                '提示',
                '请输入正确的手机号码或验证码',
                [
                    {text: '确定'},
                ])

        } else {

            if (this.state.pwd !== this.state.repwd) {
                Alert.alert(
                    '提示',
                    '两次密码不一致',
                    [
                        {text: '确定'},
                    ])
            } else {


                var url = 'http://' + ipdy + '/index.php?s=/Home/APPUser/registerToBeUser/nid/' + this.state.id + '/phone/' + this.state.phone + '/code/' + this.state.code + '/yaoqingren/' + this.state.yqcode + '/password/' + this.state.pwd + '/repassword/' + this.state.repwd;

                HttpUtlis.get(url)
                    .then(result => {
                        console.log(result)

                        if (result.code == 10000) {
                            Alert.alert(
                                '提示',
                                result.msg,
                                [
                                    {text: '确定'},
                                ])
                            this.props.navigator.pop()
                        }
                        else if (result.code == 10003) {
                            //验证码不正确
                            Alert.alert(
                                '提示',
                                result.msg,
                                [
                                    {text: '确定'},
                                ])
                        }
                        else if (result.code == 10004) {
                            //验证码过期
                            Alert.alert(
                                '提示',
                                result.msg,
                                [
                                    {text: '确定'},
                                ])
                        }
                        else if (result.code == 10006) {
                            //手机号码已注册
                            Alert.alert(
                                '提示',
                                result.msg,
                                [
                                    {text: '确定'},
                                ])
                        }
                        else if (result.code == 10002) {
                            //邀请人不存在
                            Alert.alert(
                                '提示',
                                result.msg,
                                [
                                    {text: '确定'},
                                ])
                        }

                    })
                    .catch(error => {
                        console.log(error)
                    })

            }
        }
    }








    render(){
        return(
            <View style={{backgroundColor:'#e6e6e6',flex:1,}}>
                <Tou title="新用户注册" navigator={this.props.navigator}/>
                <View style={{}}>
                    <View style={styles.text}>
                        <View style={{backgroundColor:'#ffffff',width:WINWIDTH*(0.08),height:WINHEIGHT*(0.08),flex:1}}>
                            <TextInput style={styles.textInput}
                                       placeholder={'请输入手机号'}
                                       keyboardType={'numeric'}
                                       maxLength={11}
                                       underlineColorAndroid={'transparent'}
                                       onChangeText={(text) => this.setState({phone:text})}

                            />
                        </View>
                    </View>


                    <View style={styles.text} >
                        <View style={{backgroundColor:'#ffffff',width:WINWIDTH*(0.7),height:WINHEIGHT*(0.08),}}>
                            <TextInput style={styles.textInput}
                                       placeholder={'请输入验证码'}
                                       underlineColorAndroid={'transparent'}
                                       maxLength={6}
                                       onChangeText={(text) => this.setState({code:text})}

                            />
                        </View>
                        <TouchableOpacity onPress={this._code.bind(this)} style={{backgroundColor:filecolor,width:WINWIDTH*(0.3),height:WINHEIGHT*(0.08),justifyContent:'center',alignItems:'center'}}>
                            <Text style={{fontSize:WINWIDTH*0.035,color:'#ffffff'}}>获取验证码</Text>
                            </TouchableOpacity>


                    </View>

                   <View style={styles.text} >
                        <View style={{backgroundColor:'#ffffff',width:WINWIDTH*(0.08),height:WINHEIGHT*(0.08),flex:1,}}>
                            <TextInput style={styles.textInput}
                                       placeholder={'请输入您的邀请码(可以不填)'}
                                       underlineColorAndroid={'transparent'}
                                       maxLength={11}
                                       onChangeText={(text) => this.setState({yqcode:text})}
                            />
                        </View>
                    </View>


                    <View style={styles.text} >
                        <View style={{backgroundColor:'#ffffff',width:WINWIDTH*(0.08),height:WINHEIGHT*(0.08),flex:1,}}>
                            <TextInput style={styles.textInput}
                                       placeholder={'请输入密码'}
                                       underlineColorAndroid={'transparent'}
                                       secureTextEntry={true}
                                       maxLength={21}
                                       onChangeText={(text) => this.setState({pwd:text})}

                            />
                        </View>
                    </View>

                    <View style={styles.text} >
                        <View style={{backgroundColor:'#ffffff',width:WINWIDTH*(0.08),height:WINHEIGHT*(0.08),flex:1,}}>
                            <TextInput style={styles.textInput}
                                       placeholder={'请确认密码'}
                                       underlineColorAndroid={'transparent'}
                                       secureTextEntry={true}
                                       maxLength={21}
                                       onChangeText={(text) => this.setState({repwd:text})}
                            />
                        </View>
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
                        <TouchableOpacity onPress={this.toRegister.bind(this)} style={{height:WINHEIGHT*(0.06), width:WINWIDTH*(0.8),justifyContent:'center', alignItems:'center',}}>
                            <Text style={{fontSize:16,color:'#ffffff'}}>确定</Text>
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
        width:WINWIDTH,

    },
    textInput:{
        height:WINHEIGHT*(0.08),
        marginLeft:WINWIDTH*(0.05),


    }



})
