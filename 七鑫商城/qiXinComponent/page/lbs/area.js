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


} from 'react-native';

//
// import Alipay from 'rn-alipay';

const WINWIDTH = Dimensions.get('window').width;
const WINHEIGHT = Dimensions.get('window').height;

// import moment from 'moment';


import China from '../../../qiXinComponent/china.json';
import Geolocation from 'Geolocation';


//下一级城市
import NextCity from '../../../qiXinComponent/page/lbs/goCity';

//头
import Tou from '../../../qiXinComponent/head/headBack';

export  default class area extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds,
            lat: '',
            lng: '',


            city: '定位中...',
            dist: '',
            province: '',

        };

        Geolocation.getCurrentPosition((data) => {
            this.setState({
                lat: data.coords.latitude.toString(),
                lng: data.coords.longitude.toString()
            })
            //实时获取地理位置
            this.lbs_pressButton()


        }, () => {
        });

    }


    componentDidMount() {


        //遍历省
        {
            this.parseLocation()
        }
    }


    //全国省json
    parseLocation() {
        var area = China.china,
            areaArr = [];

        for (var i = 0; i < area.length; i++) {
            let provence = area[i].name;
            areaArr.push(provence)
        }

        // console.log(areaArr)
        this.setState({dataSource: this.state.dataSource.cloneWithRows(areaArr)})
    }


    //定位当前城市点击返回首页
    _popHome() {


        this._lbs_latlng()

        this.props.navigator.popToTop()


    }


    //实时获取地理位置
    lbs_pressButton(obj) {
        fetch('http://api.map.baidu.com/geocoder/v2/?callback=&location=' + this.state.lat + ',' + this.state.lng + '&output=json&pois=1&ak=7D4G5gyrX3tlsI0yN5qfqj1ukTBn9mO5')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson),
                    this.setState({
                        city: responseJson.result.addressComponent.city,
                        province: responseJson.result.addressComponent.province,
                    })

            }).catch((error) => {
            console.error(error);

        });

    }

    //保存省市区经纬度
    _lbs_latlng(obj) {
        storage.save({
            key: 'lbscity',  //注意:请不要在key中使用_下划线符号!
            rawData: {
                province: this.state.province,
                city: this.state.city,
                lat: this.state.lat,
                lng: this.state.lng,

            },
            // 如果不指定过期时间，则会使用defaultExpires参数
            // 如果设为null，则永不过期
            expires: null
        });


        //刷新navigator
        changeCity(this.state.city);
        //刷新首页传参
        _reHome(this.state.lat, this.state.lng);


    }

    //常用城市
    _hotCity(obj1, obj2) {


        fetch('http://api.map.baidu.com/geocoder/v2/?callback=&output=json&address=' + encodeURIComponent(obj2) + '&ak=7D4G5gyrX3tlsI0yN5qfqj1ukTBn9mO5')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)

                storage.save({
                    key: 'lbscity',  //注意:请不要在key中使用_下划线符号!
                    rawData: {
                        province: obj1,
                        city: obj2,
                        lat: responseJson.result.location.lat,
                        lng: responseJson.result.location.lng,

                    },


                    // 如果不指定过期时间，则会使用defaultExpires参数
                    // 如果设为null，则永不过期
                    expires: null
                });


                //刷新navigator
                changeCity(obj2);
                //刷新首页传参
                _reHome(responseJson.result.location.lat, responseJson.result.location.lng);

                this.props.navigator.popToTop()
                //刷新附近view*********
                getAgain1();
            })
            .catch((error) => {

            })


    }

    //直辖市
    _crown(obj) {

        fetch('http://api.map.baidu.com/geocoder/v2/?callback=&output=json&address=' + encodeURIComponent(obj) + '&ak=7D4G5gyrX3tlsI0yN5qfqj1ukTBn9mO5')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)

                storage.save({
                    key: 'lbscity',  //注意:请不要在key中使用_下划线符号!
                    rawData: {
                        province: ' ',
                        city: obj,
                        lat: responseJson.result.location.lat,
                        lng: responseJson.result.location.lng,

                    },


                    // 如果不指定过期时间，则会使用defaultExpires参数
                    // 如果设为null，则永不过期
                    expires: null
                });


                //刷新navigator
                changeCity(obj);
                //刷新首页传参
                _reHome(responseJson.result.location.lat, responseJson.result.location.lng);

                this.props.navigator.popToTop()
                //刷新附近view*********
                getAgain1();

            })
            .catch((error) => {

            })
    }


    render() {
        return (
            <View style={{flex:1,backgroundColor: '#f5f5f5',}}>


            <Tou title={'省份'} navigator={this.props.navigator}/>
                {/*定位城市*/}
                {/*<View style={{width:WINWIDTH*(0.95),height:WINHEIGHT*(0.06),backgroundColor:'#f5f5f5',justifyContent:'center'}}>*/}
                {/*<Text style={{fontSize:WINWIDTH*(0.04),color:'#696969'}} >当前定位城市</Text>*/}

                {/*</View>*/}
                {/*<View style={{width:WINWIDTH*(0.95),height:WINHEIGHT*(0.08),backgroundColor:'#f5f5f5',flexDirection:'row',alignItems:'center',justifyContent:'space-around',borderBottomWidth:1,borderBottomColor:'#d3d3d3'}}>*/}

                {/*/!*定位城市*!/*/}
                {/*<TouchableOpacity onPress={this._popHome.bind(this)} style={{width:WINWIDTH*(0.2),height:WINHEIGHT*(0.045),backgroundColor:'#ffffff',justifyContent:'center',alignItems:'center',borderRadius:3,shadowColor:'#515151',shadowOffset:{width:1,height:1},shadowRadius:1,*/}
                {/*shadowOpacity: 1.0,}}>*/}
                {/*<Text style={{fontSize:WINWIDTH*(0.04),color:'#696969'}} >{this.state.city}</Text>*/}
                {/*</TouchableOpacity>*/}

                {/*<TouchableOpacity style={{width:WINWIDTH*(0.15),height:WINHEIGHT*(0.045),justifyContent:'center',alignItems:'center',borderRadius:3}}>*/}
                {/*</TouchableOpacity>*/}

                {/*<TouchableOpacity style={{width:WINWIDTH*(0.15),height:WINHEIGHT*(0.045),justifyContent:'center',alignItems:'center',borderRadius:3}}>*/}
                {/*</TouchableOpacity>*/}
                {/*<TouchableOpacity style={{width:WINWIDTH*(0.15),height:WINHEIGHT*(0.045),justifyContent:'center',alignItems:'center',borderRadius:3}}>*/}
                {/*</TouchableOpacity>*/}

                {/*</View>*/}
                {/*常用城市*/}
                {/*<View style={{width:WINWIDTH*(0.95),height:WINHEIGHT*(0.06),backgroundColor:'#f5f5f5',justifyContent:'center'}}>*/}
                {/*<Text style={{fontSize:WINWIDTH*(0.04),color:'#696969'}} >常用城市</Text>*/}

                {/*</View>*/}
                {/*<View style={{width:WINWIDTH*(0.95),height:WINHEIGHT*(0.06),backgroundColor:'#f5f5f5',flexDirection:'row',alignItems:'center',justifyContent:'space-around',}}>*/}

                {/*<TouchableOpacity onPress={this._crown.bind(this,'上海市')} style={{width:WINWIDTH*(0.15),height:WINHEIGHT*(0.045),backgroundColor:'#ffffff',justifyContent:'center',alignItems:'center',borderRadius:3,shadowColor:'#515151',shadowOffset:{width:1,height:1},shadowRadius:1,*/}
                {/*shadowOpacity: 1.0,}}>*/}
                {/*<Text style={{fontSize:WINWIDTH*(0.04),color:'#696969'}}>上海</Text>*/}
                {/*</TouchableOpacity>*/}

                {/*<TouchableOpacity onPress={this._crown.bind(this,'北京市')} style={{width:WINWIDTH*(0.15),height:WINHEIGHT*(0.045),backgroundColor:'#ffffff',justifyContent:'center',alignItems:'center',borderRadius:3,shadowColor:'#515151',shadowOffset:{width:1,height:1},shadowRadius:1,*/}
                {/*shadowOpacity: 1.0,}}>*/}
                {/*<Text style={{fontSize:WINWIDTH*(0.04),color:'#696969'}} >北京</Text>*/}
                {/*</TouchableOpacity>*/}

                {/*<TouchableOpacity onPress={this._crown.bind(this,'天津市')} style={{width:WINWIDTH*(0.15),height:WINHEIGHT*(0.045),backgroundColor:'#ffffff',justifyContent:'center',alignItems:'center',borderRadius:3,shadowColor:'#515151',shadowOffset:{width:1,height:1},shadowRadius:1,*/}
                {/*shadowOpacity: 1.0,}}>*/}
                {/*<Text style={{fontSize:WINWIDTH*(0.04),color:'#696969'}} >天津</Text>*/}
                {/*</TouchableOpacity>*/}

                {/*<TouchableOpacity onPress={this._hotCity.bind(this,'江西省','南昌市')} style={{width:WINWIDTH*(0.15),height:WINHEIGHT*(0.045),backgroundColor:'#ffffff',justifyContent:'center',alignItems:'center',borderRadius:3,shadowColor:'#515151',shadowOffset:{width:1,height:1},shadowRadius:1,*/}
                {/*shadowOpacity: 1.0,}}>*/}
                {/*<Text style={{fontSize:WINWIDTH*(0.04),color:'#696969'}} >南昌</Text>*/}
                {/*</TouchableOpacity>*/}

                {/*</View>*/}
                {/*<View style={{width:WINWIDTH*(0.95),height:WINHEIGHT*(0.06),backgroundColor:'#f5f5f5',flexDirection:'row',alignItems:'center',justifyContent:'space-around',}}>*/}

                {/*<TouchableOpacity onPress={this._hotCity.bind(this,'广东省','广州市')} style={{width:WINWIDTH*(0.15),height:WINHEIGHT*(0.045),backgroundColor:'#ffffff',justifyContent:'center',alignItems:'center',borderRadius:3,shadowColor:'#515151',shadowOffset:{width:1,height:1},shadowRadius:1,*/}
                {/*shadowOpacity: 1.0,}}>*/}
                {/*<Text style={{fontSize:WINWIDTH*(0.04),color:'#696969'}} >广州</Text>*/}
                {/*</TouchableOpacity>*/}

                {/*<TouchableOpacity onPress={this._hotCity.bind(this,'江苏省','南京市')} style={{width:WINWIDTH*(0.15),height:WINHEIGHT*(0.045),backgroundColor:'#ffffff',justifyContent:'center',alignItems:'center',borderRadius:3,shadowColor:'#515151',shadowOffset:{width:1,height:1},shadowRadius:1,*/}
                {/*shadowOpacity: 1.0,}}>*/}
                {/*<Text style={{fontSize:WINWIDTH*(0.04),color:'#696969'}} >南京</Text>*/}
                {/*</TouchableOpacity>*/}

                {/*<TouchableOpacity onPress={this._hotCity.bind(this,'四川省','成都市')} style={{width:WINWIDTH*(0.15),height:WINHEIGHT*(0.045),backgroundColor:'#ffffff',justifyContent:'center',alignItems:'center',borderRadius:3,shadowColor:'#515151',shadowOffset:{width:1,height:1},shadowRadius:1,*/}
                {/*shadowOpacity: 1.0,}}>*/}
                {/*<Text style={{fontSize:WINWIDTH*(0.04),color:'#696969'}} >成都</Text>*/}
                {/*</TouchableOpacity>*/}

                {/*<TouchableOpacity onPress={this._hotCity.bind(this,'浙江省','温州市')} style={{width:WINWIDTH*(0.15),height:WINHEIGHT*(0.045),backgroundColor:'#ffffff',justifyContent:'center',alignItems:'center',borderRadius:3,shadowColor:'#515151',shadowOffset:{width:1,height:1},shadowRadius:1,*/}
                {/*shadowOpacity: 1.0,}}>*/}
                {/*<Text style={{fontSize:WINWIDTH*(0.04),color:'#696969'}} >温州</Text>*/}
                {/*</TouchableOpacity>*/}

                {/*</View>*/}

                {/*<View style={{width:WINWIDTH*(0.95),height:WINHEIGHT*(0.06),backgroundColor:'#f5f5f5',flexDirection:'row',alignItems:'center',justifyContent:'space-around',}}>*/}

                {/*<TouchableOpacity onPress={this._crown.bind(this,'重庆')} style={{width:WINWIDTH*(0.15),height:WINHEIGHT*(0.045),backgroundColor:'#ffffff',justifyContent:'center',alignItems:'center',borderRadius:3,shadowColor:'#515151',shadowOffset:{width:1,height:1},shadowRadius:1,*/}
                {/*shadowOpacity: 1.0,}}>*/}
                {/*<Text style={{fontSize:WINWIDTH*(0.04),color:'#696969'}} >重庆</Text>*/}
                {/*</TouchableOpacity>*/}

                {/*<TouchableOpacity onPress={this._hotCity.bind(this,'福建省','泉州市')} style={{width:WINWIDTH*(0.15),height:WINHEIGHT*(0.045),backgroundColor:'#ffffff',justifyContent:'center',alignItems:'center',borderRadius:3,shadowColor:'#515151',shadowOffset:{width:1,height:1},shadowRadius:1,*/}
                {/*shadowOpacity: 1.0,}}>*/}
                {/*<Text style={{fontSize:WINWIDTH*(0.04),color:'#696969'}}>泉州</Text>*/}
                {/*</TouchableOpacity>*/}

                {/*<TouchableOpacity onPress={this._hotCity.bind(this,'浙江省','绍兴市')} style={{width:WINWIDTH*(0.15),height:WINHEIGHT*(0.045),backgroundColor:'#ffffff',justifyContent:'center',alignItems:'center',borderRadius:3,shadowColor:'#515151',shadowOffset:{width:1,height:1},shadowRadius:1,*/}
                {/*shadowOpacity: 1.0,}}>*/}
                {/*<Text style={{fontSize:WINWIDTH*(0.04),color:'#696969'}} >绍兴</Text>*/}
                {/*</TouchableOpacity>*/}

                {/*<TouchableOpacity onPress={this._hotCity.bind(this,'浙江省','金华市')} style={{width:WINWIDTH*(0.15),height:WINHEIGHT*(0.045),backgroundColor:'#ffffff',justifyContent:'center',alignItems:'center',borderRadius:3,shadowColor:'#515151',shadowOffset:{width:1,height:1},shadowRadius:1,*/}
                {/*shadowOpacity: 1.0,}}>*/}
                {/*<Text style={{fontSize:WINWIDTH*(0.04),color:'#696969'}} >金华</Text>*/}
                {/*</TouchableOpacity>*/}

                {/*</View>*/}


                <ListView style={{marginTop: 10}}
                          dataSource={this.state.dataSource}
                          renderRow={this._renderRow.bind(this)}
                          enableEmptySections={true}
                />




            </View>
        )
    }


    //跳转到城市列表
    _goCity(rowData) {
        this.props.navigator.push({
            name: 'gocity',
            component:NextCity,
            params: {
                rowData: rowData,

            }
        })
    }


    _renderRow(rowData) {

        return (
            <TouchableOpacity activeOpacity={1} style={{
                backgroundColor: '#ffffff'
            }}
                              onPress={() => {
                                  this._goCity(rowData)
                              }}>
                <View style={{

                    width: WINWIDTH,
                    height: WINHEIGHT * (0.07),
                    borderBottomColor: '#e6e6e6',
                    borderBottomWidth: 1,
                    flexDirection: 'row',
                    padding: WINWIDTH * (0.03),

                }}>
                    <View>

                        <Text style={styles.TX3}>{rowData}</Text>


                    </View>


                </View>


            </TouchableOpacity>
        )


    }


}


const styles = StyleSheet.create({


    TX3: {
        color: '#696969',
        marginLeft: WINWIDTH * (0.05),
        fontSize: WINWIDTH * (0.045),
        marginTop: WINHEIGHT * (0.01),
        width: WINWIDTH / 1.2,

    }


});


