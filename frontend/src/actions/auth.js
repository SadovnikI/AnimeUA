import axios from 'axios';
import {createMessage, returnErrors} from './messages';

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL, ADD_LEAD,
} from './types';

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
  // User Loading
  dispatch({ type: USER_LOADING });

  axios
    .get('/api/auth/user', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

// LOGIN USER
export const login = (username, password) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request Body
  const body = JSON.stringify({ username, password });

  axios
    .post('/api/auth/login', body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

// REGISTER USER
export const register = ({ username, password, email }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request Body
  const body = JSON.stringify({ username, email, password });

  axios
    .post('/api/auth/register', body, config)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
  axios
    .post('/api/auth/logout/', null, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: 'CLEAR_LEADS' });
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// Setup config with token - helper function
export const tokenConfig = (getState) => {
  // Get token from state
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  return config;
};

export const addcomment = ({ user_id, text, date, video_id, movie_id }) => (dispatch, getState) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request Body
  const body = JSON.stringify({ user_id, text, date, video_id, movie_id });
  axios
    .post('/api/auth/addcomment', body,  tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addLead: 'Comment Added' }));
      dispatch({
        type: ADD_LEAD,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));

};
export const updateuser = ({ id, username, old_password, new_password }) => (dispatch, getState) => {
  // Headers
    console.log(old_password, id, new_password,username)
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request Body
  const body = JSON.stringify({ id, username, old_password, new_password });
    console.log(body)
  axios
    .put('/api/cabinet/modify_user', body,  tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addLead: 'Updated' }));
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));

};

export const updateChoice  = ({ type, movie_url, cabinet_id }) => (dispatch, getState) => {
  // Headers
    console.log(movie_url, cabinet_id )
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  axios
    .put(`/api/cabinet/${type}/${movie_url}/${cabinet_id}`, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addLead: '' }));
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};
export const deleteChoice  = ({ type, movie_url, cabinet_id }) => (dispatch, getState) => {
  // Headers
    console.log(movie_url, cabinet_id )
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  axios
    .delete(`/api/cabinet/${type}/${movie_url}/${cabinet_id}`, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addLead: '' }));
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};