import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
export default class gaopincai extends Component {

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>高频彩</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});