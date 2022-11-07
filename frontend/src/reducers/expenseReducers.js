import {
    EXPENSE_LIST_REQUEST,
    EXPENSE_LIST_SUCCESS,
    EXPENSE_LIST_FAIL,

    EXPENSE_CREATE_REQUEST,
    EXPENSE_CREATE_SUCCESS,
    EXPENSE_CREATE_FAIL,
    EXPENSE_CREATE_RESET,

    EXPENSE_UPDATE_REQUEST,
    EXPENSE_UPDATE_SUCCESS,
    EXPENSE_UPDATE_FAIL,
    EXPENSE_UPDATE_RESET,

    EXPENSE_DELETE_REQUEST,
    EXPENSE_DELETE_SUCCESS,
    EXPENSE_DELETE_FAIL,

} from '../constants/expenseConstants'

export const expenseListReducer = (state = { expenses: [], selectCategoryOptions: [], selectSubCategoryOptions: [] }, action) => {
    switch (action.type) {
        case EXPENSE_LIST_REQUEST:
            return { loading: true, expenses: [] }

        case EXPENSE_LIST_SUCCESS:
            const categoryArray = [...new Set(action.payload.map(item => item.category))];
            const subCategoryArray = [...new Set(action.payload.map(item => item.subCategory))];
            const memberArray = [...new Set(action.payload.map(item => item.memberName))];
            return {
                loading: false,
                expenses: action.payload,
                selectCategoryOptions: categoryArray.map((item)=> { return {value:item, label:item}} ),
                selectSubCategoryOptions: subCategoryArray.map((item)=> { return {value:item, label:item}} ),
                selectMemberOptions: memberArray.map((item)=> { return {value:item, label:item}} ),
            }

        case EXPENSE_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const expenseCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case EXPENSE_CREATE_REQUEST:
            return { loading: true }

        case EXPENSE_CREATE_SUCCESS:
            return { loading: false, success: true, expense: action.payload }

        case EXPENSE_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case EXPENSE_CREATE_RESET:
            return {}

        default:
            return state
    }
}


export const expenseDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case EXPENSE_DELETE_REQUEST:
            return { loading: true }

        case EXPENSE_DELETE_SUCCESS:
            return { loading: false, success: true }

        case EXPENSE_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


export const expenseUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case EXPENSE_UPDATE_REQUEST:
            return { loading: true }

        case EXPENSE_UPDATE_SUCCESS:
            return { loading: false, success: true, response: action.payload }

        case EXPENSE_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case EXPENSE_UPDATE_RESET:
            return { state: {} }

        default:
            return state
    }
}