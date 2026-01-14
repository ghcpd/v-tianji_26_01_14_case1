import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import TaskItem from '../TaskItem'
import tasksReducer from '../../store/slices/tasksSlice'

const createStore = () => {
  return configureStore({
    reducer: {
      tasks: tasksReducer,
    },
  })
}

describe('TaskItem', () => {
  it('renders task title', () => {
    const store = createStore()
    const mockTask = {
      id: '1',
      title: 'Test Task',
      completed: false,
    }
    
    render(
      <Provider store={store}>
        <TaskItem task={mockTask} />
      </Provider>
    )
    
    expect(screen.getByText('Test Task')).toBeInTheDocument()
  })
})
