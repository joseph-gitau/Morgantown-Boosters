import React from 'react';
import { FaHandshake, FaBullhorn, FaTshirt } from 'react-icons/fa';
import sponsorBanner from '../assets/images/sponsors-hero.png';

export default function Sponsors() {
    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="relative mb-8">
                <img
                    src={sponsorBanner}
                    alt="Sponsorship"
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-lg">
                    <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                        Sponsor Our Program
                    </h1>
                </div>
            </div>

            <p className="mb-8 text-lg text-gray-700 text-center max-w-3xl mx-auto">
                Support our mission by becoming a sponsor. Your business will gain visibility while
                helping local student-athletes succeed on and off the field.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center border-t-4 border-yellow-500">
                    <FaHandshake className="text-yellow-500 text-5xl mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Bronze - $250</h3>
                    <p className="text-gray-600">Logo on website + social media shoutout</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg text-center border-t-4 border-gray-400">
                    <FaBullhorn className="text-gray-500 text-5xl mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Silver - $500</h3>
                    <p className="text-gray-600">Above + logo on event banners</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg text-center border-t-4 border-yellow-300">
                    <FaTshirt className="text-yellow-400 text-5xl mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Gold - $1,000</h3>
                    <p className="text-gray-600">
                        All above + booth at events + logo on uniforms
                    </p>
                </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg text-center shadow-md">
                <h2 className="text-2xl font-semibold mb-2">Ready to Become a Sponsor?</h2>
                <p className="mb-4 text-gray-700">
                    Contact us at{' '}
                    <a href="mailto:boosters@mhs.org" className="text-blue-600 font-medium">
                        boosters@mhs.org
                    </a>{' '}
                    to start your sponsorship journey.
                </p>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                    Get Started
                </button>
            </div>
        </div>
    );
}
