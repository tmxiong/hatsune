import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    ScrollView
} from 'react-native'
import Header from '../../components/header'
import WebViewAndroid from 'react-native-webview-android'
import cfn from '../../commons/utils/commonFun';
import { Loading, EasyLoading } from '../../components/loading'
export default class three extends Component {

    constructor(props) {
        super(props);
        this.state={
            webViewOffset:0
        }

    }

    componentDidMount() {
        EasyLoading.show('加载数据...');
    }

    _javascriptToInject() {
        return `
        var height = document.getElementsByClassName("v-header")[0].offsetHeight;
        window.webView.postMessage(height);
        if(document.getElementsByClassName("h_popup_mask")[0]){document.getElementsByClassName("h_popup_mask")[0].style.display = "none";}
      `
    }

    _onMessage(e) {
        this.setState({
            webViewOffset:cfn.px2dp(e.message),
        });

        setTimeout(()=>{
            EasyLoading.dismis();
        },400)
    }

    _onNavigationStateChange(e) {
        let url = e.url;
        if(url.match(/kaijiang/) || url.match(/history/)) {
            this.refs.webViewAndroid.stopLoading();
            if(!e.loading) {
                cfn.goToPage(this,'kaijiang',{url:url,name:e.title})
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    title={"开奖大厅"}
                    leftBtn={""}
                    leftType="text"
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
                    source={{uri:'http://m.aicai.com/kjgg/index.do?agentId=1&vt=5'}} // or use the source(object) attribute...
                    style={[styles.webView,{marginTop:-this.state.webViewOffset}]} />
                <Loading topOffset={cfn.statusBarHeight()+56}/>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
      flex:1
    },
    webView: {
        zIndex:-1,
        flex:1
    },
});