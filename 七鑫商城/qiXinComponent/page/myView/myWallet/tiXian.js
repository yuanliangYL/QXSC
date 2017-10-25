
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




} from 'react-native';

import Cy from 'crypto-js/md5';

const  WINWIDTH = Dimensions.get('window').width;
const  WINHEIGHT = Dimensions.get('window').height;

import Tou from '../../../head/headBack';

import HttpUtlis from '../../../tool/HttpUtils';

export  default class tiXian extends  Component{
    constructor(props){
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state={
            dataSource: ds,
        };

        storage.load({
            key: 'userinfo2',
            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的同步方法
            autoSync: true,
            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用同步方法的同时先返回已经过期的数据。
            // 设置为false的话，则始终强制返回同步方法提供的最新数据(当然会需要更多等待时间)。
            syncInBackground: true
        }).then(ret => {


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
            syncInBackground: true
        }).then(ret => {

            var url = 'http://'+ipdy+'/index.php?s=/Home/APPUser/userTiXianRecord/uid/'+ret.uid+'/pageNum/1/size/30/sign/'+(Cy('pageNum=1&size=30&uid='+ret.uid+'&key='+qm))

            // console.log(('key='+qm+'&pageNum=1&size=30&uid='+ret.uid))

            HttpUtlis.get(url)
                .then(result=>{
                    console.log(result)
                    this.setState({dataSource:this.state.dataSource.cloneWithRows(result.data),dataState:1})

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

    _renderRow(rowData){
        return(
            <TouchableOpacity activeOpacity={1} style={{backgroundColor:'#ffffff',
            }}  >
                <View style={{

                    width:WINWIDTH,
                    height:WINHEIGHT*(0.22),
                    borderBottomColor:'#e6e6e6',
                    borderBottomWidth:1,
                    flexDirection:'row',
                    padding:WINWIDTH*(0.03),
                }}>
                    <View style={{width:WINWIDTH*(0.5)}}>
                        <Text style={{
                            color:filecolor,
                            marginLeft:WINWIDTH*(0.03),
                            fontSize:WINWIDTH*(0.03),
                            marginTop:WINHEIGHT*(0.01),
                        }}>{rowData.dateline}</Text>
                        <Text style={styles.TX3}>提现人:{rowData.username}</Text>

                        <Text style={styles.TX3}>商户手机:{rowData.phone}</Text>

                        {
                            rowData.bankcard_info?
                                <View>
                                    <Text style={styles.TX3}>所在地:{rowData.bankcard_info.cardarea}</Text>
                                    <Text style={styles.TX3}>开户行:{rowData.bankcard_info.cardbank}</Text>
                                    <Text style={styles.TX3}>银行卡:{rowData.bankcard_info.cardnum}</Text>
                                </View>
                                :
                                <Text style={styles.TX3}></Text>

                        }


                    </View>
                    <View>
                        <Text style={styles.TX3}></Text>
                        <Text style={styles.TX3}>提现状态:{rowData.state_info}</Text>
                        <Text style={styles.TX3}>提现金额:{rowData.money}</Text>
                        <Text style={styles.TX3}>提现宝石:{rowData.baoshi}</Text>



                        {
                            rowData.bankcard_info?
                                <Text style={styles.TX3}>持卡人:{rowData.bankcard_info.carduser}</Text>
                                :
                                <Text style={styles.TX3}></Text>

                        }
                    </View>


                </View>
            </TouchableOpacity>
        )
    }

    render(){
        return(
            <View style={{backgroundColor:'#e6e6e6',flex:1}}>
                <Tou title="提现记录" navigator={this.props.navigator}/>
                <ListView style={{}}
                          dataSource={this.state.dataSource}
                          renderRow={this._renderRow.bind(this)}
                          enableEmptySections = {true}
                />
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
        width:WINWIDTH/1.2,

    }


});


















