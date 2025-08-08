import React from 'react';

export default function Sponsors() {
    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Sponsor Our Program</h1>
            <p className="mb-4">Support our mission by becoming a sponsor. Your business will gain visibility while helping local student-athletes succeed.</p>
            <h2 className="text-2xl font-semibold mb-2">Sponsorship Packages:</h2>
            <ul className="list-disc ml-6 space-y-1">
                <li><strong>$250:</strong> Logo on website + social media shoutout</li>
                <li><strong>$500:</strong> Above + logo on event banners</li>
                <li><strong>$1,000:</strong> All above + booth at events + logo on uniforms</li>
            </ul>
            <p className="mt-4">Contact us at <a href="mailto:boosters@mhs.org" className="text-blue-600">boosters@mhs.org</a> to sponsor.</p>
        </div>
    );
}
