import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    StatusBar,
    Alert,
} from 'react-native';
import cfn from '../../commons/utils/commonFun'
import { Loading, EasyLoading } from '../../components/loading'
import Header from '../../components/header'
import WebViewAndroid from 'react-native-webview-android';
import global from '../../commons/global/global';
import OptionModal from '../../components/optionModal'
export default class trend extends Component {

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            flex:0
        };
        this.params = props.navigation.state.params;

    }

    componentDidMount() {
        EasyLoading.show('加载数据...');
    }

    _javascriptToInject() {
        // 去除大乐透 双色球 福彩3D的 我要选号按钮 select_btn
        return `
        $(document).ready(function() {
          window.webView.postMessage(document.getElementsByClassName("nav")[0].offsetHeight+
          document.getElementsByClassName("header")[0].offsetHeight);
          if(document.getElementsByClassName("select_btn")[0]) {document.getElementsByClassName("select_btn")[0].style.display='none'}
        })
        
      `
    }

    _onMessage(e) {
        var px = cfn.px2dp(e.message);
        this.setState({
            webViewOffset: px,
        });
        setTimeout(()=>{
            EasyLoading.dismis();
        },300)
    }

    _onNavigationStateChange(e) {
        let url = e.url;
        //console.log(e);
        // if(url.match(/zst/)) {
        //     this._webView.stopLoading();
        //     if(!e.loading) {
        //         cfn.goToPage(this,'articleDetail',{name: e.title,url:url})
        //     }
        // }
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
                    title={this.params.name}
                    leftBtn={"ios-arrow-back"}
                    leftFun={()=>cfn.goBack(this)}
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
                    source={{uri:this.params.url}} // or use the source(object) attribute...
                    style={[styles.webView,{marginTop:-this.state.webViewOffset}]} />
                <OptionModal
                    ref={ref=>this._optionModal = ref}
                    onPressOption={this._onPressOption.bind(this)}
                    //optionData={this.getOptionData()}
                />
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