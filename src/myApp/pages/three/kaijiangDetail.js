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
    ScrollView,
    RefreshControl
} from 'react-native';
import cfn from '../../commons/utils/commonFun'
import { Loading, EasyLoading } from '../../components/loading'
import Header from '../../components/header'
import WebViewRN from '../../components/webViewRN'
import urls from '../../commons/config/urls'
export default class helloPage extends Component {

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            items: null,
            isRefreshing: true,
            isError: false
        };
        this.params = props.navigation.state.params;

    }

    componentDidMount() {
        //EasyLoading.show('加载数据...');
        this.getData();
    }

    getData() {
        fetch(urls.getHistoryLotteryCode(this.params.data.code))
            .then((res)=>res.json())
            .then((data)=>this.setData(data))
            .catch((e)=>this.setError())
    }

    setError() {
        this.setState({
            isRefreshing: false,
            isError: true
        })
    }

    setData(data) {
        data = data.showapi_res_body.result;
        let items = [];
        for(let i = 0; i < data.length; i++) {
            let {name,expect,openCode,time,code} = data[i];
            let codes = [];

            // 有+号的
            if(openCode.match(/\+/)){
                openCode = openCode.split('+');
                let openCode_0 = openCode[0].split(',');
                let openCode_1 = openCode[1].split(',');
                // 红球
                for(let j = 0; j < openCode_0.length; j++) {
                    codes.push(
                        <View
                            key={''+i+j}
                            style={styles.itemCode}>
                            <Text style={styles.codeText}>{openCode_0[j]}</Text>
                        </View>
                    )
                }
                // 蓝球
                for(let k = 0; k < openCode_1.length; k++) {
                    codes.push(
                        <View
                            key={''+i+k+k}
                            style={[styles.itemCode,{backgroundColor:'#5D99EE'}]}>
                            <Text style={styles.codeText}>{openCode_1[k]}</Text>
                        </View>
                    )
                }
            }else {
                // 竞技彩
                const {code} = this.params.data;
                if(code == 'zcbqc' || code == 'zcjqc' || code == 'zcsfc') {
                    var itemCodeStyle = {
                        width:cfn.picWidth(30),
                        backgroundColor:'#7CBD7F',
                        borderRadius:0,
                        marginRight:2
                    }
                }
                openCode = openCode.split(',');
                for(let j = 0; j < openCode.length; j++) {
                    codes.push(
                        <View
                            key={''+i+j}
                            style={[styles.itemCode,itemCodeStyle]}>
                            <Text style={styles.codeText}>{openCode[j]}</Text>
                        </View>
                    )
                }
            }

            items.push(
                <TouchableOpacity
                    key={i}
                    activeOpacity={0.8}
                    onPress={()=>{cfn.goToPage(this.props.parentThis,'kaijiangDetail',{data:data[i]})}}
                    style={styles.itemContainer}>
                    <View style={styles.itemHeader}>
                        <Text style={styles.itemName}>{name}</Text>
                        <Text style={styles.itemIssue}>{expect}</Text>
                        <Text style={styles.itemDate}>{time}</Text>
                    </View>
                    <View style={styles.itemBody}>
                        {codes}
                    </View>
                </TouchableOpacity>
            )
        }
        this.setState({items: items});
        setTimeout(()=>{
            this.setState({
                isError:false,
                isRefreshing:false,
            })
        },1000)
    }

    _onRefresh() {
        this.setState({isRefreshing:true,isError:false});
        this.getData();
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    title={this.params.name}
                    leftBtn={"ios-arrow-back"}
                    leftFun={()=>cfn.goBack(this)}
                    rightBtn={""}
                    rightType={'text'}
                />
                <ScrollView
                    refreshControl={<RefreshControl
                    refreshing={this.state.isRefreshing}
                    onRefresh={this._onRefresh.bind(this)}
                    tintColor="#ff0000"
                    title="Loading..."
                    titleColor="#00ff00"
                    colors={['#ff0000', '#00ff00', '#0000ff']}
                    progressBackgroundColor="#fff"
                />}
                >
                    {
                        this.state.isError ?
                        <TouchableOpacity
                            style={{alignSelf:'center',marginTop:cfn.deviceWidth()/3}}
                            activeOpacity={0.8}
                            onPress={()=>this.state.isError && this._onRefresh()}>
                            <Text style={{fontSize:15,color:'#888'}}>{'加载错误，点击重试！'}</Text>
                        </TouchableOpacity> :
                        this.state.items
                    }
                </ScrollView>

            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff'
    },
    itemContainer: {
        width:cfn.deviceWidth(),
        height:cfn.picHeight(170),
        backgroundColor:'#fff',
        marginBottom:5,
        marginTop:5
    },
    itemHeader: {
        height:cfn.picHeight(70),
        width:cfn.deviceWidth()-50,
        flexDirection:'row',
        alignItems:'center',
    },
    itemName: {
        marginLeft:10,
        fontSize:18,
        color:'#222'
    },
    itemIssue: {
        marginLeft:10,
        color:'#c33'
    },
    itemDate: {
        marginLeft:10,
        color:'#aaa'
    },
    itemBody: {
        flexDirection:'row',
        height:cfn.picHeight(90),
        width:cfn.deviceWidth()-50,
        alignItems:'center',
        paddingLeft:10
    },
    itemCode: {
        width:cfn.picWidth(60),
        height:cfn.picWidth(60),
        backgroundColor:'#EC6561',
        borderRadius:cfn.picWidth(30),
        alignItems:'center',
        justifyContent:'center',
        marginRight:5
    },
    codeText: {
        color:'#fff',
        fontSize:15
    },
});