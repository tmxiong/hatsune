import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import Header from '../../components/header'
import {Icon} from 'native-base'
import cfn from '../../commons/utils/commonFun'
export default class index extends Component {

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View style={styles.container}>
                {/*<Header*/}
                    {/*title={"我的"}*/}
                    {/*leftBtn={""}*/}
                    {/*leftType="text"*/}
                    {/*leftFun={()=>{}}*/}
                    {/*rightBtn={""}*/}
                    {/*rightType="text"*/}
                    {/*rightFun={()=>{}}*/}
                {/*/>*/}
                <View style={[styles.itemHeader,{backgroundColor:'#d22'}]}>
                    <View style={styles.userIconContainer}>
                        <Icon style={styles.userIcon} name={'ios-contact-outline'}/>
                    </View>

                    <View style={styles.userContent}>
                        <Text style={styles.userName}>幸运儿</Text>
                        <Text style={styles.userDesc}>您还为登录，登录更精彩～</Text>
                    </View>
                    <Icon style={styles.forward} name="ios-arrow-forward"/>
                </View>
                <View style={{height:cfn.picHeight(100)}}/>
                <View style={styles.itemBody}>
                    <Icon style={styles.itemIcon} name="md-bookmark"/>
                    <Text style={styles.itemText}>我收藏的文章</Text>
                    <View style={styles.itemForwardContainer}>
                        <Icon style={styles.itemForward} name="ios-arrow-forward"/>
                    </View>
                </View>
                <View style={styles.itemBody}>
                    <Icon style={styles.itemIcon} name="ios-time"/>
                    <Text style={styles.itemText}>阅读过的文章</Text>
                    <View style={styles.itemForwardContainer}>
                        <Icon style={styles.itemForward} name="ios-arrow-forward"/>
                    </View>
                </View>

                <View style={[styles.itemBody,{marginTop:cfn.picHeight(30)}]}>
                    <Icon style={styles.itemIcon} name="md-bookmark"/>
                    <Text style={styles.itemText}>我收藏的彩种</Text>
                    <View style={styles.itemForwardContainer}>
                        <Icon style={styles.itemForward} name="ios-arrow-forward"/>
                    </View>
                </View>

                <View style={[styles.itemBody,{marginTop:cfn.picHeight(30)}]}>
                    <Icon style={styles.itemIcon} name="md-bookmark"/>
                    <Text style={styles.itemText}>应用介绍</Text>
                    <View style={styles.itemForwardContainer}>
                        <Icon style={styles.itemForward} name="ios-arrow-forward"/>
                    </View>
                </View>

                <View style={[styles.itemBody,{marginTop:cfn.picHeight(30)}]}>
                    <Icon style={styles.itemIcon} name="md-bookmark"/>
                    <Text style={styles.itemText}>版本更新</Text>
                    <View style={styles.itemForwardContainer}>
                        <Icon style={styles.itemForward} name="ios-arrow-forward"/>
                    </View>
                </View>

            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    itemHeader: {
        width:cfn.deviceWidth(),
        height:cfn.picHeight(280),
        backgroundColor:'#fff',
        flexDirection:'row',
        alignItems:'center',
        paddingTop:cfn.picHeight(30)
    },
    userIconContainer: {
        width:cfn.picWidth(120),
        height:cfn.picWidth(120),
        alignItems:'center',
        justifyContent:'center',
        borderRadius:cfn.picWidth(75),
        marginRight:cfn.picWidth(20),
        marginLeft:cfn.picWidth(20),
    },
    userIcon: {
        fontSize:cfn.picWidth(120),
        color:'#ccc',

    },
    userContent: {
        width:cfn.deviceWidth()-cfn.picWidth(120 + 20 + 20 + 60)
    },
    userName: {
        fontSize:18,
        color:'#eee'
    },
    userDesc: {
        color:'#ddd',
        marginTop:cfn.picHeight(10),
        width:cfn.deviceWidth()-cfn.picWidth(120 + 20 + 20 + 60)
    },
    forward: {
        fontSize: 30,
        color:'#ddd',
    },
    itemBody: {
        width:cfn.deviceWidth(),
        height:cfn.picHeight(100),
        backgroundColor:'#fff',
        //marginTop:cfn.picHeight(20),
        alignItems:'center',
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor:'#eee',
    },
    itemIcon: {
        fontSize:25,
        marginLeft:cfn.picWidth(30),
        marginRight:cfn.picWidth(30),
        width:25,
        textAlign:'center'

    },
    itemText: {

    },
    itemForwardContainer: {
        position:'absolute',
        height:cfn.picHeight(100),
        justifyContent:'center',
        right:cfn.picWidth(30)
    },
    itemForward: {

    }
});