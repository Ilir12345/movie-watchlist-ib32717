import { useState } from 'react'
import { movies as initialMovies } from '../utils/movies'

const GENRES = ['Action', 'Animation', 'Comedy', 'Crime', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Thriller', 'Other']

export default function MoviesPage() {
    const [movieList, setMovieList] = useState(initialMovies)
    const [form, setForm] = useState({ title: '', director: '', genre: 'Action', watched: false })
    const [errors, setErrors] = useState({})
    const [showForm, setShowForm] = useState(false)

    function handleChange(e) {
        const { name, value, type, checked } = e.target
        setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
    }

    function handleAdd() {
        const newErrors = {}
        if (!form.title.trim()) newErrors.title = 'Title is required.'
        if (!form.director.trim()) newErrors.director = 'Director is required.'
        if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return }

        setMovieList(prev => [...prev, { id: Date.now(), ...form, title: form.title.trim(), director: form.director.trim() }])
        setForm({ title: '', director: '', genre: 'Action', watched: false })
        setErrors({})
        setShowForm(false)
    }

    function toggleWatched(id) {
        setMovieList(prev => prev.map(m => m.id === id ? { ...m, watched: !m.watched } : m))
    }

    function deleteMovie(id) {
        setMovieList(prev => prev.filter(m => m.id !== id))
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">My Watchlist</h1>
                    <p className="text-gray-500 text-sm mt-1">{movieList.length} movies · {movieList.filter(m => m.watched).length} watched</p>
                </div>
                <button onClick={() => setShowForm(v => !v)}
                        className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 px-4 py-2 rounded-lg font-semibold text-sm">
                    {showForm ? 'Cancel' : '+ Add Movie'}
                </button>
            </div>

            {showForm && (
                <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Add New Movie</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                            <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. The Dark Knight"
                                   className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 ${errors.title ? 'border-red-400' : 'border-gray-300'}`} />
                            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Director *</label>
                            <input name="director" value={form.director} onChange={handleChange} placeholder="e.g. Christopher Nolan"
                                   className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 ${errors.director ? 'border-red-400' : 'border-gray-300'}`} />
                            {errors.director && <p className="text-red-500 text-xs mt-1">{errors.director}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
                            <select name="genre" value={form.genre} onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400">
                                {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
                            </select>
                        </div>
                        <div className="flex items-center gap-3 pt-6">
                            <input type="checkbox" name="watched" id="watched" checked={form.watched} onChange={handleChange} className="w-4 h-4 accent-yellow-400" />
                            <label htmlFor="watched" className="text-sm text-gray-700 cursor-pointer">Already watched</label>
                        </div>
                    </div>
                    <button onClick={handleAdd}
                            className="mt-5 bg-yellow-400 hover:bg-yellow-300 text-gray-900 px-6 py-2 rounded-lg font-semibold text-sm">
                        Add Movie
                    </button>
                </div>
            )}

            <div className="space-y-3">
                {movieList.map(movie => (
                    <div key={movie.id} className={`bg-white border rounded-xl px-5 py-4 shadow-sm flex items-center justify-between ${movie.watched ? 'opacity-60' : ''}`}>
                        <div className="flex items-center gap-4">
                            <button onClick={() => toggleWatched(movie.id)}
                                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${movie.watched ? 'bg-yellow-400 border-yellow-400 text-white' : 'border-gray-300 hover:border-yellow-400'}`}>
                                {movie.watched && (
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </button>
                            <div>
                                <p className={`font-semibold text-gray-800 ${movie.watched ? 'line-through text-gray-400' : ''}`}>{movie.title}</p>
                                <p className="text-sm text-gray-500">{movie.director}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">{movie.genre}</span>
                            <span className={`text-xs font-medium ${movie.watched ? 'text-green-600' : 'text-gray-400'}`}>
                {movie.watched ? 'Watched' : 'Unwatched'}
              </span>
                            <button onClick={() => deleteMovie(movie.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}