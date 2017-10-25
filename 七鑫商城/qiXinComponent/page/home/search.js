
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
    Platform





} from 'react-native';



const  WINWIDTH = Dimensions.get('window').width;
const  WINHEIGHT = Dimensions.get('window').height;

import Tou from '../../../qiXinComponent/head/headBack';

import NearD from '../../../qiXinComponent/page/near/Details';


export  default class search extends  Component{
    constructor(props){
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state={
            search:0,
            dataSource: ds,
            dataState: 0,
            search9:[],

        };
    }

    showProductDetail(id) {
        this.props.navigator.push({
            name: 'details',
            params: {
                bid: id,
            }

        })
    }



    _search1(){
        this.props.navigator.pop()
    }

    _search(){
        //通过经纬度api获取返回地理位置参数
        fetch('http://api.map.baidu.com/geocoder/v2/?callback=&location=' + this.props.lat + ',' + this.props.lng + '&output=json&pois=1&ak=7D4G5gyrX3tlsI0yN5qfqj1ukTBn9mO5')
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log(responseJson),
                    this.setState({
                        city: responseJson.result.addressComponent.city,
                        province: responseJson.result.addressComponent.province,
                    })

                console.log('http://' + ipdy + '/business/searchbusinessbycondition/'+this.state.province+'/'+this.state.city+'/'+this.props.lat +'/'+this.props.lng+'/'+this.state.search)

                fetch('http://' + ipdy + '/business/searchbusinessbycondition/'+this.state.province+'/'+this.state.city+'/'+this.props.lat +'/'+this.props.lng+'/'+this.state.search
                )
                    .then((response) => response.json())
                    .then((responseJson) => {
                        console.log(responseJson)
                        if(responseJson.code==10001){
                            Alert.alert(
                                '提示',
                                '暂无该商家',
                                [

                                    {text: '确定', },
                                ])

                        }
                            this.setState({
                                dataSource: this.state.dataSource.cloneWithRows(responseJson.res),
                                dataState: 1,
                            });




                    })
                    .catch((error) => {

                    })
            }).catch((error) => {
            console.error(error);

        });
    }

    //默认搜索9个分类
    moren(){
        //通过经纬度api获取返回地理位置参数
        fetch('http://api.map.baidu.com/geocoder/v2/?callback=&location=' + this.props.lat + ',' + this.props.lng + '&output=json&pois=1&ak=7D4G5gyrX3tlsI0yN5qfqj1ukTBn9mO5')
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log(responseJson),
                this.setState({
                    city: responseJson.result.addressComponent.city,
                    province: responseJson.result.addressComponent.province,
                })


                fetch('http://' + ipdy + '/business/getninehotbusinessname/'+this.state.province+'/'+this.state.city)
                    .then((response) => response.json())
                    .then((responseJson) => {
                        console.log(responseJson)

                        var arrAll =[];

                        for (var j = 0; j< responseJson.res.length; j++) {

                            console.log(responseJson.res[j])

                            arrAll.push({
                                'id':responseJson.res[j].id,
                                'title':responseJson.res[j].title,
                            });

                        }


                        this.setState({
                            search9:arrAll
                        })


                        console.log(this.state.search9)
                    })
                    .catch((error) => {

                    })


            }).catch((error) => {
            console.error(error);
        });
    }
    //直接跳转热门商家
    _hotmall(obj,obj2) {
            console.log(obj2)
        this.props.navigator.push({
            name: 'details',
            component:NearD,
            params: {
                bid: obj,
                title:obj2,
            }

        })
    }



    _search9(){
        var arr =[]
        for (var i=0;i<this.state.search9.length;i++){
            arr.push(

                <TouchableOpacity onPress={this._hotmall.bind(this,this.state.search9[i].id,this.state.search9[i].title)} key={i} style={{height:WINHEIGHT*0.04,marginTop:WINHEIGHT*0.01,borderWidth:1,borderColor:filecolor,borderRadius:5,justifyContent:'center',marginLeft:WINWIDTH*0.07,marginBottom:WINHEIGHT*0.01}}>
                    <Text style={{color:'#696969',fontSize:WINWIDTH*0.025,marginLeft:WINWIDTH*0.01,marginRight:WINWIDTH*0.01}}>{this.state.search9[i].title}</Text>
                </TouchableOpacity>

            )
        }
        return arr

    }


    componentDidMount() {
        this.moren();


    }

    _renderRow(rowData) {
        return (
            <TouchableOpacity style={{
                backgroundColor: '#ffffff'
            }} onPress={() => {
                this.showProductDetail(rowData.id)
            }}>
                <View style={{

                    width: WINWIDTH,
                    height: WINHEIGHT * (0.2),
                    borderBottomColor: '#e6e6e6',
                    borderBottomWidth: 1,
                    flexDirection: 'row',
                    padding: WINWIDTH * (0.03),


                }}>

                    <Image source={{uri: 'http://' + tu + '/Uploads/' + rowData.imgurl}} style={{
                        width: WINWIDTH * (0.35),
                        height: WINHEIGHT * (0.16),
                    }}/>
                    <View>
                        <Text style={styles.TX}>{rowData.title}</Text>
                        <View style={{
                            width: WINWIDTH * (0.06),
                            marginTop: WINHEIGHT * (0.045),
                            marginLeft: WINWIDTH * (0.03)
                        }}>
                            {/*<StarRating*/}
                            {/*disabled={true}*/}
                            {/*maxStars={5}*/}
                            {/*rating={rowData.star}*/}
                            {/*selectedStar={(rating) => this.onGeneralStarRatingPress(rating)}*/}
                            {/*starColor={'orange'}*/}
                            {/*emptyStarColor={'orange'}*/}
                            {/*starSize = {WINWIDTH*(0.05)}*/}
                            {/*/>*/}
                        </View>
                        <Text style={styles.TX1}>{rowData.address.substr(0, 12)}...</Text>
                        <View style={{flexDirection: 'row', alignItems: 'flex-end',}}>
                            <Text style={styles.TX3}>人均消费:{rowData.price}</Text>
                            <Text style={styles.TX2}>{(rowData.dis / 1000).toFixed(1)}km</Text>
                        </View>
                    </View>
                </View>


            </TouchableOpacity>
        )
    }



    render(){
        return(
           <View style={{backgroundColor:'#e6e6e6',flex:1}}>
               <Tou title={'搜索'} navigator={this.props.navigator}/>
               <View  style={{width:WINWIDTH,height:WINHEIGHT*0.07,backgroundColor:'#ffffff',justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
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

                   <Text onPress={this._search.bind(this)} style={{fontSize:WINWIDTH*0.04, color:'#696969',marginLeft:10}}>
                       搜索
                   </Text>
               </View>
               <Text style={{fontSize:WINWIDTH*0.03, color:'#696969',marginTop:WINHEIGHT*0.02,marginLeft:WINWIDTH*0.08,}}>
                   热门商家
               </Text>

               <View style={{width:WINWIDTH,flexWrap:'wrap',flexDirection:'row',}}>
                   {this._search9()}
               </View>

               <ListView style={{}}
                         dataSource={this.state.dataSource}
                         renderRow={this._renderRow.bind(this)}
                         enableEmptySections={true}

               />
           </View>
        )
    }

}



const styles = StyleSheet.create({

    TX: {
        marginLeft: WINWIDTH * (0.03),
        fontSize: WINWIDTH * (0.04),
    },
    TX1: {
        color: '#696969',
        marginLeft: WINWIDTH * (0.03),
        fontSize: WINWIDTH * (0.04),
        marginTop: WINHEIGHT * (0.01),

    },
    TX2: {
        color: '#696969',
        marginLeft: WINWIDTH * (0.05),
        fontSize: 10,
        marginTop: WINHEIGHT * (0.01),


    },
    TX3: {
        color: 'red',
        fontWeight: 'bold',
        marginLeft: WINWIDTH * (0.03),
        fontSize: WINWIDTH * (0.035),
        marginTop: WINHEIGHT * (0.01),

    }


});



