/**
 * Created by tmxiong on 2018/4/15.
 */
import * as actions from '../actionTypes/kaijiang';
import lottery from '../../commons/config/lottery_kaijiang';
import urls from '../../commons/config/urls';
import {save, getAllDataForKey,remove} from '../../commons/utils/storage'

export function getOpenCode(dispatch) {

    dispatch({type: actions.GET_OPEN_CODE});

    let codes = '';
    for(let i = 0,len = lottery.length; i <len; i++) {
        codes += lottery[i].code+'|';
    }
    let url = urls.getNewestLotteryCode(codes);
    fetch(url)
        .then((res)=>res.json())
        .then((data)=>{
            dispatch({type: actions.SET_OPEN_CODE, data: data.showapi_res_body.result});
            //dispatch({type: GET_ERROR})
        })
        .catch((e)=>{
            dispatch({type: actions.GET_ERROR})
        });

}

export async function getWatch(dispatch, code) {

    let data = await getAllDataForKey('watch');

    dispatch({type: actions.GET_WATCH, data: data});

}
