import React from "react";
import {
  ADD_TODO_ERROR,
  ADD_TODO_LOADING,
  ADD_TODO_SUCCESS,
  GET_TODO_ERROR,
  GET_TODO_LOADING,
  GET_TODO_SUCCESS,
} from "./actionType";

const initState = {
  todos: {
    isLoading: false,
    isError: false,
    data: [],
  },
};

export default function reducer(state = initState, { type, payload }) {
  switch (type) {
    case ADD_TODO_LOADING:
      return {
        ...state,
        todos: {
          ...state.todos,
          isLoading: true,
        },
      };
    case ADD_TODO_ERROR:
      return {
        ...state,
        todos: {
          ...state.todos,
          isError: true,
          isLoading: false,
        },
      };
    case ADD_TODO_SUCCESS:
      return {
        ...state,
        todos: {
          ...state.todos,
          isLoading: false,
        },
      };
    case GET_TODO_LOADING:
      return {
        ...state,
        todos: {
          ...state.todos,
          isLoading: true,
        },
      };
    case GET_TODO_ERROR:
      return {
        ...state,
        todos: {
          ...state.todos,
          isError: true,
          isLoading: false,
        },
      };
    case GET_TODO_SUCCESS:
      return {
        ...state,
        todos: {
          ...state.todos,
          isLoading: false,
          data: [...payload],
        },
      };

    default:
      return state;
  }
}
