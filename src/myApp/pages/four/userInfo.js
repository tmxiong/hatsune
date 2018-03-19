import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import Header from '../../components/header'
import {Icon} from 'native-base'
import cfn from '../../commons/utils/commonFun'
import AV from 'leancloud-storage'
import {AV_APP_ID as appId, AV_APP_KEY as appKey} from '../../commons/config/config';
import global from '../../commons/global/global'
import {load} from '../../commons/utils/storage'
import dateBase from '../../commons/utils/dateBase'
import {defaultIcon} from '../../commons/config/images'

export default class index extends Component {

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            isLogin:false,

        };
    }

    componentDidMount() {
        if(!global.userData) {
            this.getUserData();
        }
    }


    getUserData() {
        load('userData','userData',this.onSuccess.bind(this),this.onFailure.bind(this))
    }

    onSuccess(data) {

        global.userData = data;
        this.setState({isLogin:true});
        console.log(data)
    }

    onFailure(err) {
        console.log(err)
    }


    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={()=>cfn.goToPage(this,'loginAndRegist',{name:'登录'})}
                    activeOpacity={1} style={[styles.itemHeader,{backgroundColor:'#d22'}]}>
                    <View style={{alignItems:'center',justifyContent:'center'}}>
                        <View style={styles.userIconContainer}>

                            <Image style={styles.userImg} source={defaultIcon}/>

                        </View>

                        <View style={styles.userContent}>
                            <Text style={styles.userName}>{global.userData.username}</Text>
                            <Text style={styles.userDesc}>{`${dateBase.cn_time()}亲爱的${global.userData.username}~`}</Text>
                        </View>

                    </View>

                </TouchableOpacity>
                <View style={{height:cfn.picHeight(30)}}/>
                <View style={styles.itemBody}>
                    <Icon style={styles.itemIcon} name="md-bookmark"/>
                    <Text style={styles.itemText}>我收藏的文章</Text>
                    <View style={styles.itemForwardContainer}>
                        <Icon style={styles.itemForward} name="ios-arrow-forward"/>
                    </View>
                </View>
                <View style={styles.itemBody}>
                    <Icon style={styles.itemIcon} name="ios-time"/>
                    <Text style={styles.itemText}>阅读过的文章</Text>
                    <View style={styles.itemForwardContainer}>
                        <Icon style={styles.itemForward} name="ios-arrow-forward"/>
                    </View>
                </View>

                <View style={[styles.itemBody,{marginTop:cfn.picHeight(30)}]}>
                    <Icon style={styles.itemIcon} name="md-bookmark"/>
                    <Text style={styles.itemText}>我收藏的彩种</Text>
                    <View style={styles.itemForwardContainer}>
                        <Icon style={styles.itemForward} name="ios-arrow-forward"/>
                    </View>
                </View>

                <View style={[styles.itemBody,{marginTop:cfn.picHeight(30)}]}>
                    <Icon style={styles.itemIcon} name="md-bookmark"/>
                    <Text style={styles.itemText}>应用介绍</Text>
                    <View style={styles.itemForwardContainer}>
                        <Icon style={styles.itemForward} name="ios-arrow-forward"/>
                    </View>
                </View>

                <View style={[styles.itemBody,{marginTop:cfn.picHeight(30)}]}>
                    <Icon style={styles.itemIcon} name="md-bookmark"/>
                    <Text style={styles.itemText}>版本更新</Text>
                    <View style={styles.itemForwardContainer}>
                        <Icon style={styles.itemForward} name="ios-arrow-forward"/>
                    </View>
                </View>

            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    itemHeader: {
        width:cfn.deviceWidth(),
        height:cfn.picHeight(400),
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center'
    },
    userIconContainer: {
        width:cfn.picWidth(150),
        height:cfn.picWidth(150),
        alignItems:'center',
        justifyContent:'center',
        borderRadius:cfn.picWidth(75),
        marginRight:cfn.picWidth(20),
        marginLeft:cfn.picWidth(20),
    },
    userIcon: {
        fontSize:cfn.picWidth(120),
        color:'#ccc',

    },
    userImg: {
        width:cfn.picWidth(150),
        height:cfn.picWidth(150),
        borderRadius:cfn.picWidth(75),
    },
    userContent: {
        width:cfn.deviceWidth()-cfn.picWidth(120),
        alignItems:'center',
        justifyContent:'center',
    },
    userName: {
        fontSize:22,
        color:'#fff',
        marginTop:cfn.picHeight(30)
    },
    userDesc: {
        color:'#ddd',
        marginTop:cfn.picHeight(10),
        width:cfn.deviceWidth()-cfn.picWidth(120),
        textAlign:'center'
    },
    forward: {
        fontSize: 30,
        color:'#ddd',
    },
    itemBody: {
        width:cfn.deviceWidth(),
        height:cfn.picHeight(100),
        backgroundColor:'#fff',
        //marginTop:cfn.picHeight(20),
        alignItems:'center',
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor:'#eee',
    },
    itemIcon: {
        fontSize:25,
        marginLeft:cfn.picWidth(30),
        marginRight:cfn.picWidth(30),
        width:25,
        textAlign:'center'

    },
    itemText: {

    },
    itemForwardContainer: {
        position:'absolute',
        height:cfn.picHeight(100),
        justifyContent:'center',
        right:cfn.picWidth(30)
    },
    itemForward: {

    }
});