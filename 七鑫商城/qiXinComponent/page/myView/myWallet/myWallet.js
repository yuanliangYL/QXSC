
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

import Tou from '../../../head/headBack';

import TiXianJiLu from './tiXian';

import Myteam   from './team';

import MyBonus from './jiangJin';

import BaoShi  from './baoShi';

import ShenQingTiXian from './forTiXian';

//充值
import TopUp from './topUp';
//充值记录
import TopUpList from './topUpList';




import HttpUtlis from '../../../tool/HttpUtils';

export  default class myWallet extends  Component{
    constructor(props){
        super(props);
        this.state={};
    }

    _next(obj){
        if(obj==1){
            this.props.navigator.push({
                name:'mybonus',
                component:MyBonus,
                params:{

                }
            })
        }
        if(obj==2){
            this.props.navigator.push({
                name:'tixianjilu',
                component:TiXianJiLu,
                params:{

                }
            })
        }
        if(obj==3){
            this.props.navigator.push({
                name:'myteam',
                component:Myteam,
                params:{

                }
            })
        }
        if(obj==4){
            this.props.navigator.push({
                name:'baoshi',
                component:BaoShi,
                params:{

                }
            })
        }
        if(obj==5){
            this.props.navigator.push({
                name:'shenqingtixian',
                component:ShenQingTiXian,
                params:{

                }
            })
        }
        if(obj==6){
            this.props.navigator.push({
                name:'topup',
                component:TopUp,
                params:{

                }
            })
        }
        if(obj==7){
            this.props.navigator.push({
                name:'topuplist',
                component:TopUpList,
                params:{

                }
            })
        }

    }
    _list(){

        storage.load({
            key: 'userinfo2',
            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的同步方法
            autoSync: true,
            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用同步方法的同时先返回已经过期的数据。
            // 设置为false的话，则始终强制返回同步方法提供的最新数据(当然会需要更多等待时间)。
            syncInBackground: true
        }).then(ret => {

            var url = 'http://'+ipdy+'/index.php?s=/Home/APPUser/getMyBaoShi/uid/'+ret.uid+'/sign/'+(Cy('uid='+ret.uid+'&key='+qm))

            HttpUtlis.get(url)
                .then(result=>{
                    console.log(result)
                    this.setState({
                        all:result.data.baoshi,
                        money:result.data.money,
                    })

                })
                .catch(error=>{
                    console.log(error)
                    Alert.alert(
                        '提示',
                        '暂无数据',
                        [

                            {text: '确定', },
                        ])
                })

        }).catch(err => {

            //如果没有找到数据且没有同步方法，
            //或者有其他异常，则在catch中返回
        })
    }



    componentDidMount() {
        this._list()
    }


    render(){
        return(
            <View style={{backgroundColor:'#e6e6e6',flex:1}}>
                <Tou title="我的钱包" navigator={this.props.navigator}/>
                <View style={{width:WINWIDTH,height:WINHEIGHT*0.2,backgroundColor:filecolor}}>
                    <View style={{width:WINWIDTH,height:WINHEIGHT*0.07,flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:WINHEIGHT*0.1}}>
                        <View style={{justifyContent:'center',alignItems:'center',width:WINWIDTH*0.5,height:WINHEIGHT*0.07,}}>
                            <Text style={{fontSize:WINWIDTH*0.035,color:'#ffffff'}}>可用宝石</Text>
                            <Text style={{fontSize:WINWIDTH*0.035,color:'#ffffff'}}>{this.state.all}</Text>
                        </View>

                        <View style={{justifyContent:'center',alignItems:'center',width:WINWIDTH*0.5,height:WINHEIGHT*0.07,}}>
                            <Text style={{fontSize:WINWIDTH*0.035,color:'#ffffff'}}>可用余额</Text>
                            <Text style={{fontSize:WINWIDTH*0.035,color:'#ffffff'}}>{this.state.money}</Text>
                        </View>
                    </View>
                </View>

                <View style={{width:WINWIDTH,justifyContent:'center',alignItems:'center',marginTop:WINHEIGHT*0.02,backgroundColor:'#ffffff'}}>
                    <TouchableOpacity onPress={this._next.bind(this,1)} style={{width:WINWIDTH*0.9,height:WINHEIGHT*0.08,backgroundColor:'#ffffff',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                        <Text style={{fontSize:WINWIDTH*0.035,}}>我的奖金</Text>
                        <Text style={{fontSize:WINWIDTH*0.035,}}>></Text>
                    </TouchableOpacity>

                    {/*<TouchableOpacity onPress={this._next.bind(this,2)} style={{width:WINWIDTH*0.9,height:WINHEIGHT*0.08,backgroundColor:'#ffffff',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>*/}
                        {/*<Text style={{fontSize:WINWIDTH*0.035,}}>我的提现</Text>*/}
                        {/*<Text style={{fontSize:WINWIDTH*0.035,}}>></Text>*/}
                    {/*</TouchableOpacity>*/}

                    {/*<TouchableOpacity onPress={this._next.bind(this,5)} style={{width:WINWIDTH*0.9,height:WINHEIGHT*0.08,backgroundColor:'#ffffff',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>*/}
                        {/*<Text style={{fontSize:WINWIDTH*0.035,}}>申请提现</Text>*/}
                        {/*<Text style={{fontSize:WINWIDTH*0.035,}}>></Text>*/}
                    {/*</TouchableOpacity>*/}

                    <TouchableOpacity onPress={this._next.bind(this,3)} style={{width:WINWIDTH*0.9,height:WINHEIGHT*0.08,backgroundColor:'#ffffff',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                        <Text style={{fontSize:WINWIDTH*0.035,}}>我的团队</Text>
                        <Text style={{fontSize:WINWIDTH*0.035,}}>></Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this._next.bind(this,4)} style={{width:WINWIDTH*0.9,height:WINHEIGHT*0.08,backgroundColor:'#ffffff',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                        <Text style={{fontSize:WINWIDTH*0.035,}}>赠送宝石</Text>
                        <Text style={{fontSize:WINWIDTH*0.035,}}>></Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this._next.bind(this,6)} style={{width:WINWIDTH*0.9,height:WINHEIGHT*0.08,backgroundColor:'#ffffff',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                        <Text style={{fontSize:WINWIDTH*0.035,}}>在线充值</Text>
                        <Text style={{fontSize:WINWIDTH*0.035,}}>></Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this._next.bind(this,7)} style={{width:WINWIDTH*0.9,height:WINHEIGHT*0.08,backgroundColor:'#ffffff',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                        <Text style={{fontSize:WINWIDTH*0.035,}}>充值记录</Text>
                        <Text style={{fontSize:WINWIDTH*0.035,}}>></Text>
                    </TouchableOpacity>

                </View>





            </View>
        )
    }


}


























