// reducers/couponReducer.js

import {
    APPLY_COUPON_REQUEST,
    APPLY_COUPON_SUCCESS,
    APPLY_COUPON_FAIL,
    REMOVE_COUPON,
} from '../constants/couponConstants';

export const couponReducer = (state = {}, action) => {
    switch (action.type) {
        case APPLY_COUPON_REQUEST:
            return {
                loading: true,
            };
        case APPLY_COUPON_SUCCESS:
            return {
                loading: false,
                success: true,
                coupon: action.payload,
            };
        case APPLY_COUPON_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case REMOVE_COUPON:
            return {};
        default:
            return state;
    }
};
