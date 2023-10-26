'use client';

import { AuthContext } from '@/context/AuthContext';
import { useState } from 'react';
import { User } from '@/types/user';


export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
        {children}
        </AuthContext.Provider>
    );
    }