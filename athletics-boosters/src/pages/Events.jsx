import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Target } from 'lucide-react';

export default function Events() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch('https://morgantown-boosters-t3c2.vercel.app/events');
                if (!res.ok) throw new Error('Failed to fetch events');
                const data = await res.json();
                setEvents(data);
            } catch (err) {
                console.error('Error fetching events:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <motion.h1
                className="text-3xl md:text-4xl font-bold mb-6 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                Upcoming Events
            </motion.h1>
            <hr className='mb-2'></hr>

            {loading && <p className="text-center">Loading events...</p>}
            {error && <p className="text-center text-red-500">Error: {error}</p>}
            {events.length === 0 && !loading && <p className="text-center">No events available.</p>}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event, index) => (
                    <motion.div
                        key={event.id}
                        className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        {event.image && (
                            <img
                                src={event.image}
                                alt={event.title}
                                className="w-full h-40 object-cover"
                            />
                        )}
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
                            <p className="text-gray-700 mb-4">{event.description}</p>
                            <div className="flex items-center text-gray-600 text-sm mb-1">
                                <Calendar className="w-4 h-4 mr-2" />
                                {event.date}
                            </div>
                            <div className="flex items-center text-gray-600 text-sm mb-1">
                                <MapPin className="w-4 h-4 mr-2" />
                                {event.location}
                            </div>
                            {event.goal && (
                                <div className="flex items-center text-gray-700 text-sm">
                                    <Target className="w-4 h-4 mr-2" />
                                    Goal: ${event.goal}
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
