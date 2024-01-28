import { createContext, useState, useEffect, useContext } from "react";
import { account } from "../appwriteConfig";
import {useNavigate} from 'react-router-dom';

// context creation
const AuthContext = createContext()

export const AuthProvider = ({children}) => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserOnLoad()
  }, []);

  const getUserOnLoad = async () => {
    try {
      const accountDetails = account.get();
      setUser(accountDetails);
    }catch(error) {
      console.error(error);
    }
    setLoading(false)
  }

  const handleUserLogin = async (e, credentials) => {
    e.preventDefault();

     try {
      const response = await account.createEmailSession(credentials.email, credentials.password);
      console.log('LOGGED-IN', response);
      const accountDetails = account.get();
      setUser(accountDetails);

      navigate('/')
     } catch(error) {
        console.error(error);
     }
   };

  //This object holds the authentication-related data that will be provided by the context.
  const contextData = {
    user,
    handleUserLogin,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <p>loading.....</p> : children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {return useContext(AuthContext)};

export default AuthContext;