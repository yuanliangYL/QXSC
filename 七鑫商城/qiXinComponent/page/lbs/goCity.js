
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



} from 'react-native';



const  WINWIDTH = Dimensions.get('window').width;
const  WINHEIGHT = Dimensions.get('window').height;


//josn数据
import China from '../../china.json';

//头
import Tou from '../../../qiXinComponent/head/headBack';


export  default class GoCity extends  Component {
    constructor(props) {
        super(props);
        var ds =new ListView.DataSource({rowHasChanged:(r1,r2)=> r1!==r2});
        this.state= {
            dataSource: ds,



        }
    }

    componentDidMount() {
        // {alert(this.props.rowData)}
        {this.parseLocation()}
    }

    parseLocation(){
        var area = China.china,
            cityArr = [];

        for(var i = 0 ; i < area.length; i ++){
            if(area[i].name == this.props.rowData){
                for (var j = 0; j < area[i].city.length; j ++){
                   let  city = area[i].city[j];
                    cityArr.push(city)
                }
            }
        }

        this.setState({cityArr:cityArr})
        console.log(cityArr)
        this.setState({dataSource:this.state.dataSource.cloneWithRows(cityArr)})
    }

        _save(rowData){
        // alert(rowData.name)
        // console.log(rowData.name)
            fetch('http://api.map.baidu.com/geocoder/v2/?callback=&output=json&address='+encodeURIComponent(rowData.name)+'&ak=7D4G5gyrX3tlsI0yN5qfqj1ukTBn9mO5')
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson)
                    storage.save({
                        key: 'lbscity',  //注意:请不要在key中使用_下划线符号!
                        rawData: {
                            province:this.props.rowData,
                            city:rowData.name,
                            lat:responseJson.result.location.lat,
                            lng:responseJson.result.location.lng,

                        },
                        // 如果不指定过期时间，则会使用defaultExpires参数
                        // 如果设为null，则永不过期
                        expires: null
                    });

                    storage.save({
                        key: 'clickCity',  //注意:请不要在key中使用_下划线符号!
                        rawData: {
                            //点击省直辖市区
                            clickCity:this.state.cityArr,
                            //点击城市
                            xiaoqu:rowData.name,
                        },
                        // 如果不指定过期时间，则会使用defaultExpires参数
                        // 如果设为null，则永不过期
                        expires: null
                    });

                    //刷新navigator
                    changeCity(rowData.name);
                    //刷新首页传参
                    _reHome(responseJson.result.location.lat,responseJson.result.location.lng);
                    this.props.navigator.popToTop()
                    //刷新附近view*********
                    getAgain1();

                })
                .catch((error) => {

                })




        }



    _renderRow(rowData){

        return(
            <TouchableOpacity activeOpacity={1} style={{backgroundColor:'#ffffff'
            }}
                              onPress={()=> {this._save(rowData)}}>






                <View style={{

                    width:WINWIDTH,
                    height:WINHEIGHT*(0.07),
                    borderBottomColor:'#e6e6e6',
                    borderBottomWidth:1,
                    flexDirection:'row',
                    padding:WINWIDTH*(0.03),

                }}>
                    <View>

                        <Text style={styles.TX3}>{rowData.name}</Text>



                    </View>


                </View>


            </TouchableOpacity>
        )


    }


    render() {
        return (
            <View style={{flex:1,backgroundColor:'#f5f5f5'}}>
                <Tou title={'城市'} navigator={this.props.navigator}/>

                <ListView style={{marginTop:10}}
                          dataSource={this.state.dataSource}
                          renderRow={this._renderRow.bind(this)}
                          enableEmptySections = {true}
                />







            </View>

        )
    }

}


const styles = StyleSheet.create({


    TX3:{
        color:'#696969',
        marginLeft:WINWIDTH*(0.05),
        fontSize:WINWIDTH*(0.045),
        marginTop:WINHEIGHT*(0.01),
        width:WINWIDTH/1.2,

    }


});

