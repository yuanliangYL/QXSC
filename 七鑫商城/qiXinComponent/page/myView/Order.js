
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
    InteractionManager,
    Alert,
    RefreshControl,




} from 'react-native';

//头
import  Tou from '../../../qiXinComponent/head/headBack';


const  WINWIDTH = Dimensions.get('window').width;
const  WINHEIGHT = Dimensions.get('window').height;

import Cy from 'crypto-js/md5';
import ScrollableTabView from 'react-native-scrollable-tab-view';
// import StarRating from 'react-native-star-rating';

export default class dingdan extends Component {
    render() {

        return (

            <View style={{flex:1}}>
                <Tou title="订单" navigator={this.props.navigator}/>

                <ScrollableTabView style={{backgroundColor:'#ffffff'}}
                                   tabBarUnderlineStyle={{backgroundColor:filecolor,height:1}}
                                   tabBarTextStyle={{color:filecolor,marginTop:WINHEIGHT*(0.02),fontSize:WINWIDTH*(0.03)}}


                >
                    {/*<Offline tabLabel="线下订单"  />*/}
                    <Stors   tabLabel="商城订单"  />

                    {/*navigator={this.props.navigator} */}
                </ScrollableTabView>
            </View>

        )
    }
}


//商城订单--------------------------------------------------
class Stors extends Component{
    constructor(props) {
        super(props);
        var ds =new ListView.DataSource({rowHasChanged:(r1,r2)=> r1!==r2});

        this.state ={
            dataSource: ds,
            uid:'',

            isRefreshing: true,
            enableEmptySections:true,

        };
        InteractionManager.runAfterInteractions(() => {
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

                    //index.php?s=/Home/APPUser/getMyShopOrders/uid/37/pageNum/1/size/10/sign/12312313




                    fetch('http://'+ipdy+'/index.php?s=/Home/APPUser/getMyShopOrders/uid/'+ret.uid+'/pageNum/1/size/30/sign/'+(Cy('pageNum=1&size=30&uid='+ret.uid+'&key='+qm)))
                        .then((response) => response.json())
                        .then((responseJson) =>{
                            console.log(responseJson)

                            if(responseJson.code==10000)
                            {
                                this.setState({dataSource:this.state.dataSource.cloneWithRows(responseJson.data),isRefreshing:false})



                            }else {

                                Alert.alert(
                                    '提示',
                                    '暂无数据',
                                    [

                                        {text: '确定', },
                                    ])
                            }


                        }).catch((error) => {

                    })

                }
            }).catch(err => {
                //如果没有找到数据且没有同步方法，
                //或者有其他异常，则在catch中返回
            })
        });


    }
    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
        });
    }

    getAgain(){
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

                //index.php?s=/Home/APPUser/getMyShopOrders/uid/37/pageNum/1/size/10/sign/12312313

                console.log('http://'+ipdy+'/index.php?s=/Home/APPUser/getMyShopOrders/uid/'+ret.uid+'/pageNum/1/size/30/sign/'+(Cy('pageNum=1&size=30&uid='+ret.uid+'&key='+qm)))


                fetch('http://'+ipdy+'/index.php?s=/Home/APPUser/getMyShopOrders/uid/'+ret.uid+'/pageNum/1/size/30/sign/'+(Cy('pageNum=1&size=30&uid='+ret.uid+'&key='+qm)))
                    .then((response) => response.json())
                    .then((responseJson) =>{
                        console.log(responseJson)

                        if(responseJson.code==10000)
                        {
                            this.setState({dataSource:this.state.dataSource.cloneWithRows(responseJson.data)})
                            setTimeout(() => {
                                this.setState({isRefreshing: false});
                            }, 10);


                        }else {

                            Alert.alert(
                                '提示',
                                '暂无数据',
                                [

                                    {text: '确定', },
                                ])
                        }


                    }).catch((error) => {

                })

            }
        }).catch(err => {
            //如果没有找到数据且没有同步方法，
            //或者有其他异常，则在catch中返回
        })
    }

    _renderRow(rowData){
        return(
            <TouchableOpacity activeOpacity={1} style={{backgroundColor:'#ffffff',
            }}  >
                <View style={{

                    width:WINWIDTH,
                    height:WINHEIGHT*(0.25),
                    borderBottomColor:'#e6e6e6',
                    borderBottomWidth:1,
                    flexDirection:'row',
                    padding:WINWIDTH*(0.03),
                }}>
                    <View style={{width:WINWIDTH*(0.5)}}>
                        <Text style={{
                            color:filecolor,
                            marginLeft:WINWIDTH*(0.03),
                            fontSize:WINWIDTH*(0.03),
                            marginTop:WINHEIGHT*(0.01),
                        }}></Text>
                        <Text style={styles.TX3}>购买者:{rowData.username}</Text>

                        <Text style={styles.TX3}>订单时间:{rowData.dateline_info}</Text>
                        <Text style={styles.TX3}>联系方式:{rowData.phone}</Text>
                        <Text style={styles.TX3}>支付类型:{rowData.info}</Text>
                        <Text style={styles.TX3}>商品数量:{rowData.goods_info[0].count}</Text>


                    </View>
                    <View style={{width:WINWIDTH*0.5}}>
                        <Text style={styles.TX3}></Text>
                        <Text style={styles.TX3}>订单状态:{rowData.state_info}</Text>
                        <Text style={styles.TX3}>订单金额:{rowData.money}</Text>
                        <Text style={styles.TX3}>商品名称:{rowData.goods_info[0].name}</Text>



                    </View>


                </View>
            </TouchableOpacity>
        )


    }


    render() {


        return (
            <View style={{flex:1,backgroundColor:'#e6e6e6'}}>

                    <ListView style={{}}
                              dataSource={this.state.dataSource}
                              renderRow={this._renderRow.bind(this)}
                              enableEmptySections = {true}
                              refreshControl={
              <RefreshControl
                  refreshing={this.state.isRefreshing}
                  onRefresh={this.getAgain.bind(this)}
                  tintColor="#ff0000"
                  title="玩命加载中..."
              />
          }

                    />





            </View>
        );
    }
}
const styles = StyleSheet.create({

    TX:{
        marginLeft:WINWIDTH*(0.03),
        fontSize:WINWIDTH*(0.035),
    },
    TX1:{
        color:'#696969',
        marginLeft:WINWIDTH*(0.03),
        fontSize:WINWIDTH*(0.03),
        marginTop:WINHEIGHT*(0.01),
    },
    TX2:{
        color:'#696969',
        marginLeft:WINWIDTH*(0.05),
        fontSize:WINWIDTH*(0.03),
        marginTop:WINHEIGHT*(0.01),
    },
    TX3:{
        color:'#696969',
        marginLeft:WINWIDTH*(0.03),
        fontSize:WINWIDTH*(0.03),
        marginTop:WINHEIGHT*(0.01),
        width:WINWIDTH*0.4,
    }
});


//商户（线下）订单
class Offline extends Component{
    constructor(props) {
        super(props);
        var ds =new ListView.DataSource({rowHasChanged:(r1,r2)=> r1!==r2});

        this.state ={
            dataSource: ds,
            uid:'',
        };
        InteractionManager.runAfterInteractions(() => {
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


                    // console.log('http://'+ipdy+'/app_dev.php/getbusinessorderofmember/'+this.state.uid+'/'+(Cy('uid='+this.state.uid+'&str='+qm)))

                    fetch('http://'+ipdy+'/app_dev.php/getbusinessorderofmember/'+this.state.uid+'/1/20/'+(Cy('uid='+this.state.uid+'&str='+qm)))
                        .then((response) => response.json())
                        .then((responseJson) =>{
                            console.log(responseJson)

                            if(responseJson.code==10000)
                            {
                                this.setState({dataSource:this.state.dataSource.cloneWithRows(responseJson.data)})


                            }else {

                                Alert.alert(
                                    '提示',
                                    '暂无数据',
                                    [

                                        {text: '确定', },
                                    ])
                            }


                        }).catch((error) => {

                    })

                }
            }).catch(err => {
                //如果没有找到数据且没有同步方法，
                //或者有其他异常，则在catch中返回
            })
        });


    }
    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
        });
    }

    _nextPage(id){

    }

_dateTime(timestamp){
        var date = new Date(timestamp*1000);
        return date.toLocaleDateString();
}

    _renderRow(rowData){
        return(
            <TouchableOpacity activeOpacity={1} style={{backgroundColor:'#ffffff',
            }}  >
                <View style={{

                    width:WINWIDTH,
                    height:WINHEIGHT*(0.15),
                    borderBottomColor:'#e6e6e6',
                    borderBottomWidth:1,
                    flexDirection:'row',
                    padding:WINWIDTH*(0.03),
                }}>
                    <View style={{width:WINWIDTH*(0.5)}}>
                        <Text style={{
                            color:filecolor,
                            marginLeft:WINWIDTH*(0.03),
                            fontSize:WINWIDTH*(0.03),
                            marginTop:WINHEIGHT*(0.01),
                        }}>{rowData.dateline}</Text>
                        <Text style={styles.TX3}>商户名称:{rowData.title}</Text>
                        <Text style={styles.TX3}>联系方式:{rowData.phonenum}</Text>
                        <Text style={styles.TX3}>支付方式:{rowData.paytype}</Text>

                    </View>
                    <View>
                        <Text style={styles.TX3}></Text>
                        <Text style={styles.TX3}>订单状态:{rowData.paystate}</Text>
                        <Text style={styles.TX3}>订单金额:{rowData.allcount}</Text>
                    </View>


                </View>
            </TouchableOpacity>
        )


    }


    render() {


        return (
            <View style={{flex:1,backgroundColor:'#e6e6e6'}}>
                <ScrollView>
                    <ListView style={{}}
                              dataSource={this.state.dataSource}
                              renderRow={this._renderRow.bind(this)}
                              enableEmptySections = {true}
                    />
                </ScrollView>




            </View>
        );
    }
}
