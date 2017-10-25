
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
    Switch,
    Alert,



} from 'react-native';


//

const  WINWIDTH = Dimensions.get('window').width;
const  WINHEIGHT = Dimensions.get('window').height;

import Cy from 'crypto-js/md5';
//头
import  Tou from '../../../head/headBack';
import InputScrollView from 'react-native-inputscrollview';

import HttpUtlis from '../../../tool/HttpUtils';

export default class addbackDetails extends Component {
    constructor(props){
        super(props);
        this.state={
            uid:'',
            text:'',
            address:'',
            moren:0,


            value: false,
            value1:0,


            realname:'',
            phone:'',


        };



    }






    _addressNetWoerk(){

        if(this.state.cardarea&&this.state.cardbank&&this.state.carduser&&this.state.cardnum&&this.state.personid){
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




                    var url = 'http://'+ipdy+'/index.php?s=/Home/APPUser/addUserBankCard/uid/'+ret.uid+'/cardarea/'+this.state.cardarea+'/cardbank/'+this.state.cardbank+'/carduser/'+this.state.carduser+'/cardnum/'+this.state.cardnum+'/personid/'+this.state.personid+'/sign/'+(Cy('cardarea='+this.state.cardarea+'&cardbank='+this.state.cardbank+'&cardnum='+this.state.cardnum+'&carduser='+this.state.carduser+'&personid='+this.state.personid+'&uid='+ret.uid+'&key='+qm))


                    HttpUtlis.get(url)
                        .then(result=>{
                            console.log(result)

                            if(result.code==10000){
                                this.props._this.getAgain();
                                Alert.alert(
                                    '提示',
                                    '添加银行卡成功',
                                    [

                                        {text: '确定', },
                                    ])
                                this.props.navigator.pop();
                            }else  if(result.code==10001){
                                alert(result.msg);
                                this.props._this.getAgain();
                                this.props.navigator.pop();
                            }

                        })
                        .catch(error=>{
                            console.log(error)
                            Alert.alert(
                                '提示',
                                '失败',
                                [

                                    {text: '确定', },
                                ])

                        })


                }
                // console.log(ret.uid)
            }).catch(err => {
                //如果没有找到数据且没有同步方法，
                //或者有其他异常，则在catch中返回
            })
        }else {
            Alert.alert(
                '提示',
                '请填写完整',
                [

                    {text: '确定', },
                ])

        }





    }

    console(){
        console.log(this.state.value,this.state.value1)
    }

    render(){
        return(
            <View style={{backgroundColor:'#e6e6e6',flex:1}}>
                <Tou title="新增银行卡" navigator={this.props.navigator}/>
                <InputScrollView>
                <View style={{flexDirection:'row',marginTop:10}}>
                <View style={{backgroundColor:'#ffffff',flex:3,height:WINHEIGHT*(0.07),justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:WINWIDTH*(0.035)}}>开户地</Text>
                </View>
                <View style={{backgroundColor:'#ffffff',flex:7,height:WINHEIGHT*(0.07),justifyContent:'center',alignItems:'center'}}>
                    <TextInput
                        placeholder={'请输入'}
                        underlineColorAndroid={'transparent'}
                        onChangeText={(text) => this.setState({cardarea:text})}
                        style={{height:WINHEIGHT*(0.06),fontSize:WINWIDTH*(0.035),width:WINWIDTH*(0.65)}}
                    />
                </View>
            </View>

                <View style={{flexDirection:'row',marginTop:1}}>
                    <View style={{backgroundColor:'#ffffff',flex:3,height:WINHEIGHT*(0.07),justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontSize:WINWIDTH*(0.035)}}>开户行</Text>
                    </View>
                    <View style={{backgroundColor:'#ffffff',flex:7,height:WINHEIGHT*(0.07),justifyContent:'center',alignItems:'center'}}>
                        <TextInput
                            placeholder={'请输入'}
                            style={{height:WINHEIGHT*(0.06),fontSize:WINWIDTH*(0.035),width:WINWIDTH*(0.65)}}
                            keyboardType={'numeric'}
                            underlineColorAndroid={'transparent'}
                            onChangeText={(text) => this.setState({cardbank:text})}
                        />
                    </View>
                </View>

                    <View style={{flexDirection:'row',marginTop:1}}>
                        <View style={{backgroundColor:'#ffffff',flex:3,height:WINHEIGHT*(0.07),justifyContent:'center',alignItems:'center'}}>
                            <Text style={{fontSize:WINWIDTH*(0.035)}}>开户人</Text>
                        </View>
                        <View style={{backgroundColor:'#ffffff',flex:7,height:WINHEIGHT*(0.07),justifyContent:'center',alignItems:'center'}}>
                            <TextInput
                                placeholder={'请输入'}
                                style={{height:WINHEIGHT*(0.06),fontSize:WINWIDTH*(0.035),width:WINWIDTH*(0.65)}}
                                keyboardType={'numeric'}
                                underlineColorAndroid={'transparent'}
                                onChangeText={(text) => this.setState({carduser:text})}
                            />
                        </View>
                    </View>

                    <View style={{flexDirection:'row',marginTop:1}}>
                        <View style={{backgroundColor:'#ffffff',flex:3,height:WINHEIGHT*(0.07),justifyContent:'center',alignItems:'center'}}>
                            <Text style={{fontSize:WINWIDTH*(0.035)}}>银行卡号</Text>
                        </View>
                        <View style={{backgroundColor:'#ffffff',flex:7,height:WINHEIGHT*(0.07),justifyContent:'center',alignItems:'center'}}>
                            <TextInput
                                placeholder={'请输入'}
                                style={{height:WINHEIGHT*(0.06),fontSize:WINWIDTH*(0.035),width:WINWIDTH*(0.65)}}
                                keyboardType={'numeric'}
                                underlineColorAndroid={'transparent'}
                                onChangeText={(text) => this.setState({cardnum:text})}
                            />
                        </View>
                    </View>

                    <View style={{flexDirection:'row',marginTop:1}}>
                        <View style={{backgroundColor:'#ffffff',flex:3,height:WINHEIGHT*(0.07),justifyContent:'center',alignItems:'center'}}>
                            <Text style={{fontSize:WINWIDTH*(0.035)}}>开户人身份证</Text>
                        </View>
                        <View style={{backgroundColor:'#ffffff',flex:7,height:WINHEIGHT*(0.07),justifyContent:'center',alignItems:'center'}}>
                            <TextInput
                                placeholder={'请输入'}
                                style={{height:WINHEIGHT*(0.06),fontSize:WINWIDTH*(0.035),width:WINWIDTH*(0.65)}}
                                keyboardType={'numeric'}
                                underlineColorAndroid={'transparent'}
                                onChangeText={(text) => this.setState({personid:text})}
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
                        <TouchableOpacity onPress={this._addressNetWoerk.bind(this)} style={{height:WINHEIGHT*(0.08), width:WINWIDTH,justifyContent:'center', alignItems:'center',}}
                                            >
                            <Text style={{fontSize:16,color:'#ffffff'}}>保存</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        )
    }

}


