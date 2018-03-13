import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    StatusBar,
    WebView
} from 'react-native';
import {Container, Header, Button, Title, Icon} from 'native-base';
import cfn from '../../commons/utils/commonFun'
import myTheme from '../../commons/theme/index'
export default class helloPage extends Component {

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {};
        this.params = props.navigation.state.params;
        this.script='document.getElementById("touchProNavCom").style.display="none"';
    }

    goBack() {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{backgroundColor:'#d22',zIndex:999}}>
                    <Header theme={myTheme} style={{marginTop:myTheme.headerTopHeight}}>
                        <Button transparent onPress={()=>this.goBack()}><Icon name="ios-arrow-back" /></Button>
                        <Title>{this.params.name}</Title>
                        <Button transparent><Icon name="ios-menu" /></Button>
                    </Header>
                </View>

                <WebView
                    //injectedJavaScript={this.script}
                    style={{marginTop:-48}}
                    source={{uri:`http://m.aicai.com/bet/${this.params.url}.do`}}
                />

            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});