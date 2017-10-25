
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



export  default class loginRead extends  Component{
    constructor(props){
        super(props);
        this.state={};
    }

    Mall_pressButton(){
        const {navigator} =this.props;
        if(navigator) {
            navigator.pop();
        }

    }
    render(){
        return(
            <View style={{flex:1,backgroundColor:'#ffffff',marginTop:64}}>
<View style={{marginTop:WINHEIGHT*(0.2),flexDirection:'row',height:WINHEIGHT*(0.1),alignItems:'center',justifyContent:'center'}}>
    <View>
        <Image source ={require('../../../img/dui.png')} style={{width:WINWIDTH*(0.1),height:WINWIDTH*(0.1)}}/>
    </View>
    <Text style={{fontSize:WINWIDTH*(0.06),marginLeft:10}}>恭喜,登录成功!</Text>
</View>
                <View style={{height:WINHEIGHT*(0.2),alignItems:'center',justifyContent:'center'}}>
                    {/*<Text style={{fontSize:WINWIDTH*(0.04)}}>您登录的会员名为:</Text>*/}
                    <Text style={{fontSize:WINWIDTH*(0.04),marginTop:WINHEIGHT*(0.01)}}>您可以开始享受便捷的购物乐趣</Text>

                </View>

                <View style={{justifyContent:'center', alignItems:'center',}}>
                    <View style={{
                        marginTop:WINHEIGHT*(0.06),
                        justifyContent:'center',
                        alignItems:'center',
                        backgroundColor:'#ffffff',
                        height:WINHEIGHT*(0.06),
                        width:WINWIDTH*(0.8),
                        borderRadius:5,
                    }}>
                        <TouchableOpacity  style={{height:WINHEIGHT*(0.06), width:WINWIDTH*(0.8),justifyContent:'center', alignItems:'center',}}
                                           >
                            <Text style={{fontSize:WINWIDTH*(0.04),color:'#ff4500'}}>请点击左上角返回</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>


        )
    }


}
//onPress={()=>this.props.navigator.replace({name:'my'})}


