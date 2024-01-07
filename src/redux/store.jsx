import { configureStore } from "@reduxjs/toolkit";
import { contactsSlice } from "./contactsSlice";
import { filterSlice } from "./filterSlice";
import { authSlice } from "./auth/authSlice";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['access_token']
}

const persistedContactsReducer = persistReducer(persistConfig, authSlice.reducer)


export const store = configureStore({
    reducer: {
        contacts: contactsSlice.reducer,
        filter: filterSlice.reducer,
        auth_token: persistedContactsReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)
