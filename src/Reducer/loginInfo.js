import { CREATE_USER, EDIT_USER, GET_USERINFO, USERINFO } from "../Action/type";

export const loginInfo = (
  state = {
    getAllUser: [],
    getUser: {},
  },
  action
) => {
  switch (action.type) {
    case USERINFO:
      return {
        ...state,
        getAllUser: action.payload,
      };
    case GET_USERINFO:
      return {
        ...state,
        getUser: action.payload,
      };
    case CREATE_USER:
      return {
        ...state,
        getAllUser: [...state.getAllUser,action.payload]
      }
    case EDIT_USER:
      return {
        ...state,
        getUser: action.payload,
        getAllUser: state.getAllUser.map(item => {
          if(item.id === action.payload.id) {
            return action.payload
          } else {
            return item;
          }
        })
      }
    default:
      return state;
  }
};
