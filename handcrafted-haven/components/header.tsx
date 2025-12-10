"use client";

import Link from "next/link";
import { useAuth } from "@/app/_context/auth-context";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";

export function Header() {
    const { user, logout } = useAuth();

    return (
        <header className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

                {/* Logo - Always goes to /products */}
                <div className="flex items-center">
                    <Link href="/products" className="text-xl font-bold text-gray-900">
                        Handcrafted Haven
                    </Link>
                </div>

                {/* Right side */}
                {user ? (
                    <div className="flex items-center gap-4">

                        {/* Products Button */}
                        <Link
                            href="/products"
                            className="px-4 py-2 rounded-md bg-[var(--color-sage)] text-[var(--color-dark-brown)] font-semibold hover:bg-[var(--color-light-sage)] transition"
                        >
                            Products
                        </Link>

                        {/* My Profile Button */}
                        <Link
                            href={`/seller/${user.id}`}
                            className="px-4 py-2 rounded-md bg-[var(--color-sage)] text-[var(--color-dark-brown)] font-semibold hover:bg-[var(--color-light-sage)] transition"
                        >
                            My Profile
                        </Link>

                        {/* Logged in text */}
                        <div className="text-sm text-gray-600">
                            Logged in as:{" "}
                            <span className="font-semibold">{user.name}</span>
                        </div>

                        {/* Logout button */}
                        <button
                            onClick={logout}
                            className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                            title="Log out"
                        >
                            <ArrowRightStartOnRectangleIcon className="w-5 h-5" />
                        </button>
                    </div>
                ) : (
                    // Logged-out view
                    <Link
                        href="/login"
                        className="px-4 py-2 rounded-md bg-[var(--color-sage)] text-[var(--color-dark-brown)] font-semibold hover:bg-[var(--color-light-sage)] transition"
                    >
                        Login
                    </Link>
                )}
            </div>
        </header>
    );
}
