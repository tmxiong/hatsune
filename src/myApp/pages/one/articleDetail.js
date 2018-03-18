import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    StatusBar,
    WebView,
    Alert,
} from 'react-native';
import cfn from '../../commons/utils/commonFun'
import WebViewAndroid from 'react-native-webview-android';
import { Loading, EasyLoading } from '../../components/loading'
import Header from '../../components/header'
import config from '../../commons/config/config'
export default class helloPage extends Component {

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            webViewOffset:0
        };
        this.params = props.navigation.state.params;
    }

    componentDidMount() {
        EasyLoading.show('加载数据...');
    }

    _onMessage(e) {
        this.setState({
            webViewOffset:cfn.px2dp(e.message),
        });

        setTimeout(()=>{
            EasyLoading.dismis();
        },300)
    }

    _javascriptToInject() {
        return `
        
        var height = document.getElementsByClassName("v-header")[0].offsetHeight;
            window.webView.postMessage(height);
            document.getElementsByClassName("cms-title")[0].textContent = '${config.appName}';
            if(document.getElementsByClassName("nnew_xgx")[0]){document.getElementsByClassName("nnew_xgx")[0].style.display="none";}
            if(document.getElementsByClassName("footer-down")[0]){document.getElementsByClassName("footer-down")[0].style.display="none";}
            if(document.getElementsByClassName("nnews_xgg")[0]){document.getElementsByClassName("nnews_xgg")[0].style.display="none";}
            if(document.getElementsByClassName("h_popup_mask")[0]){document.getElementsByClassName("h_popup_mask")[0].style.display = "none";}
            `
    }

    _onNavigationStateChange(e) {
        let url = e.url;
        if(url.match(/tzzlottery/)) {
            this.refs.webViewAndroid.stopLoading();
            if(!e.loading) {
                cfn.goToPage(this,'articleDetail',{name: e.title})
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    title={this.params.name}
                    leftBtn={"ios-arrow-back"}
                    leftFun={()=>cfn.goBack(this)}
                    rightBtn={"ios-menu"}
                    rightFun={()=>{}}
                />

                <WebViewAndroid
                    ref="webViewAndroid"
                    javaScriptEnabled={true}
                    geolocationEnabled={false}
                    builtInZoomControls={false}
                    injectedJavaScript={this._javascriptToInject()}
                    onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                    onMessage={this._onMessage.bind(this)}
                    source={{uri:this.params.url}} // or use the source(object) attribute...
                    style={[styles.webView,{marginTop:-this.state.webViewOffset}]} />
                <Loading topOffset={cfn.statusBarHeight()+56}/>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    webView: {
        zIndex:-1,
        flex:1
    },
});