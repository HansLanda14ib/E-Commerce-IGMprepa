import {
    CLEAR_ALERT,
    DISPLAY_ALERT, LOGOUT_USER, SETUP_USER_ERROR, SETUP_USER_SUCCESS,
    TOGGLE_SIDEBAR,
    UPDATE_USER_BEGIN,
    UPDATE_USER_ERROR,
    UPDATE_USER_SUCCESS,
    HANDLE_CHANGE,
    CLEAR_VALUES,
    CREATE_PRODUCT_BEGIN,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_ERROR,
    UPLOAD_IMAGE_BEGIN,
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_ERROR, ADD_COLOR, REMOVE_COLOR,
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

    if (action.type === HANDLE_CHANGE) {
        return {
            ...state,
            [action.payload.name]: action.payload.value,
        };
    }
    if (action.type === CLEAR_VALUES) {
        const initialState = {
            isEditing: false,
            editJobId: '',
            name: '',
            price: 0,
            description: '',
            images: [],
            category: '',
            company: '',
            colors: [],
            featured: false,
            freeShipping: false,
            inventory: 15,
        };

        return {
            ...state,
            ...initialState,
        };
    }
    if (action.type === CREATE_PRODUCT_BEGIN) {
        return {...state, isLoading: true};
    }

    if (action.type === CREATE_PRODUCT_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: 'New Product Created!',
        };
    }
    if (action.type === CREATE_PRODUCT_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg,
        };
    }
    if (action.type === UPLOAD_IMAGE_BEGIN) {
        return {
            ...state, isLoading: true
        }
    }
    if (action.type === UPLOAD_IMAGE_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: 'Image Uploaded!',
            images: action.payload
        }
    }
    if (action.type === UPLOAD_IMAGE_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg,
        }
    }
    if(action.type===ADD_COLOR){
        return {
            ...state,
           colors:[...state.colors,action.payload]
        }
    }
    if(action.type===REMOVE_COLOR){
        return {
            ...state,
            colors:state.colors.filter((color)=>color!==action.payload)
        }
    }

    throw new Error(`No Matching "${action.type}" - action type`); // if no action type matches
};

export default reducer;