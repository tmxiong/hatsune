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
import myTheme from '../../commons/theme/index'
import { Loading, EasyLoading } from '../../components/loading'
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
        if(this.params.url.match(/cqssc\/help/)) {
            this.script = 'document.getElementsByClassName("fBack")[0].style.display="none";'
        }else if(this.params.url.match(/help/)) {
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
        let url = e.url;
        console.log(e);
        if(url.match(/articleDetail/) || url.match(/article.do/)) {
            this._webView.stopLoading();
            if(!e.loading) {
                cfn.goToPage(this,'articleDetail',{name: e.title,url:url})
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
                    injectedJavaScript={this.script}
                    ref={ref=>this._webView = ref}
                    style={{marginTop:-48,zIndex:-1,flex:this.state.flex}}
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