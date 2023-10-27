import React, {useReducer, useContext} from 'react';
import reducer from '../reducers/user_reducer';
import {
    CLEAR_ALERT,
    DISPLAY_ALERT,
    SETUP_USER_SUCCESS,
    SETUP_USER_ERROR,
    SETUP_USER_BEGIN,
    TOGGLE_SIDEBAR,
    LOGOUT_USER,
    UPDATE_USER_BEGIN,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    CLEAR_VALUES,
    CREATE_PRODUCT_BEGIN,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_ERROR,
    HANDLE_CHANGE,
    UPLOAD_IMAGE_BEGIN,
    UPLOAD_IMAGE_ERROR,
    UPLOAD_IMAGE_SUCCESS,
    ADD_COLOR,
    REMOVE_COLOR

} from "../actions";
import axios from "axios";

const user = localStorage.getItem('user')

const initialState = {
    isAdmin: false,
    showSidebar: false,
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: user ? JSON.parse(user) : null,
    isEditing: false,
    editJobId: '',
    name: '',
    price: 0,
    description: '',
    images: [],
    category: '',
    categoryOptions: ['mug', 'hat', 'pen', 'bag', 'hoodie', 'sweater', 't-shirt'],
    companyOptions: ['top', 'buttom'],
    company: '',
    colors: [],
    featured: false,
    freeShipping: false,
    inventory: 15,


};

const UserContext = React.createContext(undefined);
const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    // Axios config
    const authFetch = axios.create({
        baseURL: '/api/v1',
        /* headers: {
             Authorization: `Bearer ${state?.token}`,
         }*/
    });
    // request interceptor
    authFetch.interceptors.request.use(
        (config) => {
            //config.headers['Authorization'] = `Bearer ${state?.token}`;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    // response interceptor
    authFetch.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            console.log(error.response);
            if (error.response.status === 401) {
                logoutUser();
            }
            return Promise.reject(error);
        }
    );
    const displayAlert = () => {
        dispatch({type: DISPLAY_ALERT});
        clearAlert()
    }
    const clearAlert = () => {
        setTimeout(() => {
            dispatch({type: CLEAR_ALERT});
        }, 3000)

    }
    const toggleSidebar = () => {
        dispatch({type: TOGGLE_SIDEBAR});
    };

    const addUserToLocalStorage = ({user}) => {
        localStorage.setItem('user', JSON.stringify(user));

    }
    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('user');

    }

    const setupUser = async ({currentUser, endPoint, alertText}) => {
        dispatch({type: SETUP_USER_BEGIN});
        try {
            const response = await authFetch.post(`/auth/${endPoint}`, currentUser);
            console.log(response.data);

            const {user, location} = response.data;
            dispatch({type: SETUP_USER_SUCCESS, payload: {user, location, alertText}});
            addUserToLocalStorage({user, location});
        } catch (error) {
            console.log(error);
            dispatch({type: SETUP_USER_ERROR, payload: {msg: error.response.data.msg}});
        }
        clearAlert();
    };

    const logoutUser = () => {
        dispatch({type: LOGOUT_USER});
        removeUserFromLocalStorage();

    }
    const updateUser = async (currentUser) => {
        dispatch({type: UPDATE_USER_BEGIN});
        try {
            const {data} = await authFetch.patch('/auth/updateUser', currentUser);

            // no token
            const {user} = data;

            dispatch({
                type: UPDATE_USER_SUCCESS,
                payload: {user},
            });

            addUserToLocalStorage({user});
        } catch (error) {
            if (error.response.status !== 401) {
                dispatch({
                    type: UPDATE_USER_ERROR,
                    payload: {msg: error.response.data.msg},
                });
            }

        }
        clearAlert();
    };
    const handleChange = ({name, value}) => {
        dispatch({type: HANDLE_CHANGE, payload: {name, value}});
    };
    const clearValues = () => {
        dispatch({type: CLEAR_VALUES});
    };
    const createProduct = async () => {
        dispatch({type: CREATE_PRODUCT_BEGIN});
        try {
            const {name, price, description, category, company, inventory, images, colors} = state;
            //console.log(images)
            await authFetch.post('/products', {
                name, price, description, category, company, inventory, images, colors
            });
            dispatch({type: CREATE_PRODUCT_SUCCESS});
            //dispatch({type: CLEAR_VALUES});
        } catch (error) {
            if (error.response.status === 401) return;
            dispatch({
                type: CREATE_PRODUCT_ERROR,
                payload: {msg: error.response.data.msg},
            });
        }
        clearAlert();
    };
    const uploadImage = async (formData) => {
        dispatch({type: UPLOAD_IMAGE_BEGIN})
        try {
            const response = await axios.post('/api/v1/products/uploadImage', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data)
            let imagesUrl = response.data.map((image) => image.src)
            console.log(imagesUrl)
            dispatch({type: UPLOAD_IMAGE_SUCCESS, payload: imagesUrl});
            //return response.data.image.src
        } catch (error) {
            dispatch({
                type: UPLOAD_IMAGE_ERROR,
                payload: {msg: error.response.data.msg},
            });
        }
        clearAlert();
    }

    const addColor = (color) => {
        dispatch({type: ADD_COLOR, payload: color});
    }
    const removeColor = (color) => {
        dispatch({type: REMOVE_COLOR, payload: color});
    }
    return (
        <UserContext.Provider
            value={{
                ...state,
                displayAlert,
                setupUser,
                toggleSidebar,
                updateUser,
                logoutUser,
                handleChange,
                clearValues,
                createProduct,
                uploadImage, addColor, removeColor
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
// make sure use
export const useAppContext = () => {
    return useContext(UserContext);
};


export {AppProvider};