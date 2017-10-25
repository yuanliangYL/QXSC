
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
    Dimensions


} from 'react-native';



const  WINWIDTH = Dimensions.get('window').width;
const  WINHEIGHT = Dimensions.get('window').height;



export  default class about extends  Component{
    constructor(props){
        super(props);
        this.state={};
    }

    componentDidMount() {
        console.log('http://' + ipdy +'/business/getlogoofaboutme')

        fetch('http://' + ipdy +'/business/getlogoofaboutme')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({
                    img:JSON.parse(responseJson.data[0].imgurls),

                });


            })
            .catch((error) => {

            })
    }



    render(){
    return(
        <View style={{backgroundColor:'#e6e6e6',flex:1}}>
            <View style={{width:WINWIDTH,height:400, backgroundColor:'#e6e6e6',justifyContent:'center',alignItems:'center'}}>
                {
                    console.log('http://' + tu + '/Uploads/'+this.state.img)
                }
                <Image source={{uri: 'http://' + tu + '/Uploads/'+this.state.img}}
                       style={{width:WINWIDTH*(0.25),height:WINWIDTH*(0.25),}}
                />
            </View>
            <View style={{position:'absolute',
                bottom:0, height:WINHEIGHT*(0.2),width:WINWIDTH,justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:WINWIDTH*(0.03),color:'#696969'}}>{filetitle} 版权所有</Text>
                <Text style={{fontSize:WINWIDTH*(0.025),color:'#696969'}}>{letter}</Text>
            </View>
        </View>
    )
    }
}
