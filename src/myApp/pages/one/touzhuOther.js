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
import { Loading, EasyLoading } from 'react-native-easy-loading';
import Header from '../../components/header'
export default class helloPage extends Component {

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            flex:0
        };
        this.params = props.navigation.state.params;

        this.script = '';
        if(this.params.url.match(/help/)) {
            this.script = 'document.getElementsByClassName("back_tz")[0].style.display="none";'
        }else if(this.params.url.match(/history/)) {
            this.script = 'document.getElementsByClassName("history-btn")[0].style.display="none";';
        }

    }

    componentDidMount() {
        EasyLoading.show('加载数据...');
    }

    _onLoadEnd() {

        setTimeout(()=>{
            EasyLoading.dismis();
            this.setState({
                flex:cfn.deviceHeight()
            })
        },300)
    }

    _onNavigationStateChange(e) {
        console.log(e);
        let url = e.url;
        //  我到投注 拦截
        // if(url.match(/planQuery/)) {
        //     this._webView.stopLoading();
        //     if(!e.loading) {
        //         Alert.alert('温馨提示：',
        //             '应有关部门要求，当前所有彩种均停止销售，开奖历史和技巧可正常查看，已售出彩票兑奖不受影响。您可以到附近实体店进行购彩，给您带来不便敬请谅解！',
        //             [
        //                 {text: '可以原谅', onPress: ()=> {}}
        //             ])
        //     }
        //
        // }else if( url.match(/history/) || url.match(/help/) || url.match(/zst/)){
        //     this._webView.stopLoading();
        //     if(!e.loading && this.params.fromMenu) {
        //         cfn.goToPage(this,'touzhu',{url:url,name:e.title});
        //     }
        //
        // }
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
                    injectedJavaScript={this.script}
                    ref={ref=>this._webView = ref}
                    style={{marginTop:-48,zIndex:-1,flex:this.state.flex}}
                    source={{uri:this.params.url}}
                    onLoadEnd={()=>this._onLoadEnd()}
                    onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                />
                <Loading/>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});