/* eslint-disable */
import React, { createContext, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { useNavigate  } from 'react-router';

const AuthContext = createContext({
  loginUser: () => alert('Test'),
});

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null);
  const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate ();

  const loginUser = async (e) => {
    e.preventDefault();
    let response = await fetch('http://127.0.0.1:8000/api/token/', {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
    })
    let data = await response.json()

    if(response.status === 200){
        setAuthTokens(data);
        setUser(jwtDecode(data.access));
        localStorage.setItem('authTokens', JSON.stringify(data));
        navigate('/');
    }else{
        alert('Something went wrong!')
    }
  }

  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
    navigate('/login');
  }

  let updateToken = async () => {
    let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({'refresh':authTokens?.refresh})
    })
    let data = await response.json()

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem('authTokens', JSON.stringify(data));
    } else {
      logoutUser();
    }

    if(loading) {
      setLoading(false)
    }

  }

  let contextData = {
    user:user,
    authTokens:authTokens,
    setAuthTokens:setAuthTokens,
    setUser:setUser,
    loginUser:loginUser,
    logoutUser:logoutUser,
  }

  useEffect(() => {
    if(authTokens) {
      setUser(jwtDecode(authTokens.access))
    }
    setLoading(false)

  }, [authTokens, loading])

  return (
      <AuthContext.Provider value={contextData}>
          {loading ? null : children}
      </AuthContext.Provider>
  );
}
