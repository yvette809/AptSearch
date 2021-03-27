import {
  GET_HOUSES,
  HOUSE_ERROR,
  DELETE_HOUSE,
  ADD_HOUSE,
  GET_HOUSE,
  UPDATE_HOUSE,

} from '../actions/types';

const initialState = {
  houses: [],
  house: null,
  loading: true,
  error: {}
};

export const houseReducer = (state = initialState, action) => {
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
        houses: state.houses.filter(house => house._id !== action.payload),
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


// export const houseListReducer = (state = { houses: [], loading: true, error: {} }, action) => {
//   switch (action.type) {
//     case GET_HOUSES:
//       return {
//         ...state,
//         loading: false,
//         houses: action.payload
//       }
//     case GET_HOUSES_FAIL:
//       return { loading: false, error: action.payload }
//     default:
//       return state
//   }
// }


// export const houseDetailsReducer = (state = { house: {} }, action) => {
//   switch (action.type) {
//     case GET_HOUSE:
//       return {
//         loading: false,
//         house: action.payload
//       }
//     case GET_HOUSE_FAIL:
//       return { loading: false, error: action.payload }
//     default:
//       return state
//   }
// }


// export const createHouseReducer = (state = {}, action) => {
//   switch (action.type) {
//     case ADD_HOUSE:
//       return {
//         loading: false,
//         house: action.payload
//       }
//     case ADD_HOUSE_FAIL:
//       return { loading: false, error: action.payload }
//     default:
//       return state
//   }
// }

// export const updateHouseReducer = (state = { house: {} }, action) => {
//   switch (action.type) {
//     case UPDATE_HOUSE:
//       return {
//         loading: false,
//         house: action.payload
//       }
//     case UPDATE_HOUSE_FAIL:
//       return { loading: false, error: action.payload }
//     default:
//       return state
//   }
// }


// export const deleteHouseReducer = (state = { houses: [] }, action) => {
//   switch (action.type) {
//     case DELETE_HOUSE:
//       return {
//         loading: false,
//         houses: state.houses.filter(house => house._id !== action.payload),
//       }
//     case DELETE_HOUSE_FAIL:
//       return { loading: false, error: action.payload }
//     default:
//       return state
//   }
// }
