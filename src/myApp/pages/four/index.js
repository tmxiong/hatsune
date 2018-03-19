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
        this.initAV();
        this.getUserData();
    }

    async initAV() {
        AV.init({appId, appKey});
        global.AV = AV;
        // let user = new AV.User();
        // user.setUsername('user1');
        // user.setPassword('testpass');
        // const result = await user.signUp();
        // console.log(result);
    }

    getUserData() {
        load('userData','userData',this.onSuccess.bind(this),this.onFailure.bind(this))
    }

    onSuccess(data) {
        if(!global.userData) {
            global.userData = data;
        }

        this.setState({isLogin:true});
        console.log(data)
    }

    onFailure(err) {
        console.log(err)
    }

    getLoginDesc(isLogin) {
        return isLogin ? `${dateBase.cn_time()}欢迎${global.userData.username}回来！` : `${dateBase.cn_time()}游客！登录更精彩～`
    }

    render() {
        return (
            <View style={styles.container}>
                {/*<Header*/}
                    {/*title={"我的"}*/}
                    {/*leftBtn={""}*/}
                    {/*leftType="text"*/}
                    {/*leftFun={()=>{}}*/}
                    {/*rightBtn={""}*/}
                    {/*rightType="text"*/}
                    {/*rightFun={()=>{}}*/}
                {/*/>*/}
                <TouchableOpacity
                    onPress={()=>cfn.goToPage(this,'loginAndRegist',{name:'登录'})}
                    activeOpacity={1} style={[styles.itemHeader,{backgroundColor:'#d22'}]}>
                    <View style={{flexDirection: 'row',alignItems:'center'}}>
                        <View style={styles.userIconContainer}>
                            {this.state.isLogin ?
                                <Image style={styles.userImg} source={defaultIcon}/> :
                                <Icon style={styles.userIcon} name={'ios-contact-outline'}/>}
                        </View>

                        <View style={styles.userContent}>
                            <Text style={styles.userName}>{this.state.isLogin ? global.userData.username : '登录/注册'}</Text>
                            <Text style={styles.userDesc}>{this.getLoginDesc(this.state.isLogin)}</Text>
                        </View>
                        <Icon style={styles.forward} name="ios-arrow-forward"/>
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
        height:cfn.picHeight(350),
        backgroundColor:'#fff',
        flexDirection:'row',
        alignItems:'flex-end',
        paddingBottom:cfn.picHeight(50)
    },
    userIconContainer: {
        width:cfn.picWidth(120),
        height:cfn.picWidth(120),
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
        width:cfn.picWidth(120),
        height:cfn.picWidth(120),
        borderRadius:cfn.picWidth(75),
    },
    userContent: {
        width:cfn.deviceWidth()-cfn.picWidth(120 + 20 + 20 + 60)
    },
    userName: {
        fontSize:18,
        color:'#fff'
    },
    userDesc: {
        color:'#ddd',
        marginTop:cfn.picHeight(10),
        width:cfn.deviceWidth()-cfn.picWidth(120 + 20 + 20 + 60)
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