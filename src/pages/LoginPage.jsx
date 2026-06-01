import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
    const { login } = useAuth()
    const navigate = useNavigate()

    function handleLogin() {
        login()
        navigate('/movies')
    }

    return (
        <div className="flex items-center justify-center min-h-[80vh] px-4">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Sign In</h2>

                <div className="space-y-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" defaultValue="student@uni.edu" readOnly
                               className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-50" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input type="password" defaultValue="password" readOnly
                               className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-50" />
                    </div>
                </div>

                <button onClick={handleLogin}
                        className="w-full bg-yellow-400 hover:bg-yellow-300 text-gray-900 py-2.5 rounded-lg font-semibold">
                    Sign In
                </button>
            </div>
        </div>
    )
}