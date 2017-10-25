/**
 * Created by Klaus on 2016/11/8.
 */

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
import InputScrollView from 'react-native-inputscrollview';
import Cy from 'crypto-js/md5';

//头
import Tou from '../../../head/headBack';


//积分转账
export  default class redTransfer extends  Component {
    constructor(props) {
        super(props);
        this.state = {
            user:'',//转账用户
            num:'',//转账金额

            xid:'',
            uid:'',

            mallname:'输入正确的账户即可显示',

            clike:false,


        };
    }
//输入框不可输入负数

    _save(){
        if(this.state.clike==false) {
            this.setState({
                clike: true,
            })


            if (this.state.allcount > 0) {
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

                        console.log(this.state.phone)
                        console.log('http://' + ipdy + '/app_dev.php/zhuanzhangbyhongbao/' + ret.uid + '/2/' + (Cy('uid=' + ret.uid + '&str=' + qm)))

                        fetch('http://' + ipdy + '/app_dev.php/zhuanzhangbyhongbao/' + ret.uid + '/2/' + (Cy('uid=' + ret.uid + '&str=' + qm)), {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                            },

                            body: 'phone=' + this.state.user + '&money=' + this.state.allcount,


                        }).then((response) => response.json())
                            .then((responseJson) => {
                                console.log(responseJson)
                                if (responseJson.code == 10000) {
                                    this.setState({
                                        clike:false,
                                    })
                                    Alert.alert(
                                        '提示',
                                        responseJson.msg,
                                        [

                                            {text: '确定',},
                                        ])

                                    const {navigator} = this.props;
                                    const routes = navigator.getCurrentRoutes();
                                    navigator.popToRoute(routes[routes.length - 2]);
                                }
                                if (responseJson.code == 10002) {
                                    this.setState({
                                        clike:false,
                                    })
                                    Alert.alert(
                                        '提示',
                                        responseJson.msg,
                                        [

                                            {text: '确定',},
                                        ])
                                }
                                if (responseJson.code == 10003) {
                                    this.setState({
                                        clike:false,
                                    })
                                    Alert.alert(
                                        '提示',
                                        responseJson.msg,
                                        [

                                            {text: '确定',},
                                        ])
                                }
                                if (responseJson.code == 10004) {
                                    this.setState({
                                        clike:false,
                                    })
                                    Alert.alert(
                                        '提示',
                                        responseJson.msg,
                                        [

                                            {text: '确定',},
                                        ])
                                }
                                if (responseJson.code == 10005) {
                                    this.setState({
                                        clike:false,
                                    })
                                    Alert.alert(
                                        '提示',
                                        responseJson.msg,
                                        [

                                            {text: '确定',},
                                        ])
                                }
                                if (responseJson.code == 10006) {
                                    this.setState({
                                        clike:false,
                                    })
                                    Alert.alert(
                                        '提示',
                                        responseJson.msg,
                                        [

                                            {text: '确定',},
                                        ])
                                }

                            })
                            .catch((error) => {
                                console.error(error);

                            });


                    }

                }).catch(err => {
                    this.setState({
                        clike:false,
                    })

                    //如果没有找到数据且没有同步方法，
                    //或者有其他异常，则在catch中返回
                    Alert.alert(
                        '提示',
                        '您未登录，请先登录',
                        [

                            {text: '确定',},
                        ])
                })

            } else {
                Alert.alert(
                    '提示',
                    '请输入正确金额',
                    [

                        {text: '确定',},
                    ])
            }
        }

    }



    updateText(){
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

                fetch('http://' + ipdy + '/app_dev.php/getbusinessnamebyinput/'+ret.uid+'/'+this.state.user+'/'+(Cy('uid='+ret.uid+'&str='+qm))
                )
                    .then((response) => response.json())
                    .then((responseJson) => {
                    console.log(responseJson)
                        if(responseJson.code==10000){

                        this.setState({
                            mallname:responseJson.data[0].title,
                        })
                        }
                        if(responseJson.code==10001){
                            this.setState({
                                mallname:'账户不正确无此商家'
                            })
                        }
                        if(responseJson.code==10003){
                            alert('账户错误')
                        }
                    })
                    .catch((error) => {

                    });


            }

        }).catch(err => {

            //如果没有找到数据且没有同步方法，
            //或者有其他异常，则在catch中返回
            Alert.alert(
                '提示',
                '您未登录，请先登录',
                [

                    {text: '确定', },
                ])
        })
    }


    render() {
        return (
            <View style={{backgroundColor:'#e6e6e6',flex:1,}}>
                <Tou title="乐福币" navigator={this.props.navigator}/>

                <InputScrollView >
                    <View style={styles.text}>

                        <View style={{backgroundColor:'#ffffff',width:WINWIDTH*(0.25),height:WINHEIGHT*(0.08),justifyContent:'center',alignItems:'center'}}>

                            <Text style={{fontSize:WINWIDTH*0.04,color:'#696969',}}>账户:</Text>
                        </View>

                        <View style={{backgroundColor:'#ffffff',width:WINWIDTH*(0.75),height:WINHEIGHT*(0.08),}}>
                            <TextInput style={{height:WINHEIGHT*(0.08)}}
                                       placeholder={'请输入商家手机号'}
                                       maxLength={11}
                                       underlineColorAndroid={'transparent'}
                                       onChangeText={(text) => this.setState({user:text})}
                                       onEndEditing={(event) => this.updateText( )}
                            />
                        </View>
                    </View>

                    <View style={styles.text}>

                        <View style={{backgroundColor:'#ffffff',width:WINWIDTH*(0.25),height:WINHEIGHT*(0.08),justifyContent:'center',alignItems:'center'}}>

                            <Text style={{fontSize:WINWIDTH*0.04,color:'#696969',}}>商户:</Text>
                        </View>

                        <View style={{backgroundColor:'#ffffff',width:WINWIDTH*(0.75),height:WINHEIGHT*(0.08),justifyContent:'center',}}>
                            <Text style={{fontSize:WINWIDTH*0.03,color:'#696969',}}>{this.state.mallname}</Text>
                        </View>
                    </View>


                    <View style={styles.text}>

                        <View style={{backgroundColor:'#ffffff',width:WINWIDTH*(0.25),height:WINHEIGHT*(0.08),justifyContent:'center',alignItems:'center'}}>

                            <Text style={{fontSize:WINWIDTH*0.04,color:'#696969',}}>金额:</Text>
                        </View>

                        <View style={{backgroundColor:'#ffffff',width:WINWIDTH*(0.75),height:WINHEIGHT*(0.08),}}>
                            <TextInput style={{height:WINHEIGHT*(0.08)}}
                                       placeholder={'请输入金额'}
                                       maxLength={21}
                                       underlineColorAndroid={'transparent'}
                                       onChangeText={(text) => this.setState({allcount:text})}
                            />
                        </View>
                    </View>

                </InputScrollView>


                <View style={{justifyContent:'center', alignItems:'center',height:WINHEIGHT*0.3,width:WINWIDTH}}>
                    <View style={{

                        justifyContent:'center',
                        alignItems:'center',
                        backgroundColor:filecolor,
                        height:WINHEIGHT*(0.06),
                        width:WINWIDTH*(0.8),
                        borderRadius:5,
                    }}>
                        <TouchableOpacity onPress={this._save.bind(this)} activeOpacity={0.5} style={{height:WINHEIGHT*(0.06), width:WINWIDTH*(0.8),justifyContent:'center', alignItems:'center',}}>
                            <Text style={{fontSize:WINWIDTH*(0.04),color:'#ffffff'}}>转账</Text>
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
    }
})
