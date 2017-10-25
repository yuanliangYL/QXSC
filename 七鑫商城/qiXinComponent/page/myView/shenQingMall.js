
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
{/*<View style={{flex:1, backgroundColor: '#f3f3f3'}}>*/}
    {/*/!*Rest of App come ABOVE the action button component!*!/*/}
    {/*<ActionButton buttonColor="rgba(231,76,60,1)" buttonStyle={{width:10,height:10}}>*/}
        {/*<ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => console.log("notes tapped!")}>*/}
            {/*<Icon name="md-create" style={styles.actionButtonIcon} />*/}
        {/*</ActionButton.Item>*/}
        {/*<ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => {}}>*/}
            {/*<Icon name="md-notifications-off" style={styles.actionButtonIcon} />*/}
        {/*</ActionButton.Item>*/}
        {/*<ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => {}} >*/}
            {/*<Icon name="md-done-all" style={styles.actionButtonIcon} />*/}
        {/*</ActionButton.Item>*/}
    {/*</ActionButton>*/}
{/*</View>*/}

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

//
import Cy from 'crypto-js/md5';
const  WINWIDTH = Dimensions.get('window').width;
const  WINHEIGHT = Dimensions.get('window').height;


// import ActionButton from 'react-native-action-button';
// import Icon from 'react-native-vector-icons/Ionicons';


// import ImagePicker from 'react-native-image-picker';

//头
import Tou from '../../../qiXinComponent/head/headBack';





class wodeyaoqing extends  Component{
    constructor(props){
        super(props);
        this.state={
        };
    }

    _shenhe(){



        // 读取
        storage.load({
            key: 'userinfo2',

            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的同步方法
            autoSync: true,

            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用同步方法的同时先返回已经过期的数据。
            // 设置为false的话，则始终强制返回同步方法提供的最新数据(当然会需要更多等待时间)。
            syncInBackground: true
        }).then(ret => {


            console.log('http://'+ipdy+'/app_dev.php/applyforbusiness/'+ret.uid+'/'+(Cy('uid='+ret.uid+'&str='+qm)))

            //如果找到数据，则在then方法中返回
            fetch('http://'+ipdy+'/app_dev.php/applyforbusiness/'+ret.uid+'/'+(Cy('uid='+ret.uid+'&str='+qm)))
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson)
                    if(responseJson.code==10000){
                        Alert.alert(
                            '提示',
                            responseJson.msg,
                            [
                                {text:'确定',},
                            ]
                        )
                        this.props.navigator.pop({name:'my'})
                    }else if(responseJson.code==10002){
                        Alert.alert(
                            '提示',
                            responseJson.msg,
                            [
                                {text:'确定',},
                            ]
                        )
                    }else if(responseJson.code==10003){
                        Alert.alert(
                            '提示',
                            responseJson.msg,
                            [
                                {text:'确定',},
                            ]
                        )
                    }else if(responseJson.code==10004){
                        Alert.alert(
                            '提示',
                            responseJson.msg,
                            [
                                {text:'确定',},
                            ]
                        )
                    }else if(responseJson.code==10005){
                        Alert.alert(
                            '提示',
                            responseJson.msg,
                            [
                                {text:'确定',},
                            ]
                        )
                    }
                    else if(responseJson.code==10006){
                        Alert.alert(
                            '提示',
                            responseJson.msg,
                            [
                                {text:'确定',},
                            ]
                        )
                    }



                })
                .catch((error) => {
                    console.error(error);
                });


        }).catch(err => {
            //如果没有找到数据且没有同步方法，
            //或者有其他异常，则在catch中返回
            // console.warn(err.message);
                Alert.alert(
                    '提示',
                    '请登录后再操作',
                    [
                        {text:'确定',},
                    ]
                )

        })



    }

    render(){
        return(
            <View style={{flex:1}}>
                <Tou title="申请商家" navigator={this.props.navigator}/>
                <View style={{backgroundColor:'#d5d5d5',flex:1,alignItems:'center',justifyContent:'center'}}>
                    {/*申请审核资质*/}





                    <Image source={require('../../../img/shenhe.png')}
                           style={{width:WINWIDTH*(0.9),height:WINHEIGHT*(0.7),alignItems:'center',}}
                    >
                        <TouchableOpacity onPress={this._shenhe.bind(this)} style={{backgroundColor:filecolor,width:WINWIDTH*(0.3),height:WINHEIGHT*(0.05),justifyContent:'center',alignItems:'center',borderRadius:3,borderWidth:1,borderColor:filecolor,marginTop:WINHEIGHT*(0.25)}}>
                            <Text style={{fontSize:WINWIDTH*(0.04),color:'#ffffff'}}>点击申请</Text>
                        </TouchableOpacity>


                    </Image>





                </View>
            </View>



        )
    }


}


export  default wodeyaoqing;

