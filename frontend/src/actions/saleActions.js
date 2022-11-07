import {
    SALE_LIST_REQUEST,
    SALE_LIST_SUCCESS,
    SALE_LIST_FAIL,

    SALE_CREATE_REQUEST,
    SALE_CREATE_SUCCESS,
    SALE_CREATE_FAIL,

    SALES_TREND_REQUEST,
    SALES_TREND_SUCCESS,
    SALES_TREND_FAIL,

    SALES_PER_PRODUCT_REQUEST,
    SALES_PER_PRODUCT_SUCCESS,
    SALES_PER_PRODUCT_FAIL,

    PRODUCT_SALES_TREND_REQUEST,
    PRODUCT_SALES_TREND_SUCCESS,
    PRODUCT_SALES_TREND_FAIL,

    SALE_UPDATE_REQUEST,
    SALE_UPDATE_SUCCESS,
    SALE_UPDATE_FAIL,

    SALE_DELETE_REQUEST,
    SALE_DELETE_SUCCESS,
    SALE_DELETE_FAIL,
    

} from '../constants/saleConstants'

import axios from 'axios'

export const listSales = (dates) => async (dispatch, getState) => {
    try {
        dispatch({ type: SALE_LIST_REQUEST })

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

        const { data } = await axios.post(`/api/sales/`,range, config)

        

        dispatch({
            type: SALE_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: SALE_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createSale = (sale) => async (dispatch, getState) => {
    try {
        dispatch({
            type: SALE_CREATE_REQUEST
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
            `/api/sales/create/`,
            sale,
            config
        )
        dispatch({
            type: SALE_CREATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: SALE_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const getSalesTrend = () => async (dispatch, getState) => {
    try {
        dispatch({ type: SALES_TREND_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/sales/trend/`, config)

        dispatch({
            type: SALES_TREND_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: SALES_TREND_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const getSalesPerProduct= () => async (dispatch, getState) => {
    try {
        dispatch({ type: SALES_PER_PRODUCT_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/sales/product/`, config)

        dispatch({
            type: SALES_PER_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: SALES_PER_PRODUCT_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const getProductSalesTrend = () => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_SALES_TREND_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/sales/product/trend/`, config)

        dispatch({
            type: PRODUCT_SALES_TREND_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_SALES_TREND_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const updateSale = (changes) => async (dispatch, getState) => {
    try {
        dispatch({
            type: SALE_UPDATE_REQUEST
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
            `/api/sales/update/`,
            changes,
            config
        )
        dispatch({
            type: SALE_UPDATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: SALE_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const deleteSale = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: SALE_DELETE_REQUEST
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
            `/api/sales/delete/${id}/`,
            config
        )

        dispatch({
            type: SALE_DELETE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: SALE_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

