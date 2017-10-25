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
    Navigator,
    TouchableOpacity,
    Dimensions, TextInput,
    AsyncStorage,
    InteractionManager,
    DeviceEventEmitter,
    ToastAndroid,
    Platform,
    BackAndroid,

} from 'react-native';

const WINWIDTH = Dimensions.get('window').width;
const WINHEIGHT = Dimensions.get('window').height;

import Storage from 'react-native-storage';
import TabNavigator from 'react-native-tab-navigator';

/**********分割线**/
//首页
import Home from './page/home/homeView'
//发现
import FaXian from './page/near/LBSView';
//商城
import Mall from '../qiXinComponent/page/mall/MallView';
//我的
import My from '../qiXinComponent/page/myView/star7View';




//
// var ipdy = '114.55.140.108:7677';
// global.ipdy = ipdy;


// //
var ipdy = 'www.ygfj168.com';
global.ipdy = ipdy;

var zfb = '114.55.140.108:7679';
global.zfb = zfb;

var ipdy2 = '114.55.140.108:7677';
global.ipdy2 = ipdy2;

var qm = 'pass4yigoufujia!!';
global.qm = qm;

var tu = '114.55.140.108:7675';
global.tu = tu;
//'rgba(255,81,0,0.9)'
// var filecolor = 'rgba(164,0,91,0.5)';
var filecolor = '#C11A30';
global.filecolor = filecolor;

// var tabcolor = '#a4005b';
var tabcolor = '#C11A30';
global.tabcolor = tabcolor;

var filetitle = '七鑫';
global.filetitle = filetitle;

//关于我们
var letter = 'Copyrght © 2016-2016 QiXing.All Rights Reservrd.';
global.letter = letter;


var storage = new Storage({
    // 最大容量，默认值1000条数据循环存储
    size: 1000,

    // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
    // 如果不指定则数据只会保存在内存中，重启后即丢失
    storageBackend: AsyncStorage,

    // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
    defaultExpires: null,

    // 读写时在内存中缓存数据。默认启用。
    enableCache: true,

    // 如果storage中没有相应数据，或数据已过期，
    // 则会调用相应的sync同步方法，无缝返回最新数据。
    sync: {
        // 同步方法的具体说明会在后文提到
    }
});


global.storage = storage;


// //全局路由栈
// var ROUTE_STACK = [
//     {name: 'main', component: Main,index: 0},
// ];

export default class qixin extends Component {


    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'home',

            boolheight: 1,
        };

    }




    //隐藏item 栏
    _onDidFocus(obj) {
        if (obj.name == 'home' || obj.name == 'faxian' || obj.name == 'mallView' ||  obj.name == 'qxview') {
            this.setState({boolheight: 1});
        } else {
            this.setState({boolheight: 0});
        }
    }
    componentWillMount() {
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }
    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    onBackAndroid = () => {
        if(this.state.selectedTab=='home'){
            const navigator = this.refs.nav1;
            const routers = navigator.getCurrentRoutes();
            console.log('当前路由长度：' + routers.length);
            if (routers.length > 1) {
                navigator.pop();
                return true;//接管默认行为
            } else {

                //到了主页了
                if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
                    //最近2秒内按过back键，可以退出应用。
                    return false;
                }
                this.lastBackPressed = Date.now();
                ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
                return true;


            }
            // return false;//默认行为

        }

        if(this.state.selectedTab=='faxian'){
            const navigator = this.refs.nav2;
            const routers = navigator.getCurrentRoutes();
            console.log('当前路由长度：' + routers.length);
            if (routers.length > 1) {
                navigator.pop();
                return true;//接管默认行为
            } else {

                //到了主页了
                if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
                    //最近2秒内按过back键，可以退出应用。
                    return false;
                }
                this.lastBackPressed = Date.now();
                ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
                return true;


            }
            // return false;//默认行为

        }

        if(this.state.selectedTab=='mallView'){
            const navigator = this.refs.nav3;
            const routers = navigator.getCurrentRoutes();
            console.log('当前路由长度：' + routers.length);
            if (routers.length > 1) {
                navigator.pop();
                return true;//接管默认行为
            } else {

                //到了主页了
                if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
                    //最近2秒内按过back键，可以退出应用。
                    return false;
                }
                this.lastBackPressed = Date.now();
                ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
                return true;


            }
            // return false;//默认行为

        }

        if(this.state.selectedTab=='qxview'){
            const navigator = this.refs.nav4;
            const routers = navigator.getCurrentRoutes();
            console.log('当前路由长度：' + routers.length);
            if (routers.length > 1) {
                navigator.pop();
                return true;//接管默认行为
            } else {

                //到了主页了
                if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
                    //最近2秒内按过back键，可以退出应用。
                    return false;
                }
                this.lastBackPressed = Date.now();
                ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
                return true;


            }
            // return false;//默认行为

        }


    };



    render() {
        return (
            <TabNavigator
                tabBarStyle={this.state.boolheight ? styles.showTabBarStyle : styles.hidetabBarStyle}
                sceneStyle={{paddingBottom: 0}}
            >

                <TabNavigator.Item
                    selectedTitleStyle={{color: tabcolor}}
                    selected={this.state.selectedTab === 'home'}
                    title="首页"

                    renderIcon={() => <Image source={require('../imgs/2/home.png')}
                                             style={{width:25, height:24}}/>}
                    renderSelectedIcon={() => <Image source={require('../imgs/1/home.png')}
                                                     style={{width: 24, height: 24}}/>}
                    onPress={() => this.setState({selectedTab: 'home'})}
                >
                    <Navigator
                        ref={'nav1'}
                        initialRoute={{name: 'home', component: Home}}
                        onDidFocus={this._onDidFocus.bind(this)}
                        renderScene={
                                 (route, navigator) => {
                                               let Component = route.component;
                                               return <Component {...route.params} navigator={navigator}/>
                                           }
                                       }
                    />


                </TabNavigator.Item>


                {/*<TabNavigator.Item*/}
                    {/*selectedTitleStyle={{color: tabcolor}}*/}
                    {/*selected={this.state.selectedTab === 'faxian'}*/}
                    {/*title="发现"*/}

                    {/*renderIcon={() => <Image source={require('../imgs/2/faxian.png')}*/}
                                             {/*style={{width:25, height: 24}}/>}*/}
                    {/*renderSelectedIcon={() => <Image source={require('../imgs/1/faxian.png')}*/}
                                                     {/*style={{width: 24, height: 24}}/>}*/}
                    {/*onPress={() => this.setState({selectedTab: 'faxian'})}*/}
                {/*>*/}
                    {/*<Navigator*/}
                        {/*ref={'nav2'}*/}
                        {/*initialRoute={{name: 'faxian', component: FaXian}}*/}
                        {/*onDidFocus={this._onDidFocus.bind(this)}*/}
                        {/*renderScene={*/}
                                 {/*(route, navigator) => {*/}
                                               {/*let Component = route.component;*/}
                                               {/*return <Component {...route.params} navigator={navigator}/>*/}
                                           {/*}*/}
                                       {/*}*/}
                    {/*/>*/}


                {/*</TabNavigator.Item>*/}


                <TabNavigator.Item
                    selectedTitleStyle={{color: tabcolor}}
                    selected={this.state.selectedTab === 'mallView'}
                    title="商城"

                    renderIcon={() => <Image source={require('../imgs/2/shangcheng.png')}
                                             style={{width:25, height: 24}}/>}
                    renderSelectedIcon={() => <Image source={require('../imgs/1/shangcheng.png')}
                                                     style={{width: 24, height: 24}}/>}
                    onPress={() => this.setState({selectedTab: 'mallView'})}
                >
                    <Navigator
                        ref={'nav3'}
                        initialRoute={{name: 'mallView', component: Mall}}
                        onDidFocus={this._onDidFocus.bind(this)}
                        renderScene={
                                 (route, navigator) => {
                                               let Component = route.component;
                                               return <Component {...route.params} navigator={navigator}/>
                                           }
                                       }
                    />


                </TabNavigator.Item>


                <TabNavigator.Item
                    selectedTitleStyle={{color: tabcolor}}
                    selected={this.state.selectedTab === 'qxview'}
                    title="我的"

                    renderIcon={() => <Image source={require('../imgs/2/wode.png')}
                                             style={{width:25, height: 24}}/>}
                    renderSelectedIcon={() => <Image source={require('../imgs/1/wode.png')}
                                                     style={{width: 24, height: 24}}/>}
                    onPress={() => {
                        this.setState({selectedTab: 'qxview'})
                        DeviceEventEmitter.emit('updateCount');
                    }}
                >
                    <Navigator
                        ref={'nav4'}
                        initialRoute={{name: 'qxview', component: My}}
                        onDidFocus={this._onDidFocus.bind(this)}
                        renderScene={
                                 (route, navigator) => {
                                               let Component = route.component;
                                               return <Component {...route.params} navigator={navigator}/>
                                           }
                                       }
                    />


                </TabNavigator.Item>


            </TabNavigator>
        )


    }


}


const styles = StyleSheet.create(
    {
        showTabBarStyle: {
            backgroundColor: 'white',
            height: 50
        },
        hidetabBarStyle: {
            height: 0,
            overflow: 'hidden'
        },
        sceneStyle: {
            paddingBottom: 0
        }
    }
)


