import {
    INSTALLMENT_LIST_REQUEST,
    INSTALLMENT_LIST_SUCCESS,
    INSTALLMENT_LIST_FAIL,

    INSTALLMENT_CREATE_REQUEST,
    INSTALLMENT_CREATE_SUCCESS,
    INSTALLMENT_CREATE_FAIL,
    INSTALLMENT_CREATE_RESET,

    CREDIT_LIST_REQUEST,
    CREDIT_LIST_SUCCESS,
    CREDIT_LIST_FAIL,

} from '../constants/installmentConstants'

export const installmentListReducer = (state = { installments: [], selectReceiptOptions: [], selectProductOptions:[], selectCustomerOptions:[]}, action) => {
    switch (action.type) {
        case INSTALLMENT_LIST_REQUEST:
            return { loading: true, installments: [] }

        case INSTALLMENT_LIST_SUCCESS:
            const receiptArray = [...new Set(action.payload.map(item => item.receiptNumber))];
            const customerArray = [...new Set(action.payload.map(item => item.customerName))];
            const productArray = [...new Set(action.payload.map(item => item.productName))];
            return {
                loading: false,
                installments: action.payload,
                selectReceiptOptions: receiptArray.map((item)=> { return {value:item, label:item}} ),
                selectCustomerOptions: customerArray.map((item)=> { return {value:item, label:item}} ),
                selectProductOptions: productArray.map((item)=> { return {value:item, label:item}} ),
            }

        case INSTALLMENT_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const installmentCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case INSTALLMENT_CREATE_REQUEST:
            return { loading: true }

        case INSTALLMENT_CREATE_SUCCESS:
            return { loading: false, success: true, installment: action.payload }

        case INSTALLMENT_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case INSTALLMENT_CREATE_RESET:
            return {}

        default:
            return state
    }
}

export const creditListReducer = (state = { creditSales: []}, action) => {
    switch (action.type) {
        case CREDIT_LIST_REQUEST:
            return { loading: true, creditSales: [] }

        case CREDIT_LIST_SUCCESS:
            
            return {
                loading: false,
                creditSales: action.payload,
                
            }

        case CREDIT_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}