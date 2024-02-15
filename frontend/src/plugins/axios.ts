import axios from "axios";

export default axios.create({
  baseURL: import.meta.env.VUE_APP_API_URL,
});
