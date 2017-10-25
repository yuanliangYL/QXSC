
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
    Dimensions


} from 'react-native';



const  WINWIDTH = Dimensions.get('window').width;
const  WINHEIGHT = Dimensions.get('window').height;

//头
import Tou from '../../../head/headBack';
//积分转账
import ZhuanZhang from './redTran';
//推广收益
import TuiGuang from './tuiguang';



export  default class djzshangcheng extends  Component{
    constructor(props){
        super(props);
        this.state={};
    }

    //积分转账
    _zhuanzhang(){
        this.props.navigator.push({
            name:'redtran',
            component:ZhuanZhang,
            params:{
            }
        })
    }

    //财富明细
    _yue(){
        this.props.navigator.push({
            name:'lockred',
            params:{
            }
        })
    }

    //提现申请
    _tixian(){
        this.props.navigator.push({
            name:'jifentixian',
            params:{
            }
        })
    }

    //提现记录
    _record(){
        this.props.navigator.push({
            name:'jifenjilu',
            params:{
            }
        })
    }
    //推广收益
    _tgsy(){
        this.props.navigator.push({
            name:'tuiguang',
            component:TuiGuang,
            params:{
            }
        })
    }



    render(){
        return(
            <View style={{flex:1,backgroundColor:'#e5e5e5'}}>
                <Tou title="资金管理" navigator={this.props.navigator}/>

                <View style={{flexDirection:'row'}}>
                    <View style={{backgroundColor:'#ffffff',height:WINHEIGHT*(0.06),flex:3,alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontSize:WINWIDTH*(0.04),color:'#696969'}}>乐福币</Text>
                    </View>

                    <View style={{backgroundColor:'#ffffff',height:WINHEIGHT*(0.06),flex:7,alignItems:'center',justifyContent:'center'}}>
                        <View>
                            <TouchableOpacity onPress={this._zhuanzhang.bind(this)} style={{backgroundColor:'#ffffff',width:WINWIDTH*(0.2),height:WINHEIGHT*(0.045),justifyContent:'center',alignItems:'center',borderRadius:3,borderWidth:1,borderColor:filecolor}}>
                                <Text style={{fontSize:WINWIDTH*(0.03),color:filecolor}}>点击操作</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/*<View style={{marginTop:WINHEIGHT*(0.002),flexDirection:'row'}}>*/}
                    {/*<View style={{backgroundColor:'#ffffff',height:WINHEIGHT*(0.06),flex:3,alignItems:'center',justifyContent:'center'}}>*/}
                        {/*<Text style={{fontSize:WINWIDTH*(0.04),color:'#696969'}}>财富明细</Text>*/}
                    {/*</View>*/}

                    {/*<View style={{backgroundColor:'#ffffff',height:WINHEIGHT*(0.06),flex:7,alignItems:'center',justifyContent:'center'}}>*/}
                        {/*<View>*/}
                            {/*<TouchableOpacity onPress={this._yue.bind(this)} style={{backgroundColor:'#ffffff',width:WINWIDTH*(0.2),height:WINHEIGHT*(0.045),justifyContent:'center',alignItems:'center',borderRadius:3,borderWidth:1,borderColor:filecolor}}>*/}
                                {/*<Text style={{fontSize:WINWIDTH*(0.03),color:filecolor}}>点击查看</Text>*/}
                            {/*</TouchableOpacity>*/}
                        {/*</View>*/}
                    {/*</View>*/}
                {/*</View>*/}

                {/*<View style={{marginTop:WINHEIGHT*(0.002),flexDirection:'row'}}>*/}
                    {/*<View style={{backgroundColor:'#ffffff',height:WINHEIGHT*(0.06),flex:3,alignItems:'center',justifyContent:'center'}}>*/}
                        {/*<Text style={{fontSize:WINWIDTH*(0.04),color:'#696969'}}>申请提现</Text>*/}
                    {/*</View>*/}

                    {/*<View style={{backgroundColor:'#ffffff',height:WINHEIGHT*(0.06),flex:7,alignItems:'center',justifyContent:'center'}}>*/}
                        {/*<View>*/}
                            {/*<TouchableOpacity onPress={this._tixian.bind(this)} style={{backgroundColor:'#ffffff',width:WINWIDTH*(0.2),height:WINHEIGHT*(0.045),justifyContent:'center',alignItems:'center',borderRadius:3,borderWidth:1,borderColor:filecolor}}>*/}
                                {/*<Text style={{fontSize:WINWIDTH*(0.03),color:filecolor}}>点击操作</Text>*/}
                            {/*</TouchableOpacity>*/}
                        {/*</View>*/}
                    {/*</View>*/}
                {/*</View>*/}

                {/*<View style={{marginTop:WINHEIGHT*(0.002),flexDirection:'row'}}>*/}
                    {/*<View style={{backgroundColor:'#ffffff',height:WINHEIGHT*(0.06),flex:3,alignItems:'center',justifyContent:'center'}}>*/}
                        {/*<Text style={{fontSize:WINWIDTH*(0.04),color:'#696969'}}>提现记录</Text>*/}
                    {/*</View>*/}

                    {/*<View style={{backgroundColor:'#ffffff',height:WINHEIGHT*(0.06),flex:7,alignItems:'center',justifyContent:'center'}}>*/}
                        {/*<View>*/}
                            {/*<TouchableOpacity onPress={this._record.bind(this)} style={{backgroundColor:'#ffffff',width:WINWIDTH*(0.2),height:WINHEIGHT*(0.045),justifyContent:'center',alignItems:'center',borderRadius:3,borderWidth:1,borderColor:filecolor}}>*/}
                                {/*<Text style={{fontSize:WINWIDTH*(0.03),color:filecolor}}>点击查看</Text>*/}
                            {/*</TouchableOpacity>*/}
                        {/*</View>*/}
                    {/*</View>*/}
                {/*</View>*/}

                <View style={{marginTop:WINHEIGHT*(0.002),flexDirection:'row'}}>
                    <View style={{backgroundColor:'#ffffff',height:WINHEIGHT*(0.06),flex:3,alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontSize:WINWIDTH*(0.04),color:'#696969'}}>推广收益</Text>
                    </View>

                    <View style={{backgroundColor:'#ffffff',height:WINHEIGHT*(0.06),flex:7,alignItems:'center',justifyContent:'center'}}>
                        <View>
                            <TouchableOpacity onPress={this._tgsy.bind(this)} style={{backgroundColor:'#ffffff',width:WINWIDTH*(0.2),height:WINHEIGHT*(0.045),justifyContent:'center',alignItems:'center',borderRadius:3,borderWidth:1,borderColor:filecolor}}>
                                <Text style={{fontSize:WINWIDTH*(0.03),color:filecolor}}>点击查看</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>








            </View>
        )
    }



}
