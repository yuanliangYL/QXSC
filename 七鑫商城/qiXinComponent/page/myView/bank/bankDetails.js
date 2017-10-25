
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


//
import InputScrollView from 'react-native-inputscrollview';

const  WINWIDTH = Dimensions.get('window').width;
const  WINHEIGHT = Dimensions.get('window').height;

import Cy from 'crypto-js/md5';
//头
import  Tou from '../../../head/headBack';


export default class bankDetails extends Component {

    constructor(props){
        super(props);
        this.state={

            cardarea:'',
            cardbank:'',
            carduser:'',
            cardnum:'',
            personid:'',





        };

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
            if(ret.uid){
                this.setState({
                    uid:ret.uid
                })

            }
            console.log(ret.uid)
        }).catch(err => {
            //如果没有找到数据且没有同步方法，
            //或者有其他异常，则在catch中返回
        })

        storage.load({
            key: 'olback',
            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的同步方法
            autoSync: true,
            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用同步方法的同时先返回已经过期的数据。
            // 设置为false的话，则始终强制返回同步方法提供的最新数据(当然会需要更多等待时间)。
            syncInBackground: false
        }).then(ret => {
            this.setState({
                cardarea:ret.cardarea,
                cardbank:ret.cardbank,
                cardnum:ret.cardnum,
                carduser:ret.carduser,
                personid:ret.personid,

            })



            console.log(ret)
        }).catch(err => {
            //如果没有找到数据且没有同步方法，
            //或者有其他异常，则在catch中返回
        })

    }

    _saveBank(){
        if(this.state.cardarea&&this.state.cardbank&&this.state.cardnum&&this.state.carduser&&this.state.personid) {

            fetch('http://' + ipdy + '/app_dev.php/bindbankcard/' + this.state.uid + '/' + (Cy('uid=' + this.state.uid + '&str='+qm))
                , {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },

                    body: 'cardarea=' + this.state.cardarea + '&cardbank=' + this.state.cardbank + '&carduser=' + this.state.carduser + '&cardnum=' + this.state.cardnum + '&personid=' + this.state.personid,
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.code == 10000) {
                        Alert.alert(
                            '提示',
                            responseJson.msg,
                            [
                                {text: '确定',},
                            ]
                        )
                        storage.save({
                            key: 'olback',  //注意:请不要在key中使用_下划线符号!
                            rawData: {
                                cardarea:this.state.cardarea,
                                cardbank:this.state.cardbank,
                                cardnum:this.state.cardnum,
                                carduser:this.state.carduser,
                                personid:this.state.personid,

                            },

                            // 如果不指定过期时间，则会使用defaultExpires参数
                            // 如果设为null，则永不过期
                            expires: null
                        });

                        this.props.navigator.pop()
                    } else if (responseJson.code == 10002) {
                        //签名
                        Alert.alert(
                            '提示',
                            responseJson.msg,
                            [
                                {text: '确定',},
                            ]
                        )
                    } else if (responseJson.code == 10003) {
                        //信息不完整
                        Alert.alert(
                            '提示',
                            responseJson.msg,
                            [
                                {text: '确定',},
                            ]
                        )
                    }

                }).catch((error) => {

            })



        }else {
            Alert.alert(
                '提示',
                '请填写完整后提交',
                [
                    {text:'确定',},
                ]
            )
        }

    }

    render(){
        return(
            <View style={{backgroundColor:'#e6e6e6',flex:1}}>
                <Tou title="绑定银行卡" navigator={this.props.navigator}/>
                <InputScrollView style={{flex:1}}>
                    <View style={{flexDirection:'row',marginTop:10}}>
                        <View style={{backgroundColor:'#ffffff',flex:3,height:WINHEIGHT*(0.05),justifyContent:'center',alignItems:'center'}}>
                            <Text style={{fontSize:WINWIDTH*(0.03),color:'#696969'}}>请填写开户行详细省、市、区/县</Text>
                        </View>
                    </View>

                <View style={{flexDirection:'row',marginTop:1}}>
                    <View style={{backgroundColor:'#ffffff',flex:3,height:WINHEIGHT*(0.07),justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontSize:WINWIDTH*(0.04)}}>开户地</Text>
                    </View>
                    <View style={{backgroundColor:'#ffffff',flex:7,height:WINHEIGHT*(0.07),justifyContent:'center',alignItems:'center'}}>
                        <TextInput
                            placeholder={'请选择地区'}
                            underlineColorAndroid={'transparent'}
                            defaultValue={this.state.cardarea}
                            onChangeText={(text) => this.setState({cardarea:text})}
                            style={{height:WINHEIGHT*(0.06),fontSize:WINWIDTH*(0.035),width:WINWIDTH*(0.65)}}
                        />
                    </View>
                </View>

                    <View style={{flexDirection:'row',marginTop:10}}>
                        <View style={{backgroundColor:'#ffffff',flex:3,height:WINHEIGHT*(0.05),justifyContent:'center',alignItems:'center'}}>
                            <Text style={{fontSize:WINWIDTH*(0.03),color:'#696969'}}>请填写详细开户行(例:招商银行分行营业部(xxx支行)</Text>
                        </View>
                    </View>

                <View style={{flexDirection:'row',marginTop:1}}>
                    <View style={{backgroundColor:'#ffffff',flex:3,height:WINHEIGHT*(0.07),justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontSize:WINWIDTH*(0.04)}}>开户行</Text>
                    </View>
                        <View style={{backgroundColor:'#ffffff',flex:7,height:WINHEIGHT*(0.07),justifyContent:'center',alignItems:'center'}}>
                            <TextInput
                                placeholder={'请输入开户行'}
                                underlineColorAndroid={'transparent'}
                            defaultValue={this.state.cardbank}
                            onChangeText={(text) => this.setState({cardbank:text})}
                            style={{height:WINHEIGHT*(0.06),fontSize:WINWIDTH*(0.035),width:WINWIDTH*(0.65)}}

                        />
                    </View>
                </View>

                <View style={{flexDirection:'row',marginTop:10}}>
                    <View style={{backgroundColor:'#ffffff',flex:3,height:WINHEIGHT*(0.07),justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontSize:WINWIDTH*(0.04)}}>持卡人</Text>
                    </View>
                    <View style={{backgroundColor:'#ffffff',flex:7,height:WINHEIGHT*(0.07),justifyContent:'center',alignItems:'center'}}>
                        <TextInput
                            placeholder={'请输入持卡人姓名'}
                            underlineColorAndroid={'transparent'}
                            defaultValue={this.state.carduser}
                            onChangeText={(text) => this.setState({carduser:text})}
                            style={{height:WINHEIGHT*(0.06),fontSize:WINWIDTH*(0.035),width:WINWIDTH*(0.65)}}
                        />
                    </View>
                </View>

                <View style={{flexDirection:'row',marginTop:10}}>
                    <View style={{backgroundColor:'#ffffff',flex:3,height:WINHEIGHT*(0.07),justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontSize:WINWIDTH*(0.04)}}>卡号</Text>
                    </View>
                    <View style={{backgroundColor:'#ffffff',flex:7,height:WINHEIGHT*(0.07),justifyContent:'center',alignItems:'center'}}>
                        <TextInput
                            placeholder={'请输入银行卡号码'}
                            underlineColorAndroid={'transparent'}
                            defaultValue={this.state.cardnum}
                            onChangeText={(text) => this.setState({cardnum:text})}
                            style={{height:WINHEIGHT*(0.06),fontSize:WINWIDTH*(0.035),width:WINWIDTH*(0.65)}}
                            keyboardType={'numeric'}
                        />
                    </View>
                </View>

                <View style={{flexDirection:'row',marginTop:10}}>
                    <View style={{backgroundColor:'#ffffff',flex:3,height:WINHEIGHT*(0.07),justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontSize:WINWIDTH*(0.04)}}>身份证号</Text>
                    </View>
                    <View style={{backgroundColor:'#ffffff',flex:7,height:WINHEIGHT*(0.07),justifyContent:'center',alignItems:'center'}}>
                        <TextInput
                            placeholder={'请输入身份证号码'}
                            underlineColorAndroid={'transparent'}
                            onChangeText={(text) => this.setState({personid:text})}
                            style={{height:WINHEIGHT*(0.06),fontSize:WINWIDTH*(0.035),width:WINWIDTH*(0.65)}}
                            keyboardType={'numbers-and-punctuation'}
                            defaultValue={this.state.personid}
                        />
                    </View>
                </View>
                </InputScrollView>




                <View style={{justifyContent:'center', alignItems:'center',position:'absolute',
                    bottom:0,}}>

                    <View style={{
                        justifyContent:'center',
                        alignItems:'center',
                        backgroundColor:filecolor,
                        height:WINHEIGHT*(0.08),
                        width:WINWIDTH,

                    }}>
                        <TouchableOpacity onPress={this._saveBank.bind(this)} style={{height:WINHEIGHT*(0.08), width:WINWIDTH,justifyContent:'center', alignItems:'center',}}
                        >
                            <Text style={{fontSize:WINWIDTH*0.04,color:'#ffffff'}}>保存</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        )
    }

}


