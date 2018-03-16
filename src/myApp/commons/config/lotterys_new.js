/**
 * Created by tmxiong on 2018/3/11.
 */
import {lotteryIcon as icon} from './images'
module.exports = [
    {
        type: '竞技彩',
        lottery: [
            {
                name: '竞彩足球',
                icon: require('../asset/imgs/lotteryIcons_new/jczq.png'),
                code: icon.jczq,
                url: 'http://m.aicai.com/b/zchome.do?agentId=1&vt=5'
            },
            {
                name: '竞足单关',
                icon: require('../asset/imgs/lotteryIcons_new/jzdg.png'),
                code: icon.jzdg,
                url: 'http://m.aicai.com/b/zcdg.do?agentId=1&vt=5'
            },
            {
                name: '竞彩篮球',
                icon: require('../asset/imgs/lotteryIcons_new/jclq.png'),
                code: icon.jclq,
                url: 'http://m.aicai.com/bet/lc.do?agentId=1&vt=5'
            },
            {
                name: '篮彩单关',
                icon: require('../asset/imgs/lotteryIcons_new/lcdg.png'),
                code: icon.lcdg,
                url: 'http://m.aicai.com/bet/lc.do?agentId=1&vt=5'
            },
            {
                name: '胜负彩',
                icon: require('../asset/imgs/lotteryIcons_new/sfc.png'),
                code: icon.sfc,
                url: 'http://m.aicai.com/bet/sfc.do?agentId=1&vt=5'
            },
            {
                name: '任选九场',
                icon: require('../asset/imgs/lotteryIcons_new/rx9c.png'),
                code: icon.rx9c,
                url: 'http://m.aicai.com/bet/rx9.do?agentId=1&vt=5'
            },
        ]
    },
    {
        type: '高频彩',
        lottery: [
            {
                name: '时时彩',
                icon: require('../asset/imgs/lotteryIcons_new/ssc.png'),
                code: icon.ssc,
                url: 'http://m.aicai.com/bet/cqssc.do?agentId=1&vt=5'
            },
            {
                name: '粤11选5',
                icon: require('../asset/imgs/lotteryIcons_new/y11x5.png'),
                code: icon.y11x5,
                url: 'http://m.aicai.com/bet/gd11x5.do?agentId=1&vt=5'
            },

            {
                name: '湖北快3',
                icon: require('../asset/imgs/lotteryIcons_new/hbk3.png'),
                code: icon.hbk3,
                url: 'http://m.aicai.com/bet/hbk3.do?agentId=1&vt=5'
            },
            {
                name: '新快3',
                icon: require('../asset/imgs/lotteryIcons_new/xk3.png'),
                code: icon.xk,
                url: 'http://m.aicai.com/bet/k3.do?agentId=1&vt=5'
            },
            {
                name: '快乐扑克3',
                icon: require('../asset/imgs/lotteryIcons_new/klpk.png'),
                code: icon.klpk,
                url: 'http://m.aicai.com/bet/klpk.do?agentId=1&vt=5'
            },
            {
                name: '幸运赛车',
                icon: require('../asset/imgs/lotteryIcons_new/xysc.png'),
                code: icon.xysc,
                url: 'http://m.aicai.com/bet/xysc/index.do?agentId=1&vt=5'
            },
            {
                name: '11运夺金',
                icon: require('../asset/imgs/lotteryIcons_new/11ydj.png'),
                code:icon.syydj,
                url: 'http://m.aicai.com/bet/sd11x5.do?agentId=1&vt=5'
            },

        ]
    },
    {
        type: '数字彩',
        lottery: [
            {
                name: '福彩3D',
                icon: require('../asset/imgs/lotteryIcons_new/fc3d.png'),
                code: icon.fc3d,
                url: 'http://m.aicai.com/bet/fc3d.do?agentId=1&vt=5'
            },
            {
                name: '双色球',
                icon: require('../asset/imgs/lotteryIcons_new/ssq.png'),
                code: icon.ssq,
                url: 'http://m.aicai.com/bet/ssq.do?agentId=1&vt=5'
            },
            {
                name: '大乐透',
                icon: require('../asset/imgs/lotteryIcons_new/dlt.png'),
                code: icon.dlt,
                url: 'http://m.aicai.com/bet/dlt.do?agentId=1&vt=5'
            },

        ]
    }
];