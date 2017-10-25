
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
    InteractionManager



} from 'react-native';

//

const  WINWIDTH = Dimensions.get('window').width;
const  WINHEIGHT = Dimensions.get('window').height;

import Cy from 'crypto-js/md5';
import ScrollableTabView from 'react-native-scrollable-tab-view';
// import StarRating from 'react-native-star-rating';

export default class evaluation extends Component {
    render() {

        return (
            <ScrollableTabView style={{marginTop:64,backgroundColor:'#f5f5f5'}}
                               tabBarUnderlineStyle={{backgroundColor:'#DC143C',height:1}}
                               tabBarTextStyle={{color:'#DC143C',marginTop:WINHEIGHT*(0.02),fontSize:WINWIDTH*(0.03)}}


            >
                <HaoPing   tabLabel="好评" navigator={this.props.navigator}  pid = {this.props.pid}/>
                <ZhongPing  tabLabel="|           中评           |" navigator={this.props.navigator}  pid = {this.props.pid}/>
                <ChaPing  tabLabel="差评"  navigator={this.props.navigator}   pid = {this.props.pid}/>
                {/*navigator={this.props.navigator} */}
            </ScrollableTabView>
        );
    }
}




//好评--------------------------------------------------
class HaoPing extends Component{
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


                    fetch('http://'+ipdy+'/app_dev.php/getgoodcommentsofbusiness/'+this.state.uid+'/'+this.props.pid+'/'+(Cy('uid='+this.state.uid+'&str='+qm)))
                        .then((response) => response.json())
                        .then((responseJson) =>{
                            console.log(responseJson)

                            if(responseJson.code==10000)
                            {
                                this.setState({dataSource:this.state.dataSource.cloneWithRows(responseJson.data)})


                            }else {
                                alert('暂无评价')
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

        // alert(this.props.pid)
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
                            color:'#DC143C',
                            marginLeft:WINWIDTH*(0.03),
                            fontSize:WINWIDTH*(0.03),
                            marginTop:WINHEIGHT*(0.01),
                        }}>{rowData.dateline}</Text>
                        <Text style={styles.TX3}>评价内容:{rowData.desc}</Text>


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


//中评
class ZhongPing extends Component{
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


                    fetch('http://'+ipdy+'/app_dev.php/getgeneralcommentsofbusiness/'+this.state.uid+'/'+this.props.pid+'/'+(Cy('uid='+this.state.uid+'&str='+qm)))
                        .then((response) => response.json())
                        .then((responseJson) =>{
                            console.log(responseJson)

                            if(responseJson.code==10000)
                            {
                                this.setState({dataSource:this.state.dataSource.cloneWithRows(responseJson.data)})


                            }else {
                                alert('暂无评价')
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
                    height:WINHEIGHT*(0.12),
                    borderBottomColor:'#e6e6e6',
                    borderBottomWidth:1,
                    flexDirection:'row',
                    padding:WINWIDTH*(0.03),

                }}>
                    <View>

                        <Text style={{
                            color:'#DC143C',
                            marginLeft:WINWIDTH*(0.03),
                            fontSize:WINWIDTH*(0.03),
                            marginTop:WINHEIGHT*(0.01),
                        }}>{rowData.dateline}</Text>
                        <Text style={styles.TX3}>评价内容:{rowData.desc}</Text>


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


//差评
class ChaPing extends Component{
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


                    fetch('http://'+ipdy+'/app_dev.php/getbadcommentsofbusiness/'+this.state.uid+'/'+this.props.pid+'/'+(Cy('uid='+this.state.uid+'&str='+qm)))
                        .then((response) => response.json())
                        .then((responseJson) =>{
                            console.log(responseJson)

                            if(responseJson.code==10000)
                            {
                                this.setState({dataSource:this.state.dataSource.cloneWithRows(responseJson.data)})


                            }else {
                                alert('暂无评价')
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
                    height:WINHEIGHT*(0.12),
                    borderBottomColor:'#e6e6e6',
                    borderBottomWidth:1,
                    flexDirection:'row',
                    padding:WINWIDTH*(0.03),

                }}>
                    <View>

                        <Text style={{
                            color:'#DC143C',
                            marginLeft:WINWIDTH*(0.03),
                            fontSize:WINWIDTH*(0.03),
                            marginTop:WINHEIGHT*(0.01),
                        }}>{rowData.dateline}</Text>
                        <Text style={styles.TX3}>评价内容:{rowData.desc}</Text>



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
