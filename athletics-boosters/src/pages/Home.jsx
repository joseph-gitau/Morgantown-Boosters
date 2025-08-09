import React from 'react';
import boosterHero from '../assets/images/booster-hero.jpg';
import missionImg from '../assets/images/mission.jpg';
import visionImg from '../assets/images/vision.jpg';

export default function Home() {
    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="relative bg-blue-900 text-white rounded-lg overflow-hidden mb-8">
                <img
                    src={boosterHero}
                    alt="Morgantown Boosters"
                    className="w-full max-h-64 object-cover opacity-80"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                        Welcome to Morgantown Boosters Hub
                    </h1>
                    <p className="max-w-2xl">
                        Supporting Morgantown High School athletes through community-driven fundraising.
                    </p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
                <img
                    src={missionImg}
                    alt="Mission"
                    className="rounded-lg shadow-md w-full max-h-80 object-cover"
                />
                <div>
                    <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
                    <p>
                        Our mission is to support student-athletes at Morgantown High School by raising funds
                        for travel, uniforms, and equipment through creative and inclusive fundraising initiatives.
                    </p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
                <div>
                    <h2 className="text-2xl font-semibold mb-2">Vision</h2>
                    <p>
                        To become the leading high school booster organization in West Virginia through
                        community engagement and innovative fundraising.
                    </p>
                </div>
                <img
                    src={visionImg}
                    alt="Vision"
                    className="rounded-lg shadow-md w-full max-h-80 object-cover"
                />
            </div>

            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Values</h2>
                <ul className="list-disc ml-6 space-y-2">
                    <li>Access to high-quality athletic experiences</li>
                    <li>Transparency and accountability</li>
                    <li>Community-driven support</li>
                    <li>Inclusive participation</li>
                </ul>
            </div>
        </div>
    );
}
