import {
    STOCK_LIST_REQUEST,
    STOCK_LIST_SUCCESS,
    STOCK_LIST_FAIL,

    STOCK_CREATE_REQUEST,
    STOCK_CREATE_SUCCESS,
    STOCK_CREATE_FAIL,
    STOCK_CREATE_RESET,

    DAMAGE_LIST_REQUEST,
    DAMAGE_LIST_SUCCESS,
    DAMAGE_LIST_FAIL,

    DAMAGE_CREATE_REQUEST,
    DAMAGE_CREATE_SUCCESS,
    DAMAGE_CREATE_FAIL,
    DAMAGE_CREATE_RESET,

    STOCK_UPDATE_REQUEST,
    STOCK_UPDATE_SUCCESS,
    STOCK_UPDATE_FAIL,
    STOCK_UPDATE_RESET,

    STOCK_DELETE_REQUEST,
    STOCK_DELETE_SUCCESS,
    STOCK_DELETE_FAIL,

} from '../constants/stockConstants'

export const stockListReducer = (state = { stock: [], selectMethodOptions: [], selectProductOptions: [], selectBatchOptions: []}, action) => {
    switch (action.type) {
        case STOCK_LIST_REQUEST:
            return { loading: true, stock: [] }

        case STOCK_LIST_SUCCESS:
            const methodArray = [...new Set(action.payload.map(item => item.method))];
            const productArray = [...new Set(action.payload.map(item => item.productName))];
            const batchArray = [...new Set(action.payload.map(item => item.batchNumber))];
            const staffArray = [...new Set(action.payload.map(item => item.staffName))];
            const memberArray = [...new Set(action.payload.map(item => item.memberName))];
    
            return {
                loading: false,
                stock: action.payload,
                selectMethodOptions: methodArray.map((item)=> { return {value:item, label:item}} ),
                selectProductOptions: productArray.map((item)=> { return {value:item, label:item}} ),
                selectBatchOptions: batchArray.map((item)=> { return {value:item, label:item}} ),
                selectStaffOptions: staffArray.map((item)=> { return {value:item, label:item}} ),
                selectMemberOptions: memberArray.map((item)=> { return {value:item, label:item}} ),
            }

        case STOCK_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const stockCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case STOCK_CREATE_REQUEST:
            return { loading: true }

        case STOCK_CREATE_SUCCESS:
            return { loading: false, success: true, stock: action.payload }

        case STOCK_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case STOCK_CREATE_RESET:
            return {}

        default:
            return state
    }
}

export const damageListReducer = (state = { damages: [], selectMethodOptions: [], selectProductOptions: [], selectBatchOptions: []}, action) => {
    switch (action.type) {
        case DAMAGE_LIST_REQUEST:
            return { loading: true, damages: [] }

        case DAMAGE_LIST_SUCCESS:
            const methodArray = [...new Set(action.payload.map(item => item.method))];
            const productArray = [...new Set(action.payload.map(item => item.productName))];
            const batchArray = [...new Set(action.payload.map(item => item.batchNumber))];
            const staffArray = [...new Set(action.payload.map(item => item.staffName))];
            return {
                loading: false,
                damages: action.payload,
                selectMethodOptions: methodArray.map((item)=> { return {value:item, label:item}} ),
                selectProductOptions: productArray.map((item)=> { return {value:item, label:item}} ),
                selectBatchOptions: batchArray.map((item)=> { return {value:item, label:item}} ),
                selectStaffOptions: staffArray.map((item)=> { return {value:item, label:item}} ),
            }

        case DAMAGE_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const damageCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case DAMAGE_CREATE_REQUEST:
            return { loading: true }

        case DAMAGE_CREATE_SUCCESS:
            return { loading: false, success: true, damage: action.payload }

        case DAMAGE_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case DAMAGE_CREATE_RESET:
            return {}

        default:
            return state
    }
}

export const stockDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case STOCK_DELETE_REQUEST:
            return { loading: true }

        case STOCK_DELETE_SUCCESS:
            return { loading: false, success: true }

        case STOCK_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


export const stockUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case STOCK_UPDATE_REQUEST:
            return { loading: true }

        case STOCK_UPDATE_SUCCESS:
            return { loading: false, success: true, response: action.payload }

        case STOCK_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case STOCK_UPDATE_RESET:
            return { state: {} }

        default:
            return state
    }
}