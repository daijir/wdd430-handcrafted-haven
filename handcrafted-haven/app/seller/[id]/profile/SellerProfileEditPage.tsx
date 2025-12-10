"use client";

import { useEffect, useState } from "react";
import { getSellerById } from "@/lib/data";
import { updateSellerProfile } from "@/lib/actions";

export default function SellerProfileEditPage() {
    const [seller, setSeller] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState("");

    // Example path: /seller/123/profile → index 2 = sellerId
    const id = typeof window !== "undefined"
        ? window.location.pathname.split("/")[2]
        : "";

    useEffect(() => {
        if (!id) return;

        getSellerById(id).then((s) => {
            setSeller(s);
            setLoading(false);
        });
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!seller) return <p>Seller not found.</p>;

    return (
        <main className="max-w-2xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
                Edit Profile
            </h1>

            {/* IMPORTANT: This directly calls the server action */}
            <form
                action={async (formData) => {
                    const res = await updateSellerProfile(formData);
                    if (res.success) {
                        setStatus("Profile updated successfully!");
                    } else {
                        setStatus(res.message || "Failed to update profile.");
                    }
                }}
                className="space-y-6"
            >
                {/* Hidden Seller ID */}
                <input type="hidden" name="id" value={seller.id} />

                {/* Display Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Display Name
                    </label>
                    <input
                        name="name"
                        defaultValue={seller.name}
                        className="mt-1 block w-full rounded-md border px-3 py-2"
                        required
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        name="email"
                        type="email"
                        defaultValue={seller.email}
                        className="mt-1 block w-full rounded-md border px-3 py-2"
                        required
                    />
                </div>

                {/* Bio */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Bio
                    </label>
                    <textarea
                        name="bio"
                        defaultValue={seller.bio}
                        rows={4}
                        className="mt-1 block w-full rounded-md border px-3 py-2"
                    ></textarea>
                </div>

                {/* Profile Image URL */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Profile Image URL
                    </label>
                    <input
                        name="profileImageUrl"
                        defaultValue={seller.profileImageUrl || ""}
                        className="mt-1 block w-full rounded-md border px-3 py-2"
                    />
                </div>

                {/* Save Button */}
                <button
                    type="submit"
                    className="px-4 py-2 rounded-md bg-[var(--color-sage)] text-[var(--color-dark-brown)] font-semibold hover:bg-[var(--color-light-sage)] transition"
                >
                    Save Profile
                </button>
            </form>

            {/* Status Message */}
            {status && (
                <p className="text-sm mt-3 text-green-700 font-medium">
                    {status}
                </p>
            )}
        </main>
    );
}
