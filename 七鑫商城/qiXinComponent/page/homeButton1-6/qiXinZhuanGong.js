
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
    RefreshControl,
    Alert,
    Platform,

} from 'react-native';

const  WINWIDTH = Dimensions.get('window').width;
const  WINHEIGHT = Dimensions.get('window').height;

import ProductDetail from '../../page/mall/mallDetail';
import InputScrollView from 'react-native-inputscrollview';

import HttpUtlis from '../../tool/HttpUtils';


export default class qiXinZhuanGong extends  Component{

    constructor(props) {

        super(props);
        var ds =new ListView.DataSource({  rowHasChanged: (r1, r2)=> r1 !== r2, })
        var ds2 =new ListView.DataSource({  rowHasChanged: (r1, r2)=> r1 !== r2, })
        this.state = {
            dataSource:ds,
            dataSource2:ds2,

            dataState:0,
            dataState2:0,
            url:'',
            search:'',

            isRefreshing: true,
            enableEmptySections:true,

        }
    }

    showProductDetail(id){
        const {navigator} =this.props;
        if(navigator) {
            navigator.push({
                name:'ProductDetail',
                component:ProductDetail,
                params:{
                    pid:id,
                }
            })
        }
    }
    //获取侧边分类
    _category(){
        var url = 'http://'+ipdy+'/index.php?s=/Home/APPGoods/getShopPage/cid/-1/pageNum/1/size/30'

        HttpUtlis.get(url)
            .then(result=>{
                console.log(result)
                this.setState({dataSource2:this.state.dataSource.cloneWithRows(result.category),dataState:1})

            })
            .catch(error=>{
                console.log(error)
                Alert.alert(
                    '提示',
                    '暂无分类列表',
                    [

                        {text: '确定', },
                    ])
            })

    }

    _category1(){
        fetch('http://'+ipdy+'/app_dev.php/product/category')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({dataSource2:this.state.dataSource.cloneWithRows(responseJson.data)})

            })
            .catch((error) =>
                Alert.alert(
                    '提示',
                    '暂无分类列表',
                    [

                        {text: '确定', },
                    ])
            )
    }


    _imgurl(){
        // console.log('http://'+ipdy+'/product/getshopbanner')

        fetch('http://'+ipdy+'/product/getshopbanner')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({
                    imgurls: JSON.parse(responseJson.data[0].imgurls),
                });

            })
            .catch((error) => {

                }
            )
    }

//    网络请求
    componentDidMount(){
        InteractionManager.runAfterInteractions(() => {
            // ...耗时较长的同步的任务...
            this._all()

            this._category()
            this._imgurl()

        });


    }
    //全部商品
    _all(){
        var url = 'http://'+ipdy+'/index.php?s=/Home/APPGoods/getShopPage/cid/-1/pageNum/1/size/30'

        HttpUtlis.get(url)
            .then(result=>{
                console.log(result)
                this.setState({dataSource:this.state.dataSource.cloneWithRows(result.goods),dataState:1,isRefreshing: false})



            })
            .catch(error=>{
                console.log(error)

                // this.setState({
                //     dataState:0,
                //     dataHome:0,
                // })

            })


    }
    //[全部]button
    quanbu(obj){

        var url = 'http://'+ipdy+'/index.php?s=/Home/APPGoods/getShopPage/cid/0/pageNum/1/size/30'

        HttpUtlis.get(url)
            .then(result=>{
                console.log(result)
                this.setState({dataSource:this.state.dataSource.cloneWithRows(result.goods),dataState:1,isRefreshing: false})



            })
            .catch(error=>{
                console.log(error)

                // this.setState({
                //     dataState:0,
                //     dataHome:0,
                // })

            })
    }
    //侧边按钮点击
    _button(obj,obj2){

        console.log(obj)
        var url='http://'+ipdy+'/index.php?s=/Home/APPGoods/getShopPage/cid/'+obj+'/pageNum/1/size/30';

        // console.log(this.state.fuzhuang.id)
        fetch(url)
            .then((response)=>response.json())
            .then((responseJson) =>{
                console.log(responseJson)
                if(responseJson.code==10000)
                {

                    //重新渲染dataSource
                    this.setState({dataSource:this.state.dataSource.cloneWithRows(responseJson.goods),dataState:1,})
                }else {
                    this.setState({
                        dataState:0,

                    })
                }




            })
            .catch((error) => {

            })

    }
    getAgain(){
        this._all()
    }
    //搜索
    _search(){
        var url = 'http://'+ipdy+'/index.php?s=/Home/APPGoods/searchGoodsByGoodsName/keywords/'+this.state.search+'/pageNum/1/size/20'

        HttpUtlis.get(url)
            .then(result=>{
                console.log(url)
                console.log(result)

                if(result.code==10000)
                {

                    //重新渲染dataSource
                    this.setState({dataSource:this.state.dataSource.cloneWithRows(result.data),dataState:1})

                    Alert.alert(
                        '提示',
                        '搜索成功',
                        [

                            {text: '确定', },
                        ])
                }else {

                    Alert.alert(
                        '提示',
                        '暂无该商品，请重新搜索',
                        [

                            {text: '确定', },
                        ])
                }
            })
            .catch(error=>{
                console.log(error)

                // this.setState({
                //     dataState:0,
                //     dataHome:0,
                // })

            })


    }

    _onEndReached(){

    }

    render(){
        return(
            <View style={{flex:1}}>
                {/*导航头*/}
                <View style={{width:WINWIDTH,height:Platform.OS == 'ios' ? 20: WINHEIGHT*(0.02),backgroundColor:filecolor,}}></View>
                <View style={{backgroundColor:filecolor,width:WINWIDTH,height:Platform.OS == 'ios' ? 44: WINHEIGHT*(0.06),flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>

                    <View style={{width:WINWIDTH*(0.15),height:Platform.OS == 'ios' ? 44: WINHEIGHT*(0.06),flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <TouchableOpacity onPress = {() => this.props.navigator.pop()} style={{height:WINHEIGHT*0.03,width:WINWIDTH*(0.15),justifyContent:'center',alignItems:'center',}}>
                            <Text style={{color:'#ffffff',fontSize:WINWIDTH*0.035}}>返回</Text>
                        </TouchableOpacity>
                    </View>



                    {/*<TouchableOpacity  style={{width:WINWIDTH*(0.7),height:Platform.OS == 'ios' ? 44 : WINHEIGHT*(0.06),justifyContent:'center',alignItems:'center',}}>*/}
                    {/*<Text style={{fontSize:WINWIDTH*(0.04),color:'#f6f6f6',backgroundColor:'transparent'}}>搜一搜</Text>*/}
                    {/*</TouchableOpacity>*/}

                    <View style={{width:WINWIDTH*(0.7),height:Platform.OS == 'ios' ? 44 : WINHEIGHT*(0.06),justifyContent:'center',alignItems:'center',flexDirection:'row',backgroundColor:rgba=(255,100,255,20),borderRadius:20}}>
                        <TextInput
                            placeholder={'                    搜一搜'}
                            placeholderTextColor={'#ffffff'}
                            underlineColorAndroid={'transparent'}
                            onChangeText={(text) => this.setState({search:text})}
                            style={{height:Platform.OS == 'ios' ? 44 : WINHEIGHT*(0.06),fontSize:WINWIDTH*(0.035),width:WINWIDTH*(0.5),color:'white'}}
                        />
                        <TouchableOpacity onPress={this._search.bind(this)}>
                            <Image source={require('../../../img/sousuo.png')} style={{width:WINWIDTH*(0.06),height:WINWIDTH*(0.06)}} />
                        </TouchableOpacity>
                    </View>


                    <View style={{width:WINWIDTH*(0.15),height:Platform.OS == 'ios' ? 44: WINHEIGHT*(0.06),flexDirection:'row',justifyContent:'center',alignItems:'center'}}>

                        {/*{*/}
                        {/*Platform.OS == 'ios' ?*/}
                        {/*<TouchableOpacity activeOpacity={1} style={{height:WINHEIGHT*0.03,width:WINWIDTH*(0.15),justifyContent:'center',alignItems:'center',borderLeftWidth:0.5,borderLeftColor:'#ffffff'}}>*/}

                        {/*<Image source={require('../../../newQx/sao.png')}*/}
                        {/*style={{width:WINWIDTH*0.055, height:WINWIDTH*0.055}}/>*/}
                        {/*<Text style={{color:'#ffffff',fontSize:WINWIDTH*0.02,marginTop:1}}>扫一扫</Text>*/}
                        {/*</TouchableOpacity>*/}
                        {/*:*/}
                        {/*<TouchableOpacity activeOpacity={1} style={{height:WINHEIGHT*0.03,width:WINWIDTH*(0.15),justifyContent:'center',alignItems:'center',borderLeftWidth:0.5,borderLeftColor:'#ffffff'}}>*/}

                        {/*<Image source={require('../../../newQx/sao.png')}*/}
                        {/*style={{width:WINWIDTH*0.045, height:WINWIDTH*0.045}}/>*/}
                        {/*/!*<Text style={{color:'#ffffff',fontSize:WINWIDTH*0.02,marginTop:1}}>扫一扫</Text>*!/*/}
                        {/*</TouchableOpacity>*/}
                        {/*}*/}

                    </View>
                </View>
                {/*导航尾*/}

                {/*<View style={{flex:1,justifyContent:'center',alignItems:'center'}}>*/}
                {/*<Text style={{fontSize:WINWIDTH*0.05,color:'#696969'}}>商城升级中，敬请期待</Text>*/}
                {/*</View>*/}

                {
                    this.state.dataState==0&&this.state.dataHome==0?
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                            <Text style={{fontSize:WINWIDTH*0.04,color:'#696969'}}>商城升级中，敬请期待</Text>
                        </View>
                        :
                        <View style={{flex:1,flexDirection:'row'}}>
                            <ScrollView style={{width:WINWIDTH*0.25,flex:1,backgroundColor:'#ffffff',}}>
                                <TouchableOpacity onPress={this.quanbu.bind(this,0)} style={{width:WINWIDTH*0.25,height:WINHEIGHT*0.08,borderBottomColor:'#e5e5e5',borderBottomWidth:0.5,justifyContent:'center',alignItems:'center'}}>
                                    <Text style={{fontSize:WINWIDTH*0.03,color:'#696969'}}>全部商品</Text>
                                </TouchableOpacity>
                                <ListView
                                    dataSource={this.state.dataSource2}
                                    renderRow={this._renderRow2.bind(this)}
                                    enableEmptySections={true}
                                />
                            </ScrollView>

                            <View style={{width:WINWIDTH*0.75,backgroundColor:'#e5e5e5',}}>
                                <ListView
                                    dataSource={this.state.dataSource}
                                    renderRow={this._renderRow.bind(this)}
                                    enableEmptySections={true}
                                    contentContainerStyle={styles.listViewStyle}
                                    onEndReached = {this._onEndReached.bind(this)}
                                    onEndReachedThreshold = {20}
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
                        </View>

                }

            </View>




        )
    }

    _renderRow(rowData){

        return(

            this.state.dataState==1?

                <View style={{width:WINWIDTH*0.375,height:WINHEIGHT*0.3,justifyContent:'center',alignItems:'center',flexWrap:'wrap',backgroundColor:'#e5e5e5',marginTop:WINHEIGHT*0.02}}>
                    <TouchableOpacity onPress={()=> {this.showProductDetail(rowData.id)}} style={{width:WINWIDTH*0.35,height:WINHEIGHT*0.3,justifyContent:'center',alignItems:'center',backgroundColor:'#ffffff'}}>
                        <Image source ={{uri:'http://'+ipdy+'/Uploads/'+rowData.imgurl}} style = {{width:WINWIDTH*0.3, height:WINHEIGHT*0.15}}/>

                        <View style={{width:WINWIDTH*0.3,height:WINHEIGHT*0.08,justifyContent:'center',backgroundColor:'#ffffff'}}>
                            <Text style={{color: '#696969', fontSize: WINHEIGHT*0.015}}>{rowData.name.substr(0, 20)}</Text>
                        </View>
                        <View style={{width:WINWIDTH*0.3,height:WINHEIGHT*0.03,flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:'#ffffff'}}>
                            <Text style={{color: '#696969', fontSize: WINHEIGHT * (0.01)}}>原价:{rowData.cost_price}</Text>
                            <Text style={{color: 'red', fontSize: WINHEIGHT * (0.012)}}>现价:{rowData.present_price}</Text>
                        </View>

                    </TouchableOpacity>
                </View>
                :
                <View style={{width:WINWIDTH*0.75,height:WINHEIGHT*0.5,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:WINWIDTH*0.035,color:'#696969',}}>暂无商品,敬请期待</Text>
                </View>

        )
    }





    //侧边按钮
    _renderRow2(rowData){

        return(

            <TouchableOpacity onPress={this._button.bind(this,rowData.id,)} style={{width:WINWIDTH*0.25,height:WINHEIGHT*0.08,borderBottomColor:'#e5e5e5',borderBottomWidth:0.5,justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:WINWIDTH*0.03,color:'#696969'}}>{rowData.name}</Text>
            </TouchableOpacity>

        )
    }



}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },

    listViewStyle:{
        // flex:1,
        flexDirection:'row', //设置横向布局
        flexWrap:'wrap',    //设置换行显示
        // marginBottom:50
    },
});

