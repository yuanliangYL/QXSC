/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
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
    Platform,
    Alert,


} from 'react-native';

import Cy from 'crypto-js/md5';
const WINWIDTH = Dimensions.get('window').width;
const WINHEIGHT = Dimensions.get('window').height;


export  default class jiuMima extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


//点击确定
    _save()
    {
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

                fetch('http://' + ipdy + '/app_dev.php/sh/compareoldpassword/' + ret.uid + '/1/' + this.state.pwd + '/' + (Cy('id=' + ret.uid + '&slug=1&str='+qm)))

                    .then((response) => response.json())
                    .then((responseJson) => {
                        console.log(responseJson)
                        if(responseJson.code==10000){
                            this.props.navigator.push({
                                name: 'twopwd',

                            })
                        }else if(responseJson.code==10001){
                            Alert.alert(
                                '提示',
                                '旧密码错误',
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

    render()
    {
        return (
            <View style={{backgroundColor: '#e6e6e6', flex: 1,marginTop:64}}>



                <View style={{flexDirection: 'row', marginTop: 10}}>
                    <View style={{
                        backgroundColor: '#ffffff',
                        flex: 3,
                        height: WINHEIGHT * (0.07),
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{fontSize: WINWIDTH * (0.04)}}>旧密码</Text>
                    </View>
                    <View style={{
                        backgroundColor: '#ffffff',
                        flex: 7,
                        height: WINHEIGHT * (0.07),
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <TextInput
                            placeholder={'请输入旧密码'}
                            underlineColorAndroid={'transparent'}
                            keyboardType={'numeric'}
                            maxLength={6}
                            onChangeText={(text) => this.setState({pwd: text})}
                            style={{height: WINHEIGHT * (0.06), fontSize: WINWIDTH * (0.035), width: WINWIDTH * (0.65)}}
                        />
                    </View>
                </View>


                <TouchableOpacity onPress={this._save.bind(this)}>
                    <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                        <View style={{
                            marginTop: WINHEIGHT * (0.08),
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: filecolor,
                            height: WINHEIGHT * (0.06),
                            width: WINWIDTH * (0.8),
                            borderRadius: 5,
                        }}>
                            <Text style={{fontSize: 16, color: '#ffffff'}}>确定</Text>

                        </View>
                    </View>
                </TouchableOpacity>

                {/*<View style={{backgroundColor:'#ffffff',flexDirection:'row',height:WINHEIGHT*(0.05),alignItems:'center',justifyContent:'center'}}>*/}
                    {/*<Text style={{fontSize:WINWIDTH*(0.03),color:'#696969'}}>忘记旧密码请联系客服(0791-83881163)</Text>*/}
                {/*</View>*/}


            </View>


        )
    }

}


