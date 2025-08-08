import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="bg-blue-800 text-white px-4 py-3 shadow">
            <div className="flex items-center justify-between max-w-6xl mx-auto">
                <Link to="/" className="text-xl font-bold">Morgantown Boosters</Link>
                <div className="space-x-4">
                    <Link to="/donate" className="hover:underline">Donate</Link>
                    <Link to="/events" className="hover:underline">Events</Link>
                    <Link to="/sponsors" className="hover:underline">Sponsors</Link>
                    <Link to="/admin" className="hover:underline">Admin</Link>
                </div>
            </div>
        </nav>
    );
}