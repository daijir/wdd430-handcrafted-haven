"use client";

import { createContext, useContext, ReactNode } from "react";
import { useSession, signOut } from "next-auth/react";

type User = {
    id: string;
    name: string;
    role: string;
    sellerId?: string;
};

type AuthContextType = {
    user: User | null;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const { data: session } = useSession();

    const user: User | null = session?.user ? {
        id: (session.user as any).id || "",
        name: session.user.name || "",
        role: (session.user as any).role || "guest",
        sellerId: (session.user as any).role === 'seller' ? (session.user as any).id : undefined,
    } : null;

    const logout = () => {
        signOut({ callbackUrl: '/login' });
    };

    return (
        <AuthContext.Provider value={{ user, logout }}>
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
