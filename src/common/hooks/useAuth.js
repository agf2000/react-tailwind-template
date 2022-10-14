import { useContext } from 'react';
import AuthContext from 'common/context/authProvider';

const useAuth = () => {
	return useContext(AuthContext);
};

export default useAuth;
