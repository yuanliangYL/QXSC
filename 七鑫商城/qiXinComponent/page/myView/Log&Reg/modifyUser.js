
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
    Alert


} from 'react-native';

//头
import Tou from '../../../head/headBack';

const  WINWIDTH = Dimensions.get('window').width;
const  WINHEIGHT = Dimensions.get('window').height;
import Cy from 'crypto-js/md5';
import InputScrollView from 'react-native-inputscrollview';


import Picker from 'react-native-picker';
import area from '../../../area.json';

import HttpUtlis from '../../../tool/HttpUtils';


//修改个人资料

export  default class modifyUser extends  Component {
    constructor(props) {
        super(props);
        this.state = {
            uid:'',
            pwd:'',
            pwd2:'',

            name:'',
            email:'',
            sex:'',
            num:'',//生日
            province:'',//省
            city:'',//市
            area:'',//区
            cardid:'',//身份证

            name1:'',
            email1:'',
            sex1:'',
            num1:'',//生日
            province1:'',//省
            city1:'',//市
            area1:'',//区
            cardid1:'',//身份证




        };

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

            }
        }).catch(err => {
            //如果没有找到数据且没有同步方法，
            //或者有其他异常，则在catch中返回
        })


        //读取保存数据
        storage.load({
            key: 'oluser',
            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的同步方法
            autoSync: true,
            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用同步方法的同时先返回已经过期的数据。
            // 设置为false的话，则始终强制返回同步方法提供的最新数据(当然会需要更多等待时间)。
            syncInBackground: false
        }).then(ret => {
           this.setState({
               name:ret.username,
               sex:ret.sex,
               birthday:ret.birthday,
               cardid:ret.idcard,

           })

        }).catch(err => {
            //如果没有找到数据且没有同步方法，
            //或者有其他异常，则在catch中返回
        })
    }

    componentWillUnmount() {
        Picker.hide()
    }

    _createDateData() {
        let date = [];
        for(let i=1950;i<2050;i++){
            let month = [];
            for(let j = 1;j<13;j++){
                let day = [];
                if(j === 2){
                    for(let k=1;k<29;k++){
                        day.push(k+'日');
                    }
                    //Leap day for years that are divisible by 4, such as 2000, 2004
                    if(i%4 === 0){
                        day.push(29+'日');
                    }
                }
                else if(j in {1:1, 3:1, 5:1, 7:1, 8:1, 10:1, 12:1}){
                    for(let k=1;k<32;k++){
                        day.push(k+'日');
                    }
                }
                else{
                    for(let k=1;k<31;k++){
                        day.push(k+'日');
                    }
                }
                let _month = {};
                _month[j+'月'] = day;
                month.push(_month);
            }
            let _date = {};
            _date[i+'年'] = month;
            date.push(_date);
        }
        return date;
    }

    _createAreaData() {
        let data = [];
        let len = area.length;
        for(let i=0;i<len;i++){
            let city = [];
            for(let j=0,cityLen=area[i]['city'].length;j<cityLen;j++){
                let _city = {};
                _city[area[i]['city'][j]['name']] = area[i]['city'][j]['area'];
                city.push(_city);
            }

            let _data = {};
            _data[area[i]['name']] = city;
            data.push(_data);
        }
        return data;
    }
    //日期选择
    _showDatePicker() {
        Picker.init({
            pickerData: this._createDateData(),
            pickerToolBarFontSize: 16,
            pickerFontSize: 16,
            pickerFontColor: [255, 0 ,0, 1],
            onPickerConfirm: (pickedValue, pickedIndex) => {
                console.log('date', pickedValue, pickedIndex);
                this.setState({
                    birthday:pickedValue[0]+pickedValue[1]+pickedValue[2],
                })
            },
            onPickerCancel: (pickedValue, pickedIndex) => {
                console.log('date', pickedValue, pickedIndex);
            },
            onPickerSelect: (pickedValue, pickedIndex) => {
                console.log('date', pickedValue, pickedIndex);
            }
        });
        Picker.show();
    }

    //区域选择
    _showAreaPicker() {
        Picker.init({
            pickerData: this._createAreaData(),
            selectedValue: ['河北', '唐山', '古冶区'],

            onPickerConfirm: (pickedValue) => {
                console.log('area', pickedValue,);


                this.setState({
                    province:pickedValue[0],
                    city:pickedValue[1],
                    area:pickedValue[2],
                })

            },

            onPickerCancel: pickedValue => {
                console.log('area', pickedValue);
            },
            onPickerSelect: pickedValue => {
                console.log('area', pickedValue);
            }
        });
        Picker.show();
    }

    _toggle() {
        Picker.toggle();
    }

    _isPickerShow(){
        Picker.isPickerShow(status => {
            alert(status);
        });
    }


    //index.php?s=/Home/APPUser/editUserInfo/uid/46/personid/123123123434123/gender/1/sign/fa6876723ea02c045a2c7da8eb99ffcb/birthday/1993%E5%B9%B48%E6%9C%8828%E6%97%A5/username/%E5%93%88%E5%93%884



    _save(){

        if(this.state.name&&this.state.sex&&this.state.birthday&&this.state.cardid){
            var url = 'http://'+ipdy+'/index.php?s=/Home/APPUser/editUserInfo/uid/'+this.state.uid+'/personid/'+this.state.cardid+'/gender/'+this.state.sex+'/sign/'+(Cy('gender='+this.state.sex+'&personid='+this.state.cardid+'&uid='+this.state.uid+'&username='+this.state.name+'&key='+qm))+'/'+this.state.birthday+'/username/'+this.state.name;

            HttpUtlis.get(url)
                .then(result=>{
                    console.log(result)
                    if(result.code==10000){
                        storage.save({
                            key: 'oluser',  //注意:请不要在key中使用_下划线符号!
                            rawData: {
                                birthday:this.state.birthday,
                                idcard:this.state.cardid,
                                sex:this.state.sex,
                                username:this.state.name,
                            },
                            // 如果不指定过期时间，则会使用defaultExpires参数
                            // 如果设为null，则永不过期
                            expires: null
                        });

                        Alert.alert(
                            '提示',
                            result.msg,
                            [

                                {text: '确定', },
                            ])
                        this.props.navigator.pop({name:'my'})
                    }
                })
                .catch(error=>{
                    console.log(error)


                })

        }
        else {
            Alert.alert(
                '提示',
                '资料未填写完整',
                [

                    {text: '确定', },
                ])
        }



    }


    _sex(obj){
        if(obj==1){
            this.setState({
                sex:1,
            })
        }else if(obj==2){
            this.setState({
                sex:2,
            })
        }


    }

    render() {
        return (
            <InputScrollView style={{backgroundColor:'#e6e6e6',flex:1,}}>
                <Tou title="修改资料" navigator={this.props.navigator}/>
                <View style={{flexDirection:'row',marginTop:WINHEIGHT*(0.01),backgroundColor:'#ffffff'}}>
                    <View style={{backgroundColor:'#ffffff',flex:3,height:WINHEIGHT*(0.07),justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontSize:WINWIDTH*(0.04)}}>姓名</Text>
                    </View>
                    <View style={{backgroundColor:'#ffffff',flex:7,height:WINHEIGHT*(0.07),justifyContent:'center',alignItems:'center'}}>
                        <TextInput
                            placeholder={'请输入姓名'}
                            underlineColorAndroid={'transparent'}
                            maxLength={10}
                            defaultValue={this.state.name}
                            onChangeText={(text) => this.setState({name:text})}
                            style={{height:WINHEIGHT*(0.06),fontSize:WINWIDTH*(0.035),width:WINWIDTH*(0.65)}}
                        />
                    </View>
                </View>

                {/*<View style={{flexDirection:'row',marginTop:WINHEIGHT*(0.001)}}>*/}
                    {/*<View style={{backgroundColor:'#ffffff',flex:3,height:WINHEIGHT*(0.07),justifyContent:'center',alignItems:'center'}}>*/}
                        {/*<Text style={{fontSize:WINWIDTH*(0.04)}}>邮箱</Text>*/}
                    {/*</View>*/}
                    {/*<View style={{backgroundColor:'#ffffff',flex:7,height:WINHEIGHT*(0.07),justifyContent:'center',alignItems:'center'}}>*/}
                        {/*<TextInput*/}
                            {/*placeholder={'请输入邮箱'}*/}
                            {/*maxLength={21}*/}
                            {/*defaultValue={this.state.email}*/}
                            {/*underlineColorAndroid={'transparent'}*/}
                            {/*onChangeText={(text) => this.setState({email:text})}*/}
                            {/*style={{height:WINHEIGHT*(0.06),fontSize:WINWIDTH*(0.035),width:WINWIDTH*(0.65)}}*/}
                        {/*/>*/}
                    {/*</View>*/}
                {/*</View>*/}


                <View style={{flexDirection:'row',marginTop:WINHEIGHT*(0.001)}}>
                    <View style={{backgroundColor:'#ffffff',flex:3,height:WINHEIGHT*(0.07),justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontSize:WINWIDTH*(0.04)}}>性别</Text>
                    </View>
                    <View style={{backgroundColor:'#ffffff',flex:7,height:WINHEIGHT*(0.07),alignItems:'center',flexDirection:'row'}}>


                        <TouchableOpacity onPress={this._sex.bind(this,1)} style={{backgroundColor:this.state.sex==1?filecolor:'#ffffff',width:WINWIDTH*(0.1),height:WINHEIGHT*(0.045),justifyContent:'center',alignItems:'center',borderRadius:3,borderWidth:1,borderColor:filecolor}}>

                            <Text style={{fontSize:WINWIDTH*(0.03),color:this.state.sex==1?'#ffffff':filecolor}}>男</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this._sex.bind(this,2)} style={{backgroundColor:this.state.sex==2?filecolor:'#ffffff',width:WINWIDTH*(0.1),height:WINHEIGHT*(0.045),justifyContent:'center',alignItems:'center',borderRadius:3,borderWidth:1,borderColor:filecolor,marginLeft:20}}>
                            <Text style={{fontSize:WINWIDTH*(0.03),color:this.state.sex==2?'#ffffff':filecolor}}>女</Text>
                        </TouchableOpacity>


                    </View>
                </View>

                {/*日期*/}
                <View style={{flexDirection:'row',marginTop:WINHEIGHT*(0.001)}}>
                    <View style={{backgroundColor:'#ffffff',flex:3,height:WINHEIGHT*(0.07),justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontSize:WINWIDTH*(0.04)}}>生日</Text>
                    </View>
                    <TouchableOpacity activeOpacity={1} onPress={this._showDatePicker.bind(this)} style={{backgroundColor:'#ffffff',flex:7,height:WINHEIGHT*(0.07),justifyContent:'center'}}>

                        <Text style={{fontSize:WINWIDTH*(0.035),color:'#696969'}}>
                            {
                                this.state.birthday?
                                this.state.birthday
                                    :
                                    '请选择日期'

                            }

                        </Text>



                    </TouchableOpacity>
                </View>
                {/*省*/}
                {/*<View style={{flexDirection:'row',marginTop:WINHEIGHT*(0.001)}}>*/}
                    {/*<View style={{backgroundColor:'#ffffff',flex:3,height:WINHEIGHT*(0.07),justifyContent:'center',alignItems:'center'}}>*/}
                        {/*<Text style={{fontSize:WINWIDTH*(0.04)}}>所在地区</Text>*/}
                    {/*</View>*/}
                    {/*<TouchableOpacity activeOpacity={1} onPress={this._showAreaPicker.bind(this)} style={{backgroundColor:'#ffffff',flex:7,height:WINHEIGHT*(0.07),justifyContent:'center'}}>*/}

                        {/*<Text style={{fontSize:WINWIDTH*(0.035),color:'#696969'}}>*/}
                            {/*{*/}
                                {/*this.state.province&&this.state.city&&this.state.area?*/}
                                {/*this.state.province+'-'+this.state.city+'-'+this.state.area*/}
                                {/*:*/}
                                {/*'请选择所在地区'*/}

                            {/*}*/}

                        {/*</Text>*/}



                    {/*</TouchableOpacity>*/}
                {/*</View>*/}



                {/*/!*市*!/*/}
                {/*<View style={{flexDirection:'row',marginTop:WINHEIGHT*(0.001)}}>*/}
                    {/*<View style={{backgroundColor:'#ffffff',flex:3,height:WINHEIGHT*(0.07),justifyContent:'center',alignItems:'center'}}>*/}
                        {/*<Text style={{fontSize:WINWIDTH*(0.04)}}>市</Text>*/}
                    {/*</View>*/}
                    {/*<View style={{backgroundColor:'#ffffff',flex:7,height:WINHEIGHT*(0.07),justifyContent:'center',alignItems:'center'}}>*/}
                        {/*<TextInput*/}
                            {/*placeholder={'例:南昌市'}*/}
                            {/*maxLength={12}*/}
                            {/*defaultValue={this.state.city}*/}
                            {/*underlineColorAndroid={'transparent'}*/}
                            {/*onChangeText={(text) => this.setState({city:text})}*/}
                            {/*style={{height:WINHEIGHT*(0.06),fontSize:WINWIDTH*(0.035),width:WINWIDTH*(0.65)}}*/}
                        {/*/>*/}
                    {/*</View>*/}
                {/*</View>*/}

                {/*/!*区*!/*/}
                {/*<View style={{flexDirection:'row',marginTop:WINHEIGHT*(0.001)}}>*/}
                    {/*<View style={{backgroundColor:'#ffffff',flex:3,height:WINHEIGHT*(0.07),justifyContent:'center',alignItems:'center'}}>*/}
                        {/*<Text style={{fontSize:WINWIDTH*(0.04)}}>区/县</Text>*/}
                    {/*</View>*/}
                    {/*<View style={{backgroundColor:'#ffffff',flex:7,height:WINHEIGHT*(0.07),justifyContent:'center',alignItems:'center'}}>*/}
                        {/*<TextInput*/}
                            {/*placeholder={'例:东湖区'}*/}
                            {/*maxLength={12}*/}
                            {/*defaultValue={this.state.area}*/}
                            {/*underlineColorAndroid={'transparent'}*/}
                            {/*onChangeText={(text) => this.setState({area:text})}*/}
                            {/*style={{height:WINHEIGHT*(0.06),fontSize:WINWIDTH*(0.035),width:WINWIDTH*(0.65)}}*/}
                        {/*/>*/}
                    {/*</View>*/}
                {/*</View>*/}
                {/*身份证*/}
                <View style={{flexDirection:'row',marginTop:WINHEIGHT*(0.001)}}>
                    <View style={{backgroundColor:'#ffffff',flex:3,height:WINHEIGHT*(0.07),justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontSize:WINWIDTH*(0.04)}}>身份证</Text>
                    </View>
                    <View style={{backgroundColor:'#ffffff',flex:7,height:WINHEIGHT*(0.07),justifyContent:'center',alignItems:'center'}}>
                        <TextInput
                            placeholder={'请输入身份证'}
                            maxLength={20}
                            defaultValue={this.state.cardid}
                            underlineColorAndroid={'transparent'}
                            keyboardType={'numeric'}
                            onChangeText={(text) => this.setState({cardid:text})}
                            style={{height:WINHEIGHT*(0.06),fontSize:WINWIDTH*(0.035),width:WINWIDTH*(0.65)}}
                        />
                    </View>
                </View>


                <TouchableOpacity onPress={this._save.bind(this)}>
                    <View style={{justifyContent:'center',flexDirection:'row'}}>
                        <View style={{
                            marginTop:WINHEIGHT*(0.08),
                            justifyContent:'center',
                            alignItems:'center',
                            backgroundColor:filecolor,
                            height:WINHEIGHT*(0.06),
                            width:WINWIDTH*(0.8),
                            borderRadius:5,
                        }}>
                            <Text style={{fontSize:16,color:'#ffffff'}}>保存</Text>

                        </View>
                    </View>
                </TouchableOpacity>
            </InputScrollView>


        )
    }
}