import { createContext, useState, useEffect, useContext } from "react";
import { account } from "../appwriteConfig";
import {useNavigate} from 'react-router-dom';
import { ID } from "appwrite";

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
      const accountDetails = await account.get();
      console.log('ACCOUNT DETAILS', accountDetails);
      setUser(accountDetails);
    }catch(error) {
      console.error(error);
    }
    setLoading(false);
  }

  const handleUserLogin = async (e, credentials) => {
    e.preventDefault();

     try {
      const response = await account.createEmailSession(credentials.email, credentials.password);
      console.log('LOGGED-IN', response);
      const accountDetails = await account.get();
      setUser(accountDetails);

      navigate('/')
     } catch(error) {
        console.error(error);
     }
   };
 
  const handleUserLogout = async () => {
    await account.deleteSession('current');
    setUser(null);
  }

  const handleUserRegister = async (e, credentials) => {
    e.preventDefault();

    if(credentials.password1 !== credentials.password2) {
      alert('Password do not match');
      return;
    }

    try {
      let response = await account.create(ID.unique(), credentials.email, credentials.password1, credentials.name);
      // console.log('REGISTERED', response);

      await account.createEmailSession(credentials.email, credentials.password1)
      const accountDetails = await account.get();
      console.log("ACCOUNT DETAILS", accountDetails);
      setUser(accountDetails);
      navigate('/')
    }catch(error){
      console.error(error)
    }
  }
   
  //This object holds the authentication-related data that will be provided by the context.
  const contextData = {
    user,
    handleUserLogin,
    handleUserLogout,
    handleUserRegister
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <p>loading.....</p> : children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {return useContext(AuthContext)};

export default AuthContext;