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
import { Loading, EasyLoading } from '../../components/loading'
import Header from '../../components/header'
import WebViewRN from '../../components/webViewRN'
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
            document.getElementsByClassName("v-header")[0].style.display='none';
            document.getElementsByClassName("history-btn")[0].style.display='none';
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
            this.refs._webView._webView.stopLoading();
            if(!e.loading) {
                cfn.goToPage(this,'touzhuOther',{name: e.title,url:url})
            }
        } else if(url.match(/detailAll/)) {
            this.refs._webView._webView.stopLoading();
            if(!e.loading) {
                cfn.goToPage(this,'kaijiangDetail',{name: e.title,url:url})
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
                    rightBtn={""}
                    rightType={'text'}
                />

                <WebViewRN
                    ref='_webView'
                    injectedJavaScript={this._javascriptToInject()}
                    onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                    source={{uri:this.params.url}}
                />

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