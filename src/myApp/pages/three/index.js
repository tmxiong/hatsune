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
import WebViewRN from '../../components/webViewRN'
var ScrollableTabView = require('react-native-scrollable-tab-view');
import Watch from './watch';
import Gaopin from './gaopincai';
import Shuzi from './shuzicai';
import Jingji from './jingjicai';
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
       
        if(document.getElementsByClassName("h_popup_mask")[0]){document.getElementsByClassName("h_popup_mask")[0].style.display = "none";}
        document.getElementsByClassName("v-showSubTitle")[0].style.display = "none";
       
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
            this.refs._webView._webView.stopLoading();
            if(!e.loading) {
                cfn.goToPage(this,'kaijiang',{url:url,name:e.title})
            }
        }
    }

    _onPressOption(index,option,isSelected) {
        if(index == 666) {
            EasyLoading.show('加载数据...');
            this.refs._webView._webView.reload();
            return;
        }

    }

    render() {
        return (
            <View style={styles.container}>
                {/*<Header*/}
                    {/*title={"开奖大厅"}*/}
                    {/*leftBtn={""}*/}
                    {/*leftType="text"*/}
                    {/*rightBtn={""}*/}
                    {/*rightType="text"*/}
                {/*/>*/}


                <WebViewRN
                    ref='_webView'
                    injectedJavaScript={this._javascriptToInject()}
                    onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                    source={{uri:'http://m.aicai.com/kjgg/index.do'}} // or use the source(object) attribute...
                />
                {/*<View style={{height:30,backgroundColor:'#d22'}}/>*/}
                {/*<ScrollableTabView*/}

                    {/*tabBarBackgroundColor="#d22"*/}
                    {/*tabBarTextStyle={{color:'#fff'}}*/}
                    {/*tabBarUnderlineStyle={{backgroundColor:'#fff'}}*/}
                {/*>*/}
                    {/*<Watch tabLabel="关注" />*/}
                    {/*<Shuzi tabLabel="数字彩" />*/}
                    {/*<Gaopin tabLabel="高频彩" />*/}
                    {/*<Jingji tabLabel="竞技彩" />*/}
                {/*</ScrollableTabView>*/}

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