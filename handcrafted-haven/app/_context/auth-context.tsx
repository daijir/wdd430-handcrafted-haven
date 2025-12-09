"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Seller } from "@/lib/definitions";

type UserRole = "guest" | "buyer" | "seller";

type User = {
    id: string; // "guest" or specific ID
    name: string;
    role: UserRole;
    sellerId?: string; // If role is seller, which seller are they?
};

type AuthContextType = {
    user: User;
    loginAsSeller: (sellerId: string) => void;
    loginAsBuyer: () => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User>({
        id: "guest",
        name: "Guest",
        role: "guest",
    });

    const loginAsSeller = (sellerId: string) => {
        setUser({
            id: sellerId, // effectively the user ID is the seller ID for simplicity
            name: "Seller (" + sellerId + ")",
            role: "seller",
            sellerId: sellerId,
        });
    };

    const loginAsBuyer = () => {
        setUser({
            id: "buyer-1",
            name: "Buyer User",
            role: "buyer",
        });
    };

    const logout = () => {
        setUser({
            id: "guest",
            name: "Guest",
            role: "guest",
        });
    };

    return (
        <AuthContext.Provider value={{ user, loginAsSeller, loginAsBuyer, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
