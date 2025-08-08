import React, {useState} from 'react';
import {motion} from 'framer-motion';

export default function Donate()
{
    const [form, setForm] = useState({name: '', amount: '', tier: 'Bronze'});
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const validate = () =>
    {
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = 'Name is required';
        if (!form.amount || isNaN(form.amount) || form.amount <= 0) newErrors.amount = 'Enter a valid donation amount';
        return newErrors;
    };

    const handleChange = (e) =>
    {
        const {name, value} = e.target;
        setForm({...form, [name]: value});
        setErrors({...errors, [name]: ''});
    };

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0)
        {
            setErrors(validationErrors);
            return;
        }
        fetch('https://morgantown-boosters-t3c2.vercel.app/donate', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: form.name,
                amount: parseFloat(form.amount),
                tier: form.tier
            }),
        })
            .then(res =>
            {
                if (!res.ok) throw new Error('Failed to submit donation');
                return res.json();
            })
            .then(data =>
            {
                console.log('Donation submitted:', data);
                setSubmitted(true);
                setForm({name: '', amount: '', tier: 'Bronze'}); // Reset form
            })
            .catch(err =>
            {
                console.error('Error:', err);
                alert('There was a problem submitting your donation. Please try again.');
            });

        // Reset form
        setForm({name: '', amount: '', tier: 'Bronze'});
    };

    return (
        <motion.div
            className="p-6 max-w-xl mx-auto"
            initial={{opacity: 0, y: 50}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
        >
            <h1 className="text-3xl font-bold mb-6">Donate to MHS Athletics</h1>
            {submitted && (
                <motion.p
                    className="mb-4 text-green-600 font-semibold"
                    initial={{scale: 0.8, opacity: 0}}
                    animate={{scale: 1, opacity: 1}}
                    transition={{duration: 0.4}}
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
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                    whileTap={{scale: 0.95}}
                    whileHover={{scale: 1.02}}
                >
                    Submit Donation
                </motion.button>
            </form>
        </motion.div>
    );
}
