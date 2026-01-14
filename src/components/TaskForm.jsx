import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTask } from '../store/slices/tasksSlice'
import { createTask } from '../services/api'

function TaskForm() {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) return

    try {
      const newTask = await createTask({
        title: title.trim(),
        description: description.trim(),
        completed: false,
      })
      dispatch(addTask(newTask))
      setTitle('')
      setDescription('')
    } catch (error) {
      alert('Failed to create task: ' + error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task description"
        style={{ width: '100%', padding: '8px', marginBottom: '8px', minHeight: '60px' }}
      />
      <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer' }}>
        Add Task
      </button>
    </form>
  )
}

export default TaskForm
