// actions/couponActions.js

import {
    APPLY_COUPON_REQUEST,
    APPLY_COUPON_SUCCESS,
    APPLY_COUPON_FAIL,
    REMOVE_COUPON,
} from '../constants/couponConstants';
import axios from 'axios';

export const applyCoupon = (code) => async (dispatch) => {
    try {
        dispatch({ type: APPLY_COUPON_REQUEST });

        const { data } = await axios.post('/api/v1/coupon/apply', { code });

        dispatch({
            type: APPLY_COUPON_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: APPLY_COUPON_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const removeCoupon = () => (dispatch) => {
    dispatch({ type: REMOVE_COUPON });
};
