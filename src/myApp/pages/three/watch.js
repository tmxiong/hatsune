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
import {getWatch} from '../../app/actions/kaijiang'
import {connect} from 'react-redux';
import Swipeout from 'react-native-swipeout';
class watch extends Component {

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {}
        this.rowData = null;  // 点击或滑动item存储该rowData
        this.swipeBtns = [
            {
                text: '取消',
                //onPress:()=>alert('取消'),
                type:'default'
            },
            {
                text: '删除',
                onPress:()=>this._delete(),
                type:'delete'
            },
        ];
    }

    componentDidMount() {
        getWatch(this.props.dispatch);
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.emptyContainer}>
                        <Text style={{color:'#bbb',lineHeight:20}}>{'暂无关注\n左划看看'}</Text>
                    </View>
                </ScrollView>


            </View>
        )
    }

}

function setData(store) {
    return ({
        data: store.kaijiang.data,
    })
}
export default connect(setData)(watch)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center'
    },
    emptyContainer: {
        width:100,height:50,borderRadius:5,
        borderColor:'#bbb',borderWidth:1,
        alignItems:'center',justifyContent:'center',
        marginTop:cfn.deviceWidth()/2
    }
});