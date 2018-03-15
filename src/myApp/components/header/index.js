import React, {PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,

} from 'react-native';
import myTheme from '../../commons/theme/index'
import {Container, Header, Button, Title, Icon} from 'native-base';
export default class helloPage extends PureComponent {

    static defaultProps = {
        title:'',
        leftBtn:'',
        leftFun:()=>{},
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
            <View style={{backgroundColor:'#d22'}}>
                <Header theme={myTheme} style={{marginTop:myTheme.headerTopHeight}}>
                    <Button transparent onPress={()=>this.props.leftFun()}><Icon name={this.props.leftBtn} /></Button>
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
        flex: 1
    },
});