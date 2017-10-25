
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

//头
import Tou from '../../../head/headBack';


const  WINWIDTH = Dimensions.get('window').width;
const  WINHEIGHT = Dimensions.get('window').height;
import Cy from 'crypto-js/md5';



export  default class xiuGai extends  Component {
    constructor(props) {
        super(props);
        this.state = {
            uid:'',
            pwd:'',
            pwd2:'',

        };

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

            }
        }).catch(err => {
            //如果没有找到数据且没有同步方法，
            //或者有其他异常，则在catch中返回
        })







    }

    _save(){
        if(this.state.pwd === this.state.pwd2){
            fetch('http://'+ipdy+'/app_dev.php/modifypassword/'+this.state.uid+'/'+(Cy('uid='+this.state.uid+'&str='+qm)), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },

                body: 'newpsd='+this.state.pwd


            }).then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson)
                    if(responseJson.code==10000){
                        Alert.alert(
                            '提示',
                            '修改成功,请使用新密码重新登录',
                            [

                                {text: '确定', },
                            ])
                        storage.remove({
                            key:'userinfo2'
                        })
                        _loginState(0)
                        const {navigator} = this.props;
                        const routes = navigator.getCurrentRoutes();
                        navigator.popToRoute(routes[routes.length - 3]);
                    }

                })
                .catch((error) => {
                    console.error(error);
                });
        }else {
            Alert.alert(
                '提示',
                '两次密码输入不一致',
                [

                    {text: '确定', },
                ])
        }



    }



    render() {
        return (
           <View style={{backgroundColor:'#e6e6e6',flex:1}}>
               <Tou title="修改密码" navigator={this.props.navigator}/>
               <View style={{flexDirection:'row',marginTop:10}}>
                   <View style={{backgroundColor:'#ffffff',flex:3,height:WINHEIGHT*(0.07),justifyContent:'center',alignItems:'center'}}>
                       <Text style={{fontSize:WINWIDTH*(0.04)}}>新密码</Text>
                   </View>
                   <View style={{backgroundColor:'#ffffff',flex:7,height:WINHEIGHT*(0.07),justifyContent:'center',alignItems:'center'}}>
                       <TextInput
                           placeholder={'请输入新密码'}
                           underlineColorAndroid={'transparent'}
                           keyboardType={'numeric'}
                           maxLength={21}
                           onChangeText={(text) => this.setState({pwd:text})}
                           style={{height:WINHEIGHT*(0.06),fontSize:WINWIDTH*(0.035),width:WINWIDTH*(0.65)}}
                       />
                   </View>
               </View>

               <View style={{flexDirection:'row',marginTop:10}}>
                   <View style={{backgroundColor:'#ffffff',flex:3,height:WINHEIGHT*(0.07),justifyContent:'center',alignItems:'center'}}>
                       <Text style={{fontSize:WINWIDTH*(0.04)}}>确认新密码</Text>
                   </View>
                   <View style={{backgroundColor:'#ffffff',flex:7,height:WINHEIGHT*(0.07),justifyContent:'center',alignItems:'center'}}>
                       <TextInput
                           placeholder={'请确认新密码'}
                           maxLength={21}
                           underlineColorAndroid={'transparent'}
                           keyboardType={'numeric'}
                           onChangeText={(text) => this.setState({pwd2:text})}
                           style={{height:WINHEIGHT*(0.06),fontSize:WINWIDTH*(0.035),width:WINWIDTH*(0.65)}}
                       />
                   </View>
               </View>




               <TouchableOpacity onPress={this._save.bind(this)}>
                   <View style={{justifyContent:'center',flexDirection:'row'}}>
                       <View style={{
                           marginTop:WINHEIGHT*(0.08),
                           justifyContent:'center',
                           alignItems:'center',
                           backgroundColor:filecolor,
                           height:WINHEIGHT*(0.06),
                           width:WINWIDTH*(0.8),
                           borderRadius:5,
                       }}>
                           <Text style={{fontSize:16,color:'#ffffff'}}>确定</Text>

                       </View>
                   </View>
               </TouchableOpacity>


           </View>


        )
    }
}