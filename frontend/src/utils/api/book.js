import axios from "axios";
import Cookies from "universal-cookie";

// link api
const cookies = new Cookies(null, { path: "/" });
const apiLink = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/books`,
});

apiLink.interceptors.request.use(
    (config) => {
        const token = cookies.get("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiLink.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // check if the error is 401 (unauthorized) then remove the token from the cookies
        if (error.response.status === 401) {
            cookies.remove("token");
            window.location = "/login";
        }
        return Promise.reject(error);
    }
);

export const listAllBooks = async () => {
    return await apiLink.get("/");
};

export const addBooks = async (data) => {
    return await apiLink.post("/", data);
};
export const getBooks = async (id) => {
    return await apiLink.get(`/${id}`);
};
export const editBooks = async (id, data) => {
    return await apiLink.put(`/${id}`, data);
};

export const deleteBooks = async (id) => {
    return await apiLink.delete(`/${id}`);
};