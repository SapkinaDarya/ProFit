import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import exReducer from './slices/exSlice'
import modalActiveReducer from "./slices/modalActiveSlice";

const rootReducer = combineReducers({
  user: userReducer,
  exercise: exReducer,
	modal: modalActiveReducer,
});

export const store = configureStore({
	reducer: rootReducer,
})
