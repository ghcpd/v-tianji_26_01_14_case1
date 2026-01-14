import { Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import TaskList from './components/TaskList'
import TaskDetail from './components/TaskDetail'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/tasks/:id" element={<TaskDetail />} />
      </Routes>
    </div>
  )
}

export default App
