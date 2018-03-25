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
import OptionModal from '../../components/optionModal'
export default class three extends Component {

    constructor(props) {
        super(props);
        this.state={
            webViewOffset:50
        }

    }

    componentDidMount() {
        EasyLoading.show('加载数据...');
    }

    _javascriptToInject() {
        return `
        var height = 0;
        if(document.getElementsByClassName("v-header")[0]){height = document.getElementsByClassName("v-header")[0].offsetHeight}
        if(document.getElementsByClassName("h_popup_mask")[0]){document.getElementsByClassName("h_popup_mask")[0].style.display = "none";}
        window.webView.postMessage(height);
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

    _onPressOption(index,option,isSelected) {
        if(index == 666) {
            EasyLoading.show('加载数据...');
            this.refs.webViewAndroid.reload();
            return;
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
                    rightFun={()=>this._optionModal.setModalVisible(true)}
                />
                <WebViewAndroid
                    ref="webViewAndroid"
                    javaScriptEnabled={true}
                    geolocationEnabled={false}
                    builtInZoomControls={false}
                    injectedJavaScript={this._javascriptToInject()}
                    onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                    onMessage={this._onMessage.bind(this)}
                    source={{uri:'http://m.aicai.com/kjgg/index.do'}} // or use the source(object) attribute...
                    style={[styles.webView,{marginTop:-this.state.webViewOffset}]} />
                <OptionModal
                    ref={ref=>this._optionModal = ref}
                    onPressOption={this._onPressOption.bind(this)}
                    //optionData={this.getOptionData()}
                />
                <Loading topOffset={cfn.statusBarHeight()+56+50}/>
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