
import { Link, NavLink, Outlet } from 'react-router-dom'

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <Link to="/" className="brand">Social Media Dashboard</Link>
        <nav className="nav">
          <NavLink to="/users" className={({isActive}) => isActive ? 'active' : ''}>Users</NavLink>
        </nav>
      </header>
      <main className="content">
        <Outlet />
      </main>
      <footer className="footer">
        JSONPlaceholder SPA • Built with React + Vite + TS
      </footer>
    </div>
  )
}
