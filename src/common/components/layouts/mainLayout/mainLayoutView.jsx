import Header from '../header';
import Footer from '../footer';
import { Outlet } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';

const MainLayoutView = () => {
	return (
		<>
			<MantineProvider withGlobalStyles withNormalizeCSS>
				<div className='flex flex-col h-screen justify-between'>
					<div>
						<Header />
					</div>
					<main className='mb-auto'>
						<Outlet />
					</main>
					<Footer />
				</div>
			</MantineProvider>
		</>
	);
};

export default MainLayoutView;
