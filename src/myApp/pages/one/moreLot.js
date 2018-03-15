import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Animated
} from 'react-native';
import {Icon} from 'native-base';
import Header from '../../components/header'
import SortableSudokuGrid from '../../components/sortGridView/SortableSudokuGrid';
import myTheme from '../../commons/theme/index'
import cfn from '../../commons/utils/commonFun'
import lotterys from '../../commons/config/lotterys_new'
export default class helloPage extends Component {

    static defaultProps = {};

    constructor(props) {
        super(props);

        this.params = props.navigation.state.params;

        this.state = {
            dataSource: this.params.data,
            candidates:lotterys[0].lottery,
            sortable: false,
            scrollEnabled: true,
            disabled: false,
            managementButtonText: '管理',
            opacity: new Animated.Value(0),
        };

        this.getAllLottery(lotterys);
    }

    getAllLottery(data) {
        let allLottery = [];
        console.log(data);
        for(let i = 0; i < data.length; i++) {
            allLottery = allLottery.concat(data[i].lottery);
        }
    }

    getAnotherLottery(data,other) {
        for(let i = 0; i < data.length; i++) {
            for(let j = 0; j < other.length; j++) {
                if(data[i].name === other[j].name) {
                    data.splice(i--,1)
                }
            }

        }
    }

    _renderGridCell(data,component) {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                key={data.name}
                disabled={this.state.disabled}
                style={{flex: 1, padding: 6, position: 'relative', }}
                onPress={ this._onPressCell.bind(this, data) }>
                <View style={{ overflow: 'hidden', backgroundColor: '#fff',
                    justifyContent: 'center', alignItems: 'center', flex: 1,
                    borderWidth: StyleSheet.hairlineWidth, borderColor: '#eee', }}>
                    <Image source={data.icon} style={{width: 40, height: 40, marginHorizontal: 10, marginBottom: 10,}}/>
                    <Text>{data.name}</Text>
                </View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    disabled={!this.state.disabled}
                    style={{position: 'absolute', right: 8, top: 8, width: 30, height: 30, }}
                    onPress={this._onRemoveCellButtonPress.bind(this, component)}>
                    <Animated.View
                        style={{flex: 1, opacity: this.state.opacity, justifyContent: 'center', alignItems: 'center', }}>

                        <Icon name="md-remove" style={{width:22,height:22,color:'#e22',alignSelf:'center',fontSize:20}}/>

                    </Animated.View>
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }

    _onPressCell = (data) => {
        alert('clicked grid cell -> ' + data.name)
    }

    _onRemoveCellButtonPress = (component) => {
        let cellIndex = this._sortableSudokuGrid._cells.findIndex((cell) => {
            return cell.component === component
        })

        this._sortableSudokuGrid.removeCell(this,{
            cellIndex,
            callback: (_this,removedDataList) => {
                if(removedDataList.length > 0) {
                    let data = removedDataList[0]
                    _this._candidatesSudokuGrid.addCell({
                        data,
                    })
                }
            }
        })
    };

    _onPressManagementButton = () => {
        let scrollEnabled = !this.state.scrollEnabled
        let disabled = !this.state.disabled
        let managementButtonText = this.state.managementButtonText == '管理' ? '完成' : '管理'
        let sortable = !this.state.sortable
        let opacity = sortable ? new Animated.Value(1) : new Animated.Value(0)
        this.setState({
            scrollEnabled,
            managementButtonText,
            disabled,
            sortable,
            opacity,
        })
        if (!sortable) {
            let sortedDataSource = this._sortableSudokuGrid.getSortedDataSource()
            //console.log(`_onPressManagementButton get sorted/added/removed DataSource`)
            //console.log(sortedDataSource)
            let candidateDataSource = this._candidatesSudokuGrid.getSortedDataSource()
            //console.log(`_onPressManagementButton get sorted/added/removed candidateDataSource`)
            //console.log(candidateDataSource)
        }
    };


    _renderCandidateCell = (data, component) => {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                key={data.name}
                disabled={this.state.disabled}
                style={{flex: 1, padding: 6, position: 'relative', }}
                onPress={ this._onPressCandidateCell.bind(this, data) }>
                <View style={{ overflow: 'hidden', backgroundColor: '#fff',
                    justifyContent: 'center', alignItems: 'center', flex: 1,
                    borderWidth: StyleSheet.hairlineWidth, borderColor: '#eee', }}>
                    <Image source={data.icon} style={{width: 40, height: 40, marginHorizontal: 10, marginBottom: 10,}}/>
                    <Text>{data.name}</Text>
                </View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    disabled={!this.state.disabled}
                    style={{position: 'absolute', right: 8, top: 8, width: 30, height: 30, }}
                    onPress={this._onRemoveCandidatesCellButtonPress.bind(this, component)}>
                    <Animated.View
                        style={{flex: 1, opacity: this.state.opacity, justifyContent: 'center', alignItems: 'center', }}>
                        <Icon name="md-add" style={{width: 22, height: 22,color:'#2d2',fontSize:20}}/>
                    </Animated.View>
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }

    _onPressCell = (data) => {
        alert('clicked grid cell -> ' + data.name)
    }

    _onPressCandidateCell = (data) => {
        alert('clicked candidate cell -> ' + data.name)
    }

    _onRemoveCandidatesCellButtonPress = (component) => {
        let cellIndex = this._candidatesSudokuGrid._cells.findIndex((cell) => {
            return cell.component === component
        })

        this._candidatesSudokuGrid.removeCell(this,{
            cellIndex,
            callback: (_this,removedDataList) => {
                if(removedDataList.length > 0) {
                    let data = removedDataList[0]
                    _this._sortableSudokuGrid.addCell({
                        data,
                    })
                }
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    title={this.params.name}
                    leftBtn={"ios-arrow-back"}
                    leftFun={()=>cfn.goBack(this)}
                    rightBtn={this.state.managementButtonText}
                    rightType="text"
                    rightFun={()=>this._onPressManagementButton()}
                />
                <View style={{height:40,justifyContent:'center'}}>
                    <Text style={{color:'#aaa',marginLeft:10}}>提示：点击'管理'可对彩种进行排序或增减</Text>
                </View>
                <ScrollView>
                    <SortableSudokuGrid
                        ref={ ref => this._sortableSudokuGrid = ref }
                        columnCount={4}
                        dataSource={this.state.dataSource}
                        renderCell={this._renderGridCell.bind(this)}
                        sortable={this.state.sortable}
                    />

                   <View style={{height:30,justifyContent:'center'}}>
                       <View style={{width:cfn.deviceWidth(),height:1,backgroundColor:'#ddd'}}/>
                   </View>

                    <SortableSudokuGrid
                        ref={ ref => this._candidatesSudokuGrid = ref }
                        containerStyle={{ backgroundColor: '#fff',}}
                        columnCount={4}
                        dataSource={this.state.candidates}
                        renderCell={this._renderCandidateCell.bind(this)}
                        sortable={false}
                    />

                </ScrollView>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});