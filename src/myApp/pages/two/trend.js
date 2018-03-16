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
export default class trend extends Component {

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            flex:0
        };
        this.params = props.navigation.state.params;

        this.script = 'document.getElementsByClassName("header")[0].style.display="none";' +
            'document.getElementsByClassName("nav")[0].style.display="none";';


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
        // console.log(e);
        // if(url.match(/zst/)) {
        //     this._webView.stopLoading();
        //     if(!e.loading) {
        //         cfn.goToPage(this,'articleDetail',{name: e.title,url:url})
        //     }
        // }
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    title={"图表走势"}
                    leftBtn={"ios-arrow-back"}
                    leftFun={()=>cfn.goBack(this)}
                    rightBtn={"ios-menu"}
                    rightFun={()=>{}}
                />

                <WebView
                    injectedJavaScript={this.script}
                    ref={ref=>this._webView = ref}
                    style={{marginTop:-115,zIndex:-1,flex:this.state.flex}}
                    source={{uri:this.params.url}}
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