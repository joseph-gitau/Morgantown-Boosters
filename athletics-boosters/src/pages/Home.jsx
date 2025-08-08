import React from 'react';

export default function Home() {
    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Welcome to Morgantown Boosters Hub</h1>
            <p className="mb-4">Our mission is to support student-athletes at Morgantown High School by raising funds
                for travel, uniforms, and equipment through creative and inclusive fundraising initiatives.</p>
            <h2 className="text-2xl font-semibold mt-6">Vision</h2>
            <p className="mb-4">To become the leading high school booster organization in West Virginia through
                community engagement and innovative fundraising.</p>
            <h2 className="text-2xl font-semibold mt-6">Values</h2>
            <ul className="list-disc ml-6">
                <li>Access to high-quality athletic experiences</li>
                <li>Transparency and accountability</li>
                <li>Community-driven support</li>
                <li>Inclusive participation</li>
            </ul>
        </div>
    );
}