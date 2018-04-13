/**
 * Created by timxiong on 2018/3/5.
 */
import {FETCH_OPEN_CODE, GET_OPEN_CODE, SET_OPEN_CODE } from '../actionTypes';

const fetchOpenCode = (url) => ({type: FETCH_OPEN_CODE, url: url});
const getOpenCode = (url) => ({type: GET_OPEN_CODE, url: url});
const setOpenCode = (data) => ({type: SET_OPEN_CODE, data: data});

export {
    fetchOpenCode,
    getOpenCode,
    setOpenCode
}