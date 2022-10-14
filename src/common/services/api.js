import axios from 'axios';

const BASE_URL = 'http://localhost:4002';
const SERVER_IP = localStorage.getItem('serverIp');

export default axios.create({
	baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
	baseURL: BASE_URL,
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true,
});

export const api = axios.create({
	baseURL: 'http://' + (SERVER_IP ? JSON.parse(SERVER_IP) : 'localhost') + ':4002/api',
});