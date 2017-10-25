
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
    Alert,



} from 'react-native';

import Cy from 'crypto-js/md5';
import Alipay from 'rn-alipay';

const  WINWIDTH = Dimensions.get('window').width;
const  WINHEIGHT = Dimensions.get('window').height;

//头
import Tou from '../../head/headBack';
//
import HttpUtlis from '../../tool/HttpUtils';


export  default class xiaoXiDetails extends  Component{
    constructor(props){
        super(props);
        this.state={

        };
    }


    componentDidMount() {
        var url = 'http://'+ipdy+'/app_dev.php/product/getdetailedmessage/'+this.props.obj.id;

        HttpUtlis.get(url)
            .then(result=>{
                console.log(result)
                if(result.code==10000){
                    this.setState({
                        textd:result.data[0].desc,
                    })
                }
                console.log(this.state.textd)

            })
            .catch(error=>{
                console.log(error)
            })
    }


    render(){
        return(
            <View style={{backgroundColor:'#e6e6e6',flex:1}}>
                <Tou title={this.props.obj.title} navigator={this.props.navigator}/>
                <ScrollView>
                    <View style={{width:WINWIDTH,marginTop:WINHEIGHT*0.05,alignItems:'center'}}>
                        <Text style={{width:WINWIDTH*0.8,fontSize:WINWIDTH*0.035,color:'#696969'}}>{this.state.textd}</Text>
                    </View>

                </ScrollView>




            </View>
        )
    }


}


