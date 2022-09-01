import axios from "axios";
const setAxiosHeaders = (access_token: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  axios.defaults.headers.common["Content-Type"] = "application/json";
};

export default setAxiosHeaders;
