import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    ScrollView
} from 'react-native'
import Header from '../../components/header'
import cfn from '../../commons/utils/commonFun';
import { Loading, EasyLoading } from '../../components/loading'
import OptionModal from '../../components/optionModal'
import WebViewAndroid from '../../components/webViewAndroid'
var ScrollableTabView = require('react-native-scrollable-tab-view');
import Watch from './watch';
import Gaopin from './gaopincai';
import Shuzi from './shuzicai';
import Jingji from './jingjicai';
import lottery from '../../commons/config/lottery_kaijiang'
import urls from '../../commons/config/urls'
export default class three extends Component {

    constructor(props) {
        super(props);
        this.state={
            webViewOffset:50,
            data:[],


        }

    }

    componentDidMount() {
        //EasyLoading.show('加载数据...');


        this.getData();
    }

    getData() {
        let codes = '';
        for(let i = 0,len = lottery.length; i <len; i++) {
            codes += lottery[i].code+'|';
        }
        let url = urls.getNewestLotteryCode(codes);
        fetch(url)
            .then((res)=>res.json())
            .then((data)=>this.setData(data))
            .catch((e)=>{});
    }

    setData(data) {
        this.setState({
            data: data.showapi_res_body.result
        })
    }



    _javascriptToInject() {
        return `
       
        window.webView.postMessage(50);
       
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
        if(url.match(/article/)) {
            this.refs._webView.refs.webViewAndroid.stopLoading();
            if(!e.loading) {
                alert('跳转' + url);
            }
        }
        // if(url.match(/kaijiang/) || url.match(/history/)) {
        //     this.refs._webView._webView.stopLoading();
        //     if(!e.loading) {
        //         cfn.goToPage(this,'kaijiang',{url:url,name:e.title})
        //     }
        // }
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


                {/*<WebViewAndroid*/}
                    {/*ref='_webView'*/}
                    {/*injectedJavaScript={this._javascriptToInject()}*/}
                    {/*onNavigationStateChange={this._onNavigationStateChange.bind(this)}*/}
                    {/*source={{uri:'http://m.ttacp8.com/zixun/jczq?pageNum=2'}} // or use the source(object) attribute...*/}
                {/*/>*/}

                <View style={{height:30,backgroundColor:'#d22'}}/>
                <ScrollableTabView
                    tabBarBackgroundColor="#d22"
                    tabBarTextStyle={{color:'#fff'}}
                    tabBarUnderlineStyle={{backgroundColor:'#fff'}}
                >
                    <Watch tabLabel="关注" data={null}/>
                    <Shuzi tabLabel="数字彩"
                           ref='shuzi'
                           data={this.state.data.slice(0,8)}/>
                    <Gaopin tabLabel="高频彩"
                            data={this.state.data.slice(9,17)}/>
                    <Jingji tabLabel="竞技彩"
                            data={this.state.data.slice(18,20)}/>
                </ScrollableTabView>

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