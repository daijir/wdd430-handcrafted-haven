"use client";

import Link from "next/link";
import { useAuth } from "@/app/_context/auth-context";
import { useEffect, useState } from "react";
import { getSellers } from "@/lib/data";
import { Seller } from "@/lib/definitions";

export function Header() {
    const { user, loginAsSeller, loginAsBuyer, logout } = useAuth();
    const [sellers, setSellers] = useState<Seller[]>([]);

    useEffect(() => {
        getSellers().then(setSellers);
    }, []);

    return (
        <header className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <div className="flex items-center">
                    <Link href="/" className="text-xl font-bold text-gray-900">
                        Handcrafted Haven
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-600">
                        Current User: <span className="font-semibold">{user.name}</span>
                    </div>

                    <select
                        className="text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={user.role === 'seller' ? user.sellerId : user.role}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (value === "guest") logout();
                            else if (value === "buyer") loginAsBuyer();
                            else loginAsSeller(value);
                        }}
                    >
                        <option value="guest">Guest</option>
                        <option value="buyer">Buyer</option>
                        <optgroup label="Sellers">
                            {sellers.map((seller) => (
                                <option key={seller.id} value={seller.id}>
                                    {seller.name}
                                </option>
                            ))}
                        </optgroup>
                    </select>
                </div>
            </div>
        </header>
    );
}
