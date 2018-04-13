import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    De
} from 'react-native';
import cfn from '../../commons/utils/commonFun'
import {Icon} from 'native-base'
import {connect} from 'react-redux'
class shuzicai extends Component {

    static defaultProps = {
        data: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            items: null,
        };
    }

    componentWillReceiveProps(props) {
        //console.warn('componentWillReceiveProps');

    }

    componentDidMount() {
        //console.warn('componentDidMount')
    }

    setData(data) {
        let items = [];
        for(let i = 0; i < data.length; i++) {
            let {name,expect,openCode,time} = data[i];
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
        // const {data} = this.props;
        return (
            <View style={styles.container}>
                <ScrollView>
                    {/*<TouchableOpacity activeOpacity={0.8} onPress={()=>{}} style={styles.itemContainer}>*/}
                    {/*<View style={styles.itemHeader}>*/}
                    {/*<Text style={styles.itemName}>福彩3D</Text>*/}
                    {/*<Text style={styles.itemIssue}>20180230</Text>*/}
                    {/*<Text style={styles.itemDate}>20180230</Text>*/}
                    {/*</View>*/}
                    {/*<View style={styles.itemBody}>*/}
                    {/*<View style={styles.itemCode}>*/}
                    {/*<Text style={styles.codeText}>4</Text>*/}
                    {/*</View>*/}
                    {/*<View style={styles.itemCode}>*/}
                    {/*<Text style={styles.codeText}>4</Text>*/}
                    {/*</View>*/}
                    {/*<View style={styles.itemCode}>*/}
                    {/*<Text style={styles.codeText}>4</Text>*/}
                    {/*</View>*/}
                    {/*</View>*/}
                    {/*<View style={styles.forwardIconContainer}>*/}
                    {/*<Icon style={styles.forwardIcon} name={"ios-arrow-forward"}/>*/}
                    {/*</View>*/}
                    {/*</TouchableOpacity>*/}
                    {this.state.items}
                </ScrollView>

            </View>
        )
    }

}
function setData(store) {
    return ({
        data: store
    })
}
export default connect()(shuzicai)
// export default shuzicai

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