
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

//

const  WINWIDTH = Dimensions.get('window').width;
const  WINHEIGHT = Dimensions.get('window').height;

import Cy from 'crypto-js/md5';
import ScrollableTabView from 'react-native-scrollable-tab-view';
// import StarRating from 'react-native-star-rating';

//头
import Tou from '../../../qiXinComponent/head/headBack';
//下级页面
import XiaoXiDetails from './xiaoXiDetails';

//<Tou title="我的消息" navigator={this.props.navigator}/>
export default class wodexiaoxi extends Component {
    constructor(props) {
        super(props);
        var ds =new ListView.DataSource({rowHasChanged:(r1,r2)=> r1!==r2});

        this.state ={
            dataSource: ds,
            uid:'',

            isRefreshing: true,
            enableEmptySections:true,

        };


    }

    _list(){
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


                fetch('http://'+ipdy+'/index.php?s=/Home/APPUser/getSystemMessage/pageNum/1/size/30')
                    .then((response) => response.json())
                    .then((responseJson) =>{
                        console.log(responseJson)

                        if(responseJson.code==10000)
                        {
                            this.setState({dataSource:this.state.dataSource.cloneWithRows(responseJson.data),isRefreshing: false
                            })


                        }else {

                            Alert.alert(
                                '提示',
                                '暂无消息',
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
    componentDidMount() {
        this._list()
    }

    getAgain(obj){
       this._list()

    }

    _nextPage(){

    }


    _renderRow(rowData){
        return(
            <TouchableOpacity activeOpacity={1} style={{backgroundColor:'#ffffff'
            }}  >
                <View style={{

                    width:WINWIDTH,
                    height:WINHEIGHT*(0.12),
                    borderBottomColor:'#e6e6e6',
                    borderBottomWidth:1,
                    flexDirection:'row',
                    padding:WINWIDTH*(0.03),

                }}>
                    <View>

                        <Text style={{
                            color:filecolor,
                            marginLeft:WINWIDTH*(0.03),
                            fontSize:WINWIDTH*(0.03),
                            marginTop:WINHEIGHT*(0.01),
                        }}>{rowData.dateline}</Text>
                        <Text style={styles.TX3}>{rowData.title}</Text>
                        {/*<Text style={styles.TX3}>{rowData.url}</Text>*/}


                    </View>


                </View>


            </TouchableOpacity>
        )


    }


    render() {


        return (
            <View style={{flex:1,backgroundColor:'#e6e6e6'}}>
                <Tou title="我的消息" navigator={this.props.navigator}/>

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
        width:WINWIDTH/1.2,

    }


});

