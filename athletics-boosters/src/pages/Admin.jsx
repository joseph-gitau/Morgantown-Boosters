import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

export default function Admin()
{
    const [events, setEvents] = useState([]);
    const [donations, setDonations] = useState([]);
    const [eventForm, setEventForm] = useState({
        title: '',
        date: '',
        location: '',
        description: '',
        goal: ''
    });
    const [editingId, setEditingId] = useState(null);
    const [auth, setAuth] = useState(false);
    const navigate = useNavigate();

    useEffect(() =>
    {
        fetch('https://morgantown-boosters-t3c2.vercel.app/api/auth')
            .then((res) => res.json())
            .then((data) =>
            {
                if (!data.authenticated) navigate('/login');
                else setAuth(true);
            });
    }, [navigate]);

    const logout = async () =>
    {
        await fetch('https://morgantown-boosters-t3c2.vercel.app/api/logout', {method: 'POST'});
        navigate('/login');
    };

    useEffect(() =>
    {
        fetchEvents();
        fetchDonations();
    }, []);

    const fetchEvents = async () =>
    {
        const res = await fetch('https://morgantown-boosters-t3c2.vercel.app/events');
        const data = await res.json();
        setEvents(data);
    };

    const fetchDonations = async () =>
    {
        const res = await fetch('https://morgantown-boosters-t3c2.vercel.app/donations');
        const data = await res.json();
        setDonations(data);
    };

    const handleInputChange = (e) =>
    {
        const {name, value} = e.target;
        setEventForm(prev => ({...prev, [name]: value}));
    };

    const handleEventSubmit = async (e) =>
    {
        e.preventDefault();

        const method = editingId ? 'PUT' : 'POST';
        const url = editingId
            ? `https://morgantown-boosters-t3c2.vercel.app/events/${editingId}`
            : 'https://morgantown-boosters-t3c2.vercel.app/events';

        const res = await fetch(url, {
            method,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(eventForm)
        });

        if (res.ok)
        {
            setEventForm({title: '', date: '', location: '', description: '', goal: ''});
            setEditingId(null);
            fetchEvents();
        }
        else
        {
            alert('Failed to save event');
        }
    };

    const handleEdit = (event) =>
    {
        setEventForm({
            title: event.title,
            date: event.date,
            location: event.location,
            description: event.description,
            goal: event.goal || ''
        });
        setEditingId(event.id);
    };

    const handleDelete = async (id) =>
    {
        const confirmed = confirm('Delete this event?');
        if (!confirmed) return;

        const res = await fetch(`https://morgantown-boosters-t3c2.vercel.app/events/${id}`, {
            method: 'DELETE'
        });

        if (res.ok)
        {
            fetchEvents();
        }
        else
        {
            alert('Failed to delete');
        }
    };

    if (!auth) return null;

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
                <button onClick={logout} className="bg-red-600 text-white px-3 py-1 rounded">Logout</button>
            </div>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">
                    {editingId ? 'Edit Event' : 'Create New Event'}
                </h2>
                <form onSubmit={handleEventSubmit}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded shadow">
                    <input
                        type="text"
                        name="title"
                        placeholder="Event Title"
                        value={eventForm.title}
                        onChange={handleInputChange}
                        required
                        className="border p-2 rounded"
                    />
                    <input
                        type="date"
                        name="date"
                        value={eventForm.date}
                        onChange={handleInputChange}
                        required
                        className="border p-2 rounded"
                    />
                    <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={eventForm.location}
                        onChange={handleInputChange}
                        className="border p-2 rounded"
                    />
                    <input
                        type="number"
                        name="goal"
                        placeholder="Fundraising Goal (optional)"
                        value={eventForm.goal}
                        onChange={handleInputChange}
                        className="border p-2 rounded"
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={eventForm.description}
                        onChange={handleInputChange}
                        className="border p-2 rounded md:col-span-2"
                        rows="3"
                    />
                    <div className="md:col-span-2 flex gap-4">
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                            {editingId ? 'Update Event' : 'Add Event'}
                        </button>
                        {editingId && (
                            <button
                                type="button"
                                onClick={() =>
                                {
                                    setEventForm({title: '', date: '', location: '', description: '', goal: ''});
                                    setEditingId(null);
                                }}
                                className="text-gray-700 underline"
                            >
                                Cancel Edit
                            </button>
                        )}
                    </div>
                </form>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">Existing Events</h2>
                {events.length > 0 ? (
                    <ul className="space-y-2">
                        {events.map((event) => (
                            <li key={event.id} className="p-4 border rounded bg-gray-100">
                                <h3 className="text-xl font-bold">{event.title}</h3>
                                <p><strong>Date:</strong> {event.date}</p>
                                <p><strong>Location:</strong> {event.location}</p>
                                {event.goal && <p><strong>Goal:</strong> ${event.goal}</p>}
                                <p>{event.description}</p>
                                <div className="mt-2 space-x-2">
                                    <button onClick={() => handleEdit(event)} className="text-blue-600 underline">Edit
                                    </button>
                                    <button onClick={() => handleDelete(event.id)}
                                            className="text-red-600 underline">Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No events yet.</p>
                )}
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-2">Donations</h2>
                {donations.length > 0 ? (
                    <table className="w-full table-auto border-collapse">
                        <thead>
                        <tr className="bg-gray-200">
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Amount</th>
                            <th className="border px-4 py-2">Tier</th>
                        </tr>
                        </thead>
                        <tbody>
                        {donations.map((donation) => (
                            <tr key={donation.id}>
                                <td className="border px-4 py-2">{donation.name}</td>
                                <td className="border px-4 py-2">${donation.amount}</td>
                                <td className="border px-4 py-2">{donation.tier}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No donations found.</p>
                )}
            </section>
        </div>
    );
}
