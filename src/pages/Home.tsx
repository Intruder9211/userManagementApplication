import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User } from '../types'
import { fetchUsers, deleteUser } from '../api'
import Spinner from '../components/Spinner'

/**
 * Home page: displays table of users and supports delete
 */
export default function Home() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        setLoading(true)
        const data = await fetchUsers()
        if (mounted) setUsers(data)
      } catch (err: any) {
        setError(err.message || 'Failed to fetch users')
      } finally {
        setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  async function handleDelete(id?: number) {
    if (!id) return
    if (!confirm('Are you sure you want to delete this user? (This is a simulated delete)')) return
    try {
      await deleteUser(id)
      // simulate deletion locally
      setUsers(prev => prev.filter(u => u.id !== id))
      alert('User deleted (simulated).')
    } catch (err: any) {
      alert('Delete failed: ' + (err.message || err))
    }
  }

  if (loading) return <Spinner />

  return (
    <div>
      <h1>Users</h1>
      {error && <div className="error">{error}</div>}
      <div className="table-wrap">
        <table className="users-table">
          <thead>
            <tr><th>Name</th><th>Email</th><th>Phone</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td><Link to={`/users/${u.id}`}>{u.name}</Link></td>
                <td>{u.email}</td>
                <td>{u.phone}</td>
                <td className="actions">
                  <button onClick={() => navigate(`/edit/${u.id}`)} className="btn small">Edit</button>
                  <button onClick={() => handleDelete(u.id)} className="btn small danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
