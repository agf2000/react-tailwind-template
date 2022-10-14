import apiService from 'common/services/api';
import useAuth from './useAuth';

const useLogout = () => {
	const { setAuth } = useAuth();

	const logout = async () => {
		setAuth({});
		try {
			await apiService.get('/logout', { withCredentials: true });
		} catch (err) {
			console.log('Error loging out: ', err);
		}
	};

	return logout;
};

export default useLogout;
