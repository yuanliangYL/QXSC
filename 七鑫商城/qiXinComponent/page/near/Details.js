
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 *
 *

 *
 *
 *
 *
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
    Alert,
    Platform,
    Linking,









} from 'react-native';

import Cy from 'crypto-js/md5';

const  WINWIDTH = Dimensions.get('window').width;
const  WINHEIGHT = Dimensions.get('window').height;

import Swiper from 'react-native-swiper';
import Modal from 'react-native-modalbox';


//头
import Tou from '../../../qiXinComponent/head/headBack';
//支付页面
import PayMerchants from '../../test/payMerchants';

class details extends  Component{
    constructor(props){
        super(props);
        var ds=new ListView.DataSource({ rowHasChanged:(r1,r2)=>r1!==r2 });
        // var pid =this.props.bid

        this.state = {
            dataSource:ds,
            text:'关注商家',

            pid:'',
            uid:'',

            red:'',
            money:'',

            imgurls:'',
            phone:'',

        }
        // alert(this.props.bid)

    }

    callThePhone(){
        // alert('是否拨打此号码？')
        var url = 'tel:'+this.state.phone;
        // console.log('url==',url);
        Linking.openURL(url).catch(e=>console.war(e));
    }

    //好评中评差评
    _pingjiabiao(obj){
        this.props.navigator.push({
            name:'evaluation',
            params:{
                pid:obj
            }

        })

    }


    _back(){
        if(this.refs.qr){
            this.refs.qr.close();
        }

    }
    _goPay(obj){
        if(this.state.money>0) {
            storage.load({
                key: 'userinfo2',
                autoSync: true,
                syncInBackground: true
            }).then(ret => {
                this.setState({
                    uid: ret.uid,
                })

                this.props.navigator.push({
                    name: 'qr',
                    params: {
                        bid: obj,
                        money: this.state.money,
                        red:this.state.red,
                    }

                })
                // alert(ret.uid)


            }).catch((error) => {
                Alert.alert(
                    '提示',
                    '您未登录,请先登录',
                    [

                        {text: '确定', },
                    ])

                }
            )

        }else {
            Alert.alert(
                '提示',
                '请输入正确的金额',
                [

                    {text: '确定', },
                ])
        }
    }


    _guanzhu() {
        storage.load({
            key:'userinfo2',
            autoSync:true,
            syncInBackground:true
        }).then(ret =>{



            fetch('http://'+ipdy+'/app_dev.php/business/favbusiness/'+this.props.bid+'/'+ret.uid+'/'+(Cy('fid='+this.props.bid+'&uid='+ret.uid+'&str='+qm)))
                .then((response) => response.json())
                .then((responseJsonHead) =>{
                    // console.log(responseJsonHead)

                    if(responseJsonHead.code==10000){
                        Alert.alert(
                            '提示',
                            responseJsonHead.msg,
                            [

                                {text: '确定', },
                            ])


                        // this.setState({text:'已关注'})
                    }else if(responseJsonHead.code==10009){
                        Alert.alert(
                            '提示',
                            responseJsonHead.msg,
                            [

                                {text: '确定', },
                            ])

                    }


                })
                .catch((error) => {
                // alert('数据异常,请稍候再试')
                        Alert.alert(
                            '提示',
                            '当前网络异常',
                            [

                                {text: '确定', },
                            ])
            }
                )


        })

            .catch((error) => {alert('您未登录,请先登录')}
            )

    }
//this.props.navigator.push({name:'login'})



//获取详情内容
    _details(){

        console.log('http://'+ipdy+'/app_dev.php/business/getbusinessdetail/' + this.props.bid)

        fetch('http://'+ipdy+'/app_dev.php/business/getbusinessdetail/' + this.props.bid)

            .then((response) => response.json())
            .then((responseJson) => {

                console.log(responseJson)
                this.setState({
                    imgurls: JSON.parse(responseJson.data.imgurls),
                });

                this.setState({
                    title: responseJson.data.title,
                                price: responseJson.data.price,
                                usage: responseJson.data.usages,
                                starttime: responseJson.data.starttime,
                                endtime: responseJson.data.endtime,
                                address: responseJson.data.address,
                                views: responseJson.data.viewss,
                                address: responseJson.data.address,
                                bili: responseJson.data.bili,
                                phone:responseJson.data.phone,
                                bid:responseJson.data.id,
                });



            })
            .catch((error) => {
                    // alert('数据异常')
                Alert.alert(
                    '提示',
                    '当前网络异常1111',
                    [

                        {text: '确定', },
                    ])
                }
            )
    }



    _imags(){
        var arr =[]
        for (var i=0;i<this.state.imgurls.length;i++){
            arr.push(
                <View key={i} style = {styles.slide}>

                    <Image source ={{uri:'http://'+tu+'/Uploads/'+this.state.imgurls[i]}} style = {{width:WINWIDTH ,height:WINHEIGHT*(0.6)}}/>
                    {
                        console.log('http://'+tu+'/Uploads/'+this.state.imgurls[i])
                    }
                </View>



            )
        }
        return arr


    }



    //立即支付-选择支付方式

    _payChoose(obj){

        storage.load({
            key: 'userinfo2',
            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的同步方法
            autoSync: true,
            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用同步方法的同时先返回已经过期的数据。
            // 设置为false的话，则始终强制返回同步方法提供的最新数据(当然会需要更多等待时间)。
            syncInBackground: true
        }).then(ret => {
            if(ret.uid){
                if(this.state.bid==undefined||this.state.phone==undefined){
                    Alert.alert(
                        '提示',
                        '请稍等',
                        [

                            {text: '确定', },
                        ])
                }else {
                    this.props.navigator.push({
                        name:'pays',
                        component:PayMerchants,
                        params:{

                            bid:obj,
                            phone:this.state.phone,
                        }
                    })
                }
            }
        }).catch(err => {
            Alert.alert(
                '提示',
                '您未登录，请先登录',
                [

                    {text: '确定', },
                ])
        })


    }

    componentDidMount(){
        InteractionManager.runAfterInteractions(() => {
            // ...耗时较长的同步的任务...
            this._details()

        });

    }



    render(){
        return(

            <View style={{flex:1}}>
                <Tou title={
                    this.props.title.title?this.props.title.title:this.props.title

                } navigator={this.props.navigator}/>
                <ScrollView style = {{flex:1,backgroundColor:'#ffffff'}}>

                    {/*轮播图片*/}

                    <Swiper  width = {WINWIDTH} height = {WINHEIGHT *(0.5)}  autoplay = {true} showsPagination= {true} autoplayout={2.5}>
                        {
                            this.state.imgurls?
                                this._imags()
                                :
                            <Image source={require('../../../imgs/timg-7.jpeg')}
                                   style = {{width:WINWIDTH ,height:WINHEIGHT*(0.6)}}/>


                            }
                    </Swiper>

                    {/*详情内容*/}
                    <View style={{width:WINWIDTH,height:WINHEIGHT*(0.12),marginTop:WINHEIGHT*(0.03),borderBottomWidth:1,borderBottomColor:'#e6e6e6'}}>
                        <Text style={{fontSize:WINWIDTH*(0.05),marginLeft:WINWIDTH*(0.05)}}>{this.state.title}</Text>
                        <View style={{flexDirection:'row',}}>
                            <Text style={{marginTop:WINHEIGHT*(0.01),color:'#e10521',fontWeight:'bold',fontSize:WINWIDTH*(0.04),marginLeft:WINWIDTH*(0.05)}}>¥{this.state.price}/每人</Text>
                            <Text style={{marginTop:WINHEIGHT*(0.01),marginLeft:WINWIDTH*(0.3),fontSize:WINWIDTH*(0.03),color:'#696969'}}>浏览:{this.state.views}次</Text>
                        </View>
                    </View>


                    <View style={{width:WINWIDTH,height:WINHEIGHT*(0.12),borderBottomWidth:1,borderBottomColor:'#e6e6e6'}}>
                        <Text style={{marginLeft:WINWIDTH*(0.05),color:'#e10521',fontWeight:'bold',marginTop:WINHEIGHT*(0.01),fontSize:WINWIDTH*(0.04)}}>赠送消费金额100%积分</Text>
                        <Text style={{marginLeft:WINWIDTH*(0.05),color:'#696969',marginTop:WINHEIGHT*(0.01),fontSize:WINWIDTH*(0.03)}}>持{filetitle}乐福客户端消费任意金额,赠送积分。详情进店咨询!</Text>
                    </View>

                    <View style={{padding:WINHEIGHT*(0.01),borderBottomWidth:1,borderBottomColor:'#e6e6e6',width:WINWIDTH,height:WINHEIGHT*(0.06),flexDirection:'row',}}>
                        <Text style={{marginLeft:WINWIDTH*(0.05),fontSize:WINWIDTH*(0.035),}}>电话        </Text>
                        <Text style={{marginLeft:WINWIDTH*(0.2),fontSize:WINWIDTH*(0.035),}}>{this.state.phone}</Text>

                        {/*<TouchableOpacity   onPress = {this.callThePhone.bind(this)}>*/}
                        <TouchableOpacity   onPress = {this.callThePhone.bind(this)}>
                            <Image source={require('../../../img/phone.png')} style = {{marginLeft:WINWIDTH*(0.1) ,height:WINWIDTH*(0.055),width:WINWIDTH*(0.055)}}/>
                        </TouchableOpacity>


                    </View>
                    {/*评级*/}
                    <TouchableOpacity onPress={this._pingjiabiao.bind(this,this.props.bid)}>
                        {/*<View style = {{width:WINWIDTH,height:WINHEIGHT*(0.07),justifyContent:'center',flexDirection:'row',alignItems:'center',justifyContent:'flex-start',borderBottomWidth:WINHEIGHT*(0.01),borderBottomColor:'#e6e6e6',}}>*/}
                            {/*/!*<View style = {{width:WINWIDTH*(0.3),height:WINHEIGHT*(0.07),flexDirection:'row',alignItems:'center',justifyContent:'flex-start',marginLeft:WINWIDTH*(0.05),}}>*!/*/}
                                {/*/!*<Image source={require('../../img/star.png')} style = {{width:WINWIDTH*(0.05) ,height:WINWIDTH*(0.05)}}/>*!/*/}
                                {/*/!*<Image source={require('../../img/star.png')} style = {{width:WINWIDTH*(0.05) ,height:WINWIDTH*(0.05)}}/>*!/*/}
                                {/*/!*<Image source={require('../../img/star.png')} style = {{width:WINWIDTH*(0.05) ,height:WINWIDTH*(0.05)}}/>*!/*/}
                                {/*/!*<Image source={require('../../img/star.png')} style = {{width:WINWIDTH*(0.05) ,height:WINWIDTH*(0.05)}}/>*!/*/}
                                {/*/!*<Image source={require('../../img/star.png')} style = {{width:WINWIDTH*(0.05) ,height:WINWIDTH*(0.05)}}/>*!/*/}

                            {/*/!*</View>*!/*/}

                            {/*/!*<View style = {{width:WINWIDTH*(0.3),height:WINHEIGHT*(0.07),alignItems:'center',justifyContent:'flex-start',flexDirection:'row'}}>*!/*/}
                                {/*/!*<Text style = {{fontSize:WINWIDTH*(0.04),color:'black',marginLeft:WINWIDTH*(0.05)}}>0.0</Text>*!/*/}
                            {/*/!*</View>*!/*/}

                            {/*/!*<View style = {{width:WINWIDTH*(0.3),height:WINHEIGHT*(0.07),alignItems:'center',justifyContent:'space-around',flexDirection:'row'}}>*!/*/}
                                {/*/!*<Text style = {{fontSize:WINWIDTH*(0.035),color:'black',marginLeft:WINWIDTH*(0.05)}}>0人评价   </Text>*!/*/}
                                {/*/!*<Image source={require('../../img/jiantou.png')} style = {{width:WINWIDTH*(0.05) ,height:WINWIDTH*(0.05),marginRight:0}}/>*!/*/}
                            {/*/!*</View>*!/*/}

                        {/*</View>*/}
                    </TouchableOpacity>

                    <View style={{marginTop:WINHEIGHT*(0.01),borderBottomWidth:1,borderBottomColor:'#e6e6e6',width:WINWIDTH,height:WINHEIGHT*(0.05)}}>
                        <Text style={{marginLeft:WINWIDTH*(0.05),fontSize:WINWIDTH*(0.035),}}>商家介绍</Text>
                    </View>

                    <View style={{padding:WINHEIGHT*(0.01),borderBottomWidth:WINHEIGHT*(0.01),borderBottomColor:'#e6e6e6',width:WINWIDTH,height:WINHEIGHT*(0.12)}}>
                        <Text style={{marginLeft:WINWIDTH*(0.05),fontSize:WINWIDTH*(0.035),color:'#ff7f50'}}>{this.state.usage}</Text>


                    </View>

                    <View style={{padding:WINHEIGHT*(0.01),borderBottomWidth:1,borderBottomColor:'#e6e6e6',width:WINWIDTH,height:WINHEIGHT*(0.06)}}>
                        <Text style={{marginLeft:WINWIDTH*(0.05),fontSize:WINWIDTH*(0.035),color:'#696969'}}>门店信息</Text>
                    </View>
                    <View style={{padding:WINHEIGHT*(0.01),borderBottomWidth:1,borderBottomColor:'#e6e6e6',width:WINWIDTH,height:WINHEIGHT*(0.06),flexDirection:'row'}}>
                        <Text style={{marginLeft:WINWIDTH*(0.05),fontSize:WINWIDTH*(0.035),}}>营业时间</Text>
                        <Text style={{marginLeft:WINWIDTH*(0.2),fontSize:WINWIDTH*(0.035),backgroundColor:'#ffffff',color:'#696969'}}>{this.state.starttime}-{this.state.endtime}</Text>
                    </View>



                    <View style={{borderBottomWidth:1,borderBottomColor:'#e6e6e6',width:WINWIDTH,height:WINHEIGHT*(0.1),flexDirection:'row',padding:WINHEIGHT*(0.01),backgroundColor:'#ffffff'}}>
                        <Text style={{marginLeft:WINWIDTH*(0.05),fontSize:WINWIDTH*(0.035),}}>地址        </Text>
                        <Text style={{marginLeft:WINWIDTH*(0.2),fontSize:WINWIDTH*(0.035),width:WINWIDTH*0.55,height:WINHEIGHT*0.08,}}>{this.state.address}</Text>
                    </View>

                </ScrollView>

                {/*关注*/}
                    <View style={{flexDirection:'row',width:WINWIDTH,height:WINHEIGHT*0.08,backgroundColor:filecolor}}>
                        <TouchableOpacity onPress={this._guanzhu.bind(this)} style={{flex:1,justifyContent:'center',alignItems:'center',height:WINHEIGHT*(0.08)}}>
                            {/*关注商铺*/}
                            <Text style={{fontSize:WINWIDTH*(0.035),color:'#ffffff'}}>关注商铺</Text>
                        </TouchableOpacity>


                        <TouchableOpacity onPress={this._payChoose.bind(this,this.state.bid)} style={{flex:1,justifyContent:'center',alignItems:'center',height:WINHEIGHT*(0.08)}}>
                            <Text style={{marginBottom:WINHEIGHT*(0.001),fontSize:WINWIDTH*(0.035),color:'#ffffff'}}>立即支付</Text>
                        </TouchableOpacity>
                    </View>

                {/*onPress={()=>this.refs.qr.open()} */}






                <Modal animationType={'none'} style={{width:WINWIDTH*(0.8),height:WINHEIGHT*(0.3),backgroundColor:'#ffffff',borderRadius:5,alignItems:'center',marginTop:1}}  ref={"qr"}>

                    <View style={{alignItems:'center',justifyContent:'center',backgroundColor:'#ffffff',height:WINHEIGHT*(0.2)}}>
                        {/*<TextInput*/}
                            {/*style={styles.input1}*/}
                            {/*onChangeText={(text) => this.setState({red:text})}*/}
                            {/*placeholder={'        {filetitle}商城赠送财富币'}*/}
                            {/*keyboardType={'numeric'}*/}
                            {/*underlineColorAndroid={'transparent'}*/}
                            {/*maxLength={9}*/}
                        {/*/>*/}

                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => this.setState({money:text})}
                            placeholder={'        请输入消费金额'}
                            keyboardType={'numeric'}
                            underlineColorAndroid={'transparent'}
                            maxLength={9}
                        />
                    </View>




                    <View style={{flexDirection:'row',position:'absolute',bottom:WINHEIGHT*(0.01), borderTopWidth:1, borderTopColor:'#e6e6e6'
                    }}>
                        <TouchableOpacity style={{height:WINHEIGHT*(0.07),backgroundColor:'#ffffff',flex:1,justifyContent:'center',alignItems:'center',
                            borderRightWidth:1,borderRightColor:'#e6e6e6'
                        }}
                                          onPress={this._back.bind(this)}
                        >
                            <Text style={{fontSize:WINWIDTH*(0.035),color:'#696969',fontWeight:'bold'}}>取消</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{height:WINHEIGHT*(0.07),backgroundColor:'#ffffff',flex:1,justifyContent:'center',alignItems:'center'}}
                                          onPress={this._goPay.bind(this,this.props.bid)}
                        >
                            <Text style={{fontSize:WINWIDTH*(0.035),color:'#DC143C',fontWeight:'bold'}}>确定</Text>
                        </TouchableOpacity>

                    </View>
                </Modal>
            </View>
        )
    }








}

const styles =StyleSheet.create({
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:64,

    },

    webview_style:{
        backgroundColor:'#c6c6c6',
        flex: 1,
        height:WINHEIGHT*(1.5)
    },
    input: {
        height: 40,
        borderColor: '#DC143C',
        borderWidth: 1,
        borderRadius: 5,
        width:WINWIDTH*(0.7),
        marginTop:10,

    },
    input1: {
        height: 40,
        borderColor: '#DC143C',
        borderWidth: 1,
        borderRadius: 5,
        width:WINWIDTH*(0.7),
        marginTop:10,

    }



});


export  default details;
