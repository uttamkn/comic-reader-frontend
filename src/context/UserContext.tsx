import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { parseToken } from "../api/utils";

const UserContext = createContext<any>({});

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tokenString = localStorage.getItem("user");
    let token = parseToken(tokenString || "");
    if (!user) {
      axios
        .get("/user", {
          headers: {
            Authorization: `Bearer ${token?.access_token}`,
          },
        })
        .then(({ data }: { data: any }) => {
          setUser(data);
        })
        .catch(() => setUser(null))
        .finally(() => setLoading(false));
    }
  }, []);

  const updateUser = (userData: any) => {
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, loading, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook to use the user context (user, updateUser and loading state)
export const useAuth = () => useContext(UserContext);
