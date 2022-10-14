// import moment from 'moment';
import dayjs from 'dayjs';
import create from 'zustand';
import { devtools } from 'zustand/middleware';
// import axios from 'axios';
import apiService from '../common/services/api';

let storeTasks = (set, get) => ({
	totalTasks: 0,
	tasks: [],
	getTasks: (props) => {
		return new Promise(async (resolve, reject) => {
			let initialDate = '',
				finalDate = '';

			if (props.initialDate) {
				initialDate = dayjs(new Date(props.initialDate.split('/')[2], parseInt(props.initialDate.split('/')[1]) - 1, props.initialDate.split('/')[0])).format('MM-DD-YYYY');
			}
			if (props.finalDate) {
				finalDate = dayjs(new Date(props.finalDate.split('/')[2], parseInt(props.finalDate.split('/')[1]) - 1, props.finalDate.split('/')[0])).format('MM-DD-YYYY');
			}
			
			try {
				await apiService
					.get(
						`/tasks?searchField=${props.searchField}&searchString=${props.searchString}&pageNumber=${props.page || 0}&pageSize=${props.pageSize || 10}&notAprooved=${
							props.notAprooved
						}&failed=${props.faield}&resolved=${props.resolved}&tested=${props.tested}&initiated=${props.initiated}&dateFilter=${
							props.dateFilter
						}&initialDate=${initialDate}&finalDate=${finalDate}`
					)
					.then((result) => {
						if (result) {
							set({ tasks: result.data });
							set({ totalTasks: result.data[0].totalRows });
							resolve(result.data);
						} else {
							reject('Error getting tasks: ', result.data.message);
						}
					})
					.catch((err) => console.log('Error getting tasks: ', err));
			} catch (error) {
				reject('Error getting tasks: ', error);
			}
		});
	},

	modules: ['TODOS'],
	getModules: (props) => {
		return new Promise(async (resolve, reject) => {
			try {
				await apiService
					.get(`/tasks/modules?searchString=${props.searchString}&pageNumber=${props.page || 0}&pageSize=${props.pageSize || 10}`)
					.then((result) => {
						let modulesData = [{ label: 'SELECIONAR...', value: 'SELECIONAR...' }];
						if (result) {
							result.data.forEach((m) => {
								modulesData.push({ label: m.descricao, value: m.codigo, total: m.totalRows });
							});
							set({ clients: modulesData });
							resolve(modulesData);
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
});

storeTasks = devtools(storeTasks);

export const useStoreTasks = create(storeTasks);
