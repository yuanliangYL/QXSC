
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
    ListView,
    RefreshControl,





} from 'react-native';

import Cy from 'crypto-js/md5';

const  WINWIDTH = Dimensions.get('window').width;
const  WINHEIGHT = Dimensions.get('window').height;

import Tou from '../../../head/headBack';

import TiXianJiLu from './tiXian';

import Myteam   from './team';

import MyBonus from './jiangJin';


import HttpUtlis from '../../../tool/HttpUtils';

import BaoshiList from './baoshiList';


export  default class forTiXian extends  Component{
    constructor(props){
        var ds =new ListView.DataSource({rowHasChanged:(r1,r2)=> r1!==r2});
        super(props);
        this.state={
            dataSource: ds,
            isRefreshing: true,
        };
    }

    _next(obj){

        if(this.state.id){
            storage.load({
                key: 'userinfo2',
                // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的同步方法
                autoSync: true,
                // syncInBackground(默认为true)意味着如果数据过期，
                // 在调用同步方法的同时先返回已经过期的数据。
                // 设置为false的话，则始终强制返回同步方法提供的最新数据(当然会需要更多等待时间)。
                syncInBackground: false
            }).then(ret => {


                var url = 'http://'+ipdy+'/index.php?s=/Home/APPUser/userTiXian/uid/'+ret.uid+'/money/'+this.state.money+'/bankcard_id/'+this.state.id+'/sign/'+(Cy('bankcard_id='+this.state.id+'&money='+this.state.money+'&uid='+ret.uid+'&key='+qm))

                console.log(url)

                HttpUtlis.get(url)
                    .then(result=>{
                        console.log(result)
                        Alert.alert(
                            '提示',
                            result.msg,
                            [
                                {text: '确定', },
                            ])
                        this.props.navigator.pop()


                    })
                    .catch(error=>{
                        console.log(error)

                    })

            }).catch(err => {

                //如果没有找到数据且没有同步方法，
                //或者有其他异常，则在catch中返回
            })
        }else {
            Alert.alert(
                '提示',
                '未选择银行卡',
                [
                    {text: '确定', },
                ])
        }

    }
    keTiQu(){
        storage.load({
            key: 'userinfo2',
            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的同步方法
            autoSync: true,
            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用同步方法的同时先返回已经过期的数据。
            // 设置为false的话，则始终强制返回同步方法提供的最新数据(当然会需要更多等待时间)。
            syncInBackground: true
        }).then(ret => {

            var url = 'http://'+ipdy+'/index.php?s=/Home/APPUser/getShareMoney/uid/'+ret.uid+'/sign/'+(Cy('uid='+ret.uid+'&key='+qm))

            HttpUtlis.get(url)
                .then(result=>{
                    console.log(result)
                    this.setState({
                        kiyitixian_baoshi:result.kiyitixian_baoshi,


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

    _list(){
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

                fetch('http://'+ipdy+'/index.php?s=/Home/APPUser/getUserBankCardList/uid/'+ret.uid+'/sign/'+(Cy('uid='+ret.uid+'&key='+qm)))
                    .then((response) => response.json())
                    .then((responseJson) =>{
                        console.log(responseJson)
                        if(responseJson.code==10000)
                        {
                            this.setState({dataSource:this.state.dataSource.cloneWithRows(responseJson.data),dataState:1});

                            setTimeout(() => {
                                this.setState({isRefreshing: false});
                            }, 10);


                        }else {
                            Alert.alert(
                                '提示',
                                '暂无数据',
                                [

                                    {text: '确定', },
                                ])
                        }


                    }).catch((error) => {

                })}


        }).catch(err => {
            //如果没有找到数据且没有同步方法，
            //或者有其他异常，则在catch中返回
        })
    }

    getAgain(){

    }


    componentDidMount() {
        this._list()
        this.keTiQu()
    }

    changeSource(obj){

        this.setState({
            id:obj.id,

        })
    }


    _renderRow(rowData){
        return(
            <TouchableOpacity onPress={this.changeSource.bind(this,rowData)}  activeOpacity={1} style={{backgroundColor:'#ffffff',
            }}  >
                <View style={{

                    width:WINWIDTH,
                    height:WINHEIGHT*(0.2),
                    borderBottomColor:'#e6e6e6',
                    borderBottomWidth:1,
                    padding:WINWIDTH*(0.01),

                }}>
                    <View style={{flexDirection:'row',height:WINHEIGHT*(0.04)}}>
                        <View style={{flexDirection:'row',backgroundColor:'#ffffff',height:WINHEIGHT*(0.04),width:WINWIDTH*(0.75)}}>
                            <Text style={{
                            color:filecolor,
                            marginLeft:WINWIDTH*(0.03),
                            fontSize:WINWIDTH*(0.03),
                            marginTop:WINHEIGHT*(0.01),
                        }}>持卡人:{rowData.carduser}</Text>

                            {/*<Text style={styles.TX3}>持卡人:{rowData.carduser}</Text>*/}
                        </View>
                        <View style={{backgroundColor:'#ffffff',width:WINWIDTH*(0.12),justifyContent:'center',alignItems:'center',}}>
                            <Image source={this.state.id==rowData.id?require('../../../../img/xuanzhong.png'):require('../../../../img/weixuanzhong.png')}
                                   style={{width:WINWIDTH*(0.07),height:WINWIDTH*(0.07)}}
                            />
                        </View>

                    </View>
                    <View style={{flex:1,backgroundColor:'#f5f5f5',marginTop:5}}>
                        <Text style={styles.TX3}>开户行:{rowData.cardbank}</Text>
                        <Text style={styles.TX3}>所在地:{rowData.cardarea}</Text>
                        <Text style={styles.TX3}>卡号:{rowData.cardnum}</Text>
                        <Text style={styles.TX3}>身份证:{rowData.personid}</Text>
                    </View>
                </View>


            </TouchableOpacity>
        )


    }




    render(){
        return(
            <View style={{backgroundColor:'#e6e6e6',flex:1}}>
                <Tou title="申请提现" navigator={this.props.navigator}/>

                <View style={styles.text}>

                    <View style={{backgroundColor:'#ffffff',width:WINWIDTH*(0.08),height:WINHEIGHT*(0.08), flex:1,justifyContent:'center',alignItems:'center'}}>
                        <Image source ={require('../../../../img/yonhu.png')} style={{width:WINWIDTH*(0.06),height:WINWIDTH*(0.06), }}/>
                    </View>

                    <View style={{backgroundColor:'#ffffff',width:WINWIDTH*(0.08),height:WINHEIGHT*(0.08),flex:6,}}>
                        <TextInput style={{height:WINHEIGHT*(0.08)}}
                                   placeholder={'请输入提现金额'}
                                   maxLength={11}
                                   underlineColorAndroid={'transparent'}
                                   onChangeText={(text) => this.setState({money:text})}
                        />
                    </View>
                </View>
                <View style={{flexDirection:'row',marginTop:WINHEIGHT*0.001}}>
                    <View style={{backgroundColor:'#ffffff',flex:3,height:WINHEIGHT*(0.05),justifyContent:'center'}}>
                        {/*<Text style={{fontSize:WINWIDTH*(0.03),color:'#696969'}}>输入金额必须为100的整数</Text>*/}
                        <Text style={{fontSize:WINWIDTH*(0.03),color:'#696969',marginLeft:WINWIDTH*0.06}}>当前可提现金额:{this.state.kiyitixian_baoshi}</Text>
                    </View>
                </View>


                <ListView style={{marginBottom:50}}
                          dataSource={this.state.dataSource}
                          renderRow={this._renderRow.bind(this)}
                          enableEmptySections = {true}

                          refreshControl={
                              <RefreshControl
                                  refreshing={this.state.isRefreshing}
                                  onRefresh={this.getAgain.bind(this)}
                                  tintColor="#ff0000"
                                  title="玩命加载中..."
                              />
                          }
                />








                <View style={{justifyContent:'center', alignItems:'center',position:'absolute',
                    bottom:0,}}>

                    <View style={{
                        justifyContent:'center',
                        alignItems:'center',
                        backgroundColor:filecolor,
                        height:WINHEIGHT*(0.08),
                        width:WINWIDTH,

                    }}>
                        <TouchableOpacity   style={{height:WINHEIGHT*(0.06), width:WINWIDTH,justifyContent:'center', alignItems:'center',}}
                                           onPress={this._next.bind(this)} >
                            <Text style={{fontSize:16,color:'#ffffff'}}>确认提现</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>









        )
    }


}




const styles = StyleSheet.create({

    TX:{
        marginLeft:WINWIDTH*(0.03),
        fontSize:WINWIDTH*(0.035),

    },
    TX1:{
        color:'#696969',
        marginLeft:WINWIDTH*(0.03),
        fontSize:WINWIDTH*(0.03),
        marginTop:WINHEIGHT*(0.01),

    },
    TX2:{
        color:'#696969',
        marginLeft:WINWIDTH*(0.05),
        fontSize:WINWIDTH*(0.03),
        marginTop:WINHEIGHT*(0.01),


    },
    TX3:{
        color:'#696969',
        marginLeft:WINWIDTH*(0.03),
        fontSize:WINWIDTH*(0.03),
        marginTop:WINHEIGHT*(0.01),
        width:WINWIDTH*(0.55),

    },
    text:{
        height:WINHEIGHT*(0.08),
        flexDirection:'row',
        marginBottom:WINHEIGHT*(0.002),
        marginTop:WINHEIGHT*0.001,

    }


});

















