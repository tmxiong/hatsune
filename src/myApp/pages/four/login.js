import React, {PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import Header from '../../components/header'
import cfn from '../../commons/utils/commonFun'
import { Container, Spinner, Button, InputGroup, Input, Icon } from 'native-base';
import global from '../../commons/global/global'
import inputUtils from '../../commons/utils/inputUtils'
import {Loading, EasyLoading} from '../../components/loading'
import {save} from '../../commons/utils/storage'
export default class login extends PureComponent {

    static defaultProps = {
        goToRegist:()=>{},
        goBack:()=>{}
    };

    constructor(props) {
        super(props);
        //this.params = props.navigation.state.params;
        this.state = {
            name:'登录',
            errorMsg:null,
        };

        this.userName = '';
        this.psd = '';
    }

    componentDidMount() {
        //this.getUserData();
    }

    setUserData(data) {
        global.userData = data;
        save('userData','userData',data);
    }

    _login() {
        let user = new global.AV.User();
        user.setUsername(this.userName);
        user.setPassword(this.psd);
        user.logIn()
            .then(this._loginSuccess.bind(this))
            .catch(this._loginFailure.bind(this))
    }

    _loginSuccess(data) {
        EasyLoading.dismis();
        this.setUserData(data);
        this.props.goBack();
        console.log(data);
    }

    _loginFailure(err) {
        EasyLoading.dismis();
        this.setState({errorMsg:err.rawMessage})
    }

    _onChangeText(e,type) {
        if(type == 'userName') {
            this.userName = e;
        }else if(type == 'psd') {
            this.psd = e;
        }
    }

    _submit() {

        let desc = null;

        desc = inputUtils._checkUserName(this.userName.trim());
        if(!desc[0]) {
            return this.setState({errorMsg:[desc[1]]})
        }

        desc = inputUtils._checkPsd(this.psd,this.psd);
        if(!desc[0]) {
            return this.setState({errorMsg:[desc[1]]})
        }

        EasyLoading.show('正在登录...');

        this._login();

    }

    _onFocus() {
        if(this.state.errorMsg) {
            this.setState({errorMsg:null});
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <ScrollView>
                    <View style={{alignItems:'center'}}>
                        <View style={styles.content}>
                            <View style={styles.userIconContainer}>
                                <Icon style={styles.userIcon} name={'ios-contact-outline'}/>
                            </View>
                            <InputGroup borderType="rounded" style={[styles.textInput,{marginTop:20}]}>
                                <Icon name="md-person" style={styles.inputIcon}/>
                                <Input onFocus={this._onFocus.bind(this)} onChangeText={(e)=>this._onChangeText(e,'userName')} placeholder="邮箱/手机号" placeholderTextColor="#ccc"/>
                            </InputGroup>
                            <InputGroup borderType="rounded" style={styles.textInput}>
                                <Icon name="md-lock" style={styles.inputIcon}/>
                                <Input secureTextEntry={true} onFocus={this._onFocus.bind(this)} onChangeText={(e)=>this._onChangeText(e,'psd')} placeholder="密码" placeholderTextColor="#ccc"/>
                            </InputGroup>
                            <View style={{height:100,marginTop:20,alignItems:'center'}}>
                                <View style={{height:20}}>
                                    {this.state.errorMsg ? <Text style={{color:'#f00',fontWeight:'bold'}}>错误：{this.state.errorMsg}</Text> : null}
                                </View>
                                <Button onPress={()=>this._submit()} style={styles.btn} rounded> 登录 </Button>
                            </View>

                        </View>

                        <View style={styles.footer}>
                            <TouchableOpacity onPress={()=>this.props.goToRegist()} activeOpacity={0.8}>
                                <Text>注册新账号</Text>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={0.8}>
                                <Text>忘记密码？</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                <Loading topOffset={cfn.statusBarHeight()+56} background={'transparent'} />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:cfn.deviceWidth(),
        height:cfn.deviceHeight(),
        alignItems:'center',
        backgroundColor:'#fff'

    },
    content: {
        alignItems:'center',
        width:cfn.deviceWidth()-20,
        marginTop:cfn.picHeight(40),
        backgroundColor:'#fff'
    },
    userIconContainer: {
        width:cfn.picWidth(180),
        height:cfn.picWidth(180),
        alignItems:'center',
        justifyContent:'center',
        borderRadius:cfn.picWidth(90),
        borderColor:'#fff',
        backgroundColor:'#fff'
    },
    userIcon: {
        fontSize:cfn.picWidth(180),
        color:'#ccc',
    },
    inputIcon: {
        color:'#ccc',
        marginLeft:10
    },
    textInput: {
        width:cfn.deviceWidth()-cfn.picWidth(40),
        borderColor:'#e22',
        marginTop:cfn.picHeight(30),
        height:50
    },
    btn: {
        width:cfn.deviceWidth()-cfn.picWidth(40),
        backgroundColor:'#e22',
        marginTop:20,
        height:50,
    },
    footer: {
        flexDirection:'row',
        height:50,
        alignItems:'center',
        justifyContent:'space-between',
        width:cfn.deviceWidth(),
        paddingLeft:20,
        paddingRight:20,
        marginTop:10
    }
});