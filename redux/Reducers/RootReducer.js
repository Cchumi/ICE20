import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'
//import NotificationsReducer from './NotificationsReducer'
import UiReducer from './UiReducer'
export const initialState = {
}

export const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  ui: UiReducer,
  //notifications: NotificationsReducer,
})