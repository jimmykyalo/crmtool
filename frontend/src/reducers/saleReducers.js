import {
    SALE_LIST_REQUEST,
    SALE_LIST_SUCCESS,
    SALE_LIST_FAIL,

    SALE_CREATE_REQUEST,
    SALE_CREATE_SUCCESS,
    SALE_CREATE_FAIL,
    SALE_CREATE_RESET,

    
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
    SALE_UPDATE_RESET,

    SALE_DELETE_REQUEST,
    SALE_DELETE_SUCCESS,
    SALE_DELETE_FAIL,

} from '../constants/saleConstants'

export const saleListReducer = (state = { sales: [], selectMethodOptions: [], selectProductOptions: [], selectBatchOptions: []}, action) => {
    switch (action.type) {
        case SALE_LIST_REQUEST:
            return { loading: true, sales: [] }

        case SALE_LIST_SUCCESS:
            
            const productArray = [...new Set(action.payload.map(item => item.productName))];
            const staffArray = [...new Set(action.payload.map(item => item.staffName))];
            const memberArray = [...new Set(action.payload.map(item => item.memberName))];
    
            return {
                loading: false,
                sales: action.payload,
                
                selectProductOptions: productArray.map((item)=> { return {value:item, label:item}} ),
                
                selectStaffOptions: staffArray.map((item)=> { return {value:item, label:item}} ),
                selectMemberOptions: memberArray.map((item)=> { return {value:item, label:item}} ),
            }

        case SALE_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const saleCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case SALE_CREATE_REQUEST:
            return { loading: true }

        case SALE_CREATE_SUCCESS:
            return { loading: false, success: true, sale: action.payload }

        case SALE_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case SALE_CREATE_RESET:
            return {}

        default:
            return state
    }
}

export const salesTrendReducer = (state = { trends: []}, action) => {
    switch (action.type) {
        case SALES_TREND_REQUEST:
            return { loading: true, trends: [] }

        case SALES_TREND_SUCCESS:
            
           
            return {
                loading: false,
                trends: action.payload
            }

        case SALES_TREND_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const salesPerProductReducer = (state = { perProducts: []}, action) => {
    switch (action.type) {
        case SALES_PER_PRODUCT_REQUEST:
            return { loading: true, perProducts: [] }

        case SALES_PER_PRODUCT_SUCCESS:
            
           
            return {
                loading: false,
                perProducts: action.payload
            }

        case SALES_PER_PRODUCT_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const productSalesTrendReducer = (state = { productTrends: []}, action) => {
    switch (action.type) {
        case PRODUCT_SALES_TREND_REQUEST:
            return { loading: true, productTrends: [] }

        case PRODUCT_SALES_TREND_SUCCESS:
            
           
            return {
                loading: false,
                productTrends: action.payload
            }

        case PRODUCT_SALES_TREND_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const saleDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case SALE_DELETE_REQUEST:
            return { loading: true }

        case SALE_DELETE_SUCCESS:
            return { loading: false, success: true }

        case SALE_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


export const saleUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case SALE_UPDATE_REQUEST:
            return { loading: true }

        case SALE_UPDATE_SUCCESS:
            return { loading: false, success: true, response: action.payload }

        case SALE_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case SALE_UPDATE_RESET:
            return { state: {} }

        default:
            return state
    }
}