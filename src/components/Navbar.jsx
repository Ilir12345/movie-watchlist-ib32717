import { Link } from 'react-router-dom'

// TODO: import and use AuthContext here to show conditional links

function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
      <Link to="/" className="font-bold text-lg">Movie Watchlist</Link>
      <div className="flex gap-4 text-sm">
        {/* TODO: if no user is logged in, show a Login link */}
        {/* TODO: if a user is logged in, show a Welcome message and a Logout button */}
        <Link to="/login" className="hover:underline">Login</Link>
      </div>
    </nav>
  )
}

export default Navbar
