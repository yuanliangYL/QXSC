
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
import Alipay from 'rn-alipay';

const  WINWIDTH = Dimensions.get('window').width;
const  WINHEIGHT = Dimensions.get('window').height;

import Modal from 'react-native-modalbox';

//头
import Tou from '../../../qiXinComponent/head/headBack';
import HttpUtlis from '../../tool/HttpUtils';

export  default class hunhezhifu extends  Component{
    constructor(props){
        super(props);
        var ds =new ListView.DataSource({rowHasChanged:(r1,r2)=> r1!==r2});
        this.state={
            dataSource: ds,
            id:'',//地址id
            uid:'',


            city:'安徽省合肥市',
            paytype:0,
            alltotal:(Number.parseFloat(this.props.num)*Number.parseFloat(this.props.price1))+Number.parseFloat(this.props.ship1),

            baoshishu:'请输入余额后显示'



        };


        //取用户uid
        storage.load({
            key: 'userinfo2',
            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的同步方法
            autoSync: true,
            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用同步方法的同时先返回已经过期的数据。
            // 设置为false的话，则始终强制返回同步方法提供的最新数据(当然会需要更多等待时间)。
            syncInBackground: false
        }).then(ret => {
            if (ret.uid) {
                this.setState({
                    uid:ret.uid,
                })
            }
        }).catch(err => {
            //如果没有找到数据且没有同步方法，
            //或者有其他异常，则在catch中返回
        })

    }




    weixin(){

    }





    componentDidMount() {
        this._listnum()
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

                fetch('http://'+ipdy+'/index.php?s=/Home/APPUser/getPersonalShouHuoAddressList/uid/'+ret.uid+'/sign/'+(Cy('uid='+ret.uid+'&key='+qm)))
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

                        }


                    }).catch((error) => {

                })}


        }).catch(err => {
            //如果没有找到数据且没有同步方法，
            //或者有其他异常，则在catch中返回
        })



    }
    //*****
    _listnum(){

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
                        allbs:result.data.baoshi,
                        kymoney:result.data.money,
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


    changeSource(obj){

        this.setState({
            id:obj.id,
        })

    }



    _renderRow(rowData){
        return(

            <TouchableOpacity activeOpacity={1} style={{backgroundColor:'#ffffff',
            }} onPress={this.changeSource.bind(this,rowData)} >
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
                                color:'#DC143C',
                                marginLeft:WINWIDTH*(0.03),
                                fontSize:WINWIDTH*(0.03),
                                marginTop:WINHEIGHT*(0.01),
                            }}>{rowData.realname}</Text>

                            <Text style={styles.TX3}>{rowData.phone}</Text>
                        </View>
                        <View style={{backgroundColor:'#ffffff',width:WINWIDTH*(0.12),justifyContent:'center',alignItems:'center'}}>

                            <Image source={this.state.id==rowData.id?require('../../../img/xuanzhong.png'):require('../../../img/weixuanzhong.png')}
                                   style={{width:WINWIDTH*(0.07),height:WINWIDTH*(0.07)}}
                            />
                        </View>
                    </View>
                    <View style={{flex:1,backgroundColor:'#f5f5f5',marginTop:5}}>
                        <Text style={styles.TX3}>地址:{rowData.address}</Text>
                    </View>
                </View>


            </TouchableOpacity>
        )


    }












    render(){
        return(
            <View style={{flex:1,backgroundColor:'#ffffff'}}>
                <Tou title="选择支付方式" navigator={this.props.navigator}/>
                <ScrollView style={{backgroundColor:'#e6e6e6',marginBottom:WINHEIGHT*(0.06)}}>

                    {/*商品信息*/}
                    <View style={{flexDirection:'row',justifyContent:'space-between',padding:WINWIDTH*(0.03),backgroundColor:'#ffffff',marginTop:WINHEIGHT*(0.01)}}>
                        <Text style={{fontSize:WINWIDTH*(0.04),color:'#696969',}}>商品信息</Text>
                        <Text style={{fontSize:WINWIDTH*(0.04),color:'#DC143C',}}>{this.props.title}</Text>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between',padding:WINWIDTH*(0.03),backgroundColor:'#ffffff',}}>
                        <Text style={{fontSize:WINWIDTH*(0.04),color:'#696969',}}>实付金额</Text>
                        <Text style={{fontSize:WINWIDTH*(0.04),color:'#DC143C',}}>¥{this.props.price1*this.props.num}元</Text>
                    </View>

                    <View style={styles.text}>

                        <View style={{backgroundColor:'#ffffff',width:WINWIDTH*(0.4),height:WINHEIGHT*(0.06),justifyContent:'center',alignItems:'center'}}>
                            <Text style={{fontSize:WINWIDTH*(0.03),color:'#696969',}}>支付宝石(可用:{this.state.allbs})</Text>
                        </View>

                        <View style={{backgroundColor:'#ffffff',width:WINWIDTH*(0.6),height:WINHEIGHT*(0.06),justifyContent:'center',alignItems:'center'}}>
                            <Text style={{fontSize:WINWIDTH*(0.03),color:'#696969',}}>{this.state.baoshishu}</Text>
                        </View>
                    </View>

                    <View style={styles.text}>

                        <View style={{backgroundColor:'#ffffff',width:WINWIDTH*(0.4),height:WINHEIGHT*(0.06),justifyContent:'center',alignItems:'center'}}>
                            <Text style={{fontSize:WINWIDTH*(0.03),color:'#696969',}}>输入余额(可用:{this.state.kymoney})</Text>
                        </View>

                        <View style={{backgroundColor:'#ffffff',width:WINWIDTH*(0.6),height:WINHEIGHT*(0.06),}}>
                            <TextInput style={{height:WINHEIGHT*(0.06),fontSize:WINWIDTH*(0.03)}}
                                       placeholder={'请输入'}
                                       maxLength={11}
                                       underlineColorAndroid={'transparent'}
                                       onChangeText={(text) => this.setState({money:text})}
                                       onEndEditing={(event) => this.updateText(
                        )}
                            />
                        </View>
                    </View>

                    {/*收货地址信息*/}
                    <View style={{flexDirection:'row',justifyContent:'space-between',padding:WINWIDTH*(0.03),backgroundColor:'#ffffff',marginTop:WINHEIGHT*(0.01)}}>
                        <Text style={{fontSize:WINWIDTH*(0.04),color:'#696969',}}>收货地址列表</Text>
                    </View>
                    <ListView style={{marginTop:WINHEIGHT*(0.001),marginBottom:50}}
                              dataSource={this.state.dataSource}
                              renderRow={this._renderRow.bind(this)}
                              enableEmptySections = {true}

                    />




                </ScrollView>
                <View style={{justifyContent:'center', alignItems:'center',position:'absolute',
                    bottom:0,}}>

                    <View style={{
                        justifyContent:'center',
                        alignItems:'center',
                        backgroundColor:filecolor,
                        height:WINHEIGHT*(0.07),
                        width:WINWIDTH,

                    }}>
                        <TouchableOpacity onPress={this._payhh.bind(this)} style={{height:WINHEIGHT*(0.08), width:WINWIDTH,justifyContent:'center', alignItems:'center',}}
                        >
                            <Text style={{fontSize:16,color:'#ffffff'}}>提交订单</Text>
                        </TouchableOpacity>
                    </View>
                </View>



            </View>

        )
    }


    updateText(){
        if(this.state.money>this.props.price1*this.props.num||this.state.money<=0){
            Alert.alert(
                '提示',
                '输入金额有误，请重新输入',
                [
                    {text: '确定', },
                ])
        }else {
            var  yu = this.props.price1*this.props.num-this.state.money
            this.setState({
                baoshishu:yu/0.8,
            })


            // console.log(yu)
        }

    }

    _payhh(){

        if(this.state.id){
            storage.load({
                key: 'userinfo2',
                // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的同步方法
                autoSync: true,
                // syncInBackground(默认为true)意味着如果数据过期，
                // 在调用同步方法的同时先返回已经过期的数据。
                // 设置为false的话，则始终强制返回同步方法提供的最新数据(当然会需要更多等待时间)。
                syncInBackground: true
            }).then(ret => {

                var url = 'http://'+ipdy+'/index.php?s=/Home/APPGoods/mixturePay/uid/'+ret.uid+'/baoshi/'+this.state.baoshishu+'/left_money/'+this.state.money+'/address_id/'+this.state.id+'/detail/'+this.props.pid+'_'+this.props.num+'/price/'+this.props.price1*this.props.num+'/sign/'+(Cy('address_id='+this.state.id+'&baoshi='+this.state.baoshishu+'&detail='+this.props.pid+'_'+this.props.num+'&left_money='+this.state.money+'&price='+this.props.price1*this.props.num+'&uid='+ret.uid+'&key='+qm))

                HttpUtlis.get(url)
                    .then(result=>{
                        console.log(result)
                        if(result.code==10000){


                            Alert.alert(
                                '提示',
                                '支付成功',
                                [
                                    {text: '确定', onPress:()=>this.props.navigator.pop()},
                                ])


                        }
                        if(result.code==10005){


                            Alert.alert(
                                '提示',
                                '余额不足',
                                [
                                    {text: '确定', },
                                ])

                        }


                    })
                    .catch(error=>{
                        console.log(error)

                    })

            }).catch(err => {

            })
        }else {
            Alert.alert(
                '提示',
                '请选择地址',
                [
                    {text: '确定', },
                ])
        }


    }

    _lbs(){

        fetch('http://api.map.baidu.com/geocoder/v2/?callback=&output=json&address='+encodeURIComponent('合肥市')+'&ak=7D4G5gyrX3tlsI0yN5qfqj1ukTBn9mO5')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)

            })
            .catch((error) => {

            })



        fetch('http://api.map.baidu.com/geocoder/v2/?callback=&location=39.983424,116.322987&output=json&pois=1&ak=7D4G5gyrX3tlsI0yN5qfqj1ukTBn9mO5')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)

            })
            .catch((error) => {

            })
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
        flexDirection:'row',
        marginTop:WINHEIGHT*0.001,

    }


});
