
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

const  WINWIDTH = Dimensions.get('window').width;
const  WINHEIGHT = Dimensions.get('window').height;



export  default class djzshangcheng extends  Component{
    constructor(props){
        super(props);
        var ds =new ListView.DataSource({rowHasChanged:(r1,r2)=> r1!==r2});
        this.state={
            dataSource: ds,
            dataState:0,
        };
    }

    Mall_pressButton(){
        const {navigator} =this.props;
        if(navigator) {
            navigator.pop();
        }

    }

    _list(){
        storage.load({
            key: 'userinfo2',
            autoSync: true,
            syncInBackground: false
        }).then(ret => {
            fetch('http://'+ipdy+'/app_dev.php/getusertixianrecord/'+ret.uid+'/'+(Cy('uid='+ret.uid+'&str='+qm)))
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson)
                    if(responseJson.code==10000){
                        this.setState({dataSource: this.state.dataSource.cloneWithRows(responseJson.data),dataState:1})
                    }else if(responseJson.code==10001){
                        this.setState({dataState:0})
                    }
                })
                .catch((error) => {

                })
        }).catch(err => {
            Alert.alert(
                '提示',
                '未登录',
                [
                    {text: '确定'},
                ])
        })
    }




    componentDidMount() {
        this._list();


    }
    _renderRow(rowData) {
        return (
            <TouchableOpacity activeOpacity={1} style={{
                backgroundColor: '#ffffff',
            }}>
                <View style={{

                    width: WINWIDTH,
                    height: WINHEIGHT * (0.15),
                    borderBottomColor: '#e6e6e6',
                    borderBottomWidth: 1,
                    flexDirection: 'row',
                    padding: WINWIDTH * (0.03),

                }}>
                    <View>

                        <Text style={{
                            color: '#696969',
                            marginLeft: WINWIDTH * (0.03),
                            fontSize: WINWIDTH * (0.03),
                            marginTop: WINHEIGHT * (0.01),
                        }}>提现时间:{rowData.dateline}</Text>

                        <Text style={{
                            color: '#DC143C',
                            marginLeft: WINWIDTH * (0.03),
                            fontSize: WINWIDTH * (0.03),
                            marginTop: WINHEIGHT * (0.01),
                        }}>提现金额:{rowData.money}</Text>
                        <Text style={{
                            color: '#696969',
                            marginLeft: WINWIDTH * (0.03),
                            fontSize: WINWIDTH * (0.03),
                            marginTop: WINHEIGHT * (0.01),
                        }}>当前状态:{rowData.state}</Text>


                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render(){
        return(
            <View style={{flex:1,backgroundColor:'#e5e5e5',marginTop:66}}>

                {
                    this.state.dataState==1?
                        <ListView
                            dataSource={this.state.dataSource}
                            renderRow={this._renderRow.bind(this)}
                            enableEmptySections={true}
                        />
                        :
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                            <Text style={{fontSize:WINWIDTH*0.04,color:'#696969'}}>暂无数据</Text>
                        </View>
                }




            </View>
        )
    }


}



