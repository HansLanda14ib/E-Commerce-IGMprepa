import {
    CLEAR_ALERT,
    DISPLAY_ALERT, LOGOUT_USER, SETUP_USER_ERROR, SETUP_USER_SUCCESS,
    TOGGLE_SIDEBAR,
    UPDATE_USER_BEGIN,
    UPDATE_USER_ERROR,
    UPDATE_USER_SUCCESS
} from "../actions";

const reducer = (state, action) => {
    if (action.type === DISPLAY_ALERT) {
        return {
            ...state,
            showAlert: true,
            alertType: 'danger',//action.payload.text,
            alertText: 'pls provide all values'//action.payload.type
        }
    }
    if (action.type === CLEAR_ALERT) {
        return {
            ...state,
            showAlert: false,
            alertType: '',//action.payload.text,
            alertText: ''//action.payload.type
        }
    }
    if (action.type === 'SETUP_USER_BEGIN') {
        return {
            ...state,
            isLoading: true,
        }
    }
    if (action.type === SETUP_USER_SUCCESS) {
        return {
            ...state,
            isAdmin: action.payload.user.role === 'admin',
            isLoading: false,
            user: action.payload.user,
            showAlert: true,
            alertType: 'success',
            alertText: action.payload.alertText
        }
    }
    if (action.type === SETUP_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg
        }
    }
    if (action.type === TOGGLE_SIDEBAR) {
        return {
            ...state,
            showSidebar: !state.showSidebar,
        };
    }
    if (action.type === LOGOUT_USER) {
        return {
            ...state,
            isLoading: false,
            user: null,

        };
    }
    if (action.type === UPDATE_USER_BEGIN) {
        return {...state, isLoading: true}
    }


    if (action.type === UPDATE_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            user: action.payload.user,
            showAlert: true,
            alertType: 'success',
            alertText: 'User Profile Updated!',
        }
    }
    if (action.type === UPDATE_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg,
        }
    }

    throw new Error(`No Matching "${action.type}" - action type`); // if no action type matches
};

export default reducer;