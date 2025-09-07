import axios from "axios";

const productsApi = axios.create({
    baseURL : "https://62e152f8fa99731d75d44571.mockapi.io/api/v1/test-front-end-skandia"
});

export { productsApi };
