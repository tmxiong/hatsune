import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import Header from '../../components/header'
import cfn from '../../commons/utils/commonFun'
import {Input,InputGroup} from 'native-base'
export default class helloPage extends Component {

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {}
        this.params = props.navigation.state.params;
    }

    onPressOK() {
        cfn.goBack(this);
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    title={this.params.name}
                    leftBtn={"ios-arrow-back"}
                    leftFun={()=>cfn.goBack(this)}
                    rightBtn={"完成"}
                    rightType="text"
                    rightFun={()=>this.onPressOK()}
                />
                <InputGroup borderType="regular" style={{backgroundColor:'#fff',marginTop:20}}>
                    <Input style={styles.text} placeholderTextColor="#ccc" placeholder={this.params.name}/>
                </InputGroup>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    text: {
        padding:0
    }
});