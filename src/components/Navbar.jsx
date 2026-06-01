import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    function handleLogout() {
        logout()
        navigate('/')
    }

    return (
        <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
            <Link to="/" className="text-xl font-bold text-yellow-400">🎬 Movie Watchlist</Link>

            <div className="flex items-center gap-6">
                <Link to="/movies" className="hover:text-yellow-400">Movies</Link>

                {user ? (
                    <div className="flex items-center gap-4">
            <span className="text-gray-300 text-sm">
              Welcome, <span className="text-yellow-400 font-semibold">{user.name}</span>
            </span>
                        <button onClick={handleLogout}
                                className="bg-red-600 hover:bg-red-500 px-4 py-1.5 rounded text-sm font-medium">
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link to="/login"
                          className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 px-4 py-1.5 rounded text-sm font-semibold">
                        Login
                    </Link>
                )}
            </div>
        </nav>
    )
}