/**
 * from:
 *      1. touzhuOther
 *      2. article
 *      3. index --> newsList index.js
 * */

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
    ToastAndroid
} from 'react-native';
import cfn from '../../commons/utils/commonFun'
import WebViewAndroid from 'react-native-webview-android';
import { Loading, EasyLoading } from '../../components/loading'
import Header from '../../components/header'
import config from '../../commons/config/config'
import {save, getAllDataForKey} from '../../commons/utils/storage'
import OptionModal from '../../components/optionModal'
export default class helloPage extends Component {

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            webViewOffset:50,
            isCollected:false,
            isLoved:false,
        };
        this.params = props.navigation.state.params;
        this.id = this.params.url.split('id=')[1].split('&')[0];
        this.isCollected = this.isLoved = false;
    }

    componentDidMount() {
        EasyLoading.show('加载数据...');
        this.getIsCollectedOrLoved(this.id)
    }

    getOptionData() {
        return [{
            icon:'md-star',
            option:'收藏',
            isSelected:this.isCollected
        },{
            icon:'ios-heart',
            option:'喜欢',
            isSelected:this.isLoved
        }]
    }

    // 查看此彩种是否在收藏或喜欢列表中
    async getIsCollectedOrLoved(id) {

        try{
            let data = await getAllDataForKey('collectedArticle');
            for(let i = 0; i < data.length; i++) {
                if(data[i].id == id) {
                    this.isCollected = true;
                    break;
                }
            }
        }catch(e){}


        try{
            data = await getAllDataForKey('lovedArticle');
            for(let i = 0; i < data.length; i++) {
                if(data[i].id == id) {
                    this.isLoved = true;
                    break;
                }
            }
        }catch(e){}



        if(this.isLoved || this.isCollected) {
            this._optionModal.renderOption(this.getOptionData());
        }
        // console.log(data);
    }

    _rightFun() {
        if(this.currentData) {
            this._optionModal.setModalVisible(true)
        } else {
            ToastAndroid.show('正在加载数据，请稍后再点击！', ToastAndroid.SHORT);
        }

    }
    _onPressOption(index,option,isSelected) {
        if(index == 666) {
            EasyLoading.show('加载数据...');
            this.refs.webViewAndroid.reload();
            return;
        }


        let key = null;
        let data = this.currentData;

        if(index == 0) { //收藏
            key = 'collectedArticle';
        } else if(index == 1) { //喜欢
            key = 'lovedArticle'
        }

        if(isSelected) {
            save(key,data.id,data);
        }else {
            remove(key,data.id)
        }

        this.showToast(key,isSelected);

    }

    showToast(key,isSelected) {
        let type =  key == 'collectedArticle' ? '收藏' : '喜欢';
        let toast =  isSelected ? `已成功添加到${type}列表` : `已成功从${type}列表中删除`;
        ToastAndroid.show(toast, ToastAndroid.SHORT);
    }

    _onMessage(e) {
        console.log(e);
        let message = e.message.split('|');
        this.title = message[1];
        this.setState({
            webViewOffset:cfn.px2dp(Number(message[0])),
        });

        setTimeout(()=>{
            EasyLoading.dismis();
        },300);

        // 存为阅读历史
        this.currentData = {
            name: this.params.name,
            title: this.title,
            url: this.params.url,
            id: this.id,
            from:this.params.from
        };
        save('readArticle',this.id,this.currentData);
        console.log(this.currentData);
    }

    _javascriptToInject() {

        const{from} = this.params;

        if(from == 'index' || from == 'article') { //来自 首页的
            return `
            if(document.getElementById("title")){var title=document.getElementById("title").textContent;
            window.webView.postMessage("0|"+title);}
            if(document.getElementById("shareBtn")){document.getElementById("shareBtn").style.display = "none";}
            if(document.getElementById("tuijian")){document.getElementById("tuijian").style.display = "none";}
            if(document.getElementById("author")){document.getElementById("author").textContent = '${config.appName}';}
            `
        }else if(from == 'touzhuOther') {
            return `
       
        if(window.document.title) {var title=window.document.title;}
        if(document.getElementsByClassName("v-header")[0]){var height = document.getElementsByClassName("v-header")[0].offsetHeight;}
        if(document.getElementsByClassName("cms-title")[0]){document.getElementsByClassName("cms-title")[0].textContent = '${config.appName}';}
        if(document.getElementsByClassName("nnew_xgx")[0]){document.getElementsByClassName("nnew_xgx")[0].style.display="none";}
        if(document.getElementsByClassName("footer-down")[0]){document.getElementsByClassName("footer-down")[0].style.display="none";}
        if(document.getElementsByClassName("nnews_xgg")[0]){document.getElementsByClassName("nnews_xgg")[0].style.display="none";}
        if(document.getElementsByClassName("h_popup_mask")[0]){document.getElementsByClassName("h_popup_mask")[0].style.display = "none";}
         window.webView.postMessage(height+'|'+title);
            `
        }

    }

    _onNavigationStateChange(e) {
        console.log(e);
        let url = e.url;
        if(url.match(/tzzlottery/)) {
            this.refs.webViewAndroid.stopLoading();
            if(!e.loading) {
                cfn.goToPage(this,'articleDetail',{name: e.title})
            }
        }

        if(!e.loading) {

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
                    rightFun={()=>this._rightFun()}
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
                    optionData={this.getOptionData()}
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