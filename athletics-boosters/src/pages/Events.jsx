import React, {useEffect, useState} from 'react';

export default function Events()
{
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() =>
    {
        const fetchEvents = async () =>
        {
            try
            {
                const res = await fetch('https://morgantown-boosters-t3c2.vercel.app/events');
                console.log(res);
                if (!res.ok) throw new Error('Failed to fetch events');
                const data = await res.json();
                setEvents(data);
            }
            catch (err)
            {
                console.error('Error fetching events:', err);
                setError(err.message);
            }
            finally
            {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Upcoming Events</h1>

            {loading && <p>Loading events...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}

            {events.length === 0 && !loading && <p>No events available.</p>}

            {events.map((event) => (
                <div key={event.id} className="border p-4 rounded mb-4">
                    <h2 className="text-xl font-semibold">{event.title}</h2>
                    <p>{event.description}</p>
                    <p className="text-sm text-gray-600">
                        Date: {event.date} | Location: {event.location}
                    </p>
                    {event.goal && (
                        <p className="text-sm text-gray-700">
                            <strong>Fundraising Goal:</strong> ${event.goal}
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
}
