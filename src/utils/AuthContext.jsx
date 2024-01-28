import { createContext, useState, useEffect, useContext } from "react";

// context creation
const AuthContext = createContext()

export const AuthProvider = ({children}) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  //This object holds the authentication-related data that will be provided by the context.
  const contextData = {
    user,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <p>loading.....</p> : children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {return useContext(AuthContext)};

export default AuthContext;