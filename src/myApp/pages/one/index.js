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
    TouchableOpacity,
    StatusBar,
    ScrollView
} from 'react-native';
import cfn from '../../commons/utils/commonFun'

import {banner} from '../../commons/config/images'
import Banner from '../../components/banner'
import MarqueeLabel from '../../components/notice/marqueeLabel'
import { Loading, EasyLoading } from '../../components/loading'
import lotterys from '../../commons/config/lotterys_new'
import tools from '../../commons/config/lottery_tools'
import global from '../../commons/global/global'
import {Icon} from 'native-base';
import {load} from '../../commons/utils/storage'
import NewsList from '../../components/newsList'
export default class index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lotteryMenu:null,
            toolsMenu:null,
        };

        //let fc = lotterys[2].lottery[0];
        this.lottery = lotterys[1].lottery;
        //this.lottery[7] = fc;
    }

    componentDidMount() {
        this.setToolMenu();
        this.getLotteryDataByStorage();
    }

    async getLotteryDataByStorage() {
        // global.storage.getAllDataForKey('lotteryMenu')
        //     .then((data)=>this.setLotteryStorageData(data))
        //     .catch((error)=>this.setLotteryMenu(this.lottery))

        // global.storage.load({key:'lotteryMenu',id:'lotteryMenu'})
        //     .then((data)=>this.setLotteryStorageData(data))
        //     .catch((error)=>this.setLotteryMenu(this.lottery))
        try {
            let data = await load('lotteryMenu','lotteryMenu');
            this.setLotteryStorageData(data);
        }  catch(e) {
            this.setLotteryMenu(this.lottery)
        }

    }

    setLotteryStorageData(data) {
        if(data.length != 0) {
            this.lottery = data;
        }
        this.setLotteryMenu(data);
    }

    setLotteryMenu() {
        let data = this.lottery;
        let lotteryMenu = [];
        for(let i = 0; i < data.length; i++) {
            lotteryMenu.push(
                <TouchableOpacity
                    onPress={()=>cfn.goToPage(this,'touzhu',
                        {name:data[i].name, url: data[i].url ,fromMenu:true, data:data[i]})}
                    activeOpacity={0.8} key={data[i].code} style={styles.menuBodyItem}>
                    <Image style={styles.imgIcon} source={data[i].icon}/>
                    <Text>{data[i].name}</Text>
                </TouchableOpacity>
            )
        }

        this.setState({
            lotteryMenu:lotteryMenu
        })
    }

    setToolMenu() {
        let toolsMenu = [];
        for(let i = 0; i < 4; i++) {
            toolsMenu.push(
                <TouchableOpacity
                    key={'s'+i}
                    activeOpacity={0.8}
                    onPress={()=>cfn.goToPage(this,tools[i].page,{})}
                    style={[styles.toolCell,{borderRightColor:'#eee',borderRightWidth:1}]}>
                    <Icon name={tools[i].icon} style={[styles.toolIcon,{color:tools[i].color}]}/>
                    <View style={styles.toolCellHead}>
                        <Text style={styles.toolCellTitle}>{tools[i].name}</Text>
                        <Text style={styles.toolCellDesc}>{tools[i].desc}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
        this.setState({
            toolsMenu:toolsMenu,
        })
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

                <ScrollView>
                    <View style={styles.menuContainer}>
                        <View style={styles.menuTitle}>
                            <View style={styles.titleIcon}/>
                            <Text style={styles.titleText}>彩种推荐</Text>
                            <TouchableOpacity
                                onPress={()=>cfn.goToPage(this,'moreLot',
                                    {name:'彩种列表',data:this.lottery,reloadMenu:this.getLotteryDataByStorage.bind(this)})}
                                activeOpacity={0.8}
                                style={styles.more}>
                                <Text>更多>></Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.menuBody}>
                            {/*<View style={styles.menuBodyItem}>*/}
                            {/*<Image style={styles.imgIcon} source={this.lottery[0].icon}/>*/}
                            {/*<Text>{this.lottery[0].name}</Text>*/}
                            {/*</View>*/}
                            {this.state.lotteryMenu}
                        </View>
                    </View>

                    <View style={[styles.menuContainer,{marginTop:cfn.picHeight(20)}]}>
                        <View style={styles.menuTitle}>
                            <View style={styles.titleIcon}/>
                            <Text style={styles.titleText}>常用工具</Text>
                        </View>
                        <View style={styles.menuBody}>
                            {/*<View style={[styles.toolCell,{borderRightColor:'#eee',borderRightWidth:1}]}>*/}
                                {/*<Icon name="ios-trending-up-outline" style={styles.toolIcon}/>*/}
                                {/*<View style={styles.toolCellHead}>*/}
                                    {/*<Text style={styles.toolCellTitle}>开奖走势</Text>*/}
                                    {/*<Text style={styles.toolCellDesc}>开奖走势开奖走势</Text>*/}
                                {/*</View>*/}
                            {/*</View>*/}
                            {this.state.toolsMenu}

                        </View>
                    </View>

                    <View style={[styles.menuContainer,{marginTop:cfn.picHeight(20)}]}>
                        <View style={styles.menuTitle}>
                            <View style={styles.titleIcon}/>
                            <Text style={styles.titleText}>彩市资讯</Text>
                            <TouchableOpacity
                                onPress={()=>cfn.goToPage(this,'article', {name:'彩种列表'})}
                                activeOpacity={0.8}
                                style={styles.more}>
                                <Text>更多>></Text>
                            </TouchableOpacity>
                        </View>
                        <NewsList _this={this}/>
                    </View>

                </ScrollView>

                <StatusBar hidden={false}
                           translucent= {true}
                           backgroundColor={'transparent'}
                           barStyle={'light-content'}/>

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
        backgroundColor:'#fff'
    },
    menuTitle: {
        height:cfn.picHeight(80),
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
        height:cfn.picHeight(80),
    },
    menuBody: {
        flexDirection:'row',
        flexWrap:'wrap',

    },
    menuBodyItem: {
      alignItems:'center',
        justifyContent:'center',
        width:cfn.deviceWidth()/4,
        height:cfn.deviceWidth()/4,
    },
    imgIcon: {
        width:cfn.picHeight(120),
        height:cfn.picHeight(120)
    },
    toolCell: {
        width:cfn.deviceWidth()/2,
        height:cfn.picHeight(200),
        borderBottomColor:'#eee',
        borderBottomWidth:1,
        flexDirection:'row',
        alignItems:'center'
    },
    toolIcon: {
        fontSize:50,
        color:'#c33',
        width:50,
        height:50,
        marginLeft:15
    },
    toolCellHead: {
        marginLeft:5,
        alignItems:'flex-start',
        justifyContent:'center',
    },
    toolCellTitle: {
        fontSize:18,
    },
    toolCellDesc: {
        color:'#ccc',
        marginTop:5
    }
})