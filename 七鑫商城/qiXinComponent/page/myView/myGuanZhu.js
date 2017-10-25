
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



} from 'react-native';

//

const  WINWIDTH = Dimensions.get('window').width;
const  WINHEIGHT = Dimensions.get('window').height;


import ScrollableTabView from 'react-native-scrollable-tab-view';
import Cy from 'crypto-js/md5';

//头
import Tou from '../../head/headBack';


import NextList from '../mall/mallDetail';
import HttpUtlis from '../../tool/HttpUtils';
class wodeguanzhu extends Component {
    render() {

        return (
            <View style={{flex:1}}>
                <Tou title="易购车" navigator={this.props.navigator}/>
                <ScrollableTabView style={{backgroundColor:'#ffffff',}}
                                   tabBarUnderlineStyle={{backgroundColor:filecolor,height:1}}
                                   tabBarTextStyle={{color:filecolor,marginTop:WINHEIGHT*(0.02),fontSize:WINWIDTH*(0.03)}}


                >
                    <Stors tabLabel="商品关注"  navigator={this.props.navigator}/>

                </ScrollableTabView>
            </View>

        );
    }
}





export default  wodeguanzhu;

//----------商店关注-------------商店关注------------------------商店关注
class Stors extends Component{
    constructor(props) {
        super(props);
        var ds =new ListView.DataSource({rowHasChanged:(r1,r2)=> r1!==r2});

        this.state ={
            dataSource: ds,
            uid:'',
        };
    }


    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            // ...耗时较长的同步的任务...
           this._StorsGz();
        });
    }


    _delete(obj){

        storage.load({
            key: 'userinfo2',
            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的同步方法
            autoSync: true,
            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用同步方法的同时先返回已经过期的数据。
            // 设置为false的话，则始终强制返回同步方法提供的最新数据(当然会需要更多等待时间)。
            syncInBackground: false
        }).then(ret => {


                var url = 'http://'+ipdy+'/index.php?s=/Home/APPGoods/addToYiGouCar/uid/'+ret.uid+'/pid/'+obj+'/slug/1/sign/'+(Cy('pid='+obj+'&slug=1&uid='+ret.uid+'&key='+qm))
console.log(url)
                HttpUtlis.get(url)
                    .then(result=>{
                        console.log(result)
                        if(result.code==10000){

                            Alert.alert(
                                '提示',
                                '删除成功',
                                [
                                    {text: '确定', },
                                ])
                           this._StorsGz()

                        }


                    })
                    .catch(error=>{
                        console.log(error)
                        alert('fffff')
                    })


        }).catch(err => {
            //如果没有找到数据且没有同步方法，
            //或者有其他异常，则在catch中返回
            alert('ddddd')
        })




    }

    //获取商店关注列表
    _StorsGz(){

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

                //index.php?s=/Home/APPUser/getMyYiGouCar/uid/37/pageNum/1/size/5/sign/12312313
                // console.log('http://'+ipdy+'/app_dev.php/getfavoriteshopofmember/'+ret.uid+'/'+(Cy('uid='+ret.uid+'&str='+qm)))

                fetch('http://'+ipdy+'/index.php?s=/Home/APPUser/getMyYiGouCar/uid/'+ret.uid+'/pageNum/1/size/30/sign/'+(Cy('pageNum=1&size=30&uid='+ret.uid+'&key='+qm)))
                    .then((response) => response.json())
                    .then((responseJson) =>{
                        console.log(responseJson)

                        if(responseJson.code==10000)
                        {
                            this.setState({dataSource:this.state.dataSource.cloneWithRows(responseJson.data)})


                        }else {
                            Alert.alert(
                                '提示',
                                '暂无商家',
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

    _nextPage(obj){
        const {navigator} =this.props;
        if(navigator) {
            navigator.push({
                name:'next',
                component:NextList,
                params:{
                    pid:obj,
                }
            })
        }
    }


    _renderRow(rowData){
        return(
            <TouchableOpacity activeOpacity={1} style={{backgroundColor:'#ffffff',marginTop:WINHEIGHT*0.001
            }}  onPress={()=> {this._nextPage(rowData.pid)}} >
                <View style={{width:WINWIDTH,height:WINHEIGHT*0.2,justifyContent:'center',alignItems:'center'}}>

                    <View style={{width:WINWIDTH*0.98,height:WINHEIGHT*0.18,flexDirection:'row'}}>
                        {/*勾选框*/}
                        <View style={{width:WINWIDTH*0.08,height:WINHEIGHT*0.18,justifyContent:'center',alignItems:'center'}}>
                            {/*<Image source={this.state.id==rowData.id?require('../../../img/xuanzhong.png'):require('../../../img/weixuanzhong.png')}*/}
                                   {/*style={{width:WINWIDTH*(0.05),height:WINWIDTH*(0.05)}}*/}
                            {/*/>*/}
                        </View>
                        {/*缩略图*/}
                        <View style={{width:WINWIDTH*0.3,height:WINHEIGHT*0.18,justifyContent:'center',alignItems:'center'}}>
                            <Image source={{uri: 'http://' + ipdy + '/Uploads/' +rowData.imgurl}}
                                   style={{width:WINWIDTH*0.28,height:WINHEIGHT*0.15,}}/>
                        </View>

                        <View style={{width:WINWIDTH*0.6,height:WINHEIGHT*0.18,justifyContent:'center'}}>
                            <View style={{width:WINWIDTH*0.6,height:WINHEIGHT*0.08,justifyContent:'center',}}>
                                <Text style={styles.TX3}>{rowData.name}</Text>
                            </View>

                            <View style={{width:WINWIDTH*0.6,height:WINHEIGHT*0.1,flexDirection:'row',}}>
                                <View style={{width:WINWIDTH*0.35,height:WINHEIGHT*0.1,justifyContent:'center',}}>
                                    {/*<Text style={styles.TX3}>原价:{rowData.cost_price}</Text>*/}
                                    <Text style={styles.TX3}>现价:{rowData.present_price}</Text>
                                </View>

                                <View style={{width:WINWIDTH*0.25,height:WINHEIGHT*0.1,justifyContent:'center',alignItems:'center'}}>
                                    <TouchableOpacity onPress={this._delete.bind(this,rowData.pid)} style={{width:WINWIDTH*0.15,height:WINHEIGHT*0.04,justifyContent:'center',alignItems:'center',borderWidth:1,borderColor:filecolor,borderRadius:5}}>
                                        <Text style={{fontSize:WINWIDTH*(0.03),color:filecolor}}>删除</Text>
                                    </TouchableOpacity>


                                </View>
                            </View>

                        </View>


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
                    />





            </View>
        );
    }
}

const styles = StyleSheet.create({

    TX:{
        marginLeft:WINWIDTH*(0.03),
        fontSize:WINWIDTH*(0.045),
    },
    TX1:{
        color:'#696969',
        marginLeft:WINWIDTH*(0.03),
        fontSize:WINWIDTH*(0.03),
        marginTop:WINHEIGHT*(0.03),

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

    }


});








//商品关注
class Goods extends Component{
    constructor(props) {
        super(props);
        var ds =new ListView.DataSource({rowHasChanged:(r1,r2)=> r1!==r2});

        this.state ={
            dataSource: ds,
            uid:'',
        };
        InteractionManager.runAfterInteractions(() => {
            storage.load({
                key: 'userinfo',
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


                    fetch('http://'+ipdy+'/app_dev.php/getfavoriteproductofmember/'+this.state.uid+'/'+(Cy('uid='+this.state.uid+'&str='+qm)))
                        .then((response) => response.json())
                        .then((responseJson) =>{
                            // console.log(responseJson)

                            if(responseJson.code==10000)
                            {
                                this.setState({dataSource:this.state.dataSource.cloneWithRows(responseJson.data)})


                            }else {

                                Alert.alert(
                                    '提示',
                                    '暂无商家',
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


    _renderRow(rowData){
        return(
            <TouchableOpacity activeOpacity={1} style={{backgroundColor:'#ffffff'
            }}  >
                <View style={{

                    width:WINWIDTH,
                    height:WINHEIGHT*(0.18),
                    borderBottomColor:'#e6e6e6',
                    borderBottomWidth:1,
                    flexDirection:'row',
                    padding:WINWIDTH*(0.03),

                }}>
                    <Image source ={{uri:'http://'+tu+'/Uploads/'+rowData.imgurl}} style={{
                        width:WINWIDTH*(0.3),
                        height:WINWIDTH*(0.25),
                    }}/>
                    <View>
                        <Text style={styles.TX}>{rowData.title}</Text>
                        <Text style={{
                            color:filecolor,
                            marginLeft:WINWIDTH*(0.03),
                            fontSize:WINWIDTH*(0.03),
                            marginTop:WINHEIGHT*(0.03),
                        }}>¥{rowData.price}</Text>
                        <Text style={styles.TX3}>库存:{rowData.total}</Text>
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
