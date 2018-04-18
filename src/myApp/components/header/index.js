import React, {PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import myTheme from '../../public/theme/index'
import {Container, Header, Button, Title, Icon} from 'native-base';
import cfn from '../../public/utils/commonFun'
import config from '../../public/config/config'
export default class header extends PureComponent {

    static defaultProps = {
        title:'',
        leftBtn:'',
        leftFun:()=>{},
        leftType: 'icon',
        rightBtn:'',
        rightFun:()=>{},
        rightType:'icon' //icon or text
    };

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View style={styles.container}>
                <Header theme={myTheme} style={{marginTop:myTheme.headerTopHeight}}>
                    <Button transparent onPress={()=>this.props.leftFun()}>
                        {this.props.leftType === 'icon' ? <Icon name={this.props.leftBtn} /> : <Title>{this.props.leftBtn}</Title>}
                    </Button>
                    <Title>{this.props.title}</Title>
                    <Button transparent onPress={()=>this.props.rightFun()}>
                        {this.props.rightType === 'icon' ? <Icon name={this.props.rightBtn} /> : <Title>{this.props.rightBtn}</Title>}
                    </Button>
                </Header>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor:config.baseColor,
        width:cfn.deviceWidth()
    },
});