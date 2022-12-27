import axios from "axios";
import { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "../useLocalStorage";

const UserContext = createContext();

const getUser = () => {};

export function UserProvider({ children }) {
    const [token, setToken] = useLocalStorage('token', null);
    const [user, setUser] = useLocalStorage('user', null);


    const Login = async () => {
        await axios
            .post("http://127.0.0.1:8000/auth/token/login/", {
                username,
                password,
            })
            .then((response) => {
                if (response.status === 200) {
                    setToken(
                        JSON.stringify(response.data.auth_token)
                    );
                    router.push("/");
                }
            })
            .catch((error) => {});
    };

    const Logout = async () => {
        await axios.post("http://127.0.0.1:8000/auth/token/logout/", token, {
            headers: {
                Authorization: "Token " + token,
            },
        })
        .then((response) => {
            if(response.status === 204) {
                localStorage.removeItem('token')
                router.push("/");
            }
        })
        .catch((error) => {
            router.push("/");
        })
    }

    useEffect(() => {
        const token =
            typeof window !== "undefined"
                ? JSON.parse(localStorage.getItem("token"))
                : null;

        const user = axios
            .get("http://127.0.0.1:8000/api/user/", {
                headers: {
                    Authorization: "Token " + token,
                },
            })
            .then((response) => {
                if (response.status === 200) setUser(response.data);
                else setUser(null);
                setLoading(false);
            })
            .catch((error) => {
                setUser(null);
                setLoading(false);
            });
    }, [token]);

    return (
        <UserContext.Provider value={{ user, loading }}>{children}</UserContext.Provider>
    );
}

export function useUserContext() {
    return useContext(UserContext);
}
