
import axios from "axios";


import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    GET_USERS,
    GETUSERS_FAIL,

    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOGOUT,
    CLEAR_PROFILE
} from "./types";

// load user
export const loadUser = () => async (dispatch, getState) => {

    try {
        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const res = await axios.get("http://localhost:5000/users/me", config);
        console.log("user response", res.data);
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL
        });
    }
};


// get all users

export const getUsers = () => async (dispatch) => {

    try {
        const res = await axios.get("https://vast-bayou-47622.herokuapp.com/users");
        console.log("users are", res.data);
        dispatch({
            type: GET_USERS,
            Payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: GETUSERS_FAIL,
        });
    }
};

// Register User
export const register = ({ name, email, password }) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const body = JSON.stringify({ name, email, password });

    try {
        const res = await axios.post(
            "http://localhost:5000/users/register",
            body,
            config
        );

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
        });
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });
        localStorage.setItem("user", JSON.stringify(res.data));

        dispatch(loadUser())

    } catch (error) {
        console.log(error);
        dispatch({
            type: REGISTER_FAIL,
        });
    }
};

//Login user

export const login = (email, password) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post(
            "http://localhost:5000/users/login",
            body,
            config
        );


        localStorage.setItem("userInfo", JSON.stringify(res.data));

        dispatch(loadUser())
    } catch (error) {
        console.log(error);
        dispatch({
            type: LOGIN_FAIL,
        });
    }
};

// Logout user
export const logout = () => (dispatch) => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch({ type: USER_LOGOUT });
};
