import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import cfn from '../../commons/utils/commonFun'
import {Icon} from 'native-base'
import lotterys from '../../commons/config/lottery_kaijiang'
export default class gaopincai extends Component {

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            items:null
        }
    }

    componentWillReceiveProps(props) {

        //console.log(props.data);
        this.setData(props.data);
    }

    setData(data) {

        for(let i = 0,len = lotterys.length; i < len; i++) {
            for(let j = 0,len1 = data.length; j < len1; j++) {
                if(lotterys[i].code == data[j].code) {
                    data[j].name = lotterys[i].name;
                    break;
                }
            }
        }

        let items = [];
        for(let i = 0; i < data.length; i++) {
            let {name,expect,openCode,time} = data[i];
            let codes = [];

            openCode = openCode.split(',');
            for(let j = 0; j < openCode.length; j++) {
                codes.push(
                    <View
                        key={''+i+j}
                        style={styles.itemCode}>
                        <Text style={styles.codeText}>{openCode[j]}</Text>
                    </View>
                )
            }


            items.push(
                <TouchableOpacity
                    key={i}
                    activeOpacity={0.8} onPress={()=>{}} style={styles.itemContainer}>
                    <View style={styles.itemHeader}>
                        <Text style={styles.itemName}>{name}</Text>
                        <Text style={styles.itemIssue}>{expect}</Text>
                        <Text style={styles.itemDate}>{time}</Text>
                    </View>
                    <View style={styles.itemBody}>
                        {codes}
                    </View>
                    <View style={styles.forwardIconContainer}>
                        <Icon style={styles.forwardIcon} name={"ios-arrow-forward"}/>
                    </View>
                </TouchableOpacity>
            )
        }
        this.setState({items: items});
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    {this.state.items}
                </ScrollView>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
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
        fontSize:16,
        color:'#222'
    },
    itemIssue: {
        marginLeft:10,
    },
    itemDate: {
        marginLeft:10
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
    forwardIcon: {
        fontSize:30,
        color:'#aaa',
    },
    forwardIconContainer: {
        width:50,
        height:cfn.picHeight(170),
        position:'absolute',
        right:10,
        alignItems:'center',
        justifyContent:'center'
    }
});