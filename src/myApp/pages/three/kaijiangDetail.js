// 从投注页跳过来的

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
import OptionModal from '../../components/optionModal'
export default class helloPage extends Component {

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            webViewOffset:50,
        };
        this.params = props.navigation.state.params;

    }

    componentDidMount() {
        EasyLoading.show('加载数据...');
    }


    _javascriptToInject() {
        let className = '';
        return`
            var height = document.getElementsByClassName("v-header")[0].offsetHeight;
            window.webView.postMessage(height);            
        `;
    }

    _onMessage(e) {
        console.log(e)
        this.setState({
            webViewOffset:cfn.px2dp(e.message),
        });

        setTimeout(()=>{
            EasyLoading.dismis();
        },400)
    }

    _onNavigationStateChange(e) {
        let url = e.url;
        console.log(e);
        if(url.match(/help/)) {
            this.refs.webViewAndroid.stopLoading();
            if(!e.loading) {
                cfn.goToPage(this,'touzhuOther',{name: e.title,url:url})
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