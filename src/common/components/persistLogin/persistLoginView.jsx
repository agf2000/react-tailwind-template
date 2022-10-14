import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useRefreshToken from 'common/hooks/useRefreshToken';
import useAuth from 'common/hooks/useAuth';
// import useLocalStorage from '../../hooks/useLocalStorage';

const PersistLoginView = () => {
	const [isLoading, setIsLoading] = useState(true);
	const refresh = useRefreshToken();
	// const { auth } = useAuth();
	const { auth, persist } = useAuth();

	useEffect(() => {
		let isMounted = true;

		const verifyRefreshToken = async () => {
			try {
				await refresh();
			} catch (err) {
				console.error(err);
			} finally {
				isMounted && setIsLoading(false);
			}
		};

		// persist added here AFTER tutorial video
		// Avoids unwanted call to verifyRefreshToken
		!auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

		return () => (isMounted = false);
	}, [auth?.accessToken, persist]);

	// useEffect(() => {
	// 	console.log(`isLoading: ${isLoading}`);
	// 	console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
	// }, [isLoading]);

	return <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistLoginView;
