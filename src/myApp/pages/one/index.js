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
    AsyncStorage
} from 'react-native';
import cfn from '../../commons/utils/commonFun'
import Swiper from 'react-native-swiper';
import {banner} from '../../commons/config/images'
import Banner from '../../components/banner'
import MarqueeLabel from '../../components/notice/marqueeLabel'
import NavBar from '../../components/navbar'
import lotterys from '../../commons/config/lotterys_new'
import Storage from 'react-native-storage';
import global from '../../commons/global/global'

export default class index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lotteryMenu:null,
        };

        let fc = lotterys[2].lottery[0];
        this.lottery = lotterys[1].lottery;
        this.lottery[7] = fc;
    }

    componentDidMount() {
        this.initStorage();
        this.getLotteryDataByStorage();
    }

    initStorage() {
        global.storage = new Storage({
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
            // 则会调用相应的sync方法，无缝返回最新数据。
            // sync方法的具体说明会在后文提到
            // 你可以在构造函数这里就写好sync的方法
            // 或是写到另一个文件里，这里require引入
            // 或是在任何时候，直接对storage.sync进行赋值修改
            sync: require('../../commons/global/sync')  // 这个sync文件是要你自己写的
        })
    }

    getLotteryDataByStorage() {
        // global.storage.getAllDataForKey('lotteryMenu')
        //     .then((data)=>this.setLotteryStorageData(data))
        //     .catch((error)=>this.setLotteryMenu(this.lottery))

        global.storage.load({key:'lotteryMenu',id:'lotteryMenu'})
            .then((data)=>this.setLotteryStorageData(data))
            .catch((error)=>this.setLotteryMenu(this.lottery))

    }

    setLotteryStorageData(data) {
        if(data.length != 0) {
            this.lottery = data;
        }
        this.setLotteryMenu(data);
    }

    setLotteryMenu(data) {
        let lotteryMenu = [];
        for(let i = 0; i < data.length; i++) {
            lotteryMenu.push(
                <TouchableOpacity
                    onPress={()=>cfn.goToPage(this,'touzhu',
                        {name:data[i].name,
                            url:`http://m.aicai.com/bet/${data[i].url}.do`,fromMenu:true})}
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
                </View>
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
})