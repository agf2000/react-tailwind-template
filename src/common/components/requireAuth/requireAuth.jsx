import RequireAuthView from './requireAuthView'; 

const RequireAuth = ({ allowedRoles }) => {
	return <RequireAuthView {...{ allowedRoles }} />;
};

export default RequireAuth;