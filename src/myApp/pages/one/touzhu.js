import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    StatusBar,
    WebView
} from 'react-native';
import cfn from '../../commons/utils/commonFun'
import myTheme from '../../commons/theme/index'
import { Loading, EasyLoading } from 'react-native-easy-loading';
import Header from '../../components/header'
export default class helloPage extends Component {

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {};
        this.params = props.navigation.state.params;
        this.script='document.getElementById("touchProNavCom").style.display="none"';
    }

    componentDidMount() {
        EasyLoading.show('加载数据...');
    }

    goBack() {
        this.props.navigation.goBack();
    }

    _onLoadEnd() {
        EasyLoading.dismis();
    }

    _onNavigationStateChange(e) {
        console.log(e);
        let url = e.url;
        //  不能跳到 我到投注 页；
        if(url.match(/planQuery/)) {
            this._webView.stopLoading();
            alert('暂停销售！')
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    title={this.params.name}
                    leftBtn={"ios-arrow-back"}
                    leftFun={()=>this.goBack()}
                    rightBtn={"ios-menu"}
                    rightFun={()=>{}}
                />

                <WebView
                    //injectedJavaScript={this.script}
                    ref={ref=>this._webView = ref}
                    style={{marginTop:-48,zIndex:-1}}
                    source={{uri:`http://m.aicai.com/bet/${this.params.url}.do`}}
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