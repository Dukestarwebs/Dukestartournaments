"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type AuthContextType = {
  user: any | null;
  loading: boolean;
  profile: any | null;
  signOut: () => Promise<void>;
  loginAs: (role: 'admin' | 'user') => void;
};

const DUMMY_ADMIN = {
  id: "admin-1",
  email: "admin@dukestar.com",
  role: "admin",
  username: "admin",
  nickname: "Admin",
  phone: "256700000000",
};

const DUMMY_USER = {
  id: "user-1",
  email: "user1@test.com",
  role: "user",
  username: "dev_ninja",
  nickname: "Ninja",
  phone: "256701111111",
  total_earnings: 150000,
  tournaments_won: 2,
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  profile: null,
  signOut: async () => {},
  loginAs: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedRole = localStorage.getItem("dummy_role");
    if (storedRole === "admin") {
      setUser({ id: DUMMY_ADMIN.id, email: DUMMY_ADMIN.email });
      setProfile(DUMMY_ADMIN);
    } else if (storedRole === "user") {
      setUser({ id: DUMMY_USER.id, email: DUMMY_USER.email });
      setProfile(DUMMY_USER);
    }
    setLoading(false);
  }, []);

  const loginAs = (role: 'admin' | 'user') => {
    localStorage.setItem("dummy_role", role);
    if (role === "admin") {
      setUser({ id: DUMMY_ADMIN.id, email: DUMMY_ADMIN.email });
      setProfile(DUMMY_ADMIN);
      router.push("/admin");
    } else {
      setUser({ id: DUMMY_USER.id, email: DUMMY_USER.email });
      setProfile(DUMMY_USER);
      router.push("/dashboard");
    }
  };

  const signOut = async () => {
    localStorage.removeItem("dummy_role");
    setUser(null);
    setProfile(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, loading, profile, signOut, loginAs }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
