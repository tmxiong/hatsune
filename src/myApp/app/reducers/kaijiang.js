import { combineReducers } from 'redux';
import { FETCH_OPEN_CODE,GET_OPEN_CODE, SET_OPEN_CODE } from '../actionTypes';

// 原始默认state
const defaultState = {
    loadState:'正在努力加载...'
};

export default function reducers(state = defaultState, action) {
    switch (action.type) {
        case FETCH_OPEN_CODE:
            return { ...state, loadState: '加载成功！' };
        case GET_OPEN_CODE:
            return { ...state, loadState: '正在加载...' };
        case SET_OPEN_CODE:
            //console.warn('setOpenCode');
            return { ...state, loadState: '加载成功！' };
        default:
            return state;
    }
}

