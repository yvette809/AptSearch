import {
    GET_HOUSES,
    HOUSE_ERROR,
    DELETE_HOUSE,
    ADD_HOUSE,
    GET_HOUSE,
    UPDATE_HOUSE
  } from '../actions/types';
  
  const initialState = {
    houses: [],
    house: null,
    loading: true,
    error: {}
  };
  
  export const house =(state = initialState, action) =>{
    // const { type, payload } = action;
  
    switch (action.type) {
      case GET_HOUSES:
        return {
          ...state,
          houses: action.payload,
          loading: false
        };
      case GET_HOUSE:
        return {
          ...state,
          house: action.payload,
          loading: false
        };
      case ADD_HOUSE:
        return {
          ...state,
          houses: [action.payload, ...state.houses],
          loading: false
        };
      case DELETE_HOUSE:
        return {
          ...state,
          houses: state.houses.filter(house => house._id !==action.payload),
          loading: false
        };

        case UPDATE_HOUSE:
        return {
          ...state,
          house: action.payload,
          loading: false
        };
      case HOUSE_ERROR:
        return {
          ...state,
          error: action.payload,
          loading: false
        };
     
      default:
        return state;
    }
  }