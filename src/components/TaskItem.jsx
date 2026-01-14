import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateTask } from '../store/slices/tasksSlice'
import { updateTask as updateTaskAPI } from '../services/api'

const TaskItem = ({ task }) => {
  const dispatch = useDispatch()
  const [isCompleted, setIsCompleted] = useState(task.completed)

  const handleToggle = async () => {
    const newStatus = !isCompleted
    setIsCompleted(newStatus)
    
    try {
      const updated = await updateTaskAPI(task.id, {
        ...task,
        completed: newStatus,
      })
      dispatch(updateTask(updated))
    } catch (error) {
      setIsCompleted(!newStatus)
      console.error('Failed to update task:', error)
    }
  }

  return (
    <div
      style={{
        padding: '12px',
        marginBottom: '8px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}
    >
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={handleToggle}
      />
      <span style={{ flex: 1, textDecoration: isCompleted ? 'line-through' : 'none' }}>
        {task.title}
      </span>
    </div>
  )
}

export default TaskItem
