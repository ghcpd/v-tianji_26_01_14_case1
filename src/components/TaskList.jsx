import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTasks, setLoading, setError } from '../store/slices/tasksSlice'
import { fetchTasks } from '../services/api'
import TaskItem from './TaskItem'

const TaskList = () => {
  const dispatch = useDispatch()
  const tasks = useSelector(state => state.tasks.items)
  const loading = useSelector(state => state.tasks.loading)
  const [localTasks, setLocalTasks] = useState([])

  useEffect(() => {
    const loadTasks = async () => {
      dispatch(setLoading(true))
      try {
        const data = await fetchTasks()
        dispatch(setTasks(data))
        setLocalTasks(data)
      } catch (err) {
        dispatch(setError(err.message))
      } finally {
        dispatch(setLoading(false))
      }
    }
    loadTasks()
  }, [dispatch])

  if (loading) {
    return <div style={{ padding: '20px' }}>Loading tasks...</div>
  }

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Task List</h1>
      <div>
        {localTasks.length === 0 ? (
          <p>No tasks found</p>
        ) : (
          localTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))
        )}
      </div>
    </div>
  )
}

export default TaskList
