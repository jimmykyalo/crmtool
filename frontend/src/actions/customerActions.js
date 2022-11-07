import {
    CUSTOMER_LIST_REQUEST,
    CUSTOMER_LIST_SUCCESS,
    CUSTOMER_LIST_FAIL,

    CUSTOMER_CREATE_REQUEST,
    CUSTOMER_CREATE_SUCCESS,
    CUSTOMER_CREATE_FAIL,

    CUSTOMER_UPDATE_REQUEST,
    CUSTOMER_UPDATE_SUCCESS,
    CUSTOMER_UPDATE_FAIL,

    CUSTOMER_DELETE_REQUEST,
    CUSTOMER_DELETE_SUCCESS,
    CUSTOMER_DELETE_FAIL,
    

} from '../constants/customerConstants'

import axios from 'axios'

export const listCustomers = () => async (dispatch, getState) => {
    try {
        dispatch({ type: CUSTOMER_LIST_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/customers/`, config)

        dispatch({
            type: CUSTOMER_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CUSTOMER_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createCustomer = (customer) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CUSTOMER_CREATE_REQUEST
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
            `/api/customers/create/`,
            customer,
            config
        )
        dispatch({
            type: CUSTOMER_CREATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: CUSTOMER_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const updateCustomer = (changes) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CUSTOMER_UPDATE_REQUEST
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
            `/api/customers/update/`,
            changes,
            config
        )
        dispatch({
            type: CUSTOMER_UPDATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: CUSTOMER_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const deleteCustomer = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CUSTOMER_DELETE_REQUEST
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
            `/api/customers/delete/${id}/`,
            config
        )

        dispatch({
            type: CUSTOMER_DELETE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: CUSTOMER_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}
