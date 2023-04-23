import { legacy_createStore as createStore, combineReducers } from 'redux'

import { persistStore, persistReducer } from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session'

//导入自定义的reducer
import CollapsedReducer from './reducers/CollapsedReducer.js'
import CurrentUsernameReducer from './reducers/CurrentUsernameReducer.js'
import CurrentRoleReducer from './reducers/CurrentRoleReducer.js'
import CurrentUserIdReducer from './reducers/CurrentUserIdReducer.js'

//合并多个reducer
const reducer = combineReducers({
  CollapsedReducer,
  CurrentUsernameReducer,
  CurrentRoleReducer,
  CurrentUserIdReducer
})

//redux持久化
const storageConfig = {
  key: 'root',
  storage: storageSession
}
const myPersistReducer = persistReducer(storageConfig, reducer)

const store = createStore(myPersistReducer)
let persistor = persistStore(store)

export { store, persistor }
