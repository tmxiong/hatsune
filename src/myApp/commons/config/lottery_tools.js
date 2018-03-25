/**
 * Created by timxiong on 2018/3/16.
 * 删除class名称
 * document.getElementsByClassName("bg")[0].className = "title"
 */
module.exports=[
    {
        name:'奖金计算器',
        icon:'md-calculator',
        url:'https://api.icaipiao123.com/api/v6/bonus_calculate/bonuscalculate?lottery=fucai3d&code=normal',
        desc:'福彩3D奖金计算器',
        color:'#25A9FF',
        page:'touzhuOther',
        key:''
    },
    {
        name:'精品杀码',
        icon:'ios-person',
        url:'https://m.aicai.com/f/filterCode.do?gameId=201&agentId=1&vt=5',
        page:'touzhuOther',
        desc:'大奖近在咫尺',
        color:'#46BC62',
        key:''
    },
    {
        name:'阅读记录',
        icon:'md-book',
        url:'',
        page:'myArticle',
        key: 'readArticle',
        desc:'不再错过精彩预测',
    },
    {
        name:'预测资讯',
        icon:'md-list-box',
        url:'http://m.aicai.com/newInfo/index.do?navId=2&agentId=1&vt=5',
        desc:'开奖资讯精准预测',
        color:'#FFCC99',
        page:'article'
    },
    {
        name:'我的收藏',
        icon:'ios-star-outline',
        url:'',
        desc:'走势分析一网打尽',
        color:'#FF5D3B',
        page:'',
        key:''
    },

    {
        name:'赛事比分',
        icon:'ios-football',
        url:'http://m.aicai.com/league/zc/match/fbMatchListView?agentId=1&vt=5',
        desc:'走势分析一网打尽',
        color:'#46BC62',
        page:''
    },

    {
        name:'走势图表',
        icon:'md-trending-up',
        url:'http://m.aicai.com/zst/index.do?agentId=1&vt=5',
        page:''
    },

];