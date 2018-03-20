import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    StatusBar,
    Alert,
    ScrollView,
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
            isLogin:global.userData,
            userData:global.userData,

        };
    }

    componentDidMount() {
        if(!global.userData) {
            this.getUserData();
        }
        //console.log(global.loginedUserData);
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
                        global.loginedUserData = null;
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

    _modifyInfo(key,name) {
        // global.loginedUserData.set(key,value);
        // global.loginedUserData.save();
        cfn.goToPage(this,'setUserInfo',{key:key,name:name,updateView:this.updateView.bind(this)})
    }

    updateView(data) {
        this.setState({
            userData:data
        })
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.itemHeader}>
                    <View style={styles.userIconContainer}>
                        <Image style={styles.userImg} source={defaultIcon}/>
                    </View>

                    <View style={styles.userContent}>
                        <Text style={styles.userName}>{this.state.userData.username}</Text>
                        <Text style={styles.userDesc}>{`${dateBase.cn_time()}亲爱的${global.userData.username}~`}</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.8}
                                      onPress={()=>cfn.goBack(this)}
                                      style={{position:'absolute',top:20,width:50,height:50,alignItems:'center',
                                          justifyContent:'center'}}>
                        <Icon style={{color:'#eee'}} name="ios-arrow-back"/>
                    </TouchableOpacity>


                </View>
                <ScrollView>
                    <View style={{height:cfn.picHeight(30)}}/>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={()=>this._modifyInfo('nickname','设置昵称')}
                        style={styles.itemBody}>
                        <Text style={styles.itemText}>昵称</Text>
                        <Text style={{color:'#888'}}>{this.state.userData.nickname || '未设置'}</Text>
                        <View style={styles.itemForwardContainer}>
                            <Icon style={styles.itemForward} name="ios-arrow-forward"/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={()=>this._modifyInfo('sex','设置性别')}
                        style={styles.itemBody}>
                        <Text style={styles.itemText}>性别</Text>
                        <Text style={{color:'#888'}}>{this.state.userData.sex || '未设置'}</Text>
                        <View style={styles.itemForwardContainer}>
                            <Icon style={styles.itemForward} name="ios-arrow-forward"/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={()=>this._modifyInfo('age','设置年龄')}
                        style={styles.itemBody}>
                        <Text style={styles.itemText}>年龄</Text>
                        <Text style={{color:'#888'}}>{this.state.userData.age || '未设置'}</Text>
                        <View style={styles.itemForwardContainer}>
                            <Icon style={styles.itemForward} name="ios-arrow-forward"/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={()=>this._modifyInfo('email','设置邮箱')}
                        style={styles.itemBody}>
                        <Text style={styles.itemText}>邮箱</Text>
                        <Text style={{color:'#888'}}>{this.state.userData.email || '未设置'}</Text>
                        <View style={styles.itemForwardContainer}>
                            <Icon style={styles.itemForward} name="ios-arrow-forward"/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={()=>this._modifyInfo('phoneNum','设置手机号')}
                        style={styles.itemBody}>
                        <Text style={styles.itemText}>手机号</Text>
                        <Text style={{color:'#888'}}>{this.state.userData.phoneNum || '未设置'}</Text>
                        <View style={styles.itemForwardContainer}>
                            <Icon style={styles.itemForward} name="ios-arrow-forward"/>
                        </View>
                    </TouchableOpacity>

                    <View style={{height:100,marginTop:20,alignItems:'center'}}>

                        <Button onPress={this._logout.bind(this)} style={styles.btn} block disabled={false}> 注销 / 切换账号 </Button>
                    </View>
                </ScrollView>

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
    itemForward: {
        color:'#ccc',
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
        color:'#222',
        marginLeft:20,
        fontSize:16,
        width:cfn.picWidth(200),
        //backgroundColor:'#e45'
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