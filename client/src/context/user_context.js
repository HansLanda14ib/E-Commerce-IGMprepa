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

} from "../actions";
import axios from "axios";

const user = localStorage.getItem('user')

const initialState = {
    isAdmin:false,
    showSidebar: false,
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: user ? JSON.parse(user) : null,

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
            const {user, location} = data;

            dispatch({
                type: UPDATE_USER_SUCCESS,
                payload: {user, location},
            });

            addUserToLocalStorage({user, location});
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

    return (
        <UserContext.Provider
            value={{
                ...state, displayAlert, setupUser, toggleSidebar, updateUser, logoutUser
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