import {
    CUSTOMER_LIST_REQUEST,
    CUSTOMER_LIST_SUCCESS,
    CUSTOMER_LIST_FAIL,

    CUSTOMER_CREATE_REQUEST,
    CUSTOMER_CREATE_SUCCESS,
    CUSTOMER_CREATE_FAIL,
    CUSTOMER_CREATE_RESET,

    CUSTOMER_UPDATE_REQUEST,
    CUSTOMER_UPDATE_SUCCESS,
    CUSTOMER_UPDATE_FAIL,
    CUSTOMER_UPDATE_RESET,

    CUSTOMER_DELETE_REQUEST,
    CUSTOMER_DELETE_SUCCESS,
    CUSTOMER_DELETE_FAIL,

} from '../constants/customerConstants'

export const customerListReducer = (state = { customers: [], selectOptions: [] }, action) => {
    switch (action.type) {
        case CUSTOMER_LIST_REQUEST:
            return { loading: true, customers: [] }

        case CUSTOMER_LIST_SUCCESS:
            const typeArray = [...new Set(action.payload.map(item => item.type))];
            const memberArray = [...new Set(action.payload.map(item => item.memberName))];
    
            return {
                loading: false,
                customers: action.payload,
                selectOptions: typeArray.map((item)=> { return {value:item, label:item}} ),
                selectMemberOptions: memberArray.map((item)=> { return {value:item, label:item}} ),
            }

        case CUSTOMER_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const customerCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case CUSTOMER_CREATE_REQUEST:
            return { loading: true }

        case CUSTOMER_CREATE_SUCCESS:
            return { loading: false, success: true, customer: action.payload }

        case CUSTOMER_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case CUSTOMER_CREATE_RESET:
            return {}

        default:
            return state
    }
}

export const customerDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case CUSTOMER_DELETE_REQUEST:
            return { loading: true }

        case CUSTOMER_DELETE_SUCCESS:
            return { loading: false, success: true }

        case CUSTOMER_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


export const customerUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case CUSTOMER_UPDATE_REQUEST:
            return { loading: true }

        case CUSTOMER_UPDATE_SUCCESS:
            return { loading: false, success: true, response: action.payload }

        case CUSTOMER_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case CUSTOMER_UPDATE_RESET:
            return { state: {} }

        default:
            return state
    }
}