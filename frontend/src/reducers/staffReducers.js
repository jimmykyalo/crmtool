import {
    STAFF_LIST_REQUEST,
    STAFF_LIST_SUCCESS,
    STAFF_LIST_FAIL,

    STAFF_CREATE_REQUEST,
    STAFF_CREATE_SUCCESS,
    STAFF_CREATE_FAIL,
    STAFF_CREATE_RESET,

    STAFF_UPDATE_REQUEST,
    STAFF_UPDATE_SUCCESS,
    STAFF_UPDATE_FAIL,
    STAFF_UPDATE_RESET,

    STAFF_DELETE_REQUEST,
    STAFF_DELETE_SUCCESS,
    STAFF_DELETE_FAIL,

    STAFF_PAYMENT_LIST_REQUEST,
    STAFF_PAYMENT_LIST_SUCCESS,
    STAFF_PAYMENT_LIST_FAIL,

    STAFF_PAYMENT_CREATE_REQUEST,
    STAFF_PAYMENT_CREATE_SUCCESS,
    STAFF_PAYMENT_CREATE_FAIL,
    STAFF_PAYMENT_CREATE_RESET,

    STAFF_PAYMENT_UPDATE_REQUEST,
    STAFF_PAYMENT_UPDATE_SUCCESS,
    STAFF_PAYMENT_UPDATE_FAIL,
    STAFF_PAYMENT_UPDATE_RESET,

    STAFF_PAYMENT_DELETE_REQUEST,
    STAFF_PAYMENT_DELETE_SUCCESS,
    STAFF_PAYMENT_DELETE_FAIL,

} from '../constants/staffConstants'

export const staffListReducer = (state = { staff: [], selectOptions: [] }, action) => {
    switch (action.type) {
        case STAFF_LIST_REQUEST:
            return { loading: true, staff: [] }

        case STAFF_LIST_SUCCESS:
            const typeArray = [...new Set(action.payload.map(item => item.type))];
            return {
                loading: false,
                staff: action.payload,
                selectOptions: typeArray.map((item)=> { return {value:item, label:item}} )
            }

        case STAFF_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const staffCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case STAFF_CREATE_REQUEST:
            return { loading: true }

        case STAFF_CREATE_SUCCESS:
            return { loading: false, success: true, staff: action.payload }

        case STAFF_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case STAFF_CREATE_RESET:
            return {}

        default:
            return state
    }
}

export const staffDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case STAFF_DELETE_REQUEST:
            return { loading: true }

        case STAFF_DELETE_SUCCESS:
            return { loading: false, success: true }

        case STAFF_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


export const staffUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case STAFF_UPDATE_REQUEST:
            return { loading: true }

        case STAFF_UPDATE_SUCCESS:
            return { loading: false, success: true, response: action.payload }

        case STAFF_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case STAFF_UPDATE_RESET:
            return { state: {} }

        default:
            return state
    }
}

export const staffPaymentListReducer = (state = { staffPayment: [], selectOptions: [] }, action) => {
    switch (action.type) {
        case STAFF_PAYMENT_LIST_REQUEST:
            return { loading: true, staffPayment: [] }

        case STAFF_PAYMENT_LIST_SUCCESS:
            const memberArray = [...new Set(action.payload.map(item => item.memberName))];
            return {
                loading: false,
                staffPayment: action.payload,
                selectOptions: memberArray.map((item)=> { return {value:item, label:item}} )
            }

        case STAFF_PAYMENT_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const staffPaymentCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case STAFF_PAYMENT_CREATE_REQUEST:
            return { loading: true }

        case STAFF_PAYMENT_CREATE_SUCCESS:
            return { loading: false, success: true, staffPayment: action.payload }

        case STAFF_PAYMENT_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case STAFF_PAYMENT_CREATE_RESET:
            return {}

        default:
            return state
    }
}

export const staffPaymentDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case STAFF_PAYMENT_DELETE_REQUEST:
            return { loading: true }

        case STAFF_PAYMENT_DELETE_SUCCESS:
            return { loading: false, success: true }

        case STAFF_PAYMENT_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


export const staffPaymentUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case STAFF_PAYMENT_UPDATE_REQUEST:
            return { loading: true }

        case STAFF_PAYMENT_UPDATE_SUCCESS:
            return { loading: false, success: true, response: action.payload }

        case STAFF_PAYMENT_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case STAFF_PAYMENT_UPDATE_RESET:
            return { state: {} }

        default:
            return state
    }
}