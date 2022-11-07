import {
    VENDOR_LIST_REQUEST,
    VENDOR_LIST_SUCCESS,
    VENDOR_LIST_FAIL,

    VENDOR_CREATE_REQUEST,
    VENDOR_CREATE_SUCCESS,
    VENDOR_CREATE_FAIL,
    

} from '../constants/vendorConstants'

import axios from 'axios'

export const listVendors = () => async (dispatch, getState) => {
    try {
        dispatch({ type: VENDOR_LIST_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/vendors/`, config)

        dispatch({
            type: VENDOR_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: VENDOR_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createVendor = (vendor) => async (dispatch, getState) => {
    try {
        dispatch({
            type: VENDOR_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/vendors/create/`,
            vendor,
            config
        )
        dispatch({
            type: VENDOR_CREATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: VENDOR_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}
