import { configureStore } from '@reduxjs/toolkit';
import { persistedReducer } from './reduxPersist';
import { persistStore } from 'redux-persist';

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // necessário para evitar warning do redux-persist
    }),
});

export const persistor = persistStore(store);
export default store;
