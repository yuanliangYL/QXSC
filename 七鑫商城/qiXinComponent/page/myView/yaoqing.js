
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

import Cy from 'crypto-js/md5';
import QRCode from 'react-native-qrcode';

const  WINWIDTH = Dimensions.get('window').width;
const  WINHEIGHT = Dimensions.get('window').height;


// import ScrollableTabView from 'react-native-scrollable-tab-view';
// import StarRating from 'react-native-star-rating';

import Tou from '../../head/headBack';

export default class yaoqing extends Component {
    constructor(props){
        super(props);
        this.state ={

        };






    }

    componentDidMount() {
        //index.php?s=/Home/APPUser/canToShare/uid/37/sign/512312312
console.log('http://'+ipdy+'/index.php?s=/Home/Register/register/phone/'+this.props.phone+'/sign/'+(Cy('phone='+this.props.phone+'&key='+qm))+'.html')

    }

    render() {

        return (
            <View style={{flex:1}}>
                <Tou title="分享" navigator={this.props.navigator}/>

                <View style={{flex: 1, backgroundColor: '#f5f5f5',justifyContent:'center',alignItems:'center'}}>

                    <QRCode

                        value={'http://'+ipdy+'/index.php?s=/Home/Register/register/phone/'+this.props.phone+'/sign/'+(Cy('phone='+this.props.phone+'&key='+qm))+'.html'}
                        size={200}
                        bgColor='black'
                        fgColor='white'/>

                    <Text style={{fontSize:WINWIDTH*0.045,color:'#696969',fontWeight:'bold',marginTop:30}}>
                        扫一扫上面的二维码图案，分享有钱赚
                    </Text>


                </View>
            </View>

        )
    }


}