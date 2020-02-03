import { applyMiddleware, createStore, compose } from 'redux'
import { reactReduxFirebase, actionTypes, type } from 'react-redux-firebase'
import { reduxFirestore } from 'redux-firestore'
import thunk from 'redux-thunk';

import { createLogger } from 'redux-logger'
import logger from 'redux-logger'
import { initialState, rootReducer } from './Reducers/RootReducer'

//const initialState = {}
const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}
export default () => {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
    //applyMiddleware(thunk, logger)
  )
}

/*firebase.firestore().settings({ timestampsInSnapshots: true })

const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true,
    enableRedirectHandling: false,
    logErrors: false,
}

const enhancers = [
    reduxFirestore(firebase),
    reactReduxFirebase(firebase, rrfConfig),
    applyMiddleware(thunk, logger)
]

const composedEnhancers = compose(
    ...enhancers
)

const store = createStore(rootReducer, initialState, composedEnhancers)

export default store*/