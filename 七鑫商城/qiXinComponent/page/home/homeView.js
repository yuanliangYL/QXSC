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
    InteractionManager,
    RefreshControl,
    Alert,
    Linking,
    Platform,



} from 'react-native';



const WINWIDTH = Dimensions.get('window').width;
const WINHEIGHT = Dimensions.get('window').height;


import Swiper from 'react-native-swiper';

import Quyushangcheng from '../homeButton1-6/areaMall';

import MallView from '../mall/MallView';
import Geolocation from 'Geolocation';

//网络类
import HttpUtlis from '../../tool/HttpUtils';



//头
import Tou from '../../../qiXinComponent/head/head';

//搜索
import Search from '../../../qiXinComponent/page/homeButton1-6/qiXinZhuanGong';
//详情
import MallD from  '../../page/mall/mallDetail';

//城市列表
import NextArea from '../../../qiXinComponent/page/lbs/area';
//赠送宝石
import JiFen from '../../../qiXinComponent/page/myView/myWallet/baoshiList';
//我的消息
import MyXiaoXi from '../../../qiXinComponent/page/homeButton1-6/myXiaoXi';
//-----我的钱包
import QiXinZhuanGong from '../../page/myView/myWallet/myWallet';


var cachesData = {
    orderList:[],
    page:1
}

class main extends Component {

    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            dataSource: ds,
            dataState: 0,
            imgurls: '',
            AD:[],
            homeimage:[],
            city:'定位中',

            isRefreshing: true,
            enableEmptySections:true,




            orderIDs:[],     //声明一个空的订单id数组
            orderList:[],

            //初始默认经纬度(南昌)

        }
        if(Platform.OS === 'ios'){
            this._version(2);
        }
        if(Platform.OS === 'android'){
            this._version(1);
        }

        global._reHome = this._reHome.bind(this)

        //设置全局方法，刷新首页区域名
        global.changeCity = this.changeCity.bind(this)

        storage.save({
            key: 'city',  //注意:请不要在key中使用_下划线符号!
            rawData: {
                uid: this.state.uid,
                phone: this.state.phone
            },

            // 如果不指定过期时间，则会使用defaultExpires参数
            // 如果设为null，则永不过期
            expires: null
        });


        // this._dddddd();
    }

    //index.php?s=/Home/APPGoods/getSevenCheepGoods/slug/0/pageNum/1/size/6

    //首页城市显示
    changeCity(obj) {
        this.setState({
            city: obj
        })
    }



    //首页分类二级页面
    _page2(id){
        this.props.navigator.push({
            name: 'erjifenlei',
            params: {
                id:id,
            }
        })
    }

    // //首页商户推荐5版块
    // _tuij(id){
    //     this.props.navigator.push({
    //         name: 'details',
    //         params: {
    //             'bid': id,
    //         }
    //     })
    // }

    //刷新首页
    _reHome(obj1, obj2) {
        this.setState({
            lat: obj1,
            lng: obj2,

        })

        this._data()

    }

    //检查版本更新
    _version(obj){
        storage.load({
            key: 'version',
            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的同步方法
            autoSync: true,
            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用同步方法的同时先返回已经过期的数据。
            // 设置为false的话，则始终强制返回同步方法提供的最新数据(当然会需要更多等待时间)。
            syncInBackground: true
        }).then(ret => {
            if (ret) {
                // console.log(ret.version)

                console.log('http://' + ipdy + '/app_dev.php/business/getversion/'+obj)

                fetch('http://' + ipdy + '/index.php?s=/Home/APPSetting/getVersion/type/'+obj)
                    .then((response) => response.json())
                    .then((responseJson) => {
                        // console.log(responseJson)

                        if(responseJson.code==10000){

                            if(ret.version<responseJson.data[0].version){

                                this.setState({
                                    version: responseJson.data[0].version,
                                    vurl:responseJson.data[0].link,
                                })
                                Alert.alert(
                                    '新版本提示',
                                    '检测到有新版本，是否更新版本',
                                    [
                                        {text: '取消', },
                                        {text: '确定',onPress:this._gengxin.bind(this,this.state.version,this.state.vurl)},
                                    ])


                            }

                        }
                    })
                    .catch((error) => {

                    })



            }


        }).catch(err => {
            console.log('http://' + ipdy + '/app_dev.php/business/getversion/'+obj)

            fetch('http://' + ipdy + '/index.php?s=/Home/APPSetting/getVersion/type/'+obj)
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson)

                    if(responseJson.code==10000){
                        storage.save({
                            key: 'version',  //注意:请不要在key中使用_下划线符号!
                            rawData: {
                                version: responseJson.data[0].version,
                                vurl:responseJson.data[0].link,
                            },
                            // 如果不指定过期时间，则会使用defaultExpires参数
                            // 如果设为null，则永不过期
                            expires: null
                        });

                    }
                })
                .catch((error) => {

                })

        })


    }


    _gengxin(obj1,obj2){
        storage.save({
            key: 'version',  //注意:请不要在key中使用_下划线符号!
            rawData: {
                version:obj1,
            },
            // 如果不指定过期时间，则会使用defaultExpires参数
            // 如果设为null，则永不过期
            expires: null
        });
        Linking.openURL(obj2).catch(e=>console.war(e));
    }


    //7个推荐
    button8(){
        var url = 'http://'+ipdy+'/index.php?s=/Home/APPGoods/getSevenCheepGoods/slug/0/pageNum/1/size/8';

        HttpUtlis.get(url)
            .then(result=>{
                console.log(result)
                // console.log(result.data[0].id)
                this.setState({
                    imgurlqx1:result.data[0].imgurl,
                    imgurlqx2:result.data[1].imgurl,
                    imgurlqx3:result.data[2].imgurl,
                    imgurlqx4:result.data[3].imgurl,
                    imgurlqx5:result.data[4].imgurl,
                    imgurlqx6:result.data[5].imgurl,
                    imgurlqx7:result.data[6].imgurl,

                    imgurlid1:result.data[0].id,
                    imgurlid2:result.data[1].id,
                    imgurlid3:result.data[2].id,
                    imgurlid4:result.data[3].id,
                    imgurlid5:result.data[4].id,
                    imgurlid6:result.data[5].id,
                    imgurlid7:result.data[6].id,

                    name1:result.data[0].name,
                    name2:result.data[1].name,
                    name3:result.data[2].name,
                    name4:result.data[3].name,
                    name5:result.data[4].name,
                    name6:result.data[5].name,
                    name7:result.data[6].name,

                    yj1:result.data[0].cost_price,
                    yj2:result.data[1].cost_price,
                    yj3:result.data[2].cost_price,
                    yj4:result.data[3].cost_price,
                    yj5:result.data[4].cost_price,
                    yj6:result.data[5].cost_price,
                    yj7:result.data[6].cost_price,

                    xj1:result.data[0].present_price,
                    xj2:result.data[1].present_price,
                    xj3:result.data[2].present_price,
                    xj4:result.data[3].present_price,
                    xj5:result.data[4].present_price,
                    xj6:result.data[5].present_price,
                    xj7:result.data[6].present_price,



                })



            })
            .catch(error=>{
                console.log(error)
            })
    }

    ASCII(){
        str="12";


        'uid=1&personid=22&gender=1&key=pass4yigoufujia!!'

        code = str.charCodeAt();


        console.log(code)
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

            changeCity(ret.city);
            _reHome(ret.lat, ret.lng)
        })
            .catch((error) => {

                Geolocation.getCurrentPosition((data) => {

                    _reHome(data.coords.latitude.toString(), data.coords.longitude.toString())


                    fetch('http://api.map.baidu.com/geocoder/v2/?callback=&location=' +data.coords.latitude.toString()+ ',' + data.coords.longitude.toString()+ '&output=json&pois=1&ak=7D4G5gyrX3tlsI0yN5qfqj1ukTBn9mO5')
                        .then((response) => response.json())
                        .then((responseJson) => {
                            console.log(responseJson)

                            changeCity(responseJson.result.addressComponent.city);

                        })
                        .catch((error) => {

                        });



                }, () => {
                });


                // changeCity('成都');


            })
        this._homepage();

        this._AD();
        this.button8();
        this._all()


    }






    //推荐下级页面
    _qidai(obj){
        console.log(obj)
        this.props.navigator.push({
            name:'qixinzhuangong',
            component:QiXinZhuanGong,
            params:{
                qid:obj,
            }

        })


    }
    //首页中间广告
    _AD(){
        fetch('http://' + ipdy + '/business/getbannerofmiddle')
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log(responseJson)
                var arrAll =[];
                var str = JSON.parse(responseJson.data[0].imgurls);

                for (var j = 0; j< str.length; j++) {
                    arrAll.push(str[j]);

                }
                // console.log(arrAll)

                this.setState({
                    AD:arrAll
                })


            })
            .catch((error) => {

            })
    }

    _renderPage(){
        var arr =[]
        for (var i=0;i<this.state.AD.length;i++){
            arr.push(
                <View key={i} style={styles.slide1}>
                    <Image source={{uri: 'http://' + tu + '/Uploads/' + this.state.AD[i]}}
                           style={{width: WINWIDTH*0.98, height: WINHEIGHT * (0.13)}}/>
                </View>

            )
        }
        return arr



    }


    //搜索二级页面
    _search(){
        this.props.navigator.push({
            name: 'search',
            component:Search,
            params: {
                lat:this.state.lat,
                lng:this.state.lng,
            }
        })


        // const {navigator} =this.props;
        // if(navigator) {
        //     navigator.push({
        //         name:'search',
        //         component:Search,
        //         // params: {
        //         //             lat:this.state.lat,
        //         //             lng:this.state.lng,
        //         //         }
        //     })
        // }
    }


    //首页全部按钮的接口
    _allbuttom(){

        // console.log('http://' + ipdy + '/business/getallbusiness/' + this.state.lat + '/' + this.state.lng + '/' + this.state.province + '/' + this.state.city)

        fetch('http://' + ipdy + '/business/getallbusiness/' + this.state.lat + '/' + this.state.lng + '/' + this.state.province + '/' + this.state.city)
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log(responseJson)

            })
            .catch((error) => {

            })
    }




    //获取首页10个分类button
    _button10(){
        // console.log('http://' + ipdy + '/business/getbusinesscategory')

        fetch('http://' + ipdy + '/business/getbusinesscategory')
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log(responseJson)
                    this.setState({
                        id0:responseJson.data[0].id,
                        id1:responseJson.data[1].id,
                        id2:responseJson.data[2].id,
                        id3:responseJson.data[3].id,
                        id4:responseJson.data[4].id,
                        id5:responseJson.data[5].id,
                        id6:responseJson.data[6].id,
                        id7:responseJson.data[7].id,
                        id8:responseJson.data[8].id,
                        id9:responseJson.data[9].id,

                        imgurl0:responseJson.data[0].imgurl,
                        imgurl1:responseJson.data[1].imgurl,
                        imgurl2:responseJson.data[2].imgurl,
                        imgurl3:responseJson.data[3].imgurl,
                        imgurl4:responseJson.data[4].imgurl,
                        imgurl5:responseJson.data[5].imgurl,
                        imgurl6:responseJson.data[6].imgurl,
                        imgurl7:responseJson.data[7].imgurl,
                        imgurl8:responseJson.data[8].imgurl,
                        imgurl9:responseJson.data[9].imgurl,

                        title0:responseJson.data[0].title,
                        title1:responseJson.data[1].title,
                        title2:responseJson.data[2].title,
                        title3:responseJson.data[3].title,
                        title4:responseJson.data[4].title,
                        title5:responseJson.data[5].title,
                        title6:responseJson.data[6].title,
                        title7:responseJson.data[7].title,
                        title8:responseJson.data[8].title,
                        title9:responseJson.data[9].title,
                    })
            })
            .catch((error) => {

            })
    }

    //首页轮播图
    _homepage() {

        fetch('http://' + ipdy + '/index.php?s=/Home/APPSetting/getBannerPic/type/1')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                var arrAll =[];
                var str = JSON.parse(responseJson.data[0].imgurls);

                for (var j = 0; j< str.length; j++) {
                    arrAll.push(str[j]);

                }
                // console.log(arrAll)

                this.setState({
                    homeimage:arrAll
                })
            })
            .catch((error) => {

            })
    }

    _homeimage(){
        var arr =[]
        for (var i=0;i<this.state.homeimage.length;i++){
            arr.push(

                <View key={i} >
                    <Image source={{uri: 'http://' + ipdy + '/Uploads/' + this.state.homeimage[i]}}
                           style={{width: WINWIDTH, resizeMode:'cover',height:WINHEIGHT*0.3}}

                    />
                </View>

            )
        }
        return arr

    }

    //获取推荐的5个商家
    _mall5(){

        fetch('http://' + ipdy + '/business/gettuijianbusiness/' + this.state.lat + '/' + this.state.lng + '/' + this.state.province + '/' + this.state.city)
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log(responseJson)
                this.setState({
                    id00:responseJson.res[0].id,
                    id01:responseJson.res[1].id,
                    id02:responseJson.res[2].id,
                    id03:responseJson.res[3].id,
                    id04:responseJson.res[4].id,

                    title00:responseJson.res[0].title,
                    title01:responseJson.res[1].title,
                    title02:responseJson.res[2].title,
                    title03:responseJson.res[3].title,
                    title04:responseJson.res[4].title,

                    price00:responseJson.res[0].price,
                    price01:responseJson.res[1].price,
                    price02:responseJson.res[2].price,
                    price03:responseJson.res[3].price,
                    price04:responseJson.res[4].price,

                    imgurl00:responseJson.res[0].imgurl,
                    imgurl01:responseJson.res[1].imgurl,
                    imgurl02:responseJson.res[2].imgurl,
                    imgurl03:responseJson.res[3].imgurl,
                    imgurl04:responseJson.res[4].imgurl,

                    dis00:responseJson.res[0].dis,
                    dis01:responseJson.res[1].dis,
                    dis02:responseJson.res[2].dis,
                    dis03:responseJson.res[3].dis,
                    dis04:responseJson.res[4].dis,
                })

            })
            .catch((error) => {
            })

    }


    _data() {
        InteractionManager.runAfterInteractions(() => {
            //通过经纬度api获取返回地理位置参数
            fetch('http://api.map.baidu.com/geocoder/v2/?callback=&location=' + this.state.lat + ',' + this.state.lng + '&output=json&pois=1&ak=7D4G5gyrX3tlsI0yN5qfqj1ukTBn9mO5')
                .then((response) => response.json())
                .then((responseJson) => {
                    // console.log(responseJson),
                        this.setState({
                            city: responseJson.result.addressComponent.city,
                            province: responseJson.result.addressComponent.province,
                        }),
                        //最近十条接口
                        // console.log('http://' + ipdy + '/app_dev.php/business/gettenbusiness/' + this.state.lat + '/' + this.state.lng + '/' + this.state.province + '/' + this.state.city)

                    fetch('http://' + ipdy + '/app_dev.php/business/gettenbusiness/' + this.state.lat + '/' + this.state.lng + '/' + this.state.province + '/' + this.state.city)
                        .then((response) => response.json())
                        .then((responseJson) => {
                            // console.log(responseJson)
                            if (responseJson.code == 10000) {
                                this.setState({
                                    dataSource: this.state.dataSource.cloneWithRows(responseJson.data),
                                    dataState: 1
                                })
                            } else if (responseJson.code == 10001) {
                                this.setState({dataState: 0})
                            }
                        })
                        .catch((error) => {
                        })

                    this._allbuttom();
                    this._mall5();

                }).catch((error) => {
                console.error(error);

            });



        });

    }
    //全部
    _all(){
        var url = 'http://'+ipdy+'/index.php?s=/Home/APPGoods/getTuiJianGoods/pageNum/'+cachesData.page+'/size/6'

        HttpUtlis.get(url)
            .then(result=>{
                console.log(result)
                if (result.code == 10000) {
                    var dataArr = [];
                    for (var i = 0; i < result.data.length; i++) {

                        dataArr.push({
                            id: result.data[i].id,
                            cost_price: result.data[i].cost_price,
                            // pids: pidsArr,
                            imgurl: result.data[i].imgurl,
                            name: result.data[i].name,

                            present_price:result.data[i].present_price,

                        });
                    }

                    cachesData.orderList = dataArr;
                    cachesData.page  += 1;

                    this.setState({dataSource:this.state.dataSource.cloneWithRows(cachesData.orderList),isRefreshing:false})

                }else {
                    this.setState({orderList: []});
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
    _getMore(){
        var url = 'http://'+ipdy+'/index.php?s=/Home/APPGoods/getTuiJianGoods/pageNum/'+cachesData.page+'/size/6'

        HttpUtlis.get(url)
            .then(result=>{
                console.log(result)
                if (result.code == 10000) {
                    var dataArr = [];
                    for (var i = 0; i < result.data.length; i++) {

                        dataArr.push({
                            id: result.data[i].id,
                            cost_price: result.data[i].cost_price,
                            // pids: pidsArr,
                            imgurl: result.data[i].imgurl,
                            name: result.data[i].name,

                            present_price:result.data[i].present_price,

                        });
                    }
                    let arr = cachesData.orderList.concat(dataArr);
                    cachesData.orderList = arr;
                    cachesData.page  += 1;

                    this.setState({dataSource:this.state.dataSource.cloneWithRows(cachesData.orderList),isRefreshing:false})

                }else {
                    this.setState({orderList: []});
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

        this._getMore()

    }

//首页list样式数据2
    _renderRow(rowData){

        return(


                <View style={{width:WINWIDTH*0.5,height:WINHEIGHT*0.3,justifyContent:'center',alignItems:'center',flexWrap:'wrap',backgroundColor:'#e5e5e5',marginTop:WINHEIGHT*0.02}}>
                    <TouchableOpacity onPress={()=> {this.showProductDetail(rowData.id)}} style={{width:WINWIDTH*0.45,height:WINHEIGHT*0.3,justifyContent:'center',alignItems:'center',backgroundColor:'#ffffff'}}>
                        <Image source ={{uri:'http://'+ipdy+'/Uploads/'+rowData.imgurl}} style = {{width:WINWIDTH*0.4, height:WINHEIGHT*0.15}}/>

                        <View style={{width:WINWIDTH*0.4,height:WINHEIGHT*0.08,justifyContent:'center',backgroundColor:'#ffffff'}}>
                            <Text style={{color: '#696969', fontSize: WINHEIGHT*0.015}}>{rowData.name}</Text>
                        </View>
                        <View style={{width:WINWIDTH*0.4,height:WINHEIGHT*0.03,flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:'#ffffff'}}>
                            <Text style={{color: '#696969', fontSize: WINHEIGHT * (0.01)}}>原价:{rowData.cost_price}</Text>
                            <Text style={{color: 'red', fontSize: WINHEIGHT * (0.012)}}>现价:{rowData.present_price}</Text>
                        </View>

                    </TouchableOpacity>
                </View>

        )
    }


    shouye4button(obj){
        storage.load({
            key: 'userinfo2',
            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的同步方法
            autoSync: true,
            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用同步方法的同时先返回已经过期的数据。
            // 设置为false的话，则始终强制返回同步方法提供的最新数据(当然会需要更多等待时间)。
            syncInBackground: true
        }).then(ret => {
            if(obj==1){
                //我的消息
                this.props.navigator.push({
                    name: 'wodexiaoxi',
                    component:MyXiaoXi,
                    params: {}
                })
            }
            if(obj==2){
                //我的宝石
                this.props.navigator.push({
                    name: 'djzhongbao',
                    component:JiFen,
                    params: {}
                })
            }
            if(obj==3){
                //我的钱包
                this.props.navigator.push({
                    name:'qixinzhuangong',
                    component:QiXinZhuanGong,
                    params:{

                    }
                })
            }
            if(obj==4){

            }



        }).catch(err => {
            Alert.alert(
                '提示',
                '未登录，请先登录',
                [

                    {text: '确定', },
                ])
            //如果没有找到数据且没有同步方法，
            //或者有其他异常，则在catch中返回
        })
    }




    //商铺点击详情
    showProductDetail(obj,obj2) {
        this.props.navigator.push({
            name: 'details',
            component:MallD,
            params: {
               pid:obj

            }
        })
    }

    //城市列表
    _nextArea(){
        this.props.navigator.push({
            name:'area',
            component:NextArea,
            params:{

            }
        })

    }
    //



    //首页有数据

    _dataView() {
        return (
            <View style={{flex: 1, backgroundColor: '#ffffff',marginBottom:50 }}>

                {/*导航头*/}
                <View style={{width:WINWIDTH,height:Platform.OS == 'ios' ? 20: WINHEIGHT*(0.02),backgroundColor:filecolor,}}></View>
                <View style={{backgroundColor:filecolor,width:WINWIDTH,height:Platform.OS == 'ios' ? 44: WINHEIGHT*(0.06),flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>

                    <View style={{width:WINWIDTH*(0.15),height:Platform.OS == 'ios' ? 44: WINHEIGHT*(0.06),flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <TouchableOpacity activeOpacity={1} onPress={this._search.bind(this)} style={{height:WINHEIGHT*0.06,width:WINWIDTH*(0.15),justifyContent:'center',alignItems:'center',borderRightWidth:0.5,borderRightColor:'#ffffff'}}>
                           <Text style={{color:'#ffffff',fontSize:WINWIDTH*0.035}}>搜索</Text>
                        </TouchableOpacity>
                    </View>



                    <TouchableOpacity  style={{width:WINWIDTH*(0.7),height:Platform.OS == 'ios' ? 44 : WINHEIGHT*(0.06),justifyContent:'center',alignItems:'center',}}>
                        <Text style={{fontSize:WINWIDTH*(0.04),color:'#f6f6f6',backgroundColor:'transparent'}}>首页</Text>
                    </TouchableOpacity>


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
                <ScrollView style={{flex: 1, backgroundColor: '#ffffff',}}
                            refreshControl={
              <RefreshControl
                  refreshing={this.state.isRefreshing}
                  onRefresh={this.getAgain.bind(this)}
                  tintColor="#ff0000"
                  title="玩命加载中..."
              />
          }

                >

                    {/*顶部轮播图*/}
                    <Swiper width={WINWIDTH} height={WINHEIGHT * (0.3)} autoplay={true}
                            showsPagination={true} autoplayout={2.0}>
                        {
                            this._homeimage()
                        }
                    </Swiper>






                    {/*搜索框*/}
                    {/*<TouchableOpacity onPress={this._search.bind(this)} style={{width:WINWIDTH,height:WINHEIGHT*0.055,backgroundColor:'#EFEDF4',justifyContent:'center',alignItems:'center',flexDirection:'row',}}>*/}
                        {/*<View style={{width:WINWIDTH*0.8,height:WINHEIGHT*0.04,borderRadius:6,justifyContent:'center',alignItems:'center',backgroundColor:'#ffffff'}}>*/}
                            {/*<Text style={{fontSize:WINWIDTH*0.035,color:'#696969'}}>请输入搜索内容</Text>*/}
                        {/*</View>*/}
                        {/*<Text style={{fontSize:WINWIDTH*0.035, color:'#696969',marginLeft:10}}>*/}
                            {/*搜索*/}
                        {/*</Text>*/}
                    {/*</TouchableOpacity>*/}

                    <View style={{width:WINWIDTH,height:WINHEIGHT*0.11,justifyContent:'center',alignItems:'center',borderBottomColor: '#e6e6e6',
                        borderBottomWidth:2,}}>
                        <View style={{width:WINWIDTH*0.8,height:WINHEIGHT*0.1,justifyContent:'space-between',flexDirection:'row',alignItems:'center'}}>
                            <TouchableOpacity onPress={this.shouye4button.bind(this,1)} style={{alignItems:'center',justifyContent:'center'}}>
                                <Image source={require('../../../yg/股东特权.png')}
                                       style={{width:WINHEIGHT*0.06, height: WINHEIGHT*0.06}}/>
                                <Text style={{fontSize:WINWIDTH*0.025,color:'#696969',marginTop:2}}>我的消息</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.shouye4button.bind(this,3)} style={{alignItems:'center',justifyContent:'center'}}>
                                <Image source={require('../../../yg/新手礼物.png')}
                                       style={{width:WINHEIGHT*0.06, height: WINHEIGHT*0.06}}/>
                                <Text style={{fontSize:WINWIDTH*0.025,color:'#696969',marginTop:2}}>我的钱包</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.shouye4button.bind(this,2)} style={{alignItems:'center',justifyContent:'center'}}>
                                <Image source={require('../../../yg/宝石.png')}
                                       style={{width:WINHEIGHT*0.06, height: WINHEIGHT*0.06}}/>
                                <Text style={{fontSize:WINWIDTH*0.025,color:'#696969',marginTop:2}}>赠送宝石</Text>
                            </TouchableOpacity>
                            <TouchableOpacity  style={{alignItems:'center',justifyContent:'center'}}>
                                <Image source={require('../../../yg/联系我们.png')}
                                       style={{width:WINHEIGHT*0.06, height: WINHEIGHT*0.06}}/>
                                <Text style={{fontSize:WINWIDTH*0.025,color:'#696969',marginTop:2}}>联系我们</Text>
                            </TouchableOpacity>

                        </View>

                        {/*<View style={{width:WINWIDTH*0.75,height:WINHEIGHT*0.1,justifyContent:'space-between',flexDirection:'row',alignItems:'center'}}>*/}

                            {/*<TouchableOpacity onPress={this._FuJinMall.bind(this)} style={{alignItems:'center',justifyContent:'center'}}>*/}
                                {/*<Image source={require('../../../newQx/t4.png')}*/}
                                       {/*style={{width:WINHEIGHT*0.06, height: WINHEIGHT*0.06}}/>*/}
                                {/*<Text style={{fontSize:WINWIDTH*0.025,color:'#696969',marginTop:2}}>附近商家</Text>*/}
                            {/*</TouchableOpacity>*/}

                        {/*</View>*/}

                    </View>



                    {/*/!*七星头条*!/*/}
                    {/*<View  style={{width:WINWIDTH,height:WINHEIGHT*0.06,backgroundColor:'#ffffff',justifyContent:'center',alignItems:'center',borderBottomColor: '#e6e6e6',*/}
                        {/*borderBottomWidth: 1,flexDirection:'row'}}>*/}
                        {/*<Image source={require('../../../newQx/ty.png')}*/}
                               {/*style={{width:WINWIDTH*0.3,height:WINHEIGHT*0.035,resizeMode:'cover'}}/>*/}
                        {/*<TouchableOpacity onPress={this.MyXiaoXi.bind(this)} style={{width:WINWIDTH*0.6,height:WINHEIGHT*0.035,backgroundColor:'#ffffff'}}>*/}

                        {/*</TouchableOpacity>*/}
                    {/*</View>*/}

                    {/*七星专供*/}
                    <View  style={{width:WINWIDTH,height:WINHEIGHT*0.055,backgroundColor:'#ffffff',justifyContent:'center',alignItems:'center',borderBottomColor: '#e6e6e6',
                        borderBottomWidth: 1,}}>
                        <Image source={require('../../../yg/优惠特购.png')}
                               style={{width:WINWIDTH*0.18,height:WINHEIGHT*0.018,resizeMode:'cover'}}/>
                    </View>

                    {/*推荐商品*/}
                    <View style={{width:WINWIDTH,height:WINHEIGHT*0.25,flexDirection:'row',borderBottomColor: '#e6e6e6', borderBottomWidth:0.5}}>
                        <TouchableOpacity onPress={this.showProductDetail.bind(this,this.state.imgurlid1)}>

                            <View style={{width:WINWIDTH*0.33,height:WINHEIGHT*0.25,justifyContent:'center',alignItems:'center'}}>
                                {
                                    this.state.imgurlqx1?
                                        <Image source={{uri: 'http://' + ipdy + '/Uploads/' + this.state.imgurlqx1}}
                                               style={{width:WINWIDTH*0.28,height:WINHEIGHT*0.15,}}/>
                                        :
                                        <Image source={require('../../../newQx/wxr.jpg')}
                                               style={{width:WINWIDTH*0.28,height:WINHEIGHT*0.15,}}/>

                                }
                                <View style={{width:WINWIDTH*0.28,height:WINHEIGHT*0.05,justifyContent:'center'}}>
                                    <Text style={{color: '#696969', fontSize: WINHEIGHT * (0.011)}}>{this.state.name1}</Text>
                                </View>
                                <View style={{width:WINWIDTH*0.28,height:WINHEIGHT*0.03,flexDirection:'row',justifyContent:'space-between',alignItems:'flex-end'}}>
                                    <Text style={{color: '#696969', fontSize: WINHEIGHT * (0.01)}}>原价:{this.state.yj1}</Text>
                                    <Text style={{color: 'red', fontSize: WINHEIGHT * (0.012)}}>现价:{this.state.xj1}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.showProductDetail.bind(this,this.state.imgurlid2)}>

                            <View style={{width:WINWIDTH*0.33,height:WINHEIGHT*0.25,justifyContent:'center',alignItems:'center'}}>
                                {
                                    this.state.imgurlqx1?
                                        <Image source={{uri: 'http://' + ipdy + '/Uploads/' + this.state.imgurlqx2}}
                                               style={{width:WINWIDTH*0.28,height:WINHEIGHT*0.15,}}/>
                                        :
                                        <Image source={require('../../../newQx/wxr.jpg')}
                                               style={{width:WINWIDTH*0.28,height:WINHEIGHT*0.15,}}/>

                                }
                                <View style={{width:WINWIDTH*0.28,height:WINHEIGHT*0.05,justifyContent:'center'}}>
                                    <Text style={{color: '#696969', fontSize: WINHEIGHT * (0.011)}}>{this.state.name2}</Text>
                                </View>
                                <View style={{width:WINWIDTH*0.28,height:WINHEIGHT*0.03,flexDirection:'row',justifyContent:'space-between',alignItems:'flex-end'}}>

                                    <Text style={{color: '#696969', fontSize: WINHEIGHT * (0.01)}}>原价:{this.state.yj2}</Text>
                                    <Text style={{color: 'red', fontSize: WINHEIGHT * (0.012)}}>现价:{this.state.xj2}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.showProductDetail.bind(this,this.state.imgurlid3)}>

                            <View style={{width:WINWIDTH*0.33,height:WINHEIGHT*0.25,justifyContent:'center',alignItems:'center'}}>
                                {
                                    this.state.imgurlqx1?
                                        <Image source={{uri: 'http://' + ipdy + '/Uploads/' + this.state.imgurlqx3}}
                                               style={{width:WINWIDTH*0.28,height:WINHEIGHT*0.15,}}/>
                                        :
                                        <Image source={require('../../../newQx/wxr.jpg')}
                                               style={{width:WINWIDTH*0.28,height:WINHEIGHT*0.15,}}/>

                                }
                                <View style={{width:WINWIDTH*0.28,height:WINHEIGHT*0.05,justifyContent:'center'}}>
                                    <Text style={{color: '#696969', fontSize: WINHEIGHT * (0.011)}}>{this.state.name3}</Text>
                                </View>
                                <View style={{width:WINWIDTH*0.28,height:WINHEIGHT*0.03,flexDirection:'row',justifyContent:'space-between',alignItems:'flex-end'}}>
                                    <Text style={{color: '#696969', fontSize: WINHEIGHT * (0.01)}}>原价:{this.state.yj3}</Text>
                                    <Text style={{color: 'red', fontSize: WINHEIGHT * (0.012)}}>现价:{this.state.xj3}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                    </View>
                    {/*推荐商品2*/}
                    <View style={{width:WINWIDTH,height:WINHEIGHT*0.25,flexDirection:'row',borderTopWidth:0.5,borderTopColor:'#e6e6e6'}}>
                        <TouchableOpacity onPress={this.showProductDetail.bind(this,this.state.imgurlid4)}>

                            <View style={{width:WINWIDTH*0.25,height:WINHEIGHT*0.25,justifyContent:'center',alignItems:'center'}}>
                                {
                                    this.state.imgurlqx1?
                                        <Image source={{uri: 'http://' + ipdy + '/Uploads/' + this.state.imgurlqx4}}
                                               style={{width:WINWIDTH*0.22,height:WINHEIGHT*0.15,}}/>
                                        :
                                        <Image source={require('../../../newQx/wxr.jpg')}
                                               style={{width:WINWIDTH*0.22,height:WINHEIGHT*0.15,}}/>

                                }
                                <View style={{width:WINWIDTH*0.22,height:WINHEIGHT*0.05,justifyContent:'center'}}>
                                    <Text style={{color: '#696969', fontSize: WINHEIGHT * (0.012)}}>{this.state.name4}</Text>
                                </View>
                                <View style={{width:WINWIDTH*0.22,height:WINHEIGHT*0.03,justifyContent:'center',alignItems:'flex-start'}}>
                                    <Text style={{color: '#696969', fontSize: WINHEIGHT * (0.010)}}>原价:{this.state.yj4}</Text>
                                    <Text style={{color: 'red', fontSize: WINHEIGHT * (0.012)}}>现价:{this.state.xj4}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.showProductDetail.bind(this,this.state.imgurlid5)}>

                            <View style={{width:WINWIDTH*0.25,height:WINHEIGHT*0.25,justifyContent:'center',alignItems:'center'}}>
                                {
                                    this.state.imgurlqx1?
                                        <Image source={{uri: 'http://' + ipdy + '/Uploads/' + this.state.imgurlqx5}}
                                               style={{width:WINWIDTH*0.22,height:WINHEIGHT*0.15,}}/>
                                        :
                                        <Image source={require('../../../newQx/wxr.jpg')}
                                               style={{width:WINWIDTH*0.22,height:WINHEIGHT*0.15,}}/>

                                }
                                <View style={{width:WINWIDTH*0.22,height:WINHEIGHT*0.05,justifyContent:'center'}}>
                                    <Text style={{color: '#696969', fontSize: WINHEIGHT * (0.012)}}>{this.state.name5}</Text>
                                </View>
                                <View style={{width:WINWIDTH*0.22,height:WINHEIGHT*0.03,justifyContent:'center',alignItems:'flex-start'}}>
                                    <Text style={{color: '#696969', fontSize: WINHEIGHT * (0.010)}}>原价:{this.state.yj5}</Text>
                                    <Text style={{color: 'red', fontSize: WINHEIGHT * (0.012)}}>现价:{this.state.xj5}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.showProductDetail.bind(this,this.state.imgurlid6)}>

                            <View style={{width:WINWIDTH*0.25,height:WINHEIGHT*0.25,justifyContent:'center',alignItems:'center'}}>
                                {
                                    this.state.imgurlqx1?
                                        <Image source={{uri: 'http://' + ipdy + '/Uploads/' + this.state.imgurlqx6}}
                                               style={{width:WINWIDTH*0.22,height:WINHEIGHT*0.15,}}/>
                                        :
                                        <Image source={require('../../../newQx/wxr.jpg')}
                                               style={{width:WINWIDTH*0.22,height:WINHEIGHT*0.15,}}/>

                                }
                                <View style={{width:WINWIDTH*0.22,height:WINHEIGHT*0.05,justifyContent:'center'}}>
                                    <Text style={{color: '#696969', fontSize: WINHEIGHT * (0.012)}}>{this.state.name6}</Text>
                                </View>
                                <View style={{width:WINWIDTH*0.22,height:WINHEIGHT*0.03,justifyContent:'center',alignItems:'flex-start'}}>
                                    <Text style={{color: '#696969', fontSize: WINHEIGHT * (0.010)}}>原价:{this.state.yj6}</Text>
                                    <Text style={{color: 'red', fontSize: WINHEIGHT * (0.012)}}>现价:{this.state.xj6}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.showProductDetail.bind(this,this.state.imgurlid7)}>

                            <View style={{width:WINWIDTH*0.25,height:WINHEIGHT*0.25,justifyContent:'center',alignItems:'center'}}>
                                {
                                    this.state.imgurlqx1?
                                        <Image source={{uri: 'http://' + ipdy + '/Uploads/' + this.state.imgurlqx7}}
                                               style={{width:WINWIDTH*0.22,height:WINHEIGHT*0.15,}}/>
                                        :
                                        <Image source={require('../../../newQx/wxr.jpg')}
                                               style={{width:WINWIDTH*0.22,height:WINHEIGHT*0.15,}}/>

                                }
                                <View style={{width:WINWIDTH*0.22,height:WINHEIGHT*0.05,justifyContent:'center'}}>
                                    <Text style={{color: '#696969', fontSize: WINHEIGHT * (0.012)}}>{this.state.name7}</Text>
                                </View>
                                <View style={{width:WINWIDTH*0.22,height:WINHEIGHT*0.03,justifyContent:'center',alignItems:'flex-start'}}>
                                    <Text style={{color: '#696969', fontSize: WINHEIGHT * (0.010)}}>原价:{this.state.yj7}</Text>
                                    <Text style={{color: 'red', fontSize: WINHEIGHT * (0.012)}}>现价:{this.state.xj7}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>







                    <View style={{
                        borderBottomColor: '#e6e6e6',
                        borderBottomWidth: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: WINWIDTH,
                        height: WINHEIGHT * 0.06,
                        borderTopWidth:1,
                        borderTopColor:'#e6e6e6'

                    }}>
                        <View style={{
                            backgroundColor: filecolor,
                            width: WINWIDTH * (0.01),
                            height: WINHEIGHT * (0.02)
                        }}>
                        </View>
                        <Text
                            style={{
                                fontSize: WINWIDTH * (0.04),
                                marginLeft: WINWIDTH * (0.06)
                            }}
                        >精选推荐</Text>
                    </View>



                        <View style={{width:WINWIDTH,backgroundColor:'#e5e5e5'}}>
                            <ListView
                                dataSource={this.state.dataSource}
                                renderRow={this._renderRow.bind(this)}
                                enableEmptySections={true}
                                contentContainerStyle={styles.listViewStyle}

                                onEndReached={this._onEndReached.bind(this)}
                                onEndReachedThreshold = {1000}

                            />

                        </View>


                </ScrollView>
            </View>

        )
    }

    getAgain(){
        // var url = 'http://'+ipdy+'/index.php?s=/Home/APPGoods/getTuiJianGoods/pageNum/1/size/30'
        //
        // HttpUtlis.get(url)
        //     .then(result=>{
        //         console.log(result)
        //         this.setState({dataSource:this.state.dataSource.cloneWithRows(result.data),})
        //
        //
        //         setTimeout(() => {
        //             this.setState({isRefreshing: false});
        //         }, 10);
        //     })
        //     .catch(error=>{
        //         console.log(error)
        //
        //         // this.setState({
        //         //     dataState:0,
        //         //     dataHome:0,
        //         // })
        //
        //     })

    }




    render() {
            return this._dataView()
    }

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: 'lightgray',
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

        marginTop:1

    },
    tuView: {
        flex: 1,

    },
    imgView: {
        width: WINWIDTH * (0.48),
        height: WINHEIGHT * (0.1),
        borderRadius: 10,
    },
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
        fontSize: WINWIDTH * (0.04),
        marginTop: WINHEIGHT * (0.01),


    },
    TX3: {
        color: 'red',
        fontWeight: 'bold',
        marginLeft: WINWIDTH * (0.03),
        fontSize: WINWIDTH * (0.035),
        marginTop: WINHEIGHT * (0.01),

    },
    listViewStyle:{
        flex:1,
        flexDirection:'row', //设置横向布局
        flexWrap:'wrap',    //设置换行显示
        // marginBottom:50
    },


});

export default main;