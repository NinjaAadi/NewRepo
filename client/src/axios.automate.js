import axios from "axios";

const instance = axios.create({
  // .. where we make our configurations
      //baseURL: 'https://echikitsa.ecpl-global.com/'
      baseURL: 'http://localhost:8000/'
  });
  export default instance;
  