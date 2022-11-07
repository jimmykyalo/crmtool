import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,

    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,

    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_RESET,

    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,

    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,

    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_RESET,

    MEMBER_LIST_REQUEST,
    MEMBER_LIST_SUCCESS,
    MEMBER_LIST_FAIL,

    MEMBER_DELETE_REQUEST,
    MEMBER_DELETE_SUCCESS,
    MEMBER_DELETE_FAIL,

    MEMBER_CREATE_REQUEST,
    MEMBER_CREATE_SUCCESS,
    MEMBER_CREATE_FAIL,
    MEMBER_CREATE_RESET,

    MEMBER_UPDATE_REQUEST,
    MEMBER_UPDATE_SUCCESS,
    MEMBER_UPDATE_FAIL,
    MEMBER_UPDATE_RESET,

} from '../constants/userConstants'


export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }

        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }

        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }

        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}


export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true }

        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload }

        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }

        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}



export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { ...state, loading: true }

        case USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload }

        case USER_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        case USER_DETAILS_RESET:
            return { user: {} }


        default:
            return state
    }
}


export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return { loading: true }

        case USER_UPDATE_PROFILE_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }

        case USER_UPDATE_PROFILE_FAIL:
            return { loading: false, error: action.payload }

        case USER_UPDATE_PROFILE_RESET:
            return {}

        default:
            return state
    }
}


export const userListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case USER_LIST_REQUEST:
            return { loading: true }

        case USER_LIST_SUCCESS:
            return { loading: false, users: action.payload }

        case USER_LIST_FAIL:
            return { loading: false, error: action.payload }

        case USER_LIST_RESET:
            return { users: [] }

        default:
            return state
    }
}


export const userDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_DELETE_REQUEST:
            return { loading: true }

        case USER_DELETE_SUCCESS:
            return { loading: false, success: true }

        case USER_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


export const userUpdateReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return { loading: true }

        case USER_UPDATE_SUCCESS:
            return { loading: false, success: true }

        case USER_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case USER_UPDATE_RESET:
            return { user: {} }

        default:
            return state
    }
}

export const memberListReducer = (state = { members: [], selectOptions: [] }, action) => {
    switch (action.type) {
        case MEMBER_LIST_REQUEST:
            return { loading: true, members: [] }

        case MEMBER_LIST_SUCCESS:
            const genderArray = [...new Set(action.payload.map(item => item.gender))];
            
            return {
                loading: false,
                members: action.payload,
                selectOptions: genderArray.map((item)=> { return {value:item, label:item}} ),
                

            }

        case MEMBER_LIST_FAIL:
            return { loading: false, error: action.payload, members: [] }

        default:
            return state
    }
}


export const memberCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case MEMBER_CREATE_REQUEST:
            return { loading: true }

        case MEMBER_CREATE_SUCCESS:
            return { loading: false, success: true, member: action.payload }

        case MEMBER_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case MEMBER_CREATE_RESET:
            return {}

        default:
            return state
    }
}


export const memberDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case MEMBER_DELETE_REQUEST:
            return { loading: true }

        case MEMBER_DELETE_SUCCESS:
            return { loading: false, success: true }

        case MEMBER_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


export const memberUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case MEMBER_UPDATE_REQUEST:
            return { loading: true }

        case MEMBER_UPDATE_SUCCESS:
            return { loading: false, success: true, response: action.payload }

        case MEMBER_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case MEMBER_UPDATE_RESET:
            return { state: {} }

        default:
            return state
    }
}