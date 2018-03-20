import {StackNavigator,TabNavigator} from "react-navigation";
// import onBackAndroid from '../commons/utils/onBackAndroid'
// onBackAndroid.bindHardwareBackPress();

// import welcome from '../pages/welcome';
// import launch from '../pages/launch'
// import cp from '../pages/cp';

import main from '../pages/main'
import touzhu from '../pages/one/touzhu'
import touzhuOther from '../pages/one/touzhuOther'
import moreLot from '../pages/one/moreLot'
import articleDetail from '../pages/one/articleDetail'
import trend from '../pages/two/trend';
import kaijiang from '../pages/three/kaijiang'
import kaijiangDetail from '../pages/three/kaijiangDetail'
import loginAndRegist from '../pages/four/loginAndRegist'
import userInfo from '../pages/four/userInfo'
import setUserInfo from '../pages/four/setUserInfo'
import myArticle from '../pages/four/myArticle'

const routers = StackNavigator({
    //launch: {screen: launch},
    // 欢迎页 引导页
    //welcome: {screen: welcome},
    main:{screen: main, navigationOptions: { header:null,}},
    // 点开彩票图标后
    touzhu:{screen: touzhu, navigationOptions: { header:null,}},
    //  投注页面点按钮后进入
    touzhuOther: {screen: touzhuOther, navigationOptions: { header:null,}},
    // 资讯
    articleDetail: {screen: articleDetail, navigationOptions: { header:null,}},
    // 更多彩票
    moreLot:{screen: moreLot, navigationOptions: { header:null,}},
    // 开奖列表
    kaijiang: {screen: kaijiang, navigationOptions: { header:null,}},
    kaijiangDetail: {screen: kaijiangDetail, navigationOptions: { header:null,}},

    // 走势图
    trend:{screen: trend, navigationOptions: { header:null,}},

    // 登录
    loginAndRegist: {screen: loginAndRegist, navigationOptions: { header:null,}},
    // 用户信息设置与修改
    userInfo: {screen: userInfo, navigationOptions: { header:null,}},
    // 修改用户信息
    setUserInfo: {screen: setUserInfo, navigationOptions: { header:null,}},
    // 喜欢／收藏／历史文章
    myArticle: {screen: myArticle, navigationOptions: { header:null,}},



    // 彩票网站web页面
    //cp: {screen:cp},
});
module.exports = routers;