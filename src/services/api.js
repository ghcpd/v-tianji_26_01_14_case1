import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
})

apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      throw new Error(error.response.data.message || 'An error occurred')
    }
    throw error
  }
)

export const fetchTasks = async () => {
  const response = await apiClient.get('/tasks')
  return response.data
}

export const createTask = async (taskData) => {
  const response = await apiClient.post('/tasks', taskData)
  return response.data
}

export const updateTask = async (id, taskData) => {
  const response = await apiClient.put(`/tasks/${id}`, taskData)
  return response.data
}

export default apiClient
