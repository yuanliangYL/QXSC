
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
    Dimensions


} from 'react-native';



const  WINWIDTH = Dimensions.get('window').width;
const  WINHEIGHT = Dimensions.get('window').height;



import Cy from 'crypto-js/md5';

//积分查询
export  default class lockRed extends  Component {
    constructor(props) {
        super(props);
        this.state = {
            uid:'',
            keyong:'',
            weishiyong:'',
            leiji:'',
            hongbaoquan:'',
            xiaofei:'',

        };



    }

    ///sh/getusefulhbandprestorehb/{bid}/{sign}
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

            console.log('http://'+ipdy+'/app_dev.php/getusefulhbandprestorehb/'+ret.uid+'/'+(Cy('uid='+ret.uid+'&str='+qm)))

                fetch('http://'+ipdy+'/app_dev.php/getusefulhbandprestorehb/'+ret.uid+'/'+(Cy('uid='+ret.uid+'&str='+qm)))
                    .then((response) => response.json())
                    .then((responseJson) =>{

                        console.log(responseJson)
                        if(responseJson.code==10000){
                            this.setState({
                                hongbaoquan:responseJson.data[0].hongbaoquan,
                                xiaofei:responseJson.data[0].xiaofei,
                                fenxiang:responseJson.data[0].fenxiang,
                                leiji:responseJson.data[0].leijifanhuan,
                                keyong:responseJson.data[0].useful_hb,




                            })
                        }




                    }).catch((error) => {

                })

        }).catch(err => {
            //如果没有找到数据且没有同步方法，
            //或者有其他异常，则在catch中返回
        })




    }




    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#e5e5e5'}}>
                <View style={{marginTop:66}}>

                    {/*<View style={styles.text} >*/}
                        {/*<View style={{backgroundColor:'#ffffff',width:WINWIDTH*(0.5),height:WINHEIGHT*(0.065), flex:1,justifyContent:'center',alignItems:'center'}}>*/}
                            {/*<Text style={{fontSize:WINWIDTH*(0.04),color:'#696969'}}>分红权:</Text>*/}
                        {/*</View>*/}

                        {/*<View style={{backgroundColor:'#ffffff',width:WINWIDTH*(0.5),height:WINHEIGHT*(0.065),justifyContent:'center'}}>*/}
                            {/*<Text>{this.state.hongbaoquan}个</Text>*/}
                        {/*</View>*/}
                    {/*</View>*/}


                    <View style={styles.text}>

                        <View style={{backgroundColor:'#ffffff',width:WINWIDTH*(0.5),height:WINHEIGHT*(0.065), flex:1,justifyContent:'center',alignItems:'center'}}>
                            <Text style={{fontSize:WINWIDTH*(0.04),color:'#696969'}}>积分总额:</Text>
                        </View>

                        <View style={{backgroundColor:'#ffffff',width:WINWIDTH*(0.5),height:WINHEIGHT*(0.065),justifyContent:'center'}}>
                            <Text>{this.state.xiaofei}</Text>
                        </View>
                    </View>


                    {/*<View style={styles.text} >*/}

                        {/*<View style={{backgroundColor:'#ffffff',width:WINWIDTH*(0.5),height:WINHEIGHT*(0.065), flex:1,justifyContent:'center',alignItems:'center'}}>*/}
                            {/*<Text style={{fontSize:WINWIDTH*(0.04),color:'#696969'}}>分享激励金:</Text>*/}
                        {/*</View>*/}

                        {/*<View style={{backgroundColor:'#ffffff',width:WINWIDTH*(0.5),height:WINHEIGHT*(0.065),justifyContent:'center'}}>*/}
                            {/*<Text>{this.state.fenxiang}</Text>*/}
                        {/*</View>*/}
                    {/*</View>*/}

                    {/*<View style={styles.text} >*/}

                        {/*<View style={{backgroundColor:'#ffffff',width:WINWIDTH*(0.5),height:WINHEIGHT*(0.065), flex:1,justifyContent:'center',alignItems:'center'}}>*/}
                            {/*<Text style={{fontSize:WINWIDTH*(0.04),color:'#696969'}}>累计激励金:</Text>*/}
                        {/*</View>*/}

                        {/*<View style={{backgroundColor:'#ffffff',width:WINWIDTH*(0.5),height:WINHEIGHT*(0.065),justifyContent:'center'}}>*/}
                            {/*<Text>{this.state.leiji}</Text>*/}
                        {/*</View>*/}
                    {/*</View>*/}

                    <View style={styles.text} >

                        <View style={{backgroundColor:'#ffffff',width:WINWIDTH*(0.5),height:WINHEIGHT*(0.065), flex:1,justifyContent:'center',alignItems:'center'}}>
                            <Text style={{fontSize:WINWIDTH*(0.04),color:'#696969'}}>积分余额:</Text>
                        </View>

                        <View style={{backgroundColor:'#ffffff',width:WINWIDTH*(0.5),height:WINHEIGHT*(0.065),justifyContent:'center'}}>
                            <Text>{this.state.keyong}</Text>
                        </View>
                    </View>


                </View>
            </View>

        )
    }

}

const styles = StyleSheet.create({
    text:{
        flexDirection:'row',
        marginTop:WINHEIGHT*(0.001),


    }



})
