/**
 *
 *
 * 评价
 *
 * <View style = {{width:WINWIDTH*(0.3),height:WINHEIGHT*(0.07),alignItems:'center',justifyContent:'space-around',flexDirection:'row'}}>
 <Text style = {{fontSize:WINWIDTH*(0.04),color:'black',marginLeft:WINWIDTH*(0.05)}}>333人评价   </Text>
 <Image source={require('../../img/jiantou.png')} style = {{width:WINWIDTH*(0.05) ,height:WINWIDTH*(0.05),marginRight:0}}/>
 </View>

 *
 *
 * <TouchableOpacity  onPress={()=> {this.gotoProductComment()}}>
 <View style = {{width:WINWIDTH*(0.9),height:WINHEIGHT*(0.07),justifyContent:'center',borderBottomWidth:0.8,borderColor:'gray',flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
 <View style = {{width:WINWIDTH*(0.3),height:WINHEIGHT*(0.07),flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>

 <Image source={require('../../img/star.png')} style = {{width:WINWIDTH*(0.05) ,height:WINWIDTH*(0.05)}}/>
 <Image source={require('../../img/star.png')} style = {{width:WINWIDTH*(0.05) ,height:WINWIDTH*(0.05)}}/>
 <Image source={require('../../img/star.png')} style = {{width:WINWIDTH*(0.05) ,height:WINWIDTH*(0.05)}}/>
 <Image source={require('../../img/star.png')} style = {{width:WINWIDTH*(0.05) ,height:WINWIDTH*(0.05)}}/>
 <Image source={require('../../img/star.png')} style = {{width:WINWIDTH*(0.05) ,height:WINWIDTH*(0.05)}}/>

 </View>

 <View style = {{width:WINWIDTH*(0.3),height:WINHEIGHT*(0.07),alignItems:'center',justifyContent:'flex-start',flexDirection:'row'}}>
 <Text style = {{fontSize:WINWIDTH*(0.04),color:'black',marginLeft:WINWIDTH*(0.05)}}>******</Text>
 </View>

 </View>
 </TouchableOpacity>
 *
 *
 * **/
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    WebView,
    ListView,
    InteractionManager,
    Alert,
    Platform,



} from 'react-native';

import Swiper from 'react-native-swiper';

var WINWIDTH = Dimensions.get('window').width;
var WINHEIGHT = Dimensions.get('window').height;

import Cy from 'crypto-js/md5';
import Modal from 'react-native-modalbox';

 //头
import Tou from '../../../qiXinComponent/head/headBack';
 //支付duihuan
import PAY from '../pay&shop/Exchange';
//购买
import PAY1 from '../pay&shop/Exchange2';
//混合支付
import HUNHE from '../pay&shop/hunhezhifu';


import HttpUtlis from '../../tool/HttpUtils';

 class ProductDetail extends Component {

     constructor(props){
         super(props);
         this.state = {
             content:'',//内容
             hasslt:'',//已出售
             imgurls:'',
             price:'',//价格
             score:'',//积分
             total:'',//总库存
             shichangjia:'',//市场价
             ship:'',//运费
             shipcount:'',//达到运费的件数
             title:'',
             pid:'',

             num:'1',
             arrAll:[],
             detel:[],
             arr:[],
             arrAll2:[],

             yigouchestate:3,
         }


     }
     _jia(){
         if(this.state.num>=0){
             this.setState({
                 num:Number.parseInt(this.state.num)+1
             })
         }
     }
     _jian(){
         if(this.state.num>0){
             this.setState({
                 num:Number.parseInt(this.state.num)-1
             })
         }
     }



     _back(){
         //关闭购买modal
         if(this.refs.modalGoumai){
             this.refs.modalGoumai.close();
         }
         if(this.refs.modalGoumai1){
             this.refs.modalGoumai1.close();
         }
         //关闭购物车modal（已注释）
         if(this.refs.modalGouwu){
             this.refs.modalGouwu.close();
         }
     }
     _goPay(obj
     ){

         // 读取uid

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
                 //去购买
                 //关闭modal
                 this.refs.modalGoumai.close();
                 if(ret.uid){
                     this.props.navigator.push({
                         name:'pay',
                         component:PAY1,
                         params:{
                             price1:this.state.price,
                             ship1:this.state.ship,
                             num:this.state.num,
                             uid:ret.uid,
                             title:this.state.title,
                             pid:this.state.pid,

                         }


                     })

                 }
             }
             if(obj==2){
                 //去兑换
                 //关闭modal
                 this.refs.modalGoumai1.close();
                 if(ret.uid){
                     this.props.navigator.push({
                         name:'pay',
                         component:PAY,
                         params:{
                             price1:this.state.price,
                             ship1:this.state.ship,
                             num:this.state.num,
                             uid:ret.uid,
                             title:this.state.title,
                             pid:this.state.pid,

                         }


                     })

                 }
             }

             if(obj==3){
                 //去混合支付
                 //关闭modal
                 this.refs.modalGoumai2.close();
                 if(ret.uid){
                     this.props.navigator.push({
                         name:'hunhe',
                         component:HUNHE,
                         params:{
                             price1:this.state.price,
                             ship1:this.state.ship,
                             num:this.state.num,
                             uid:ret.uid,
                             title:this.state.title,
                             pid:this.state.pid,

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

             //如果没有找到数据且没有同步方法，
             //或者有其他异常，则在catch中返回
         })
     }

     _list2(){
         InteractionManager.runAfterInteractions(() => {

             fetch('http://' + ipdy + '/app_dev.php/product/detail/'+ this.props.pid)
                 .then((response) => response.json())
                 .then((responseJson) => {
                     console.log(responseJson)
                     this.setState({
                         imgurls:JSON.parse(responseJson.data.imgurls).pic,
                         price: responseJson.data.price,
                         score: responseJson.data.score,
                         hasslt: responseJson.data.hasslt,
                         total: responseJson.data.total,
                         shichangjia: responseJson.data.shichangjia,
                         ship: responseJson.data.ship,
                         shipcount: responseJson.data.shipcount,
                         content:JSON.parse(responseJson.data.content).pic,
                         title: responseJson.data.title,
                         pid:responseJson.data.id,
                         // content:String(responseJson.data.content),

                     })
                     var arrAll =[];
                     var str = JSON.parse(responseJson.data.content).pic;

                     for (var j = 0; j< str.length; j++) {
                         arrAll.push(str[j]);

                     }
                     console.log(arrAll)


                     this.setState({
                         detel:arrAll
                     })
                     // console.log('http://'+tu+'/Uploads/'+this.state.detel[1])


                 })
                 .catch((error) => {
                         Alert.alert(
                             '提示',
                             '数据请求失败',
                             [
                                 {text: '确定', },
                             ])
                     }
                 )
         });
     }
     //

     _list(){
         var url = 'http://'+ipdy+'/index.php?s=/Home/APPGoods/getGoodsDetail/pid/'+this.props.pid
console.log(url)
         HttpUtlis.get(url)
             .then(result=>{
                 console.log(result)
                 this.setState({
                     imgurls:JSON.parse(result.data[0].imgurls).pic,
                     price: result.data[0].present_price,
                     // score: responseJson.data.score,
                     hasslt: result.data[0].sale,
                     total: result.data[0].kucun,
                     shichangjia: result.data[0].cost_price,
                     // ship: responseJson.data.ship,
                     // shipcount: responseJson.data.shipcount,
                     content:JSON.parse(result.data[0].content).pic,
                     title: result.data[0].name,
                     pid:result.data[0].id,
                     // content:String(responseJson.data.content),

                 })
                 var arrAll =[];
                 var str = JSON.parse(result.data[0].content).pic;

                 for (var j = 0; j< str.length; j++) {
                     arrAll.push(str[j]);

                 }
                 console.log(arrAll)

                 var arrAll2 =[];
                 var str = JSON.parse(result.data[0].imgurls).pic;

                 for (var j = 0; j< str.length; j++) {
                     arrAll2.push(str[j]);

                 }
                 // console.log(arrAll)
                 // console.log(arrAll2)


                 this.setState({
                     detel:arrAll,
                     banna:arrAll2,

                 })
             })
             .catch(error=>{
                 console.log(error)

                 // this.setState({
                 //     dataState:0,
                 //     dataHome:0,
                 // })

             })
     }


     componentDidMount(){
         this._list()
         // this.shouchang()
         // this._save()



     }

     //duqu
     _save(){

         storage.load({
             key: 'userinfo2',
             // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的同步方法
             autoSync: true,
             // syncInBackground(默认为true)意味着如果数据过期，
             // 在调用同步方法的同时先返回已经过期的数据。
             // 设置为false的话，则始终强制返回同步方法提供的最新数据(当然会需要更多等待时间)。
             syncInBackground: true
         }).then(ret => {
                this.setState({
                    userid:ret.uid,
                })

             consolg.log(ret.uid)

         }).catch(err => {

         })

         storage.load({
             key: 'yigouche',
             // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的同步方法
             autoSync: true,
             // syncInBackground(默认为true)意味着如果数据过期，
             // 在调用同步方法的同时先返回已经过期的数据。
             // 设置为false的话，则始终强制返回同步方法提供的最新数据(当然会需要更多等待时间)。
             syncInBackground: true
         }).then(ret => {
                if(ret.ypid==this.props.pid&&ret.uid==this.state.userid){
                    this.setState({
                        yigouchestate:ret.ygcstate,
                    })
                }else {
                    this.setState({
                        yigouchestate:3,
                    })
                }


             console.log(this.state.yigouchestate)


         }).catch(err => {

         })

     }

     //易购车
     shouchang(){

         storage.load({
             key: 'userinfo2',
             // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的同步方法
             autoSync: true,
             // syncInBackground(默认为true)意味着如果数据过期，
             // 在调用同步方法的同时先返回已经过期的数据。
             // 设置为false的话，则始终强制返回同步方法提供的最新数据(当然会需要更多等待时间)。
             syncInBackground: true
         }).then(ret => {

                 var url = 'http://'+ipdy+'/index.php?s=/Home/APPGoods/addToYiGouCar/uid/'+ret.uid+'/pid/'+this.props.pid+'/slug/0/sign/'+(Cy('pid='+this.props.pid+'&slug=0&uid='+ret.uid+'&key='+qm))

             console.log(url)

                 HttpUtlis.get(url)
                     .then(result=>{
                         console.log(result)
                         if(result.code==10000){


                             Alert.alert(
                                 '提示',
                                 '加入成功',
                                 [
                                     {text: '确定', },
                                 ])

                         }



                     })
                     .catch(error=>{
                         console.log(error)

                     })


//*******************************************




             //*******************************************



         }).catch(err => {
             Alert.alert(
                 '提示',
                 '未登录，请先登录',
                 [
                     {text: '确定', },
                 ])
         })

     }
//轮播图
    _bannaPage(){
        var arr =[]
        for (var i=0;i<this.state.detel.length;i++){
            arr.push(

                <TouchableOpacity  key={i} style={{flex:1,width:WINWIDTH}}>
                <View >
                    <Image source ={{uri:'http://'+ipdy+'/Uploads/'+this.state.banna[i]}} style = {{width:WINWIDTH ,height:WINHEIGHT*(0.4)}}/>
                </View>
                </TouchableOpacity>

            )
        }
        return arr



    }

     //内容图
     _renderPage(){
         var arr =[]
         for (var i=0;i<this.state.detel.length;i++){
             arr.push(
                 <View key={i} style={{flex:1,width:WINWIDTH}}>
                     {/*<Image source={{uri: 'http://' + tu + '/Uploads/' + this.state.detel[i]}}*/}
                            {/*style={{width: WINWIDTH*0.98, height: WINHEIGHT * (0.13)}}/>*/}
                     <Image source={{uri:'http://'+ipdy+'/Uploads/'+this.state.detel[i]}} style={{width:WINWIDTH,resizeMode:'stretch',height:WINHEIGHT*0.6}}/>

                 </View>

             )
         }
         return arr



     }



    render() {
        return (

            <View style={styles.container}>
                <View>
                    <View style={{width:WINWIDTH,height:Platform.OS == 'ios' ? 20: WINHEIGHT*(0.02),backgroundColor:filecolor,}}></View>

                    <View style={{backgroundColor:filecolor,width:WINWIDTH,height:Platform.OS == 'ios' ? 44: WINHEIGHT*(0.06),flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>

                        <View style={{width:WINWIDTH*(0.2),height:Platform.OS == 'ios' ? 44: WINHEIGHT*(0.08),flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <TouchableOpacity onPress = {() => this.props.navigator.pop()} style={{height:WINHEIGHT*0.03,width:WINWIDTH*(0.15),justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'#ffffff',fontSize:WINWIDTH*0.035}}>返回</Text>
                            </TouchableOpacity>
                        </View>


                        <View style={{width:WINWIDTH*(0.6),height:Platform.OS == 'ios' ? 44 : WINHEIGHT*(0.06),justifyContent:'center',alignItems:'center',}}>
                            <Text style={{fontSize:WINWIDTH*(0.04),color:'#f6f6f6',backgroundColor:'transparent'}}>详情</Text>
                        </View>


                        <View style={{width:WINWIDTH*(0.2),height:Platform.OS == 'ios' ? 44: WINHEIGHT*(0.06),flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <TouchableOpacity onPress={this.shouchang.bind(this)} style={{height:WINHEIGHT*0.03,width:WINWIDTH*(0.15),justifyContent:'center',alignItems:'center',}}>

                                        <Text style={{color:'#ffffff',fontSize:WINWIDTH*0.028}}>加入易购车</Text>

                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <ScrollView>
                        <View style = {{flex:1}}>

                {/*//滑动产品图片部分*/}
                <Swiper style = {styles.wrapper} width = {WINWIDTH} height = {WINHEIGHT *(0.4)}  autoplay = {true} showsPagination= {true} autoplayout={2.5}>

                    {/*{*/}
                        {/*this._bannaPage()*/}
                    {/*}*/}

                    {
                        this.state.banna?
                            this._bannaPage()
                            :
                            <TouchableOpacity  style={{flex:1,width:WINWIDTH}}>
                            <View >
                                <Image source={require('../../../newQx/moren.png')} style = {{width:WINWIDTH ,height:WINHEIGHT*(0.4)}}/>
                            </View>
                             </TouchableOpacity>

                    }

                </Swiper>

                {/*产品介绍部分*/}
                <View style = {{width:WINWIDTH,height:WINHEIGHT*(0.2),alignItems:'center',backgroundColor:'#ffffff'}}>

                    <View style = {{width:WINWIDTH*(0.9),height:WINHEIGHT*(0.05),justifyContent:'center',backgroundColor:'#ffffff'}}>
                        <Text >{this.state.title}</Text>
                    </View>


                    <View style = {{width:WINWIDTH*(0.9),height:WINHEIGHT*(0.14),flexDirection:'row',borderBottomWidth:0.8,borderColor:'gray',backgroundColor:'#ffffff'}}>

                        <View style = {{width:WINWIDTH*(0.6),height:WINHEIGHT*(0.1)}}>
                            <View style = {{width:WINWIDTH*(0.6),height:WINHEIGHT*(0.08),}}>
                                <Text style ={{fontSize:WINWIDTH*(0.035),color:'red'}} >￥{this.state.price}元</Text>
                                <Text style ={{fontSize:WINWIDTH*(0.03),color:'gray'}}>市场价¥{this.state.shichangjia}</Text>

                            </View>

                            <View style = {{width:WINWIDTH*(0.6),height:WINHEIGHT*(0.02),}}>
                                <Text style ={{fontSize:WINWIDTH*(0.04),color:'gray'}} ></Text>
                                <Text style ={{fontSize:WINWIDTH*(0.035),color:'gray'}}>运费到付</Text>
                            </View>
                        </View>


                        <View style = {{width:WINWIDTH*(0.3),height:WINHEIGHT*(0.08)}}>
                            <View style = {{width:WINWIDTH*(0.3),height:WINHEIGHT*(0.04),}}>
                                <Text style ={{fontSize:WINWIDTH*(0.03),color:'gray'}}>已售出{this.state.hasslt}件</Text>
                            </View>

                            <View style = {{width:WINWIDTH*(0.3),height:WINHEIGHT*(0.04),}}>
                                <Text style ={{fontSize:WINWIDTH*(0.03),color:'gray'}} >总库存:{this.state.total}件</Text>
                            </View>
                        </View>

                    </View>

                    {/*<View style = {{width:WINWIDTH*(0.9),height:WINHEIGHT*(0.07),justifyContent:'center',borderBottomWidth:0.8,borderColor:'gray',backgroundColor:'#ffffff'}}>*/}
                        {/*<Text style = {{fontSize:WINWIDTH*(0.04),color:'black'}}>运费:{this.state.ship}元    {this.state.shipcount}件包邮</Text>*/}
                    {/*</View>*/}


                </View>
               {/*内容图*/}
               <View style={{flex:1,backgroundColor:'#ffffff'}}>
                   {/*<Image source={{url:'http://'+tu+'/Uploads/'+this.state.content[0]}} style={{width:WINWIDTH,resizeMode:'contain',height:WINHEIGHT*10}}/>*/}
                   {
                       this._renderPage()

                   }
                    </View>
                        </View>


            </ScrollView>


                <View style={{flexDirection:'row'}}>
                    <View style = {{width:WINWIDTH*0.33,height:WINHEIGHT*(0.06),flexDirection:'row',alignItems:'center'}}>
                        <TouchableOpacity onPress={()=>this.refs.modalGoumai1.open()}>
                            <View  style = {{width:WINWIDTH*0.33,height:WINHEIGHT*(0.06),alignItems:'center',justifyContent:'center',backgroundColor:filecolor}}>
                                <Text style = {{fontSize:WINWIDTH*(0.04),color:'white'}}>去兑换</Text>
                            </View>
                        </TouchableOpacity>



                    </View>
                    <View style = {{width:WINWIDTH*0.33,height:WINHEIGHT*(0.06),flexDirection:'row',alignItems:'center',borderLeftWidth:1,borderLeftColor:'#ffffff'}}>
                        <TouchableOpacity onPress={()=>this.refs.modalGoumai.open()}>
                            <View  style = {{width:WINWIDTH*0.33,height:WINHEIGHT*(0.06),alignItems:'center',justifyContent:'center',backgroundColor:filecolor}}>
                                <Text style = {{fontSize:WINWIDTH*(0.04),color:'white'}}>去购买</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style = {{width:WINWIDTH*0.34,height:WINHEIGHT*(0.06),flexDirection:'row',alignItems:'center',borderLeftWidth:1,borderLeftColor:'#ffffff'}}>
                        <TouchableOpacity onPress={()=>this.refs.modalGoumai2.open()}>
                            <View  style = {{width:WINWIDTH*0.34,height:WINHEIGHT*(0.06),alignItems:'center',justifyContent:'center',backgroundColor:filecolor}}>
                                <Text style = {{fontSize:WINWIDTH*(0.04),color:'white'}}>混合支付</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>






                {/*去兑换*/}
                <Modal animationType={'none'} style={{width:WINWIDTH,height:WINHEIGHT*(0.3),backgroundColor:'#ffffff'}} position={"bottom"} ref={"modalGoumai1"}>
                    <TouchableOpacity style={{height:WINHEIGHT*(0.07),justifyContent:'center',marginLeft:10,borderBottomWidth:1,borderBottomColor:'#e6e6e6'
        }}>
                        <Text style={{fontSize:WINWIDTH*(0.04),color:'#696969'}}>全部</Text>
                    </TouchableOpacity>


                    <View style={{flexDirection:'row',position:'absolute',bottom:WINHEIGHT*(0.1),}}>
                        <View style={{height:WINHEIGHT*(0.07),flex:1,justifyContent:'center',alignItems:'center',marginBottom:2
            }}
                        >

                            {/*加减符号*/}
                            <View style={{height:WINHEIGHT*(0.05),width:WINWIDTH*(0.4),flexDirection:'row',borderWidth:2,borderColor:'#e6e6e6',borderRadius:5}}>
                                <TouchableOpacity onPress={this._jian.bind(this)} style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                    <View style={{height:2,width:WINWIDTH*(0.04),backgroundColor:'#696969'}}></View>
                                </TouchableOpacity>

                                <View style={{flex:1, borderRightWidth:2, borderRightColor:'#e6e6e6',
                        borderLeftWidth:2,borderLeftColor:'#e6e6e6',justifyContent:'center',alignItems:'center'
                    }}>
                                    <Text style={{fontSize:WINWIDTH*(0.03),color:'#696969'}}>{this.state.num}</Text>
                                </View>

                                <TouchableOpacity onPress={this._jia.bind(this)} style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                    <View style={{height:WINWIDTH*(0.02),width:2,backgroundColor:'#696969'}}></View>
                                    <View style={{height:2,width:WINWIDTH*(0.05),backgroundColor:'#696969'}}></View>
                                    <View style={{height:WINWIDTH*(0.02),width:2,backgroundColor:'#696969'}}></View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/*库存数量*/}
                        <View style={{height:WINHEIGHT*(0.07),backgroundColor:'#ffffff',flex:1,justifyContent:'center',alignItems:'flex-start'}}>
                            <Text style={{fontSize:WINWIDTH*(0.03),color:'#696969',marginLeft:10}}>库存999件</Text>
                        </View>

                    </View>



                    {/*确定取消*/}
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
                                          onPress={this._goPay.bind(this,2)}
                        >
                            <Text style={{fontSize:WINWIDTH*(0.035),color:filecolor,fontWeight:'bold'}}>确定</Text>
                        </TouchableOpacity>

                    </View>
                </Modal>

                {/*混合支付*/}
                <Modal animationType={'none'} style={{width:WINWIDTH,height:WINHEIGHT*(0.3),backgroundColor:'#ffffff'}} position={"bottom"} ref={"modalGoumai2"}>
                    <TouchableOpacity style={{height:WINHEIGHT*(0.07),justifyContent:'center',marginLeft:10,borderBottomWidth:1,borderBottomColor:'#e6e6e6'
        }}>
                        <Text style={{fontSize:WINWIDTH*(0.04),color:'#696969'}}>全部</Text>
                    </TouchableOpacity>


                    <View style={{flexDirection:'row',position:'absolute',bottom:WINHEIGHT*(0.1),}}>
                        <View style={{height:WINHEIGHT*(0.07),flex:1,justifyContent:'center',alignItems:'center',marginBottom:2
            }}
                        >

                            {/*加减符号*/}
                            <View style={{height:WINHEIGHT*(0.05),width:WINWIDTH*(0.4),flexDirection:'row',borderWidth:2,borderColor:'#e6e6e6',borderRadius:5}}>
                                <TouchableOpacity onPress={this._jian.bind(this)} style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                    <View style={{height:2,width:WINWIDTH*(0.04),backgroundColor:'#696969'}}></View>
                                </TouchableOpacity>

                                <View style={{flex:1, borderRightWidth:2, borderRightColor:'#e6e6e6',
                        borderLeftWidth:2,borderLeftColor:'#e6e6e6',justifyContent:'center',alignItems:'center'
                    }}>
                                    <Text style={{fontSize:WINWIDTH*(0.03),color:'#696969'}}>{this.state.num}</Text>
                                </View>

                                <TouchableOpacity onPress={this._jia.bind(this)} style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                    <View style={{height:WINWIDTH*(0.02),width:2,backgroundColor:'#696969'}}></View>
                                    <View style={{height:2,width:WINWIDTH*(0.05),backgroundColor:'#696969'}}></View>
                                    <View style={{height:WINWIDTH*(0.02),width:2,backgroundColor:'#696969'}}></View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/*库存数量*/}
                        <View style={{height:WINHEIGHT*(0.07),backgroundColor:'#ffffff',flex:1,justifyContent:'center',alignItems:'flex-start'}}>
                            <Text style={{fontSize:WINWIDTH*(0.03),color:'#696969',marginLeft:10}}>库存999件</Text>
                        </View>

                    </View>



                    {/*确定取消*/}
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
                                          onPress={this._goPay.bind(this,3)}
                        >
                            <Text style={{fontSize:WINWIDTH*(0.035),color:filecolor,fontWeight:'bold'}}>确定</Text>
                        </TouchableOpacity>

                    </View>
                </Modal>











                {/*去购买*/}
                <Modal animationType={'none'} style={{width:WINWIDTH,height:WINHEIGHT*(0.3),backgroundColor:'#ffffff'}} position={"bottom"} ref={"modalGoumai"}>
                    <TouchableOpacity style={{height:WINHEIGHT*(0.07),justifyContent:'center',marginLeft:10,borderBottomWidth:1,borderBottomColor:'#e6e6e6'
        }}>
                        <Text style={{fontSize:WINWIDTH*(0.04),color:'#696969'}}>全部</Text>
                    </TouchableOpacity>


                    <View style={{flexDirection:'row',position:'absolute',bottom:WINHEIGHT*(0.1),}}>
                        <View style={{height:WINHEIGHT*(0.07),flex:1,justifyContent:'center',alignItems:'center',marginBottom:2
            }}
                        >

                            {/*加减符号*/}
                            <View style={{height:WINHEIGHT*(0.05),width:WINWIDTH*(0.4),flexDirection:'row',borderWidth:2,borderColor:'#e6e6e6',borderRadius:5}}>
                                <TouchableOpacity onPress={this._jian.bind(this)} style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                    <View style={{height:2,width:WINWIDTH*(0.04),backgroundColor:'#696969'}}></View>
                                </TouchableOpacity>

                                <View style={{flex:1, borderRightWidth:2, borderRightColor:'#e6e6e6',
                        borderLeftWidth:2,borderLeftColor:'#e6e6e6',justifyContent:'center',alignItems:'center'
                    }}>
                                    <Text style={{fontSize:WINWIDTH*(0.03),color:'#696969'}}>{this.state.num}</Text>
                                </View>

                                <TouchableOpacity onPress={this._jia.bind(this)} style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                    <View style={{height:WINWIDTH*(0.02),width:2,backgroundColor:'#696969'}}></View>
                                    <View style={{height:2,width:WINWIDTH*(0.05),backgroundColor:'#696969'}}></View>
                                    <View style={{height:WINWIDTH*(0.02),width:2,backgroundColor:'#696969'}}></View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/*库存数量*/}
                        <View style={{height:WINHEIGHT*(0.07),backgroundColor:'#ffffff',flex:1,justifyContent:'center',alignItems:'flex-start'}}>
                            <Text style={{fontSize:WINWIDTH*(0.03),color:'#696969',marginLeft:10}}>库存999件</Text>
                        </View>

                    </View>



                    {/*确定取消*/}
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
                                          onPress={this._goPay.bind(this,1)}
                        >
                            <Text style={{fontSize:WINWIDTH*(0.035),color:filecolor,fontWeight:'bold'}}>确定</Text>
                        </TouchableOpacity>

                    </View>
                </Modal>
                {/*加入购物车*/}
                {/*<Modal animationType={'none'} style={{width:WINWIDTH,height:WINHEIGHT*(0.7),backgroundColor:'#ffffff'}} position={"bottom"} ref={"modalGouwu"}>*/}
                    {/*<TouchableOpacity style={{height:WINHEIGHT*(0.07),justifyContent:'center',marginLeft:10,borderBottomWidth:1,borderBottomColor:'#e6e6e6'*/}
                    {/*}}>*/}
                        {/*<Text style={{fontSize:WINWIDTH*(0.04),color:'#696969'}}>全部</Text>*/}
                    {/*</TouchableOpacity>*/}


                    {/*<View style={{flexDirection:'row',position:'absolute',bottom:WINHEIGHT*(0.1),}}>*/}
                        {/*<View style={{height:WINHEIGHT*(0.07),flex:1,justifyContent:'center',alignItems:'center',marginBottom:2*/}
                        {/*}}*/}
                        {/*>*/}

                            {/*/!*加减符号*!/*/}
                            {/*<View style={{height:WINHEIGHT*(0.05),width:WINWIDTH*(0.4),flexDirection:'row',borderWidth:2,borderColor:'#e6e6e6',borderRadius:5}}>*/}
                                {/*<TouchableOpacity style={{flex:1,justifyContent:'center',alignItems:'center'}}>*/}
                                    {/*<View style={{height:2,width:WINWIDTH*(0.04),backgroundColor:'#696969'}}></View>*/}
                                {/*</TouchableOpacity>*/}

                                {/*<View style={{flex:1, borderRightWidth:2, borderRightColor:'#e6e6e6',*/}
                                    {/*borderLeftWidth:2,borderLeftColor:'#e6e6e6',justifyContent:'center',alignItems:'center'*/}
                                {/*}}>*/}
                                    {/*<Text style={{fontSize:WINWIDTH*(0.03),color:'#696969'}}>99</Text>*/}
                                {/*</View>*/}

                                {/*<TouchableOpacity style={{flex:1,justifyContent:'center',alignItems:'center'}}>*/}
                                    {/*<View style={{height:WINWIDTH*(0.02),width:2,backgroundColor:'#696969'}}></View>*/}
                                    {/*<View style={{height:2,width:WINWIDTH*(0.05),backgroundColor:'#696969'}}></View>*/}
                                    {/*<View style={{height:WINWIDTH*(0.02),width:2,backgroundColor:'#696969'}}></View>*/}
                                {/*</TouchableOpacity>*/}
                            {/*</View>*/}
                        {/*</View>*/}

                        {/*/!*库存数量*!/*/}
                        {/*<View style={{height:WINHEIGHT*(0.07),backgroundColor:'#ffffff',flex:1,justifyContent:'center',alignItems:'flex-start'}}>*/}
                            {/*<Text style={{fontSize:WINWIDTH*(0.03),color:'#696969',marginLeft:10}}>库存999件</Text>*/}
                        {/*</View>*/}

                    {/*</View>*/}



                    {/*/!*确定取消*!/*/}
                    {/*<View style={{flexDirection:'row',position:'absolute',bottom:WINHEIGHT*(0.01), borderTopWidth:1, borderTopColor:'#e6e6e6'*/}
                    {/*}}>*/}
                        {/*<TouchableOpacity style={{height:WINHEIGHT*(0.07),backgroundColor:'#ffffff',flex:1,justifyContent:'center',alignItems:'center',*/}
                            {/*borderRightWidth:1,borderRightColor:'#e6e6e6'*/}
                        {/*}}*/}
                                          {/*onPress={this._back.bind(this)}*/}
                        {/*>*/}
                            {/*<Text style={{fontSize:WINWIDTH*(0.035),color:'#696969',fontWeight:'bold'}}>取消</Text>*/}
                        {/*</TouchableOpacity>*/}
                        {/*<TouchableOpacity style={{height:WINHEIGHT*(0.07),backgroundColor:'#ffffff',flex:1,justifyContent:'center',alignItems:'center'}}>*/}
                            {/*<Text style={{fontSize:WINWIDTH*(0.035),color:filecolor,fontWeight:'bold'}}>确定</Text>*/}
                        {/*</TouchableOpacity>*/}

                    {/*</View>*/}
                {/*</Modal>*/}



            </View>


        )
    }


}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: 'lightgray',

    },
    webview_style:{
        backgroundColor:'#c6c6c6',
        flex: 1,
        height:WINHEIGHT*(1.5)
    }

});

export  default ProductDetail;