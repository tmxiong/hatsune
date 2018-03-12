/**
 * Created by tmxiong on 2018/3/10.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import cfn from '../../commons/utils/commonFun'
import Swiper from 'react-native-swiper';
import {banner} from '../../commons/config/images'
import Banner from '../../components/banner'
import MarqueeLabel from '../../components/notice/marqueeLabel'
import NavBar from '../../components/navbar'
import lotterys from '../../commons/config/lotterys_new'

export default class index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lotteryMenu:null,
        };

        let fc = lotterys[2].lottery[0];
        this.lottery = lotterys[1].lottery;
        console.log(this.lottery)
    }

    setLotteryMenu() {
        let lotteryMenu = [];
        for(let i = 0; i < this.lottery.length; i++) {
            lotteryMenu.push(
                <View></View>
            )
        }
    }

    render() {
        return(
            <View style={styles.container}>

                <View>
                    <Banner
                        bannerList={banner}
                    />
                    <MarqueeLabel
                        speed={50}
                        textStyle={{
                            color:'#eee',
                            fontSize:14
                        }}
                        bgViewStyle={{
                            backgroundColor:'rgba(0,0,0,0.5)',height:cfn.picHeight(50),
                            position:'absolute',bottom:0
                        }}
                        //textContainerStyle={styles.marqueeLabelBg}
                    >
                        This is a Marquee Label.
                    </MarqueeLabel>
                </View>

                <View style={styles.menuContainer}>
                    <View style={styles.menuTitle}>
                        <View style={styles.titleIcon}/>
                        <Text style={styles.titleText}>彩种推荐</Text>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.more}>
                            <Text>更多>></Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        {/*<Image style={styles.imgIcon} source={this.lottery[0].icon}/>*/}
                        {/*<Text>{this.lottery[0].name}</Text>*/}
                    </View>
                </View>

                <View style={[styles.menuContainer,{marginTop:cfn.picHeight(20)}]}>
                    <View style={styles.menuTitle}>
                        <View style={styles.titleIcon}/>
                        <Text style={styles.titleText}>常用工具</Text>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#f5f5f5'
    },
    wrapper: {
        height:cfn.picHeight(300),
        width:cfn.deviceWidth(),

    },
    banner: {
        width:cfn.deviceWidth(),
        height:cfn.picHeight(300),
        backgroundColor:'#f00'
    },
    menuContainer: {
        width:cfn.deviceWidth(),
        height:cfn.picHeight(300),
        backgroundColor:'#fff'
    },
    menuTitle: {
        height:cfn.picHeight(60),
        flexDirection:'row',
        width:cfn.deviceWidth(),
        alignItems:'center',
        borderBottomColor:'#eee',
        borderBottomWidth:1,
    },
    titleIcon: {
      width:5,
        height:cfn.picHeight(36),
        backgroundColor:'#d22',
        marginLeft:cfn.picWidth(20),
        marginRight:cfn.picWidth(10),
        borderRadius:2
    },
    titleText: {
      color:'#333',
        fontSize:16
    },
    more: {
      position:'absolute',
        right:5,
        alignItems:'center',
        justifyContent:'center',
        height:cfn.picHeight(60),
    },
    menuBody: {

    },
    imgIcon: {
        width:cfn.picHeight(120),
        height:cfn.picHeight(120)
    }
})