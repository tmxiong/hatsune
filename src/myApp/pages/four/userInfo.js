import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    StatusBar,
    Alert
} from 'react-native';
import Header from '../../components/header'
import cfn from '../../commons/utils/commonFun'
import global from '../../commons/global/global'
import {load} from '../../commons/utils/storage'
import dateBase from '../../commons/utils/dateBase'
import {defaultIcon} from '../../commons/config/images'
import {  Button, Icon } from 'native-base';
import {Loading, EasyLoading} from '../../components/loading'
import {clearMapForKey, getUserDataBySessionToken} from '../../commons/utils/storage'
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

    _logout() {
        var that = this;
        Alert.alert('提示：','确定要注销 / 切换账号吗？',[
            {text:'取消',onPress:()=>{}},
            {text:'确定',onPress:()=>{
                EasyLoading.show('正在注销...');
                global.AV.User.logOut()
                    .then((res)=>{
                        EasyLoading.dismis();
                        clearMapForKey('userData');
                        global.userData = null;
                        that.props.navigation.state.params.updateToNoLogin();
                        cfn.goBack(that);
                        console.log(res)
                    })
                    .catch((err)=>{
                        EasyLoading.dismis();
                        console.log(err)
                    })
            }},
        ]);
    }

    _modifyInfo(info) {
        getUserDataBySessionToken(global.sessionToken,(user)=>{
            user.set('article',[{name:'西游记',price:120},{name:'红楼梦',price:99}]);
            return user.save();
        },(err)=>{
            console.log(err)
        })

        setTimeout(()=>{
            getUserDataBySessionToken(global.sessionToken,(user)=>{
                console.log(user);
            },(err)=>{
                console.log(err)
            })
        },3000)
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.itemHeader}>
                    <View style={styles.userIconContainer}>
                        <Image style={styles.userImg} source={defaultIcon}/>
                    </View>

                    <View style={styles.userContent}>
                        <Text style={styles.userName}>{global.userData.username}</Text>
                        <Text style={styles.userDesc}>{`${dateBase.cn_time()}亲爱的${global.userData.username}~`}</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.8}
                                      onPress={()=>cfn.goBack(this)}
                                      style={{position:'absolute',top:20,width:50,height:50,alignItems:'center',
                                          justifyContent:'center'}}>
                        <Icon style={{color:'#eee'}} name="ios-arrow-back"/>
                    </TouchableOpacity>


                </View>

                <View style={{height:cfn.picHeight(30)}}/>
                <TouchableOpacity
                    onPress={()=>this._modifyInfo('男')}
                    style={styles.itemBody}>
                    <Icon style={styles.itemIcon} name="md-bookmark"/>
                    <Text style={styles.itemText}>性别</Text>
                    <View style={styles.itemForwardContainer}>
                        <Icon style={styles.itemForward} name="ios-arrow-forward"/>
                    </View>
                </TouchableOpacity>
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

                <View style={{height:100,marginTop:20,alignItems:'center'}}>

                    <Button onPress={this._logout.bind(this)} style={styles.btn} block disabled={false}> 注销 / 切换账号 </Button>
                </View>
            <Loading/>
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
        height:cfn.picHeight(500),
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#d22'
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
    btn: {
        width:cfn.deviceWidth()-cfn.picWidth(40),
        backgroundColor:'#e22',
        marginTop:20,
        height:50,
        alignSelf:'center'
    },
});