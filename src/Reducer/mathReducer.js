import { DECREMENT, INCREMENT, RESET } from "../Action/type";

export const mathReducer = (
  state = {
    count: 0,
  },
  action
) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + action.payload,
      };

    case DECREMENT:
      return {
        ...state,
        count: state.count - action.payload,
      };
      case RESET:
      return {
        ...state,
        count: 0,
      };
    default:
      return state;
  }
};
