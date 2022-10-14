import create from 'zustand';
import { devtools } from 'zustand/middleware';
// import axios from 'axios';
import apiService from '../common/services/api';

let storePeople = (set, get) => ({
	employees: ['TODOS'],
	getEmployees: (props) => {
		return new Promise(async (resolve, reject) => {
			try {
				await apiService
					.get(`/people?tipo=3&searchString=${props.searchString}&pageNumber=${props.page || 0}&pageSize=${props.pageSize || 10}`)
					.then((result) => {
						let employeesData = []; // [{ label: 'SELECIONAR...', value: 'SELECIONAR...' }];
						if (result) {
							result.data.forEach((p) => {
								employeesData.push({ label: p.nome, value: p.codigo, total: p.totalRows });
							});
							set({ employees: employeesData.sort((a, b) => (a.label > b.label ? 1 : -1)) });
							resolve(employeesData);
						} else {
							reject('Error getting employees: ', result.data.message);
						}
					})
					.catch((err) => console.log('Error getting employees: ', err));
			} catch (error) {
				reject('Error getting employees: ', error);
			}
		});
	},

	clients: ['TODOS'],
	getClients: (props) => {
		return new Promise(async (resolve, reject) => {
			try {
				await apiService
					.get(`/people?tipo=1&searchString=${props.searchString}&pageNumber=${props.page || 0}&pageSize=${props.pageSize || 10}`)
					.then((result) => {
						let clientsData = [{ label: 'SELECIONAR...', value: 'SELECIONAR...' }];
						if (result) {
							result.data.forEach((p) => {
								clientsData.push({ label: p.nome, value: p.codigo, total: p.totalRows });
							});
							set({ clients: clientsData });
							resolve(clientsData);
						} else {
							reject('Error getting clientes: ', result.data.message);
						}
					})
					.catch((err) => console.log('Error getting clients: ', err));
			} catch (error) {
				reject('Error getting clients: ', error);
			}
		});
	},

	users: ['TODOS'],
	getSystemUsers: (props) => {
		return new Promise(async (resolve, reject) => {
			try {
				await apiService
					.get(`/people/users?searchString=${props.searchString}&pageNumber=${props.page || 0}&pageSize=${props.pageSize || 10}`)
					.then((result) => {
						let usersData = [{ label: 'SELECIONAR...', value: 'SELECIONAR...' }];
						if (result) {
							result.data.forEach((u) => {
								usersData.push({ label: u.username, value: u.userId, total: u.totalRows });
							});
							set({ users: usersData.sort((a, b) => (a.label > b.label ? 1 : -1)) });
							resolve(usersData);
						} else {
							reject('Error getting users: ', result.data.message);
						}
					})
					.catch((err) => console.log('Error getting users: ', err));
			} catch (error) {
				reject('Error getting users: ', error);
			}
		});
	},

	getUserLogin: (value) => {
		return new Promise(async (resolve, reject) => {
			try {
				// const response = await axios.get(`http://${localIp}:3004${USERS_BASE_PATH}?id=${value}`);

				const response = await apiService.get(`/people/users?searchField=userId&searchString=${value}`);
				const data = await response.data;

				resolve(data[0]);
			} catch (error) {
				if (error.response) {
					console.log(error.response.status);
					console.log(error.response.data.message);
				}
				reject('Não foi possível completar a ação! Entre em contato com o administrador do sistema.');
			}
		});
	},

	userInfo: {},

	authUser: (username, password) => {
		return new Promise(async (resolve, reject) => {
			try {
				await apiService
					.post(
						`/auth/login`,
						{ username, password },
						{
							headers: {
								'Content-Type': 'application/json',
							},
							withCredentials: true,
						}
					)
					.then(async ({ data }) => {
						if (data) {
							// localStorage.setItem('userInfo', JSON.stringify(data.user));
							set({ userInfo: data });
							resolve(data);
						} else {
							reject(data.message);
						}
					})
					.catch((error) => {
						console.log(error.response.status);
						console.log(error.response.data);
						reject(error.response.data.message);
					});
			} catch (error) {
				reject(error);
			}
		});
	},

	programmers: [],

	getProgrammers: () => {
		return new Promise(async (resolve, reject) => {
			try {
				// const response = await axios.get(`http://${localIp}:3004${USERS_BASE_PATH}?id=${value}`);

				const response = await apiService.get(`/people/users?searchField=department&searchString=programadores`);
				const data = await response.data;

				set({ programmers: data });
				resolve(data);
			} catch (error) {
				if (error.response) {
					console.log(error.response.status);
					console.log(error.response.data.message);
				}
				reject('Não foi possível completar a ação! Entre em contato com o administrador do sistema.');
			}
		});
	},
});

storePeople = devtools(storePeople);

export const usePeopleStore = create(storePeople);
