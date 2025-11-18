import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import UserDetail from './pages/UserDetail'
import UserForm from './pages/UserForm'

/**
 * App component: defines routes and navbar
 */
export default function App() {
  return (
    <div className="app">
      <nav className="nav">
        <div className="nav-left">
          <Link to="/" className="brand">UserManager</Link>
        </div>
        <div className="nav-right">
          <Link to="/create" className="btn">Create User</Link>
        </div>
      </nav>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="/create" element={<UserForm />} />
          <Route path="/edit/:id" element={<UserForm />} />
        </Routes>
      </main>

      <footer className="footer">
        <p>copyright @2025</p>
      </footer>
    </div>
  )
}
