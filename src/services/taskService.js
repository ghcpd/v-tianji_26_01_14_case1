const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3000/api'

export const getTaskById = async (id) => {
  try {
    const response = await fetch(`${API_BASE}/tasks/${id}`)
    if (!response.ok) {
      const error = await response.json()
      return { error: error.message || 'Failed to fetch task' }
    }
    return await response.json()
  } catch (err) {
    return { error: err.message }
  }
}

export const deleteTask = async (id) => {
  const response = await fetch(`${API_BASE}/tasks/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Failed to delete task')
  }
  return response.json()
}
