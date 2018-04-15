
import * as types from '../actionTypes/kaijiang';

// 原始默认state
const defaultState = {
    stateText:'正在努力加载...',
    stateCode:0, // 0:正在加载 1:加载成功 2:加载失败
    data: null,
};

export default function reducers(state = defaultState, action) {
    console.log(action.type);
    switch (action.type) {
        case types.GET_OPEN_CODE:
            return { ...state, stateText:'正在努力加载...', stateCode:0,};
        case types.SET_OPEN_CODE:
            return { ...state, stateText: '加载成功！' ,stateCode: 1, data: action.data};
        case types.GET_ERROR:
            return { ...state, stateText: '加载错误，请重试！', stateCode:2 };
        default:
            return state;
    }
}
