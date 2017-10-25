
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
    ListView,
    Alert,



} from 'react-native';


import Cy from 'crypto-js/md5';
const  WINWIDTH = Dimensions.get('window').width;
const  WINHEIGHT = Dimensions.get('window').height;

//头
import Tou from '../../head/headBack';



export  default class jifenjilu extends  Component{
    constructor(props){
        super(props);
        var ds =new ListView.DataSource({rowHasChanged:(r1,r2)=> r1!==r2});

        this.state ={
            dataSource: ds,
        };
    }


    componentDidMount() {
        storage.load({
            key: 'userinfo2',
            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的同步方法
            autoSync: true,
            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用同步方法的同时先返回已经过期的数据。
            // 设置为false的话，则始终强制返回同步方法提供的最新数据(当然会需要更多等待时间)。
            syncInBackground: false
        }).then(ret => {
            if(ret){


console.log('http://'+ipdy+'/app_dev.php/zhuanzhangrecord/'+ret.uid+'/1/20/'+(Cy('uid='+ret.uid+'&str='+qm)))
                fetch('http://'+ipdy+'/app_dev.php/zhuanzhangrecord/'+ret.uid+'/1/20/'+(Cy('uid='+ret.uid+'&str='+qm)))
                    .then((response) => response.json())
                    .then((responseJson) =>{
                        console.log(responseJson)

                        if(responseJson.code==10000)
                        {
                            this.setState({dataSource:this.state.dataSource.cloneWithRows(responseJson.data)})


                        }else {
                            Alert.alert(
                                '提示',
                                '暂无数据',
                                [

                                    {text: '确定', },
                                ])
                        }


                    }).catch((error) => {

                })

            }
        }).catch(err => {
            //如果没有找到数据且没有同步方法，
            //或者有其他异常，则在catch中返回
        })
    }



    _renderRow(rowData){
        return(
            <TouchableOpacity activeOpacity={1} style={{backgroundColor:'#ffffff',
            }}  >
                <View style={{

                    width:WINWIDTH,
                    height:WINHEIGHT*(0.15),
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
                        <Text style={styles.TX3}>商户名称:{rowData.title}</Text>

                        <Text style={styles.TX3}>商户手机:{rowData.phonenum}</Text>

                    </View>
                    <View>
                        <Text style={styles.TX3}></Text>
                        <Text style={styles.TX3}>转账状态:{rowData.state}</Text>
                        <Text style={styles.TX3}>金额:{rowData.money}</Text>
                    </View>


                </View>
            </TouchableOpacity>
        )
    }


    render(){
        return(
            <View style={{flex:1,backgroundColor:'#e6e6e6'}}>
                <Tou title="积分记录" navigator={this.props.navigator}/>
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