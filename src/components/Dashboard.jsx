import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { fetchTasks } from '../services/api'
import styles from './Dashboard.module.css'

const Dashboard = () => {
  const tasks = useSelector(state => state.tasks.items)
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
  })

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks()
        setStats({
          total: data.length,
          completed: data.filter(t => t.completed).length,
          pending: data.filter(t => !t.completed).length,
        })
      } catch (error) {
        console.error('Failed to load tasks:', error)
      }
    }
    loadTasks()
  }, [])

  return (
    <div className={styles.dashboard}>
      <h1 style={{ marginBottom: '20px', color: '#333' }}>Dashboard</h1>
      <div className={styles.stats}>
        <div className={styles.statCard}>
          <h3>Total Tasks</h3>
          <p>{stats.total}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Completed</h3>
          <p>{stats.completed}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Pending</h3>
          <p>{stats.pending}</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
