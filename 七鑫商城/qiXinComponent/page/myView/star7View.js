
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
    Linking,
    Alert,
    DeviceEventEmitter

} from 'react-native';


//封装网络请求-仅测试与项目无关
import HttpUtlis from '../../tool/HttpUtils';


//申请商家
import SqMall from '../../../qiXinComponent/page/myView/shenQingMall'
//订单
import Order from '../../../qiXinComponent/page/myView/Order';
//收藏
import ShouCang from '../../../qiXinComponent/page/myView/myGuanZhu';
//消息
import MyXiaoXi from '../../../qiXinComponent/page/homeButton1-6/myXiaoXi';
//银行卡
import Bank from '../../../qiXinComponent/page/myView/bank/bankDetails';
//银行卡列表
import BankList from '../../../qiXinComponent/page/myView/bank/addback';

//收货地址
import Address from '../../../qiXinComponent/page/myView/address/address';
//资金管理
import ZJ from '../../../qiXinComponent/page/myView/jifen/JiFenGuanLi';
//积分领取
import Receive from '../../../qiXinComponent/page/homeButton1-6/JiFen';
//个人中心
import Center from '../../../qiXinComponent/page/myView/Log&Reg/userinfo';
//登录页面
import Login from '../../../qiXinComponent/page/myView/Log&Reg/Login';
//积分记录-余额
import JFYE from '../../../qiXinComponent/page/myView/jifenjilu';
//修改资料
import xiuGaiZiLiao from '../myView/Log&Reg/modifyUser';
//分享
import FenXiang from '../myView/yaoqing';

//我的钱包
import WoDeQianBao from '../../page/myView/myWallet/myWallet';

import Cy from 'crypto-js/md5';




const  WINWIDTH = Dimensions.get('window').width;
const  WINHEIGHT = Dimensions.get('window').height;

export  default class djzshangcheng extends  Component{
    constructor(props){
        super(props);
        this.state={
            loginState:0,
        };




        global._loginState = this._loginState.bind(this);

        global._jifen = this._jifen.bind(this);

        //这个userinfo是唯一的，其他都是userinfo2
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
                    this.setState({
                        loginState:1,
                        phone:ret.phone,
                    })
                }
        }).catch(err => {

            //如果没有找到数据且没有同步方法，
            //或者有其他异常，则在catch中返回
        })
    }





    _login(){
        const {navigator} =this.props;
        if(navigator) {
            navigator.push({
                name:'login',
                component:Login,
            })
        }
    }

    _loginend(){

        this.setState({
            loginState:0,
        })
    }

    _loginState(obj,obj2){
        if(obj==0){
            this.setState({
                loginState:0,
            })
        }

        if(obj==1){
            this.setState({
                loginState:1,
            })
        }
        if(obj2){
            this.setState({
                phone:obj2,
            })
        }
    }


    //个人中心
    _user(){
        this.props.navigator.push({
            name:'userinfo',
            component:Center,
            params:{

            }
        })
    }

    _next(obj){
        storage.load({
            key: 'userinfo2',
            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的同步方法
            autoSync: true,
            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用同步方法的同时先返回已经过期的数据。
            // 设置为false的话，则始终强制返回同步方法提供的最新数据(当然会需要更多等待时间)。
            syncInBackground: true
        }).then(ret => {

            if(obj==1){
                this.props.navigator.push({
                    name:'wodeyaoqing',
                    component:SqMall,
                    params:{

                    }
                })
            }
            if(obj==2){
                this.props.navigator.push({
                    name:'wodedingdan',
                    component:Order,
                    params:{

                    }
                })
            }
            if(obj==3){
                this.props.navigator.push({
                    name:'wodeguanzhu',
                    component:ShouCang,
                    params:{

                    }
                })
            }
            if(obj==4){
                this.props.navigator.push({
                    name:'bank',
                    component:BankList,
                    params:{

                    }
                })


            }
            if(obj==5){
                this.props.navigator.push({
                    name:'address',
                    component:Address,
                    params:{

                    }
                })
            }
            if(obj==6){
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


                    var url = 'http://'+ipdy+'/index.php?s=/Home/APPUser/canToShare/uid/'+ret.uid+'/sign/'+(Cy('uid='+ret.uid+'&key='+qm))

                    HttpUtlis.get(url)
                        .then(result=>{
                            console.log(result)
                            if(result.slug==1){
                                this.props.navigator.push({
                                    name:'fenxiang',
                                    component:FenXiang,
                                    params:{
                                        uid:ret.uid,
                                        phone:ret.phone,

                                    }
                                })
                            }else {
                                Alert.alert(
                                    '提示',
                                    '请充值后再分享',
                                    [

                                        {text: '确定', },
                                    ])
                            }

                        })
                        .catch(error=>{
                            console.log(error)

                        })

                }).catch(err => {

                    //如果没有找到数据且没有同步方法，
                    //或者有其他异常，则在catch中返回
                })




            }
            if(obj==7){
                this.props.navigator.push({
                    name: 'wodexiaoxi',
                    component:MyXiaoXi,
                    params: {}
                })
            }
            if(obj==8){
                this.props.navigator.push({
                    name:'about',
                    params:{

                    }
                })
            }
            //资金管理
            if(obj==9){
                this.props.navigator.push({
                    name:'jifenguanli',
                    component:ZJ,
                    params:{

                    }
                })
            }
            //我的钱包
            if(obj=='wdqb'){
                this.props.navigator.push({
                    name:'wodeqianbao',
                    component:WoDeQianBao,
                    params:{

                    }
                })
            }
            if(obj==12){
                this.props.navigator.push({
                    name:'jfjl',
                    component:JFYE,
                    params:{

                    }
                })
            }
            if(obj==13){
                this.props.navigator.push({
                    name:'djzhongbao',
                    component:Receive,
                    params:{

                    }
                })
            }
            if(obj==33){
                this.props.navigator.push({
                    name:'xiugaiziliao',
                    component:xiuGaiZiLiao,
                    params:{

                    }
                })


            }



        }).catch(err => {
            Alert.alert(
                '提示',
                '未登录请先登录',
                [

                    {text: '确定', },
                ])
        })





    }


    componentDidMount() {
        this.subscription = DeviceEventEmitter.addListener('updateCount', ()=>{

            this._jifen();
        });

        this._jifen();
    }

    componentWillUnmount() {
        this.subscription.remove();
    }


    _jifen(){
        storage.load({
            key: 'userinfo2',
            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的同步方法
            autoSync: true,
            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用同步方法的同时先返回已经过期的数据。
            // 设置为false的话，则始终强制返回同步方法提供的最新数据(当然会需要更多等待时间)。
            syncInBackground: false
        }).then(ret => {

            var jfurl = 'http://'+ipdy+'/app_dev.php/getusefulhbandprestorehb/'+ret.uid+'/'+(Cy('uid='+ret.uid+'&str='+qm));

            HttpUtlis.get(jfurl)
                .then(result=>{
                    // conlole.log(result)
                    this.setState({

                        xiaofei:result.data[0].xiaofei,
                        keyong:result.data[0].useful_hb,

                    })
                })
                .catch(error=>{
                    console.log(error)
                    })

        }).catch(err => {
            //如果没有找到数据且没有同步方法，
            //或者有其他异常，则在catch中返回
        })

    }





    render(){
        return(
            <ScrollView style={{flex:1}}>
                {
                    this.state.loginState==0?
                        <Image source={require('../../../newQx/my/1111.png')}
                               style={{width:WINWIDTH, height:WINHEIGHT*0.2,justifyContent:'center',alignItems:'center'}}>
                            <TouchableOpacity onPress={this._login.bind(this)} style={{justifyContent:'center',alignItems:'center'}}>
                                <Image source={require('../../../newQx/tou1.png')}
                                       style={{width:WINHEIGHT*0.08, height:WINHEIGHT*0.08}}/>
                                <Text style={{fontSize:WINWIDTH*0.035,color:'#ffffff',marginTop:WINHEIGHT*0.02}}>未登录，请点击登录</Text>
                            </TouchableOpacity>

                        </Image>
                        :
                        <View >
                            {/*<Image source={require('../../../imgs/123.jpg')}*/}
                                   {/*style={{height:WINHEIGHT*0.13,width:WINWIDTH,justifyContent:'space-around',marginTop:64,flexDirection:'row',alignItems:'center'}}>*/}
                                {/*<Text style={{fontSize:WINWIDTH*0.03,color:'#ffffff',backgroundColor:'transparent'}}>用户账户:{this.state.phone}</Text>*/}

                                {/*<TouchableOpacity onPress={this._user.bind(this)} style={{width:WINWIDTH*0.2,height:WINHEIGHT*0.045,justifyContent:'center',alignItems:'center',flexDirection:'row'}} >*/}
                                    {/*<Text style={{fontSize:WINWIDTH*0.03,color:'#ffffff',backgroundColor:'transparent'}}>*/}
                                        {/*个人中心*/}
                                    {/*</Text>*/}
                                    {/*<Image source={require('../../../imgs/jiant.png')}*/}
                                           {/*style={{height:WINHEIGHT*0.035,width:WINWIDTH*0.035,marginLeft:WINWIDTH*0.05}}/>*/}
                                {/*</TouchableOpacity>*/}


                            {/*</Image>*/}
                            {/*{*/}
                                {/*this._jifen()*/}
                            {/*}*/}

                            <Image source={require('../../../newQx/my/1111.png')}
                                   style={{width:WINWIDTH, height:WINHEIGHT*0.2,justifyContent:'center',alignItems:'center'}}>
                                <TouchableOpacity onPress={this._user.bind(this)} style={{justifyContent:'center',alignItems:'center'}}>
                                    <Image source={require('../../../newQx/tou1.png')}
                                           style={{width:WINHEIGHT*0.08, height:WINHEIGHT*0.08}}/>
                                    <Text style={{fontSize:WINWIDTH*0.035,color:'#ffffff',marginTop:WINHEIGHT*0.02}}>用户账户:{this.state.phone}    ></Text>
                                    {/*<Text style={{fontSize:WINWIDTH*0.035,color:'#ffffff',marginTop:WINHEIGHT*0.02}}>点击进入个人中心</Text>*/}
                                </TouchableOpacity>

                            </Image>


                            {/*<View style={{width:WINWIDTH,height:WINHEIGHT*0.085,backgroundColor:'#ffffff',justifyContent:'center',}}>*/}

                                {/*<View style={{width:WINWIDTH,height:WINHEIGHT*0.065,flexDirection:'row',justifyContent:'space-around',}}>*/}
                                    {/*<View  style={{width:WINWIDTH*0.5,height:WINHEIGHT*0.065,justifyContent:'center',alignItems:'center'}}>*/}
                                        {/*<Text style={{fontSize:WINWIDTH*0.03,color:filecolor}}>{this.state.xiaofei}</Text>*/}
                                        {/*<Text style={{fontSize:WINWIDTH*0.03,color:'#696969'}}>乐福分</Text>*/}
                                    {/*</View>*/}

                                    {/*<TouchableOpacity onPress={this._next.bind(this,12)} style={{width:WINWIDTH*0.5,height:WINHEIGHT*0.065,justifyContent:'center',alignItems:'center',borderColor:'#e5e5e5',borderLeftWidth:1,*/}
            {/*}}>*/}
                                        {/*<Text style={{fontSize:WINWIDTH*0.03,color:filecolor}}>{this.state.keyong}</Text>*/}
                                        {/*<Text style={{fontSize:WINWIDTH*0.03,color:'#696969'}}>乐福币</Text>*/}
                                    {/*</TouchableOpacity>*/}

                                    {/*/!*<TouchableOpacity onPress={this._jifen.bind(this)} style={{width:WINWIDTH*0.3,height:WINHEIGHT*0.065,justifyContent:'center',alignItems:'center',borderColor:'#e5e5e5',borderLeftWidth:1,*!/*/}
                    {/*/!*}}>*!/*/}
                                        {/*/!*<Text style={{fontSize:WINWIDTH*0.03,color:filecolor}}></Text>*!/*/}
                                        {/*/!*<Text style={{fontSize:WINWIDTH*0.03,color:'#696969'}}>点击刷新</Text>*!/*/}
                                    {/*/!*</TouchableOpacity>*!/*/}

                                {/*</View>*/}
                            {/*</View>*/}


                        </View>
                }












                <View style={{width:WINWIDTH,flexDirection:'row',borderTopWidth:0.5,borderTopColor:'#e5e5e5',borderBottomColor:'#e5e5e5',borderBottomWidth:0.5}}>
                    <TouchableOpacity onPress={this._next.bind(this,2)} style={{width:WINWIDTH*0.25,height:WINHEIGHT*0.18,justifyContent:'center',alignItems:'center',borderRightColor:'#e5e5e5',borderRightWidth:0.5}}>
                        <Image source={require('../../../newQx/my/2.png')}
                               style={{width:WINWIDTH*0.1, height:WINHEIGHT*0.05}}/>
                        <Text style={{fontSize:WINWIDTH*0.035,color:'#696969',marginTop:WINHEIGHT*0.02}}>订单</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this._next.bind(this,7)} style={{width:WINWIDTH*0.25,height:WINHEIGHT*0.18,justifyContent:'center',alignItems:'center',borderRightColor:'#e5e5e5',borderRightWidth:0.5}}>
                        <Image source={require('../../../newQx/my/77.png')}
                               style={{width:WINWIDTH*0.1, height:WINHEIGHT*0.05}}/>
                        <Text style={{fontSize:WINWIDTH*0.035,color:'#696969',marginTop:WINHEIGHT*0.02}}>消息</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this._next.bind(this,3)} style={{width:WINWIDTH*0.25,height:WINHEIGHT*0.18,justifyContent:'center',alignItems:'center',borderRightColor:'#e5e5e5',borderRightWidth:0.5}}>
                        <Image source={require('../../../newQx/my/22.png')}
                               style={{width:WINWIDTH*0.1, height:WINHEIGHT*0.05}}/>
                        <Text style={{fontSize:WINWIDTH*0.035,color:'#696969',marginTop:WINHEIGHT*0.02}}>易购车</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this._next.bind(this,'wdqb')}  style={{width:WINWIDTH*0.25,height:WINHEIGHT*0.18,justifyContent:'center',alignItems:'center',borderRightColor:'#e5e5e5',borderRightWidth:0.5}}>
                        <Image source={require('../../../newQx/my/zjgl.png')}
                               style={{width:WINWIDTH*0.1, height:WINHEIGHT*0.05}}/>
                        <Text style={{fontSize:WINWIDTH*0.035,color:'#696969',marginTop:WINHEIGHT*0.02}}>我的钱包</Text>
                    </TouchableOpacity>

                    {/*<TouchableOpacity onPress={this._next.bind(this,1)} style={{width:WINWIDTH*0.25,height:WINHEIGHT*0.18,justifyContent:'center',alignItems:'center',borderRightColor:'#e5e5e5',borderRightWidth:0.5}}>*/}
                        {/*<Image source={require('../../../newQx/my/6.png')}*/}
                               {/*style={{width:WINWIDTH*0.1, height:WINHEIGHT*0.05}}/>*/}
                        {/*<Text style={{fontSize:WINWIDTH*0.035,color:'#696969',marginTop:WINHEIGHT*0.02}}>申请商家</Text>*/}
                    {/*</TouchableOpacity>*/}


                </View>

                <View style={{width:WINWIDTH,flexDirection:'row',borderBottomColor:'#e5e5e5',borderBottomWidth:0.5}}>
                    <TouchableOpacity onPress={this._next.bind(this,4)} style={{width:WINWIDTH*0.25,height:WINHEIGHT*0.18,justifyContent:'center',alignItems:'center',borderRightColor:'#e5e5e5',borderRightWidth:0.5}}>
                        <Image source={require('../../../newQx/my/99.png')}
                               style={{width:WINWIDTH*0.1, height:WINHEIGHT*0.05}}/>
                        <Text style={{fontSize:WINWIDTH*0.035,color:'#696969',marginTop:WINHEIGHT*0.02}}>银行卡</Text>
                    </TouchableOpacity>

                    {/*<TouchableOpacity style={{width:WINWIDTH*0.25,height:WINHEIGHT*0.18,justifyContent:'center',alignItems:'center',borderRightColor:'#e5e5e5',borderRightWidth:0.5}}>*/}
                        {/*<Image source={require('../../../newQx/my/5.png')}*/}
                               {/*style={{width:WINWIDTH*0.1, height:WINHEIGHT*0.05}}/>*/}
                        {/*<Text style={{fontSize:WINWIDTH*0.035,color:'#696969',marginTop:WINHEIGHT*0.02}}>会员卡</Text>*/}
                    {/*</TouchableOpacity>*/}

                    <TouchableOpacity onPress={this._next.bind(this,5)} style={{width:WINWIDTH*0.25,height:WINHEIGHT*0.18,justifyContent:'center',alignItems:'center',borderRightColor:'#e5e5e5',borderRightWidth:0.5}}>
                        <Image source={require('../../../newQx/my/12.png')}
                               style={{width:WINWIDTH*0.1, height:WINHEIGHT*0.05}}/>
                        <Text style={{fontSize:WINWIDTH*0.035,color:'#696969',marginTop:WINHEIGHT*0.02}}>收货地址</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this._next.bind(this,33)} style={{width:WINWIDTH*0.25,height:WINHEIGHT*0.18,justifyContent:'center',alignItems:'center',borderRightColor:'#e5e5e5',borderRightWidth:0.5}}>
                        <Image source={require('../../../newQx/my/4.png')}
                               style={{width:WINWIDTH*0.1, height:WINHEIGHT*0.05}}/>
                        <Text style={{fontSize:WINWIDTH*0.035,color:'#696969',marginTop:WINHEIGHT*0.02}}>基本资料</Text>
                    </TouchableOpacity>

                    {/*<TouchableOpacity onPress={this._next.bind(this,6)} style={{width:WINWIDTH*0.25,height:WINHEIGHT*0.18,justifyContent:'center',alignItems:'center',borderRightColor:'#e5e5e5',borderRightWidth:0.5}}>*/}
                        {/*<Image source={require('../../../newQx/my/1.png')}*/}
                               {/*style={{width:WINWIDTH*0.1, height:WINHEIGHT*0.05}}/>*/}
                        {/*<Text style={{fontSize:WINWIDTH*0.035,color:'#696969',marginTop:WINHEIGHT*0.02}}>分享邀请</Text>*/}
                    {/*</TouchableOpacity>*/}

                </View>




                <View style={{backgroundColor:'#e5e5e5',marginBottom:50}}>

                </View>
            </ScrollView>


        )
    }

}


