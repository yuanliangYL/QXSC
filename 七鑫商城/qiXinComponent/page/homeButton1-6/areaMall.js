/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 *
 *
 *
 * [1,2,3,4].forEach(function (value, key, map) {

                            <TouchableOpacity style={{height:WINHEIGHT*(0.07),justifyContent:'center',marginLeft:10,borderBottomWidth:1,borderBottomColor:'#e6e6e6'
                            }}>
                                <Text style={{fontSize:WINWIDTH*(0.04),color:'#696969'}}>321</Text>
                            </TouchableOpacity>

                        })
 *
 *
 *
 *
 *
 *
 *
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
    RefreshControl,
    Alert,


} from 'react-native';

const  WINWIDTH = Dimensions.get('window').width;
const  WINHEIGHT = Dimensions.get('window').height;



import Modal from 'react-native-modalbox';
// import moment from 'moment';
import Geolocation from 'Geolocation';
// import StarRating from 'react-native-star-rating';

//头
import Tou from '../../../qiXinComponent/head/headBack';
//下级详情
import Details from '../../../qiXinComponent/page/near/Details';




export default class quyushangcheng extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});


        this.state = {
            dataSource: ds,
            province: '',//省
            city: '',//城市
            dist: '',//区域
            lat: '',
            lng: '',

            title: '',//分类名称
            sid: '',//分类id
            arr1: [],
            url: '',

            dataState: 0,


            isRefreshing: true,
            enableEmptySections: true,
        }

        global.getAgain1 = this.getAgain1.bind(this);
        global._lbsnow = this._lbsnow.bind(this);

        {
            this.getAera()
        }
    }

    showProductDetail(obj,obj2) {

        this.props.navigator.push({
            name: 'details',
            component:Details,
            params: {
                bid: obj,
                title:obj2,
            }

        })
    }

    //全部城市区域
    _allcity() {
        //全部区域
        fetch('http://' + ipdy + '/app_dev.php/business/getallbusiness/' + this.state.lat + '/' + this.state.lng + '/' + this.state.province + '/' + this.state.city)

            .then((response) => response.json())
            .then((responseJson) => {
                // console.log(responseJson)
                if (responseJson.code == 10000) {
                    if (responseJson.data.length) {
                        this.setState({
                            dataSource: this.state.dataSource.cloneWithRows(responseJson.data),
                            dataState: 1,
                        });
                        this.refs.modalJuli.close();
                    } else {
                        this.setState({
                            dataState: 0,
                        })
                    }
                } else {
                    this.setState({
                        dataState: 0,
                    })
                }


            })
            .catch((error) => {

            })

    }


    //获取指定区域的商铺列表
    mm(obj) {

        console.log(obj)

        fetch('http://' + ipdy + '/app_dev.php/business/disbusiness/' + this.state.lat + '/' + this.state.lng + '/' + this.state.province + '/' + this.state.city + '/' + obj)
            .then((response) => response.json())
            .then((responseJson) => {
            // console.log(responseJson)
                if (responseJson.code == 10000) {
                    //重新渲染dataSource
                    this.setState({dataSource: this.state.dataSource.cloneWithRows(responseJson.data)})
                    this.refs.modalJuli.close();
                } else {
                    Alert.alert(
                        '提示',
                        '暂无商家',
                        [
                            {text: '确定'},
                        ])
                }

                // alert(responseJson.msg)
            })
            .catch((error) => {

            })

    }

    //获取排序列表
    _good(obj) {
        if (obj == '好评优先') {
            var url = 'http://' + ipdy + '/app_dev.php/business/goodcomment/' + this.state.lat + '/' + this.state.lng + '/' + this.state.province + '/' + this.state.city
        } else if (obj == '智能排序') {
            var url = 'http://' + ipdy + '/app_dev.php/business/goodcomment/' + this.state.lat + '/' + this.state.lng + '/' + this.state.province + '/' + this.state.city
        } else if (obj == '离我最近') {
            var url = 'http://' + ipdy + '/app_dev.php/business/rebusiness/' + this.state.lat + '/' + this.state.lng + '/' + this.state.province + '/' + this.state.city
        } else if (obj == '人均最低') {
            var url = 'http://' + ipdy + '/app_dev.php/business/pricelower/' + this.state.lat + '/' + this.state.lng + '/' + this.state.province + '/' + this.state.city
        }


        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                if (responseJson.code == 10000) {
                    //重新渲染dataSource
                    this.setState({dataSource: this.state.dataSource.cloneWithRows(responseJson.res)})
                    this.refs.modalPaixu.close();

                } else {
                    Alert.alert(
                        '提示',
                        '暂无商家',
                        [
                            {text: '确定'},
                        ])
                }


            })
            .catch((error) => {

            })

    }

    //获取分类列表
    _fenlei(obj) {
        fetch('http://' + ipdy + '/app_dev.php/business/category')
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({categories: responseJson.data});

                // console.log(responseJson)

            }).catch((error) => {

        })


    }

    //获取分类cell下的商铺列表
    _fenleiCell(id) {
        fetch('http://' + ipdy + '/app_dev.php/business/categorybusiness/' + id + '/' + this.state.lat + '/' + this.state.lng + '/' + this.state.province + '/' + this.state.city)
            .then((response) => response.json())
            .then((responseJson) => {

                if (responseJson.code == 10000) {
                    //重新渲染dataSource
                    this.setState({dataSource: this.state.dataSource.cloneWithRows(responseJson.res)})
                    this.refs.modalFenlei.close();
                } else {
                    Alert.alert(
                        '提示',
                        '暂无商家',
                        [
                            {text: '确定'},
                        ])
                }
                // console.log(responseJson)

            }).catch((error) => {

        })

    }

    //定位当前城市刷新，测试。
    _lbsnow() {
        storage.load({
            key: 'lbscity',
            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的同步方法
            autoSync: true,
            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用同步方法的同时先返回已经过期的数据。
            // 设置为false的话，则始终强制返回同步方法提供的最新数据(当然会需要更多等待时间)。
            syncInBackground: true
        }).then(ret => {
            this.setState({
                province: ret.province,
                city: ret.city,
                lat: ret.lat,
                lng: ret.lng,
            })

            //通过经纬度api获取返回地理位置参数1
            fetch('http://api.map.baidu.com/geocoder/v2/?callback=&location='+ this.state.lat +','+ this.state.lng + '&output=json&pois=1&ak=7D4G5gyrX3tlsI0yN5qfqj1ukTBn9mO5')
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson),
                        this.setState({
                            city: responseJson.result.addressComponent.city,
                            province: responseJson.result.addressComponent.province,
                        })
                    //附近all接口

                    fetch('http://' + ipdy + '/app_dev.php/business/getallbusiness/' + this.state.lat + '/' + this.state.lng + '/' + this.state.province + '/' + this.state.city)

                        .then((response) => response.json())
                        .then((responseJson) => {


                            if (responseJson.code == 10000) {
                                if (responseJson.data.length) {
                                    this.setState({
                                        dataSource: this.state.dataSource.cloneWithRows(responseJson.data),
                                        dataState: 1,
                                    });

                                } else {
                                    this.setState({
                                        dataState: 0,
                                    })
                                }
                            } else {
                                this.setState({
                                    dataState: 0,
                                })
                            }


                            setTimeout(() => {
                                this.setState({isRefreshing: false});
                            }, 10);


                        })
                        .catch((error) => {

                        })

                    // console.log(this.state.city)


                }).catch((error) => {
                console.error(error);

            });

        })
            .catch((error) => {

            })

        {
            this.getAera()
        }
    }


    getAgain1() {
        storage.load({
            key: 'lbscity',
            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的同步方法
            autoSync: true,
            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用同步方法的同时先返回已经过期的数据。
            // 设置为false的话，则始终强制返回同步方法提供的最新数据(当然会需要更多等待时间)。
            syncInBackground: true
        }).then(ret => {
            this.setState({
                province: ret.province,
                city: ret.city,
                lat: ret.lat,
                lng: ret.lng,
            })

            //通过经纬度api获取返回地理位置参数1
            fetch('http://api.map.baidu.com/geocoder/v2/?callback=&location='+ this.state.lat +','+ this.state.lng + '&output=json&pois=1&ak=7D4G5gyrX3tlsI0yN5qfqj1ukTBn9mO5')
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson),
                        this.setState({
                            city: responseJson.result.addressComponent.city,
                            province: responseJson.result.addressComponent.province,
                        })
                    //附近all接口

                    fetch('http://' + ipdy + '/app_dev.php/business/getallbusiness/' + this.state.lat + '/' + this.state.lng + '/' + this.state.province + '/' + this.state.city)

                        .then((response) => response.json())
                        .then((responseJson) => {


                            if (responseJson.code == 10000) {
                                if (responseJson.data.length) {
                                    this.setState({
                                        dataSource: this.state.dataSource.cloneWithRows(responseJson.data),
                                        dataState: 1,
                                    });

                                } else {
                                    this.setState({
                                        dataState: 0,
                                    })
                                }
                            } else {
                                this.setState({
                                    dataState: 0,
                                })
                            }


                            setTimeout(() => {
                                this.setState({isRefreshing: false});
                            }, 10);


                        })
                        .catch((error) => {

                        })

                    // console.log(this.state.city)


                }).catch((error) => {
                console.error(error);

            });

        })
            .catch((error) => {

            })

        {
            this.getAera()
        }
    }


    componentDidMount() {

        storage.load({
            key: 'lbscity',
            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的同步方法
            autoSync: true,
            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用同步方法的同时先返回已经过期的数据。
            // 设置为false的话，则始终强制返回同步方法提供的最新数据(当然会需要更多等待时间)。
            syncInBackground: true
        }).then(ret => {
            this.setState({
                province: ret.province,
                city: ret.city,
                lat: ret.lat,
                lng: ret.lng,
            })


            //通过经纬度api获取返回地理位置参数1
            fetch('http://api.map.baidu.com/geocoder/v2/?callback=&location='+ this.state.lat +','+ this.state.lng + '&output=json&pois=1&ak=7D4G5gyrX3tlsI0yN5qfqj1ukTBn9mO5')
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson),
                        this.setState({
                            city: responseJson.result.addressComponent.city,
                            province: responseJson.result.addressComponent.province,
                        })
                    //附近all接口
                    fetch('http://' + ipdy + '/app_dev.php/business/getallbusiness/' + this.state.lat + '/' + this.state.lng + '/' + this.state.province + '/' + this.state.city)

                        .then((response) => response.json())
                        .then((responseJson) => {

                            if (responseJson.code == 10000) {
                                if (responseJson.data.length) {
                                    this.setState({
                                        dataSource: this.state.dataSource.cloneWithRows(responseJson.data),
                                        dataState: 1,
                                    });

                                } else {
                                    this.setState({
                                        dataState: 0,
                                    })
                                }
                            } else {
                                this.setState({
                                    dataState: 0,
                                })
                            }

                            setTimeout(() => {
                                this.setState({isRefreshing: false});
                            }, 10);


                        })
                        .catch((error) => {

                        })

                    // console.log(this.state.city)


                }).catch((error) => {
                console.error(error);

            });

        })
            .catch((error) => {

            })


        this._fenlei();
        {
            this.getAera()
        }

    }

    getAera() {

        storage.load({
            key: 'clickCity',
            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的同步方法
            autoSync: true,
            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用同步方法的同时先经过期的数据。
            // 设置为false的话，则始终强制返回同步方法提供的最新数据(当然会需要更多等待时间)。
            syncInBackground: true
        }).then(ret => {
            // console.log(ret.clickCity, ret.xiaoqu)
            var allxiaoqu = [];

            for (var i = 0; i < ret.clickCity.length; i++) {
                if (ret.clickCity[i].name == ret.xiaoqu) {
                    allxiaoqu = ret.clickCity[i].area;
                } else {
                    continue;
                }
            }
            this.setState({allxiaoqu: allxiaoqu})
            // console.log(allxiaoqu)

        }).catch((error) => {

        })


        {/*var provence = China.china,*/
        }
        {/*cityArr = [];*/
        }

        {/*for(var i = 0 ; i < provence.length; i ++){*/
        }


        //         for (var j = 0; j < provence[i].city.length; j ++){
        //
        //             // console.log(provence[i].city[j])
        //             console.log(this.state.city)
        //             console.log(provence[i].city[j].name)
        //             if(this.state.city == provence[i].city[j].name+'shi') {
        //                 console.log('currect')
        //                 for (var k = 0; k < provence[i].city[j].area.length; k++) {
        //                     let fenqu = provence[i].city[j].fenqu[k]
        //                     cityArr.push(fenqu)
        //                 }
        //             }
        //         }
        //     }
        //     this.setState({allAera:cityArr})
        //     console.log(cityArr,111);
    }

    _renderRow(rowData) {
        return (

            <TouchableOpacity style={{

            }} onPress={() => {
                this.showProductDetail(rowData.id,rowData)
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

    renderxiaoqu() {
        var arr = [];

        for (var i = 0; i < this.state.allxiaoqu.length; i++) {
            arr.push(
                <TouchableOpacity key={i} onPress={this.mm.bind(this, this.state.allxiaoqu[i])} style={{
                    height: WINHEIGHT * (0.07),
                    justifyContent: 'center',
                    marginLeft: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: '#e6e6e6'
                }}>
                    <Text style={{fontSize: WINWIDTH * (0.04), color: '#696969'}}>{this.state.allxiaoqu[i]}</Text>
                </TouchableOpacity>
            )
        }
        return arr;
    }

    _dataView() {
        return (
            <View style={{flex:1}}>
                <Tou title="附近商家" navigator={this.props.navigator}/>
                <View style={{flex: 1,backgroundColor:'#ffffff' }}>

                    {/*列表上分类栏*/}
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => this.refs.modalJuli.open()}
                                          style={{
                                          backgroundColor: '#ffffff',
                                          flex: 1,
                                          height: WINHEIGHT * (0.06),
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          borderBottomWidth: 1,
                                          borderBottomColor: '#e6e6e6'
                                      }}>
                            <Text>区域</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.refs.modalFenlei.open()}
                                          style={{
                                          backgroundColor: '#ffffff',
                                          flex: 1,
                                          height: WINHEIGHT * (0.06),
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          borderBottomWidth: 1,
                                          borderBottomColor: '#e6e6e6'
                                      }}>
                            <Text>分类</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.refs.modalPaixu.open()}
                                          style={{
                                          backgroundColor: '#ffffff',
                                          flex: 1,
                                          height: WINHEIGHT * (0.06),
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          borderBottomWidth: 1,
                                          borderBottomColor: '#e6e6e6'
                                      }}>
                            <Text>排序</Text>
                        </TouchableOpacity>

                    </View>


                    <View style={{marginLeft: 10, backgroundColor: '#ffffff', flex: 1,}}>
                        <ListView style={{}}
                                  dataSource={this.state.dataSource}
                                  renderRow={this._renderRow.bind(this)}
                                  enableEmptySections={true}
                                  refreshControl={
                                  <RefreshControl
                                      refreshing={this.state.isRefreshing}
                                      onRefresh={this.getAgain1.bind(this)}
                                      tintColor="#ff0000"
                                      title="玩命加载中..."
                                  />
                              }
                        />


                    </View>
                    {/*区域*/}
                    <Modal animationType={'none'} style={{width: WINWIDTH, height: WINHEIGHT * (0.7)}} position={"bottom"}
                           ref={"modalJuli"}>
                        <ScrollView style={{marginBottom: 50}}>
                            <TouchableOpacity onPress={this._allcity.bind(this)} style={{
                            height: WINHEIGHT * (0.07),
                            justifyContent: 'center',
                            marginLeft: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: '#e6e6e6'
                        }}>
                                <Text style={{fontSize: WINWIDTH * (0.04), color: '#696969'}}>全部</Text>
                            </TouchableOpacity>

                            {/*城市区域选择*/}
                            {this.renderxiaoqu()}

                        </ScrollView>
                    </Modal>
                    {/*分类*/}
                    <Modal animationType={'none'} style={{width: WINWIDTH, height: WINHEIGHT * (0.7)}} position={"bottom"}
                           ref={"modalFenlei"}>
                        <ScrollView style={{marginBottom: 50}}>
                            {
                                /**
                                 * Each child in an array or iterator should have a unique "key" prop. Check the render method of `lbsv  这个错误需要一个key属性
                                 *   key={i} onPress={this._fenleiCell.bind(this,x.id)}
                                 * **/

                                this.state.categories ? (this.state.categories).map((x, i) => {
                                    return (<TouchableOpacity key={i} onPress={this._fenleiCell.bind(this, x.id)}
                                                              ref={"fenleiCell"} style={{
                                    height: WINHEIGHT * (0.07),
                                    justifyContent: 'center',
                                    marginLeft: 10,
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#e6e6e6'
                                }}>
                                        <Text style={{fontSize: WINWIDTH * (0.04), color: '#696969'}}>{x.title}</Text>
                                    </TouchableOpacity>);


                                }) : ''


                            }
                        </ScrollView>


                    </Modal>
                    {/*排序*/}
                    <Modal animationType={'none'} style={{width: WINWIDTH, height: WINHEIGHT * (0.7)}} position={"bottom"}
                           ref={"modalPaixu"}>
                        <TouchableOpacity onPress={this._good.bind(this, '智能排序')} style={{
                        height: WINHEIGHT * (0.07),
                        justifyContent: 'center',
                        marginLeft: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: '#e6e6e6'
                    }}>
                            <Text style={{fontSize: WINWIDTH * (0.04), color: '#696969'}}>智能排序</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this._good.bind(this, '好评优先')} style={{
                        height: WINHEIGHT * (0.07),
                        justifyContent: 'center',
                        marginLeft: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: '#e6e6e6'
                    }}>
                            <Text style={{fontSize: WINWIDTH * (0.04), color: '#696969'}}>好评优先</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this._good.bind(this, '离我最近')} style={{
                        height: WINHEIGHT * (0.07),
                        justifyContent: 'center',
                        marginLeft: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: '#e6e6e6'
                    }}>
                            <Text style={{fontSize: WINWIDTH * (0.04), color: '#696969'}}>离我最近</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this._good.bind(this, '人均最低')} style={{
                        height: WINHEIGHT * (0.07),
                        justifyContent: 'center',
                        marginLeft: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: '#e6e6e6'
                    }}>
                            <Text style={{fontSize: WINWIDTH * (0.04), color: '#696969'}}>人均最低</Text>
                        </TouchableOpacity>
                    </Modal>


                </View>
            </View>

        )
    }

    _noDataView() {
        return (
            <View style={{flex:1}}>
                <Tou title="附近商家" navigator={this.props.navigator}/>

                <View style={{
                flex: 1,
                backgroundColor: '#ffffff',
                justifyContent: 'center',
                alignItems: 'center'
            }}>

                    <Text style={{fontSize: WINWIDTH * 0.04, color: '#696969'}}>
                        该地区暂无商铺入驻，请选择其他区域
                    </Text>
                </View>
            </View>

        )

    }


    render() {
        if (this.state.dataState == 1) {
            return (
                this._dataView()
            )
        } else {
            return (
                this._noDataView()
            )
        }


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

