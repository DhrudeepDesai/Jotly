// baar baar http://localhost:5001/api/notes/.... itna na likhna pade
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5001/api"
});

export default api;

/*

instead of axios.get("http://localhost:5001/api/notes")

we will import api and write -> api.get("/notes");

*/