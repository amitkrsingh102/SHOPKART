import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { useState, useEffect, createContext, useContext } from "react";
import { User } from "firebase/auth";

interface AuthContextProps {
  user: User | null;
  loading: boolean;
}
type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthContextFirebase = createContext<AuthContextProps>({
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, loading] = useAuthState(auth);
  const [authContext, authContextSet] = useState<AuthContextProps>({
    user,
    loading,
  } as AuthContextProps);

  useEffect(() => {
    authContextSet({ user, loading } as AuthContextProps);
  }, [user, loading]);

  return (
    <AuthContextFirebase.Provider value={authContext}>
      {children}
    </AuthContextFirebase.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextProps => useContext(AuthContextFirebase);
