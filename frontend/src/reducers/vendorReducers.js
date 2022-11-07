import {
    VENDOR_LIST_REQUEST,
    VENDOR_LIST_SUCCESS,
    VENDOR_LIST_FAIL,

    VENDOR_CREATE_REQUEST,
    VENDOR_CREATE_SUCCESS,
    VENDOR_CREATE_FAIL,
    VENDOR_CREATE_RESET,

} from '../constants/vendorConstants'

export const vendorListReducer = (state = { vendors: [], selectOptions: [] }, action) => {
    switch (action.type) {
        case VENDOR_LIST_REQUEST:
            return { loading: true, vendors: [] }

        case VENDOR_LIST_SUCCESS:
            const typeArray = [...new Set(action.payload.map(item => item.location))];
            return {
                loading: false,
                vendors: action.payload,
                selectOptions: typeArray.map((item)=> { return {value:item, label:item}} )
            }

        case VENDOR_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const vendorCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case VENDOR_CREATE_REQUEST:
            return { loading: true }

        case VENDOR_CREATE_SUCCESS:
            return { loading: false, success: true, vendor: action.payload }

        case VENDOR_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case VENDOR_CREATE_RESET:
            return {}

        default:
            return state
    }
}