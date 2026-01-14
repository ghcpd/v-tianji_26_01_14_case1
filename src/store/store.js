import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from './slices/tasksSlice'
import userReducer from './reducers/userReducer'

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    user: userReducer,
  },
})
