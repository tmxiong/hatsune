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
import RNWebView from '../../components/RNWebView'
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

        return`
                    
        `;
    }


    _onNavigationStateChange(e) {
        let url = e.url;
        console.log(e);
        if(url.match(/help/)) {
            this.refs._webView._webView.stopLoading();
            if(!e.loading) {
                cfn.goToPage(this,'touzhuOther',{name: e.title,url:url})
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

                <RNWebView
                    ref="_webView"
                    injectedJavaScript={this._javascriptToInject()}
                    onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                    source={{uri:this.params.url}} // or use the source(object) attribute...
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