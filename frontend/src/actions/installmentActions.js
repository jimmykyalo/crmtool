import {
    INSTALLMENT_LIST_REQUEST,
    INSTALLMENT_LIST_SUCCESS,
    INSTALLMENT_LIST_FAIL,

    INSTALLMENT_CREATE_REQUEST,
    INSTALLMENT_CREATE_SUCCESS,
    INSTALLMENT_CREATE_FAIL,

    CREDIT_LIST_REQUEST,
    CREDIT_LIST_SUCCESS,
    CREDIT_LIST_FAIL,

    
    

} from '../constants/installmentConstants'

import axios from 'axios'

export const listInstallments = (dates) => async (dispatch, getState) => {
    try {
        dispatch({ type: INSTALLMENT_LIST_REQUEST })

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

        const { data } = await axios.post(`/api/sales/installments/`,range, config)

        

        dispatch({
            type: INSTALLMENT_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: INSTALLMENT_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createInstallment = (installment) => async (dispatch, getState) => {
    try {
        dispatch({
            type: INSTALLMENT_CREATE_REQUEST
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
            `/api/sales/installments/create/`,
            installment,
            config
        )
        dispatch({
            type: INSTALLMENT_CREATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: INSTALLMENT_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listCreditSales = (dates) => async (dispatch, getState) => {
    try {
        dispatch({ type: CREDIT_LIST_REQUEST })

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

        const { data } = await axios.post(`/api/sales/credit/`,range, config)

        

        dispatch({
            type: CREDIT_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CREDIT_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

