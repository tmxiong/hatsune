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
import RNWebView from '../../components/RNWebView'
export default class trend extends Component {

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            webViewOffset:50
        };
        this.params = props.navigation.state.params;

    }

    componentDidMount() {
        //EasyLoading.show('加载数据...');
    }

    _javascriptToInject() {
        // 去除大乐透 双色球 福彩3D的 我要选号按钮 select_btn
        return `
          document.getElementsByClassName("select_btn")[0].style.display='none';
          document.getElementsByClassName("header")[0].style.display='none'
        
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
                    rightBtn={""}
                    rightType={'text'}
                />

                <RNWebView
                    ref='_webView'
                    injectedJavaScript={this._javascriptToInject()}
                    onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                    source={{uri:this.params.url}} // or use the source(object) attribute...
                    style={{marginTop:-cfn.px2dp(117)}}
                />
                <OptionModal
                    ref={ref=>this._optionModal = ref}
                    onPressOption={this._onPressOption.bind(this)}
                    //optionData={this.getOptionData()}
                />
                {/*<Loading topOffset={cfn.statusBarHeight()+56}/>*/}
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