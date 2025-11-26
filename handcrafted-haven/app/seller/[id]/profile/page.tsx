"use client";

import { useState } from "react";

const CURRENT_SELLER_ID = "seller-1"; // TODO: replace with real auth later

export default function SellerProfileEditPage() {
    // Temporary hardcoded initial values to match seller-1
    const [displayName, setDisplayName] = useState("Alice's Atelier");
    const [email, setEmail] = useState("alice@example.com");
    const [bio, setBio] = useState(
        "I create cozy, handwoven textiles and ceramics inspired by nature and slow living."
    );
    const [profileImageUrl, setProfileImageUrl] = useState(
        "https://via.placeholder.com/300x300.png?text=Alice"
    );
    const [status, setStatus] = useState<string | null>(null);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Later: call a real API route or server action.
        console.log("Saving profile for:", CURRENT_SELLER_ID, {
            displayName,
            email,
            bio,
            profileImageUrl,
        });
        setStatus("Profile saved (mock). This will be wired to the backend later.");
    };

    return (
        <main className="max-w-2xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
                Edit Seller Profile
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label
                        htmlFor="displayName"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Display Name
                    </label>
                    <input
                        id="displayName"
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>

                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Contact Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>

                <div>
                    <label
                        htmlFor="bio"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Bio / Story
                    </label>
                    <textarea
                        id="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        rows={4}
                    />
                </div>

                <div>
                    <label
                        htmlFor="profileImageUrl"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Profile Image URL
                    </label>
                    <input
                        id="profileImageUrl"
                        type="url"
                        value={profileImageUrl}
                        onChange={(e) => setProfileImageUrl(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {profileImageUrl && (
                        <div className="mt-3 w-24 h-24 rounded-full overflow-hidden bg-gray-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={profileImageUrl}
                                alt="Profile preview"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Save Profile
                </button>

                {status && (
                    <p className="mt-2 text-sm text-green-600" aria-live="polite">
                        {status}
                    </p>
                )}
            </form>
        </main>
    );
}
