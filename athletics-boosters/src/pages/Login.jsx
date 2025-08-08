import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

export default function Login()
{
    const [form, setForm] = useState({username: '', password: ''});
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        const res = await fetch('https://morgantown-boosters-t3c2.vercel.app/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(form),
        });
        const data = await res.json();
        if (data.success)
        {
            navigate('/admin');
        }
        else
        {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    className="border p-2 w-full"
                    placeholder="Username"
                    value={form.username}
                    onChange={(e) => setForm({...form, username: e.target.value})}
                />
                <input
                    className="border p-2 w-full"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) => setForm({...form, password: e.target.value})}
                />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    Login
                </button>
            </form>
        </div>
    );
}
