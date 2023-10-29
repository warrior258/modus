import axios from "axios";

const Instance = axios.create({
  baseURL: "https://modus.onrender.com/api/v1/",
});

export default Instance;