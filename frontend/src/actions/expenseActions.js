import {
    EXPENSE_LIST_REQUEST,
    EXPENSE_LIST_SUCCESS,
    EXPENSE_LIST_FAIL,

    EXPENSE_CREATE_REQUEST,
    EXPENSE_CREATE_SUCCESS,
    EXPENSE_CREATE_FAIL,

    EXPENSE_UPDATE_REQUEST,
    EXPENSE_UPDATE_SUCCESS,
    EXPENSE_UPDATE_FAIL,

    EXPENSE_DELETE_REQUEST,
    EXPENSE_DELETE_SUCCESS,
    EXPENSE_DELETE_FAIL,
    

} from '../constants/expenseConstants'

import axios from 'axios'

export const listExpenses = (dates) => async (dispatch, getState) => {
    try {
        dispatch({ type: EXPENSE_LIST_REQUEST })

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

        const { data } = await axios.post(`/api/expenses/`,range, config)

        dispatch({
            type: EXPENSE_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: EXPENSE_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createExpense = (expense) => async (dispatch, getState) => {
    try {
        dispatch({
            type: EXPENSE_CREATE_REQUEST
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
            `/api/expenses/create/`,
            expense,
            config
        )
        dispatch({
            type: EXPENSE_CREATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: EXPENSE_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const updateExpense = (changes) => async (dispatch, getState) => {
    try {
        dispatch({
            type: EXPENSE_UPDATE_REQUEST
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
            `/api/expenses/update/`,
            changes,
            config
        )
        dispatch({
            type: EXPENSE_UPDATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: EXPENSE_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const deleteExpense = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: EXPENSE_DELETE_REQUEST
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
            `/api/expenses/delete/${id}/`,
            config
        )

        dispatch({
            type: EXPENSE_DELETE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: EXPENSE_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}
