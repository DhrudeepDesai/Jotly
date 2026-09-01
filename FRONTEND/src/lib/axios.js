// baar baar http://localhost:5001/api/notes/.... itna na likhna pade
import axios from "axios";

// production mai locak host nhi hoga so change accordingly
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";

const api = axios.create({
    baseURL: BASE_URL,
});

export default api;

/*

instead of axios.get("http://localhost:5001/api/notes")

we will import api and write -> api.get("/notes");

*/