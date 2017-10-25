
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

} from 'react-native';

const  WINWIDTH = Dimensions.get('window').width;
const  WINHEIGHT = Dimensions.get('window').height;

import ProductDetail from '../../../qiXinComponent/page/mall/mallDetail';
import InputScrollView from 'react-native-inputscrollview';

export  default class qixinmall extends  Component{

    constructor(props) {

        super(props);
        var ds =new ListView.DataSource({  rowHasChanged: (r1, r2)=> r1 !== r2, })
        this.state = {
            dataSource:ds,
            url:'',
            search:'',

            button0:' ',
            button1:' ',
            button2:' ',
            button3:' ',
            button4:' ',
            button5:' ',
            button6:' ',
            button7:' ',



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
    //获取8个分类
    _category(){
        fetch('http://'+ipdy+'/app_dev.php/product/category')
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log(responseJson)

                if(responseJson.data.length == 8){

                    this.setState({
                        button0:responseJson.data[0],
                        button1:responseJson.data[1],
                        button2:responseJson.data[2],
                        button3:responseJson.data[3],
                        button4:responseJson.data[4],
                        button5:responseJson.data[5],
                        button6:responseJson.data[6],
                        button7:responseJson.data[7],



                    })
                    // console.log('http://'+tu+'/Uploads/'+this.state.button5.imgurl)



                }else {

                    Alert.alert(
                        '提示',
                        '分类数据填写不完整',
                        [

                            {text: '确定', },
                        ])

                }




            })
            .catch((error) =>
                Alert.alert(
                    '提示',
                    '分类数据请求失败',
                    [

                        {text: '确定', },
                    ])
            )
    }


    _imgurl(){

        console.log('http://'+ipdy+'/product/getshopbanner')

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
        fetch('http://'+ipdy+'/app_dev.php/product/tuijian')
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log(responseJson)
                this.setState({dataSource:this.state.dataSource.cloneWithRows(responseJson.data)})

                setTimeout(() => {
                    this.setState({isRefreshing: false});
                }, 10);
            })
            .catch((error) => { alert('分类详情数据请求失败') }
            )
    }

    //8个按钮内容
    _button(obj){
        if      (obj=='button0') {
            var url='http://'+ipdy+'/app_dev.php/product/getproductbycategory/0';

            console.log(url)
        }
        else if(obj == 'button1'){
            var url='http://'+ipdy+'/app_dev.php/product/getproductbycategory/'+this.state.button1.id;
        }

        else if(obj == 'button2'){
            var url='http://'+ipdy+'/app_dev.php/product/getproductbycategory/'+this.state.button2.id;
        }
        else if(obj == 'button3'){
            var url='http://'+ipdy+'/app_dev.php/product/getproductbycategory/'+this.state.button3.id;
        }
        else if(obj == 'button4'){
            var url='http://'+ipdy+'/app_dev.php/product/getproductbycategory/'+this.state.button4.id;
        }
        else if(obj == 'button5'){
            var url='http://'+ipdy+'/app_dev.php/product/getproductbycategory/'+this.state.button5.id;
        }
        else if(obj == 'button6'){
            var url='http://'+ipdy+'/app_dev.php/product/getproductbycategory/'+this.state.button6.id;
        }
        else if(obj == 'button7'){
            var url='http://'+ipdy+'/app_dev.php/product/getproductbycategory/'+this.state.button7.id;
        }

        // console.log(this.state.fuzhuang.id)
        fetch(url)
            .then((response)=>response.json())
            .then((responseJson) =>{

                if(responseJson.code==10000)
                {

                    //重新渲染dataSource
                    this.setState({dataSource:this.state.dataSource.cloneWithRows(responseJson.data)})
                }else {
                    alert('暂无商家')
                }




            })
            .catch((error) => {

            })

    }
    getAgain(){

    }
    //搜索
    _search(){
        fetch('http://'+ipdy+'/app_dev.php/searchbytitlefromproduct',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },

            body: 'keywords='+this.state.search


        }).then((response) => response.json())
            .then((responseJson) => {
                // console.log(responseJson)
                if(responseJson.code==10000)
                {

                    //重新渲染dataSource
                    this.setState({dataSource:this.state.dataSource.cloneWithRows(responseJson.data)})
                    alert('搜索成功')
                }else {
                    alert('暂无该商品,请重新搜索')
                }



            })
            .catch((error) => {
                console.error(error);
            });






        //
    }

    render(){
        return(
            <InputScrollView style={{flex:1,backgroundColor:'#ffffff',}}>
                <View style={styles.container}>


                    {/*头部广告*/}
                    <Image source={{url: 'http://' + tu + '/Uploads/' +this.state.imgurls}} style = {{width:WINWIDTH ,height:WINHEIGHT*(0.3)}}/>



                    <View style={{backgroundColor:'#ffffff',width:WINWIDTH,height:WINHEIGHT*(0.09),flexDirection:'row',alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:'#f5f5f5'}}>
                        <View style={{width:WINWIDTH*(0.9),height:WINHEIGHT*(0.06),backgroundColor:'#ffffff',borderRadius:20,flexDirection:'row',justifyContent:'center',alignItems:'center',borderWidth:1,borderColor:'#e6e6e6'}}>
                            <TextInput
                                placeholder={'请输入搜索内容'}
                                underlineColorAndroid={'transparent'}
                                onChangeText={(text) => this.setState({search:text})}
                                style={{height:WINHEIGHT*(0.06),fontSize:WINWIDTH*(0.035),width:WINWIDTH*(0.6)}}
                            />
                            <TouchableOpacity onPress={this._search.bind(this)}>
                                <Image source={require('../../../img/sousuo.png')} style={{width:WINWIDTH*(0.07),height:WINWIDTH*(0.07)}} />
                            </TouchableOpacity>
                        </View>
                    </View>


                    {/*中部按钮*****************/}
                    <View style = {{width:WINWIDTH,height:WINHEIGHT*(0.13),flexDirection:'row',alignItems:'center',justifyContent:'space-around',backgroundColor:'#ffffff'}}>

                        <TouchableOpacity activeOpacity={1} onPress={this._button.bind(this,'button0')}>
                            <View style = {{width:WINWIDTH*(0.2) ,height:WINWIDTH*(0.19),justifyContent:'center',alignItems:'center',backgroundColor:'#ffffff'}}>


                                <Image source ={{uri:'http://'+tu+'/Uploads/'+this.state.button0.imgurl}} resizeMode={'stretch'} style = {{width:WINWIDTH*(0.12) ,height:WINWIDTH*(0.12),borderRadius:WINWIDTH*(0.1)/2,backgroundColor:'#ffffff'}}/>


                                <Text style= {{color:'gray',fontSize:WINWIDTH*(0.03),marginTop:WINHEIGHT*(0.01)}}>全部</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={1}onPress={this._button.bind(this,'button1')}
                        >
                            <View style = {{width:WINWIDTH*(0.2) ,height:WINWIDTH*(0.19),justifyContent:'center',alignItems:'center',backgroundColor:'#ffffff'}}>
                                <Image source ={{uri:'http://'+tu+'/Uploads/'+this.state.button1.imgurl}} resizeMode={'stretch'} style = {{width:WINWIDTH*(0.12) ,height:WINWIDTH*(0.12),borderRadius:WINWIDTH*(0.1)/2}}/>
                                <Text style= {{color:'gray',fontSize:WINWIDTH*(0.03),marginTop:WINHEIGHT*(0.01)}}>{this.state.button1.title}</Text>
                            </View>

                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={1} onPress={this._button.bind(this,'button2')}>
                            <View style = {{width:WINWIDTH*(0.2) ,height:WINWIDTH*(0.19),justifyContent:'center',alignItems:'center',backgroundColor:'#ffffff'}}>
                                <Image source ={{uri:'http://'+tu+'/Uploads/'+this.state.button2.imgurl}}  style = {{width:WINWIDTH*(0.12) ,height:WINWIDTH*(0.12),borderRadius:WINWIDTH*(0.1)/2}}/>
                                <Text style= {{color:'gray',fontSize:WINWIDTH*(0.03),marginTop:WINHEIGHT*(0.01)}}>{this.state.button2.title}</Text>
                            </View>

                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={1} onPress={this._button.bind(this,'button3')}>
                            <View style = {{width:WINWIDTH*(0.2) ,height:WINWIDTH*(0.19),justifyContent:'center',alignItems:'center',backgroundColor:'#ffffff'}}>
                                <Image source ={{uri:'http://'+tu+'/Uploads/'+this.state.button3.imgurl}} style = {{width:WINWIDTH*(0.12) ,height:WINWIDTH*(0.12),borderRadius:WINWIDTH*(0.1)/2}}/>
                                <Text style= {{color:'gray',fontSize:WINWIDTH*(0.03),marginTop:WINHEIGHT*(0.01)}}>{this.state.button3.title}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style = {{width:WINWIDTH,height:WINHEIGHT*(0.12),flexDirection:'row',alignItems:'center',justifyContent:'space-around',backgroundColor:'#ffffff'}}>

                        <TouchableOpacity activeOpacity={1} onPress={this._button.bind(this,'button4')}>
                            <View style = {{width:WINWIDTH*(0.2) ,height:WINWIDTH*(0.19),justifyContent:'center',alignItems:'center',backgroundColor:'#ffffff'}}>
                                <Image source ={{uri:'http://'+tu+'/Uploads/'+this.state.button4.imgurl}} resizeMode={'stretch'} style = {{width:WINWIDTH*(0.12) ,height:WINWIDTH*(0.12),borderRadius:WINWIDTH*(0.1)/2}}/>
                                <Text style= {{color:'gray',fontSize:WINWIDTH*(0.03),marginTop:WINHEIGHT*(0.01)}}>{this.state.button4.title}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={1} onPress={this._button.bind(this,'button5')}>
                            <View style = {{width:WINWIDTH*(0.2) ,height:WINWIDTH*(0.19),justifyContent:'center',alignItems:'center',backgroundColor:'#ffffff'}}>
                                <Image source ={{uri:'http://'+tu+'/Uploads/'+this.state.button5.imgurl}} style = {{width:WINWIDTH*(0.12) ,height:WINWIDTH*(0.12),borderRadius:WINWIDTH*(0.1)/2}}/>
                                <Text style= {{color:'gray',fontSize:WINWIDTH*(0.03),marginTop:WINHEIGHT*(0.01)}}>{this.state.button5.title}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={1} onPress={this._button.bind(this,'button6')}>
                            <View style = {{width:WINWIDTH*(0.2) ,height:WINWIDTH*(0.19),justifyContent:'center',alignItems:'center',backgroundColor:'#ffffff'}}>
                                <Image source ={{uri:'http://'+tu+'/Uploads/'+this.state.button6.imgurl}} resizeMode={'stretch'} style = {{width:WINWIDTH*(0.12) ,height:WINWIDTH*(0.12),borderRadius:WINWIDTH*(0.1)/2}}/>
                                <Text style= {{color:'gray',fontSize:WINWIDTH*(0.03),marginTop:WINHEIGHT*(0.01)}}>{this.state.button6.title}</Text>
                            </View>

                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={1} onPress={this._button.bind(this,'button7')}>
                            <View style = {{width:WINWIDTH*(0.2) ,height:WINWIDTH*(0.19),justifyContent:'center',alignItems:'center',backgroundColor:'#ffffff'}}>
                                <Image source ={{uri:'http://'+tu+'/Uploads/'+this.state.button7.imgurl}} resizeMode={'stretch'} style = {{width:WINWIDTH*(0.12) ,height:WINWIDTH*(0.12),borderRadius:WINWIDTH*(0.1)/2}}/>
                                <Text style= {{color:'gray',fontSize:WINWIDTH*(0.03),marginTop:WINHEIGHT*(0.01)}}>{this.state.button7.title}</Text>
                            </View>
                        </TouchableOpacity>

                    </View>


                    {/*下部展示*/}
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this._renderRow.bind(this)}
                        contentContainerStyle={styles.listViewStyle}
                        //获取数据为空时不飘黄
                        enableEmptySections = {true}

                    />
                </View>

            </InputScrollView>


        )
    }

    _renderRow(rowData){

        return(

            <View style={{width:(WINWIDTH-30)/2, height:WINHEIGHT*(0.25), marginLeft:10,borderWidth:1,borderColor:'gray',marginTop:10}}>
                <TouchableOpacity activeOpacity={1} onPress={()=> {this.showProductDetail(rowData.id)}}>
                    <View style={{width:(WINWIDTH-50)/2, height:WINHEIGHT*(0.25)-10, marginLeft:5, marginTop:5,justifyContent:'center',alignItems:'center'}}>

                        <Image source ={{uri:'http://'+tu+'/Uploads/'+rowData.imgurl}} style = {{width:(WINWIDTH-50)/2, height:WINHEIGHT*(0.15)}}/>
                        <Text style = {{fontSize:WINWIDTH*(0.03),marginTop:WINHEIGHT*(0.01)}}> {rowData.title.substr(0,8)}...</Text>
                        <Text style = {{fontSize:WINWIDTH*(0.025),marginTop:WINHEIGHT*(0.01),color:'red'}}>￥{rowData.price}元</Text>
                    </View>
                </TouchableOpacity>
            </View>


        )
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },

    listViewStyle:{
        flex:1,
        flexDirection:'row', //设置横向布局
        flexWrap:'wrap'    //设置换行显示
    },
});

