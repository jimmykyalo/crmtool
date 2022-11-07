import {
    STAFF_LIST_REQUEST,
    STAFF_LIST_SUCCESS,
    STAFF_LIST_FAIL,

    STAFF_CREATE_REQUEST,
    STAFF_CREATE_SUCCESS,
    STAFF_CREATE_FAIL,

    STAFF_UPDATE_REQUEST,
    STAFF_UPDATE_SUCCESS,
    STAFF_UPDATE_FAIL,

    STAFF_DELETE_REQUEST,
    STAFF_DELETE_SUCCESS,
    STAFF_DELETE_FAIL,

    STAFF_PAYMENT_LIST_REQUEST,
    STAFF_PAYMENT_LIST_SUCCESS,
    STAFF_PAYMENT_LIST_FAIL,

    STAFF_PAYMENT_CREATE_REQUEST,
    STAFF_PAYMENT_CREATE_SUCCESS,
    STAFF_PAYMENT_CREATE_FAIL,

    STAFF_PAYMENT_UPDATE_REQUEST,
    STAFF_PAYMENT_UPDATE_SUCCESS,
    STAFF_PAYMENT_UPDATE_FAIL,

    STAFF_PAYMENT_DELETE_REQUEST,
    STAFF_PAYMENT_DELETE_SUCCESS,
    STAFF_PAYMENT_DELETE_FAIL,
    

} from '../constants/staffConstants'

import axios from 'axios'

export const listStaff = () => async (dispatch, getState) => {
    try {
        dispatch({ type: STAFF_LIST_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/staff/`, config)

        dispatch({
            type: STAFF_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: STAFF_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createStaff = (staff) => async (dispatch, getState) => {
    try {
        dispatch({
            type: STAFF_CREATE_REQUEST
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
            `/api/staff/create/`,
            staff,
            config
        )
        dispatch({
            type: STAFF_CREATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: STAFF_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const updateStaff = (changes) => async (dispatch, getState) => {
    try {
        dispatch({
            type: STAFF_UPDATE_REQUEST
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

        const  { data }  = await axios.put(
            `/api/staff/update/`,
            changes,
            config
        )
        dispatch({
            type: STAFF_UPDATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: STAFF_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const deleteStaff = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: STAFF_DELETE_REQUEST
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

        const { data } = await axios.delete(
            `/api/staff/delete/${id}/`,
            config
        )

        dispatch({
            type: STAFF_DELETE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: STAFF_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listStaffPayment = () => async (dispatch, getState) => {
    try {
        dispatch({ type: STAFF_PAYMENT_LIST_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/staff/payments/`, config)

        dispatch({
            type: STAFF_PAYMENT_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: STAFF_PAYMENT_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createStaffPayment = (staff) => async (dispatch, getState) => {
    try {
        dispatch({
            type: STAFF_PAYMENT_CREATE_REQUEST
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
            `/api/staff/payments/create/`,
            staff,
            config
        )
        dispatch({
            type: STAFF_PAYMENT_CREATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: STAFF_PAYMENT_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const updateStaffPayment = (changes) => async (dispatch, getState) => {
    try {
        dispatch({
            type: STAFF_PAYMENT_UPDATE_REQUEST
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

        const  { data }  = await axios.put(
            `/api/staff/payments/update/`,
            changes,
            config
        )
        dispatch({
            type: STAFF_PAYMENT_UPDATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: STAFF_PAYMENT_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const deleteStaffPayment = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: STAFF_PAYMENT_DELETE_REQUEST
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

        const { data } = await axios.delete(
            `/api/staff/payments/delete/${id}/`,
            config
        )

        dispatch({
            type: STAFF_PAYMENT_DELETE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: STAFF_PAYMENT_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}
