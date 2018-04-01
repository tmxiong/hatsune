/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    WebView,
    ScrollView,
    RefreshControl,
    NetInfo
} from 'react-native';
import cfn from '../../commons/utils/commonFun'
import SplashScreen from 'react-native-splash-screen'
import WebViewAndroid from 'react-native-webview-android'
export default class App extends Component {

    static defaultProps = {
        source:{uri:''},
        onNavigationStateChange:()=>{},
        injectedJavaScript:'',

    };

    constructor(props) {
        super(props);
        this.state = {
            isRefreshing:true,
            isError:false,
            height:0,
            source:{uri:''},
        };

        this.timer = 0;
        this.delay = 3*1000; // 至少让指示器显示3s

    }

    componentDidMount() {

        this._webViewAndroid = this.refs.webViewAndroid;

        this._getData(false);
    }

    _injectedJavaScript() {

        // var height = document.getElementsByTagName("html")[0].offsetHeight;
        // window.postMessage(height)

        return (
            `
            for(var i = 0,e = document.getElementsByTagName("*"),len = e.length; i < len; i++) {e[i].style.webkitUserSelect="none"}
            window.addEventListener('contextmenu', function(e){  e.preventDefault();  }); 
            var height = document.getElementsByTagName("html")[0].offsetHeight;
            window.webView.postMessage(height);
            `
        );
    }

    _onNavigationStateChange(e) {

    }

    _onMessage(e) {
        let height = e.message;



        height = cfn.px2dp(height);
        if(height < cfn.deviceHeight()) {
            height = cfn.deviceHeight();
        }

        console.warn(height);

        let now = new Date().getTime();
        let newDelay = now - this.timer; // 加载数据花费多少时间；

        setTimeout(()=>{
            this.setState({
                isRefreshing:false,
                isError:false,
                height:height  // 让webView的高度和里面网页高度一样；
            })
        },newDelay > this.delay ? 0 : this.delay - newDelay)
    }

    _getData(isOnRefresh) {

        this.timer = new Date().getTime();

        NetInfo.isConnected.fetch().done((isConnected) => {
            if(isConnected) {
                if(isOnRefresh) { //下拉刷新的动作
                    this.refs.webViewAndroid.reload();
                }else {
                    this.setState({
                        source:this.props.source
                    })
                }

            } else { // 网络不通
                this.setState({
                    isRefreshing:false,
                    isError:true,
                })
            }

        });
    }

    _onRefresh() {


        //this.refs.webViewAndroid.reload();
        this.setState({
            isRefreshing:true,
            isError:false
        });

        this._getData(true);

    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            tintColor="#ff0000"
                            title="Loading..."
                            titleColor="#00ff00"
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="#fff"
                        />
                    }
                >

                    {this.state.isError ?
                        <View style={{height:cfn.deviceHeight()/2,justifyContent:'flex-end'}}>
                            <Text style={{fontSize:16,color:'#aaa'}}>{"加载数据失败\n请检查网络！"}</Text>
                        </View> :
                        <WebViewAndroid
                            ref="webViewAndroid"
                            style={{width:cfn.deviceWidth(),height:this.state.height,backgroundColor:'#fff'}}
                            source={this.state.source}
                            injectedJavaScript={this.props.injectedJavaScript + this._injectedJavaScript()}
                            onNavigationStateChange={this.props.onNavigationStateChange}
                            javaScriptEnabled={true}
                            geolocationEnabled={false}
                            builtInZoomControls={false}
                            onMessage={this._onMessage.bind(this)}

                />}

                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    scrollView: {
        height:cfn.deviceHeight(),
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
