
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 *
 *
 *
 *
 * db.transaction(function (tx) {
                tx.executeSql('INSERT INTO quyuMall VALUES(uid)',2);

            },function (error){console.log('Transaction ERROR:'+error.message)},
 function () {
                alert('插入成功')

            } )
 // db.transaction(function (tx) {
       //     tx.executeSql('INSERT INTO quyuMall(city) VALUES(1)');
       //
       // },function (error){alert('插入失败')},
 //     function () {
       //
       //
       //
       // } )
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

import Cy from 'crypto-js/md5';
//

const  WINWIDTH = Dimensions.get('window').width;
const  WINHEIGHT = Dimensions.get('window').height;

import AddDetails from './addbackDetails';


//头
import Tou from '../../../head/headBack';


export default class addback extends Component{
    constructor(props) {
        super(props);
        var ds =new ListView.DataSource({rowHasChanged:(r1,r2)=> r1!==r2});

        this.state ={
            dataSource: ds,
            uid:'',
            isRefreshing: true,
            enableEmptySections:true,
            dataState:0,
        };



    }



    _back(obj){


        console.log(obj)

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
        });

    }



    getAgain(){
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
        });
    }


    _renderRow(rowData){
        return(
            <TouchableOpacity onPress={this._back.bind(this,rowData)} activeOpacity={1} style={{backgroundColor:'#ffffff',
            }}  >
                <View style={{

                    width:WINWIDTH,
                    height:WINHEIGHT*(0.2),
                    borderBottomColor:'#e6e6e6',
                    borderBottomWidth:1,
                    padding:WINWIDTH*(0.03),

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
                        <View style={{backgroundColor:'#ffffff',width:WINWIDTH*(0.12),justifyContent:'center',alignItems:'center',borderRadius:6,borderWidth:1,borderColor:filecolor}}>
                                <Text onPress={this._handlePress.bind(this,rowData)}  style={{fontSize:WINWIDTH*(0.035),color:filecolor}}>删除</Text>


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


    _handlePress(obj) {
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

                fetch('http://'+ipdy+'/index.php?s=/Home/APPUser/delUserBankCard/uid/'+ret.uid+'/bankcard_id/'+obj.id+'/sign/'+(Cy('bankcard_id='+obj.id+'&uid='+ret.uid+'&key='+qm)))
                    .then((response) => response.json())
                    .then((responseJson) =>{
                        console.log(responseJson)

                        if(responseJson.code==10000)
                        {
                            Alert.alert(
                            '提示',
                            responseJson.msg,
                            [

                                {text: '确定', },
                            ])

                            this.getAgain();
                        }else if(responseJson.code==10001){
                            Alert.alert(
                                '提示',
                                '删除失败',
                                [

                                    {text: '确定', },
                                ])

                        }

                    }).catch((error) => {

                        // alert('hhhhhhh')

                })

            }
        }).catch(err => {


            //如果没有找到数据且没有同步方法，
            //或者有其他异常，则在catch中返回
        })

    }

    _jump(){
        this.props.navigator.push({
            name:'addDetails',
            component:AddDetails,
            params:{
                _this:this,
            }
        })

        //
        // const {navigator} =this.props;
        // if(navigator) {
        //     navigator.push({
        //         name:'addDetails',
        //         Component:AddDetails,
        //         params:{
        //             _this:this,
        //         }
        //
        //     })
        // }

    }


    dataView(){

        return (
            <View style={{flex:1,backgroundColor:'#e6e6e6'}}>
                <Tou title="银行卡列表" navigator={this.props.navigator}/>

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
                        <TouchableOpacity  style={{height:WINHEIGHT*(0.06), width:WINWIDTH,justifyContent:'center', alignItems:'center',}}
                                           onPress={this._jump.bind(this)} >
                            <Text style={{fontSize:16,color:'#ffffff'}}>添加银行卡</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );

    }

    noDataview(){
        return(

        <View style={{flex:1,backgroundColor:'#e6e6e6'}}>
            <Tou title="银行卡列表" navigator={this.props.navigator}/>


            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:'black',fontSize:WINHEIGHT*0.025,color:'#696969'}}>暂无数据</Text>
            </View>
            <View style={{justifyContent:'center', alignItems:'center',position:'absolute',
                    bottom:0,}}>

                <View style={{
                        justifyContent:'center',
                        alignItems:'center',
                        backgroundColor:filecolor,
                        height:WINHEIGHT*(0.08),
                        width:WINWIDTH,

                    }}>
                    <TouchableOpacity  style={{height:WINHEIGHT*(0.06), width:WINWIDTH,justifyContent:'center', alignItems:'center',}}
                                       onPress={this._jump.bind(this)} >
                        <Text style={{fontSize:16,color:'#ffffff'}}>添加银行卡</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>



















                // <View style={{flex:1}}>
                //     <Tou title="收货地址" navigator={this.props.navigator}/>
                //     <View style={{width:WINWIDTH,height:WINHEIGHT,alignItems:'center',justifyContent:'center',backgroundColor:'#ffffff'}}>
                //         {/*<Image source={require('../../../img/www.gif')} style={{width:WINWIDTH*(0.35),height:WINWIDTH*(0.35)}} />*/}
                //         <Text style={{color:'black',fontSize:WINHEIGHT*0.025,color:'#696969'}}>暂无数据</Text>
                //         <View style={{justifyContent:'center', alignItems:'center',position:'absolute',
                //     bottom:WINHEIGHT*0.04,}}>
                //
                //             <View style={{
                //         justifyContent:'center',
                //         alignItems:'center',
                //         backgroundColor:filecolor,
                //         height:WINHEIGHT*(0.08),
                //         width:WINWIDTH,
                //
                //     }}>
                //                 <TouchableOpacity  style={{height:WINHEIGHT*(0.06), width:WINWIDTH,justifyContent:'center', alignItems:'center',}}
                //                                    onPress={this._jump.bind(this)} >
                //                     <Text style={{fontSize:16,color:'#ffffff'}}>新增收货地址</Text>
                //                 </TouchableOpacity>
                //             </View>
                //         </View>
                //     </View>
                // </View>

        )
    }

    render() {


        if(!this.state.dataState){
            return this.noDataview();
        }else {
            return this.dataView();
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
        color:'#696969',
        marginLeft:WINWIDTH*(0.03),
        fontSize:WINWIDTH*(0.03),
        marginTop:WINHEIGHT*(0.01),
        width:WINWIDTH*(0.55),

    }


});


