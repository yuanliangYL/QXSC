
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
    InteractionManager,
    RefreshControl,
    Alert,



} from 'react-native';

//

const  WINWIDTH = Dimensions.get('window').width;
const  WINHEIGHT = Dimensions.get('window').height;

import Cy from 'crypto-js/md5';


//头
import Tou from '../../../qiXinComponent/head/headBack';

export  default class djzhongbao extends  Component{
    constructor(props) {
        super(props);
        var ds =new ListView.DataSource({rowHasChanged:(r1,r2)=> r1!==r2});

        this.state ={
            dataSource: ds,
            uid:'',


            isRefreshing: true,
            enableEmptySections:true,

            clike:false,

            dataState:0,
        };



    }
    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
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


                    // console.log('http://'+ipdy+'/app_dev.php/gethongbaolist/'+this.state.uid+'/'+(Cy('uid='+this.state.uid+'&str='+qm)))
                    fetch('http://'+ipdy+'/app_dev.php/gethongbaolist/'+this.state.uid+'/1/20/'+(Cy('uid='+this.state.uid+'&str='+qm)))
                        .then((response) => response.json())
                        .then((responseJson) =>{
                            console.log(responseJson)

                            if(responseJson.code==10000)
                            {
                                this.setState({dataSource:this.state.dataSource.cloneWithRows(responseJson.data),dataState:1,})

                                setTimeout(() => {
                                    this.setState({isRefreshing: false});
                                }, 10);

                            }else if(responseJson.code==10001){
                                Alert.alert(
                                    '提示',
                                    '没有数据',
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
        });
    }

    getAgain(){
        fetch('http://'+ipdy+'/app_dev.php/gethongbaolist/'+this.state.uid+'/1/20/'+(Cy('uid='+this.state.uid+'&str='+qm)))
            .then((response) => response.json())
            .then((responseJson) =>{
                console.log(responseJson)
                if(responseJson.code==10000)
                {
                    this.setState({dataSource:this.state.dataSource.cloneWithRows(responseJson.data),dataState:1,})

                    setTimeout(() => {
                        this.setState({isRefreshing: false});
                    }, 10);

                }else if(responseJson.code==10001){
                    Alert.alert(
                        '提示',
                        '没有数据',
                        [

                            {text: '确定', },
                        ])
                    this.setState({
                        dataState:0,
                    })
                }



            }).catch((error) => {

        })
    }

    _Click(obj){
        if(this.state.clike==false){
            this.setState({
                clike:true,
            })
            console.log('http://'+ipdy+'/app_dev.php/clicktogethongbao/'+obj+'/'+this.state.uid+'/'+(Cy('uid='+this.state.uid+'&str='+qm)))
            fetch('http://'+ipdy+'/app_dev.php/clicktogethongbao/'+obj+'/'+this.state.uid+'/'+(Cy('uid='+this.state.uid+'&str='+qm)))
                .then((response) => response.json())
                .then((responseJson) =>{

                    console.log(responseJson)

                    if(responseJson.code==10000){
                        this.setState({
                            clike:false,
                        })
                        Alert.alert(
                            '提示',
                            '领取成功',
                            [

                                {text: '确定', },
                            ])
                        this.getAgain();

                    }else if(responseJson.code==10001){
                        this.setState({
                            clike:false,
                        })
                        Alert.alert(
                            '提示',
                            '领取失败',
                            [

                                {text: '确定', },
                            ])
                    }



                }).catch((error) => {
                this.setState({
                    clike:false,
                })
            })
        }



    }



    _renderRow(rowData){
        return(
            <TouchableOpacity onPress={this._Click.bind(this,rowData.id)} activeOpacity={0.5} style={{backgroundColor:'#ffffff'
            }}  >
                <View style={{

                    width:WINWIDTH,
                    height:WINHEIGHT*(0.15),
                    borderBottomColor:'#e6e6e6',
                    borderBottomWidth:1,
                    flexDirection:'row',
                    marginLeft:WINWIDTH*0.05,
                    marginTop:WINHEIGHT*0.02

                }}>

                    <View style={{width:WINWIDTH*0.25,height:WINHEIGHT*0.15,justifyContent:'center',alignItems:'center'}}>
                        <Image source ={require('../../../img/hongbaotu.png')} style={{
                        width:WINWIDTH*(0.15),
                        height:WINWIDTH*(0.15)
                    }}/>
                    </View>


                    <View>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={{
                        color:'#DC143C',
                        marginLeft:WINWIDTH*(0.03),
                        fontSize:WINWIDTH*(0.03),
                    }}>{rowData.dateline}</Text>

                        <View style={{backgroundColor:'#ffffff',width:WINWIDTH*(0.2),height:WINHEIGHT*(0.04),justifyContent:'center',alignItems:'center',borderRadius:3,borderWidth:1,borderColor:'#DC143C',marginLeft:20}}>
                            <Text style={{fontSize:WINWIDTH*(0.03),color:'#DC143C'}}>领取</Text>
                        </View>

                            </View>

                        <Text style={{
                            color:'#DC143C',
                            marginLeft:WINWIDTH*(0.03),
                            fontSize:WINWIDTH*(0.03),
                            marginTop:WINHEIGHT*(0.01),
                        }}>状态:{rowData.state}</Text>
                        <Text style={styles.TX3}>¥{rowData.total}</Text>


                    </View>


                </View>


            </TouchableOpacity>
        )



    }
    Viewdata(){
        return(
            <View style={{flex:1,backgroundColor:'#e6e6e6',}}>
                <Tou title="积分领取" navigator={this.props.navigator}/>
                <ListView
                          dataSource={this.state.dataSource}
                          renderRow={this._renderRow.bind(this)}
                          enableEmptySections = {true}
                          refreshControl={
                              <RefreshControl
                                  refreshing={this.state.isRefreshing}
                                  onRefresh={this.getAgain.bind(this)}
                                  tintColor="#ff0000"
                                  title="加载中..."
                              />
                          }
                />





            </View>
        )
    }


    View(){
        return(
            <View style={{flex:1}}>
                <Tou title="积分领取" navigator={this.props.navigator}/>
                <View style={{flex:1,backgroundColor:'#e6e6e6',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:WINWIDTH*(0.04),color:'#696969'}}>暂无数据</Text>
                </View>
            </View>

            )

    }



    render() {

        if(this.state.dataState){
            return this.Viewdata();
        }else {
            return this.View();
        }
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
        color:'red',
        marginLeft:WINWIDTH*(0.03),
        fontSize:WINWIDTH*(0.05),
        marginTop:WINHEIGHT*(0.01),
        width:WINWIDTH/1.2,

    }


});



