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
import {save,remove,getAllDataForKey} from '../../commons/utils/storage'
export default class helloPage extends Component {

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            webViewOffset:0,
        };
        this.params = props.navigation.state.params;

        this.script = 'document.getElementsByClassName("h_popup_mask")[0].style.display = "none";';
        // if(!this.params.fromMenu) {
        //     this.script='document.getElementsByClassName("back_tz")[0].style.display="none"';
        // }

    }

    componentDidMount() {
        EasyLoading.show('加载数据...');
    }

    _onLoadEnd() {

    }

    _javascriptToInject() {
        // let className = 'v-header';
        // const {name} = this.params;
        // if(name == '幸运赛车') {
        //     className = 'racing-header';
        // } else if (name == '任选九场' || name == '胜负彩') {
        //     className = 'p_header';
        // }


        return `
          var height = 0;
          if(document.getElementsByClassName("v-header")[0]){
            height = document.getElementsByClassName("v-header")[0].offsetHeight;
          } else if(document.getElementsByClassName("racing-header")[0]) {
            height = document.getElementsByClassName("racing-header")[0].offsetHeight;
          } else if(document.getElementsByClassName("p_header")[0]) {
            height = document.getElementsByClassName("p_header")[0].offsetHeight;
          }
          window.webView.postMessage(height)
        `
    }

    _onMessage(e) {
        this.setState({
            webViewOffset:cfn.px2dp(e.message),
        });

        setTimeout(()=>{
            EasyLoading.dismis();
        },300)
    }

    _onNavigationStateChange(e) {
        //console.log(e);
        let url = e.url;
        //  我到投注 拦截
        if(url.match(/planQuery/) || url.match(/login/)) {
            this.refs.webViewAndroid.stopLoading();
            if(!e.loading) {
                Alert.alert('温馨提示：',
                    '应有关部门要求，当前所有彩种均停止销售，开奖历史和技巧资讯可正常查看，已售出彩票兑奖不受影响。您可以到附近实体店进行购彩，给您带来不便敬请谅解！',
                    [
                        {text: '表示理解', onPress: ()=> {}}
                    ])
            }

        }else if( url.match(/history/)  //开奖记录
            || url.match(/help/) //玩法介绍
            || url.match(/zst/)  //走势图
            || url.match(/openCountDownIndex/)
            || url.match(/winTop/) //竞技彩的 中奖排行
            || url.match(/articles/) //竞技彩的 资讯
        ){
            this.refs.webViewAndroid.stopLoading();
            if(!e.loading && this.params.fromMenu) {
                let title = e.title;
                if(title.match(/aicai/) || title=='' || !title) {
                    title = "介绍";
                }

                cfn.goToPage(this,'touzhuOther',
                    {url:url,name:title,
                        fromTouzhu:true});
            }

        }
    }

    _onPressOption(index,option,isSelected) {
        let key = null;
        let data = this.params.data;

        if(index == 666) {
            EasyLoading.show('加载数据...');
            this.refs.webViewAndroid.reload();
        } else if(index == 0) { //收藏
            key = 'collectedLottery';
        } else if(index == 1) { //喜欢
            key = 'lovedLottery'
        }

        if(isSelected) {
            save(key,data.code,data);
        }else {
            remove(key,data.code)
        }

        getAllDataForKey(key,(d)=>console.log(d),(e)=>console.log(e))
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
                    optionData={[{
                        icon:'md-star',
                        option:'收藏',
                        isSelected:false,
                    },{
                        icon:'ios-heart',
                        option:'喜欢',
                        isSelected:false,
                    }]}
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