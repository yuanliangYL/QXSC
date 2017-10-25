/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
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

const WINWIDTH = Dimensions.get('window').width;
const WINHEIGHT = Dimensions.get('window').height;

//头
import Tou from '../../../head/headBack';


export  default class tuiguang extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            dataSource: ds,
        };
    }


    _list() {
        storage.load({
            key: 'userinfo2',
            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的同步方法
            autoSync: true,
            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用同步方法的同时先返回已经过期的数据。
            // 设置为false的话，则始终强制返回同步方法提供的最新数据(当然会需要更多等待时间)。
            syncInBackground: false
        }).then(ret => {
            if (ret) {

                console.log('http://' + ipdy + '/app_dev.php/gettuiguangshouyi/' + ret.uid + '/' + (Cy('uid=' + ret.uid + '&str='+qm)))

                fetch('http://' + ipdy + '/app_dev.php/gettuiguangshouyi/' + ret.uid + '/' + (Cy('uid=' + ret.uid + '&str='+qm)))

                    .then((response) => response.json())
                    .then((responseJson) => {
                        console.log(responseJson)

                        if (responseJson.code == 10000) {
                            this.setState({
                                dataSource: this.state.dataSource.cloneWithRows(responseJson.data.liebiao),
                                zongrenshu:responseJson.data.all_yaoqingrenshu,
                                shouyi:responseJson.data.allshouyi,


                            })


                        } else {
                            Alert.alert(
                                '提示',
                                '暂无消息',
                                [
                                    {text: '确定',},
                                ])
                        }


                    })
                    .catch((error) => {
                        Alert.alert(
                            '提示',
                            '网络异常',
                            [
                                {text: '确定',},
                            ])

                    })

            }
            // console.log(ret.phone)
        }).catch(err => {
            //如果没有找到数据且没有同步方法，
            //或者有其他异常，则在catch中返回
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
                    height: WINHEIGHT * (0.20),
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
                        }}>消费店铺:{rowData.title}</Text>
                        <Text style={{
                            color: '#DC143C',
                            marginLeft: WINWIDTH * (0.03),
                            fontSize: WINWIDTH * (0.03),
                            marginTop: WINHEIGHT * (0.01),
                        }}>消费金额:{rowData.allcount}</Text>
                        <Text style={{
                            color: '#696969',
                            marginLeft: WINWIDTH * (0.03),
                            fontSize: WINWIDTH * (0.03),
                            marginTop: WINHEIGHT * (0.01),
                        }}>会员手机:{rowData.user}</Text>
                        <Text style={{
                            color: '#696969',
                            marginLeft: WINWIDTH * (0.03),
                            fontSize: WINWIDTH * (0.03),
                            marginTop: WINHEIGHT * (0.01),
                        }}>平台赠送红包:{rowData.hbcount}</Text>
                        <Text style={{
                            color: '#DC143C',
                            marginLeft: WINWIDTH * (0.03),
                            fontSize: WINWIDTH * (0.03),
                            marginTop: WINHEIGHT * (0.01),
                        }}>我的收益:{rowData.shouyi}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }


    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
                <Tou title="推广收益" navigator={this.props.navigator}/>

                <View style={styles.text}>

                    <View style={{
                        backgroundColor: '#ffffff',
                        width: WINWIDTH * (0.5),
                        height: WINHEIGHT * (0.065),
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{fontSize: WINWIDTH * (0.04), color: '#696969'}}>红包:</Text>
                    </View>

                    <View style={{
                        backgroundColor: '#ffffff',
                        width: WINWIDTH * (0.5),
                        height: WINHEIGHT * (0.065),
                        justifyContent: 'center'
                    }}>
                        <Text style={{color:'#DC143C'}}>{this.state.shouyi}个</Text>
                    </View>
                </View>

                <View style={styles.text}>

                    <View style={{
                        backgroundColor: '#ffffff',
                        width: WINWIDTH * (0.5),
                        height: WINHEIGHT * (0.065),
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{fontSize: WINWIDTH * (0.04), color: '#696969'}}>分享人数:</Text>
                    </View>

                    <View style={{
                        backgroundColor: '#ffffff',
                        width: WINWIDTH * (0.5),
                        height: WINHEIGHT * (0.065),
                        justifyContent: 'center'
                    }}>
                        <Text style={{color:'#DC143C'}}>{this.state.zongrenshu}人</Text>
                    </View>
                </View>


                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow.bind(this)}
                    enableEmptySections={true}
                />
            </View>


        )
    }


}


const styles = StyleSheet.create({
    text: {
        flexDirection: 'row',
        marginTop: WINHEIGHT * (0.001),
        marginBottom: 2

    }


})

