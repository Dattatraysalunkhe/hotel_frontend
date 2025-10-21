import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'




  const rootReducer = combineReducers({user:userReducer});  //combine and add here reducer if have more than one add here but i have one so i added one

  const persistConfig = {
    key:root,
    storage,
    version:1,
  }

  const persistedReducer = persistReducer(persistConfig,rootReducer) //here create persistReducer (give the name config, config created by him )





export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor =persistStore(store);

