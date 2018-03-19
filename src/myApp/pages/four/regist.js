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
import inputUtils from '../../commons/utils/inputUtils'
import global from '../../commons/global/global'
export default class regist extends PureComponent {

    static defaultProps = {
        goToLogin:()=>{},
        goBack:()=>{}
    };

    constructor(props) {
        super(props);
        //this.params = props.navigation.state.params;

        this.userName = '';
        this.psd      = '';
        this.rePsd    = '';
        this.email    = '';

        this.state = {
            errorMsg:null
        }
    }

    _onChangeText(e,type) {
        if(type == 'userName') {
            this.userName = e;
        }else if(type == 'psd') {
            this.psd = e;
        }else if(type == 'rePsd') {
            this.rePsd = e;
        }else if(type == 'email') {
            this.email = e;
        }
    }

    _onFocus() {
        if(this.state.errorMsg) {
            this.setState({errorMsg:null});
        }
    }

    _submit() {
        let desc = null;

        desc = inputUtils._checkUserName(this.userName.trim());
        if(!desc[0]) {
            return this.setState({errorMsg:[desc[1]]})
        }

        desc = inputUtils._checkPsd(this.psd,this.rePsd);
        if(!desc[0]) {
            return this.setState({errorMsg:[desc[1]]})
        }

        desc = inputUtils._checkEmail(this.email);
        if(!desc[0]) {
            return this.setState({errorMsg:[desc[1]]})
        }

        let user = new global.AV.User();
        user.setUsername(this.userName);
        user.setPassword(this.psd);
        // const result = await user.signUp();
        // console.log(result);
        user.signUp()
            .then((res)=>{
            console.log(user);
        })
            .catch((err)=>{
                console.log(err)
            });

    }



    render() {
        return (
            <View style={styles.container}>

                <ScrollView>
                    <View style={{alignItems:'center'}}>
                        <View style={styles.content}>
                            <InputGroup borderType="block" style={[styles.textInput,{marginTop:10}]}>
                                <Icon name="md-person" style={styles.inputIcon}/>
                                <Input onFocus={this._onFocus.bind(this)} onChangeText={(e)=>this._onChangeText(e,'userName')} placeholder="输入用户名(不少于3个)" placeholderTextColor="#ccc"/>
                            </InputGroup>
                            <InputGroup borderType="block" style={styles.textInput}>
                                <Icon name="md-lock" style={styles.inputIcon}/>
                                <Input onFocus={this._onFocus.bind(this)} onChangeText={(e)=>this._onChangeText(e,'psd')} placeholder="输入密码(不少于6位数)" placeholderTextColor="#ccc"/>
                            </InputGroup>
                            <InputGroup borderType="block" style={styles.textInput}>
                                <Icon name="md-lock"  style={styles.inputIcon}/>
                                <Input secureTextEntry={true} onFocus={this._onFocus.bind(this)} onChangeText={(e)=>this._onChangeText(e,'rePsd')} placeholder="再次输入密码(不少于6位数)" placeholderTextColor="#ccc"/>
                            </InputGroup>
                            <InputGroup borderType="block" style={styles.textInput}>
                                <Icon name="md-mail" style={styles.inputIcon}/>
                                <Input secureTextEntry={true} onFocus={this._onFocus.bind(this)} onChangeText={(e)=>this._onChangeText(e,'email')} placeholder="输入邮箱用于找回密码" placeholderTextColor="#ccc"/>
                            </InputGroup>
                            <View style={{height:100,marginTop:20,alignItems:'center'}}>
                                <View style={{height:20}}>
                                    {this.state.errorMsg ? <Text style={{color:'#f00',fontWeight:'bold'}}>错误：{this.state.errorMsg}</Text> : null}
                                </View>
                                <Button onPress={()=>this._submit()} style={styles.btn} block disabled={false}> 注册 </Button>
                            </View>

                        </View>

                        <View style={styles.footer}>
                            <TouchableOpacity onPress={()=>this.props.goToLogin()} activeOpacity={0.8}>
                                <Text>已有账号去登录</Text>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={0.8}>
                                <Text>帮助？</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>

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

    inputIcon: {
        color:'#ccc',
        width:40,
        textAlign:'center'
    },
    textInput: {
        width:cfn.deviceWidth()-cfn.picWidth(40),
        borderColor:'#e22',
        marginTop:cfn.picHeight(30),
        height:40
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