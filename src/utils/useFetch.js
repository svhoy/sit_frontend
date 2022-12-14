import { useContext } from "react";
import jwtDecode from "jwt-decode";
import dayjs from 'dayjs';
import AuthContext from '../context/AuthContext';

const useFetch = () => {
    let config = {}
    let {authTokens, setAuthTokens, setUser} = useContext(AuthContext)

    let baseURL = 'http://127.0.0.1:5500'

    let originalRequest = async (url, config) => { 
        let data = {}
        url = `${baseURL}${url}`
        let response = await fetch(url, config)
        try {
            data = await response.json()
        } catch (error) {
        }
        return {response, data}
    }

    let refreshToken = async (authTokens) => {
        let response = await fetch('http://127.0.0.1:5500/api/token/refresh/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh': authTokens.refresh})
        })
        let data = await response.json()
    
        if(response.status === 200) {
            localStorage.setItem('authTokens', JSON.stringify(data))
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
        }
        return data
    }

    let callFetch = async (url, method = 'GET', body = null) => {
        const user = jwtDecode(authTokens.access)
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

        if (isExpired) { 
            authTokens = await refreshToken(authTokens)
        }

        config= {
            method: method,
        }

        if (body) {
            config['headers'] = {
                'Authorization':`Bearer ${authTokens?.access}`,
                'Content-Type':'application/json',
            }
            config = {
                ...config,
                body: body,
            }
        } else { 
            config['headers'] = {
                Authorization:`Bearer ${authTokens?.access}`
            }
        }

        let {response, data} = await originalRequest(url, config)
        return {response, data}
    }

    return callFetch
}

export default useFetch;