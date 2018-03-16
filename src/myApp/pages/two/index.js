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
export default class two extends Component {

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            flex:0
        };
        this.params = props.navigation.state.params;

        this.script = 'document.getElementsByClassName("header")[0].style.display="none";' +
            'document.getElementsByClassName("fl_list")[0].style.marginTop=0';


    }

    componentDidMount() {
        EasyLoading.show('加载数据...',5000);
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
        if(url.match(/zst/) && url.match(/clientType/)) {
            this._webView.stopLoading();
            if(!e.loading) {
                cfn.goToPage(this,'trend',{name: e.title,url:url})
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    title={"图表走势"}
                    leftBtn={""}
                    leftType="text"
                    leftFun={()=>{}}
                    rightBtn={"ios-menu"}
                    rightFun={()=>{}}
                />

                <WebView
                    injectedJavaScript={this.script}
                    ref={ref=>this._webView = ref}
                    style={{zIndex:-1,flex:this.state.flex}}
                    source={{uri:"http://m.aicai.com/zst/index.do?vt=5"}}
                    onLoadEnd={()=>this._onLoadEnd()}
                    onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                    renderError={()=><Text>加载错误！！</Text>}
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