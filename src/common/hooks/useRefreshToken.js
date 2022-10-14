import axios from 'common/services/api';
import useAuth from 'common/hooks/useAuth';

const useRefreshToken = () => {
	const { setAuth } = useAuth();

	const refresh = async () => {
		const response = await axios.get('/api/refresh', {
			withCredentials: true,
		});
		setAuth(response.data);
		return response.data.accessToken;
	};
	return refresh;
};

export default useRefreshToken;
