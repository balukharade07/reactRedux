import axios from "axios";
import {
  ADD_EMPLOYEE,
  CREATE_USER,
  DECREMENT,
  DELETE_EMPLOYEE,
  EDIT_EMPLOYEE,
  EDIT_USER,
  GET_ALL_EMPLOYEES,
  GET_EMPLOYEE,
  GET_USERINFO,
  INCREMENT,
  RESET,
  SET_AGE,
  SET_NAME,
  USERINFO,
} from "./type";

const EMPBaseURL = () => {
  return process.env.REACT_APP_API_EMPLOYEE_URL;
};

const UserBaseURL = () => {
  return process.env.REACT_APP_API_USER_URL;
};

export const setAge = (age) => (dispatch) => {
  dispatch({
    type: SET_AGE,
    payload: age,
  });
};

export const setIncrement = (value) => (dispatch) => {
  dispatch({
    type: INCREMENT,
    payload: value,
  });
};

export const setDecrement = (value) => (dispatch) => {
  dispatch({
    type: DECREMENT,
    payload: value,
  });
};

export const resetCount = () => (dispatch) => {
  dispatch({
    type: RESET,
  });
};

export const getAllEmployees = () => async (dispatch) => {
  await axios
    .get(`${EMPBaseURL()}`)
    .then((response) => {
      dispatch({
        type: GET_ALL_EMPLOYEES,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deleteEmployee = (id) => async (dispatch) => {
  await axios
    .delete(`${EMPBaseURL()}/${id}`)
    .then((res) => {
      dispatch({
        type: DELETE_EMPLOYEE,
        payload: id,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const addEmployee = (data) => async (dispatch) => {
  await axios
    .post(`${EMPBaseURL()}`, data)
    .then((response) => {
      dispatch({
        type: ADD_EMPLOYEE,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const editEmployee = (data) => async (dispatch) => {
  await axios
    .put(`${EMPBaseURL()}/${data.id}`, data)
    .then((response) => {
      dispatch({
        type: EDIT_EMPLOYEE,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getEmployee = (id) => async (dispatch) => {
  await axios
    .get(`${EMPBaseURL()}/${id}`)
    .then((response) => {
      dispatch({
        type: GET_EMPLOYEE,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getAllUsers = () => async (dispatch) => {
  await axios
    .get(`${UserBaseURL()}`)
    .then((response) => {
      dispatch({
        type: USERINFO,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getUser = (id) => async (dispatch) => {
  await axios
    .get(`${UserBaseURL()}/${id}`)
    .then((response) => {
      dispatch({
        type: GET_USERINFO,
        payload: response.data,
      });

      dispatch({
        type: SET_NAME,
        payload: response.data.username,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const createUser = (value) => async (dispatch) => {
  await axios
    .post(`${UserBaseURL()}`, value)
    .then((response) => {
      dispatch({
        type: CREATE_USER,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const editUser = (value) => async (dispatch) => {
  await axios
    .put(`${UserBaseURL()}/${value.id}`, value)
    .then((response) => {
      dispatch({
        type: EDIT_USER,
        payload: response.data,
      });

      dispatch({
        type: SET_NAME,
        payload: response.data.username,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
