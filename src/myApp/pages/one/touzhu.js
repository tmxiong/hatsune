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
import myTheme from '../../commons/theme/index'
import { Loading, EasyLoading } from '../../components/loading'
import Header from '../../components/header'
export default class helloPage extends Component {

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {};
        this.params = props.navigation.state.params;

        this.script = '';
        // if(!this.params.fromMenu) {
        //     this.script='document.getElementsByClassName("back_tz")[0].style.display="none"';
        // }

    }

    componentDidMount() {
        EasyLoading.show('加载数据...',5000);
    }

    _onLoadEnd() {
        EasyLoading.dismis();
    }

    _onNavigationStateChange(e) {
        console.log(e);
        let url = e.url;
        //  我到投注 拦截
        if(url.match(/planQuery/) || url.match(/login/)) {
            this._webView.stopLoading();
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
            this._webView.stopLoading();
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

    render() {
        return (
            <View style={styles.container}>
                <Header
                    title={this.params.name}
                    leftBtn={"ios-arrow-back"}
                    leftFun={()=>cfn.goBack(this)}
                    rightBtn={"ios-menu"}
                    rightFun={()=>{}}
                />

                <WebView
                    //injectedJavaScript={this.script}
                    ref={ref=>this._webView = ref}
                    style={{marginTop:-48,zIndex:-1}}
                    source={{uri:this.params.url}}
                    onLoadEnd={()=>this._onLoadEnd()}
                    onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                />
                <Loading topOffset={26+56}/>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});