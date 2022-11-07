import {
    DAMAGE_LIST_REQUEST,
    DAMAGE_LIST_SUCCESS,
    DAMAGE_LIST_FAIL,

    DAMAGE_CREATE_REQUEST,
    DAMAGE_CREATE_SUCCESS,
    DAMAGE_CREATE_FAIL,

    STOCK_LIST_REQUEST,
    STOCK_LIST_SUCCESS,
    STOCK_LIST_FAIL,

    STOCK_CREATE_REQUEST,
    STOCK_CREATE_SUCCESS,
    STOCK_CREATE_FAIL,

    STOCK_UPDATE_REQUEST,
    STOCK_UPDATE_SUCCESS,
    STOCK_UPDATE_FAIL,

    STOCK_DELETE_REQUEST,
    STOCK_DELETE_SUCCESS,
    STOCK_DELETE_FAIL,
    

} from '../constants/stockConstants'

import axios from 'axios'

export const listStock = (dates) => async (dispatch, getState) => {
    try {
        dispatch({ type: STOCK_LIST_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        var range = ''
        if(dates){
            range=dates
        }

        const { data } = await axios.post(`/api/stock/`,range, config)

       

        dispatch({
            type: STOCK_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: STOCK_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createStock = (stock) => async (dispatch, getState) => {
    try {
        dispatch({
            type: STOCK_CREATE_REQUEST
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
            `/api/stock/create/`,
            stock,
            config
        )
        dispatch({
            type: STOCK_CREATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: STOCK_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listDamages = (dates) => async (dispatch, getState) => {
    try {
        dispatch({ type: DAMAGE_LIST_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        var range = ''
        if(dates){
            range=dates
        }

        const { data } = await axios.post(`/api/stock/damages/`,range, config)

       

        dispatch({
            type: DAMAGE_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: DAMAGE_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createDamage = (damage) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DAMAGE_CREATE_REQUEST
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
            `/api/stock/damages/create/`,
            damage,
            config
        )
        dispatch({
            type: DAMAGE_CREATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: DAMAGE_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const updateStock = (changes) => async (dispatch, getState) => {
    try {
        dispatch({
            type: STOCK_UPDATE_REQUEST
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
            `/api/stock/update/`,
            changes,
            config
        )
        dispatch({
            type: STOCK_UPDATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: STOCK_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const deleteStock = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: STOCK_DELETE_REQUEST
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
            `/api/stock/delete/${id}/`,
            config
        )

        dispatch({
            type: STOCK_DELETE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: STOCK_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

