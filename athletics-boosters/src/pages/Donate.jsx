import React, { useState } from 'react';
import { motion } from 'framer-motion';
import donateBanner from '../assets/images/donate-banner.jpg';

export default function Donate() {
    const [form, setForm] = useState({ name: '', amount: '', tier: 'Bronze ($25)' });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = 'Name is required';
        if (!form.amount || isNaN(form.amount) || form.amount <= 0)
            newErrors.amount = 'Enter a valid donation amount';
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        fetch('https://morgantown-boosters-t3c2.vercel.app/donate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: form.name,
                amount: parseFloat(form.amount),
                tier: form.tier
            }),
        })
            .then(res => {
                if (!res.ok) throw new Error('Failed to submit donation');
                return res.json();
            })
            .then(() => {
                setSubmitted(true);
                setForm({ name: '', amount: '', tier: 'Bronze ($25)' });
            })
            .catch(() => {
                alert('There was a problem submitting your donation. Please try again.');
            });
    };

    return (
        <div>
            {/* Banner */}
            <div className="relative">
                <img src={donateBanner} alt="Donate Banner" className="w-full h-64 object-cover opacity-90" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                        Support MHS Athletics
                    </h1>
                </div>
            </div>

            <div className="max-w-6xl mx-auto py-8 px-4 grid md:grid-cols-4 gap-6">
                {[
                    { tier: 'Bronze', price: '$25', color: 'bg-yellow-500' },
                    { tier: 'Silver', price: '$100', color: 'bg-gray-400' },
                    { tier: 'Gold', price: '$250', color: 'bg-yellow-300' },
                    { tier: 'Platinum', price: '$500+', color: 'bg-blue-400' }
                ].map((t, i) => (
                    <motion.div
                        key={i}
                        className={`p-4 rounded-lg text-white text-center shadow-lg ${t.color}`}
                        whileHover={{ scale: 1.05 }}
                    >
                        <h3 className="text-xl font-bold">{t.tier}</h3>
                        <p className="text-lg">{t.price}</p>
                    </motion.div>
                ))}
            </div>

            <motion.div
                className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Make a Donation</h2>
                {submitted && (
                    <motion.p
                        className="mb-4 text-green-600 font-semibold text-center"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.4 }}
                    >
                        Thank you for your donation!
                    </motion.p>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={form.name}
                            onChange={handleChange}
                            className={`w-full border p-2 rounded ${errors.name ? 'border-red-500' : ''}`}
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    <div>
                        <input
                            type="number"
                            name="amount"
                            placeholder="Donation Amount"
                            value={form.amount}
                            onChange={handleChange}
                            className={`w-full border p-2 rounded ${errors.amount ? 'border-red-500' : ''}`}
                        />
                        {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
                    </div>

                    <select
                        name="tier"
                        value={form.tier}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    >
                        <option>Bronze ($25)</option>
                        <option>Silver ($100)</option>
                        <option>Gold ($250)</option>
                        <option>Platinum ($500+)</option>
                    </select>

                    <motion.button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded w-full font-semibold"
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.02 }}
                    >
                        Submit Donation
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
}
