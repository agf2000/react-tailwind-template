import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import { AuthProvider } from 'common/context/authProvider';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { disableRactDevTools } from '@fvilers/disable-react-devtools';

if (process.env.NODE_ENV === 'production') {
	disableRactDevTools();
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	// <React.StrictMode>
	<Router>
		{/* <AuthProvider> */}
			<Routes>
				<Route path='/*' element={<App tab='home' />} />
			</Routes>
		{/* </AuthProvider> */}
	</Router>
	// </React.StrictMode>
);
