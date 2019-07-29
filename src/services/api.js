import axios from 'axios';

const api = axios.create({
	baseURL: 'https://mileage-backend.herokuapp.com'
});

export default api;
