import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import Dashboard from '../components/Dashboard'
import tasksReducer from '../store/slices/tasksSlice'
import userReducer from '../store/reducers/userReducer'

const createMockStore = () => {
  return configureStore({
    reducer: {
      tasks: tasksReducer,
      user: userReducer,
    },
  })
}

describe('Dashboard', () => {
  it('renders dashboard title', () => {
    const store = createMockStore()
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    )
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })
})
