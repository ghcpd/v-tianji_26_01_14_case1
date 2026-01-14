import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getTaskById } from '../services/taskService'

const TaskDetail = () => {
  const { id } = useParams()
  const [task, setTask] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadTask = async () => {
      const result = await getTaskById(id)
      if (result.error) {
        setError(result.error)
      } else {
        setTask(result)
      }
    }
    if (id) {
      loadTask()
    }
  }, [id])

  if (error) {
    return <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>
  }

  if (!task) {
    return <div style={{ padding: '20px' }}>Loading...</div>
  }

  return (
    <div style={{ padding: '24px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>{task.title}</h1>
      <p style={{ marginTop: '16px', color: '#666' }}>{task.description || 'No description'}</p>
      <p style={{ marginTop: '8px' }}>
        Status: {task.completed ? 'Completed' : 'Pending'}
      </p>
    </div>
  )
}

export default TaskDetail
