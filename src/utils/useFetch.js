import { useContext } from "react"
import jwtDecode from "jwt-decode"
import dayjs from "dayjs"
import AuthContext from "../context/AuthContext"

const useFetch = () => {
    let config = {}
    let { authTokens, setAuthTokens, setUser } = useContext(AuthContext)

    const baseURL = "http://127.0.0.1:8000"

    const originalRequest = async (url, config) => {
        let data = {}
        let apiurl = `${baseURL}${url}`
        const response = await fetch(apiurl, config)
        try {
            data = await response.json()
        } catch (error) {
            console.log(error)
        }
        return { response, data }
    }

    const refreshToken = async (authTokens) => {
        const response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ refresh: authTokens.refresh })
        })
        const data = await response.json()

        if (response.status === 200) {
            localStorage.setItem("authTokens", JSON.stringify(data))
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
        }
        return data
    }

    const callFetch = async (url, method = "GET", body = null) => {
        const user = jwtDecode(authTokens.access)
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1

        if (isExpired) {
            authTokens = await refreshToken(authTokens)
        }

        config = {
            method
        }

        if (body) {
            config.headers = {
                Authorization: `Bearer ${authTokens?.access}`,
                "Content-Type": "application/json"
            }
            config = {
                ...config,
                body
            }
        } else {
            config.headers = {
                Authorization: `Bearer ${authTokens?.access}`
            }
        }

        const { response, data } = await originalRequest(url, config)
        return { response, data }
    }

    return callFetch
}

export default useFetch
