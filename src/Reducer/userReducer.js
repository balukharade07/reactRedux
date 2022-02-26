import {
  ADD_EMPLOYEE,
  DELETE_EMPLOYEE,
  EDIT_EMPLOYEE,
  GET_ALL_EMPLOYEES,
  GET_EMPLOYEE,
  SET_AGE,
  SET_NAME,
} from "../Action/type";
const getRandomColor =() => {
  const randomColor = Math.floor(Math.random()*16777215).toString(16);
  return randomColor;
}

export const userReducer = (
  state = {
    age: 30,
    username: "User Name",
    allEmployees: [],
    getEmpData:{},
    user_BG_Color:''
  },
  action
) => {
  switch (action.type) {
    case SET_NAME:
      return {
        ...state,
        username: action.payload,
        user_BG_Color: `#${getRandomColor()}`
      };
    case SET_AGE:
      return {
        ...state,
        age: action.payload,
      };
    case GET_ALL_EMPLOYEES:
      return {
        ...state,
        allEmployees: action.payload,
      };
    case DELETE_EMPLOYEE:
      return {
        ...state,
        allEmployees: state.allEmployees.filter(
          (item) => item.id !== action.payload
        ),
      };
      case ADD_EMPLOYEE:
      return {
        ...state,
        allEmployees: [...state.allEmployees, action.payload],
      };
      case EDIT_EMPLOYEE:
      return {
        ...state,
        allEmployees: state.allEmployees.map(item => {
          if(item.id === action.payload.id) {
            return action.payload
          } else {
            return item;
          }
        }),
      };
      case GET_EMPLOYEE:
        return {
          ...state,
          getEmpData: action.payload
        }
    default:
      return state;
  }
};
