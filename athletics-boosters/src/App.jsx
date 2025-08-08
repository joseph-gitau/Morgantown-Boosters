import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Donate from './pages/Donate';
import Events from './pages/Events';
import Sponsors from './pages/Sponsors';
import Admin from './pages/Admin';
import Login from "./pages/Login.jsx";

export default function App()
{
    return (
        <div className="font-sans bg-gray-50 min-h-screen">
            <Navbar/>
            <div className="p-4">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/donate" element={<Donate/>}/>
                    <Route path="/events" element={<Events/>}/>
                    <Route path="/sponsors" element={<Sponsors/>}/>
                    <Route path="/admin" element={<Admin/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </div>
        </div>
    );
}
