import axios from 'axios'
import { GET_HOUSES, GET_HOUSE, ADD_HOUSE, UPDATE_HOUSE, HOUSE_ERROR } from './types'
import { logout } from "./auth";


// Get houses

export const getHouses = () => async (dispatch, getState) => {
    try {
        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const res = await axios.get("http://localhost:5000/houses", config);

        dispatch({
            type: GET_HOUSES,
            payload: res.data,
        });
    } catch (err) {
        console.log("ERROR", err);
        dispatch({
            type: HOUSE_ERROR,
            // payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

//get house by id
export const getHouse = (id) => async (dispatch, getState) => {
    try {
        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const res = await axios.get(`http://localhost:5000/houses/${id}`, config);

        dispatch({
            type: GET_HOUSE,
            payload: res.data,
        });
    } catch (err) {
        console.log("ERROR", err);
        dispatch({
            type: HOUSE_ERROR,
            // payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

// // create post
export const addHouse = (formData) => async (dispatch, getState) => {
    try {
        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(
            `http://localhost:5000/houses`,

            formData,
            config
        );

        dispatch({
            type: ADD_HOUSE,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;

        dispatch({
            type: HOUSE_ERROR,
            payload: message,
        });
    }
};


// update a house listing
export const updateHouse = (house) => async (dispatch, getState) => {
    try {

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(
            `https://electroshop1.herokuapp.com/api/products/${house._id}`,
            house,
            config
        );

        dispatch({
            type: UPDATE_HOUSE,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: HOUSE_ERROR,
            payload: message,
        });
    }
};