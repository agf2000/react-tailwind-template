import './styles/global.css';

import { Routes, Route } from 'react-router-dom';

import MainLayout from './common/components/layouts/mainLayout';

import Home from './modules/home';
import About from './modules/about';
// import Login from './modules/login';
import NotFound from './modules/notFound';
import Unauthorized from './modules/unauthorized';
// import PersistLogin from './common/components/persistLogin';

// import RequireAuth from './common/components/requireAuth';

// const ROLES = ['ADMINISTRADORES', 'PROGRAMADORES', 'PROGRAMAÇÃO'];

const App = () => {
	return (
		<Routes>
			<Route element={<MainLayout />}>
				<Route path='/' element={<Home />} />
				<Route path='/about' element={<About />} />
				{/* <Route path='/login' element={<Login />} /> */}
				<Route path='/unauthorized' element={<Unauthorized />} />

				{/* <Route element={<PersistLogin />}>
					<Route element={<RequireAuth allowedRoles={ROLES} />}>
						<Route path='/about' element={<About />} />
					</Route>
				</Route> */}

				<Route path='*' element={<NotFound />} />
			</Route>
		</Routes>
	);
};

export default App;
