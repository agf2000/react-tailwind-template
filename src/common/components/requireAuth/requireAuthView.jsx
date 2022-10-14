import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const RequireAuthView = ({ allowedRoles }) => {
	const { auth } = useAuth();
	const location = useLocation();

	return allowedRoles?.includes(auth?.department) ? (
		<Outlet />
	) : auth?.accessToken ? (
		<Navigate to='/unauthorized' state={{ from: location }} replace />
	) : (
		<Navigate to='/login' state={{ from: location }} replace />
	);
};

export default RequireAuthView;
