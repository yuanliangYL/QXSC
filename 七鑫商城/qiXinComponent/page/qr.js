
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
    TextInput,
    Dimensions,
    Platform,
    TouchableOpacity,
    TouchableHighlight,
    Linking,


} from 'react-native';

//

const  WINWIDTH = Dimensions.get('window').width;
const  WINHEIGHT = Dimensions.get('window').height;

import QRCode from 'react-native-qrcode';

//头
import Tou from '../../qiXinComponent/head/headBack';


export  default class qr extends  Component{
    constructor(props){
        super(props);
        this.state={
            text:'',
            uid:'',
        };

        console.log(this.props.qrdata)


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


        console.log(this.props.qrdata)
    }


    render(){
        return(
            <View style={{backgroundColor:'#696969', flex:1}}>
                <Tou title="出示给商家扫码" navigator={this.props.navigator}/>


                <View style={styles.container}>
                    <QRCode
                        value={this.props.qrdata}
                        size={200}
                        bgColor='purple'
                        fgColor='white'/>

                    {/*<View style={{width:WINWIDTH/2,height:WINHEIGHT*(0.05),backgroundColor:'#ffffff',marginTop:WINHEIGHT*0.1,justifyContent:'center',alignItems:'flex-start',borderRadius:5,borderWidth:1,borderColor:'#696969'}}>*/}
                    {/*<Text style={{color:'#696969',fontSize:WINWIDTH*0.035,marginLeft:WINWIDTH*0.03}}>赠送积分:{this.props.red}个</Text>*/}
                    {/*</View>*/}

                    <View style={{width:WINWIDTH/2,height:WINHEIGHT*(0.05),backgroundColor:'#ffffff',marginTop:WINHEIGHT*0.02,justifyContent:'center',alignItems:'center',borderRadius:5,borderWidth:1,borderColor:'#696969',}}>
                        <Text style={{color:'#696969',fontSize:WINWIDTH*0.035,marginLeft:WINWIDTH*0.03}}>出示给商家扫码</Text>
                    </View>
                </View>



            </View>


        )
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },


});

