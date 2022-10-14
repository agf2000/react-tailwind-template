import { Menu, Avatar, Badge } from '@mantine/core';
import { useNavigate, useLocation } from 'react-router-dom';
import { IconFilter, IconLogout } from '@tabler/icons';
import useAuth from 'common/hooks/useAuth';
import useLogout from 'common/hooks/useLogout';
import { useStoreUtils } from 'stores/utilsStore';

const BtnButton = ({ text, bg, padding }) => {
	let navigate = useNavigate();

	const routeChange = () => {
		let path = `/login`;
		navigate(path);
	};

	return (
		<div>
			<button
				className={`
          ${padding || 'px-6 py-2'} text-sm font-semibold uppercase 
          rounded-sm text-white transition ${bg}`}
				onClick={routeChange}
			>
				<span>{text}</span>
			</button>
		</div>
	);
};

const HeaderView = () => {
	let navigate = useNavigate();
	let location = useLocation();

	const logout = useLogout();
	const { auth } = useAuth();

	const filterOn = useStoreUtils((state) => state.filterOn);
	const setFilterOn = useStoreUtils((state) => state.setFilterOn);

	return (
		<header className='bg-gray-900 text-gray-300 p-3'>
			<div className='flex justify-between items-center'>
				<h1 className='font-semibold uppercase text-lg text-gray-200 cursor-pointer' onClick={() => navigate('/')}>
					💎 Softek-Tarefas
				</h1>
				<div>
					<ul className='flex items-center space-x-10 text-md hover:list-none'>
						<li className={`${location.pathname === '/' ? 'border border-gray-400 rounded-lg px-2 py-1 hover:border-white' : ''}`}>
							<span onClick={() => navigate('/')} className='text-gray-300 hover:text-gray-100 cursor-pointer'>
								Dashboard
							</span>
						</li>
						<li className={`${location.pathname === '/about' ? 'border border-gray-400 rounded-lg px-2 py-1 hover:border-white' : ''}`}>
							<span onClick={() => navigate('/about')} className='text-gray-300 hover:text-gray-100 cursor-pointer'>
								Sobre
							</span>
						</li>
						{location.pathname === '/tarefas' && auth?.accessToken && (
							<>
								<li title='Filtro'>
									<IconFilter
										size={24}
										className='text-gray-400 cursor-pointer hover:text-gray-100'
										onClick={(e) => {
											e.preventDefault();
											setFilterOn(!filterOn);
										}}
									/>
								</li>
								<li>
									<Menu shadow='md' width={200}>
										<Menu.Target>
											<span className='text-gray-300 hover:text-gray-100 cursor-pointer'>Programadores</span>
										</Menu.Target>

										<Menu.Dropdown>
											<Menu.Item
												icon={<Avatar src='images/CRISTIANO.jpg' alt='Cristiano' />}
												className='text-base'
												rightSection={<Badge className='text-base'>15</Badge>}
											>
												Cristiano
											</Menu.Item>
											<Menu.Item
												icon={<Avatar src='images/DABLYS.jpg' alt='Dablys' />}
												className='text-base'
												rightSection={<Badge className='text-base'>15</Badge>}
											>
												Dablys
											</Menu.Item>
											<Menu.Item
												icon={<Avatar src='images/GIOVANNI.jpg' alt='Giovanni' />}
												className='text-base'
												rightSection={<Badge className='text-base'>15</Badge>}
											>
												Giovanni
											</Menu.Item>
											<Menu.Item
												icon={<Avatar src='images/WARLEY.jpg' alt='Warley' />}
												className='text-base'
												rightSection={<Badge className='text-base'>15</Badge>}
											>
												Warley
											</Menu.Item>
										</Menu.Dropdown>
									</Menu>
								</li>
							</>
						)}
					</ul>
				</div>
				<div>
					{auth?.accessToken ? (
						<Menu shadow='md' width={200}>
							<Menu.Target>
								<div className='flex items-center text-gray-100 gap-2 cursor-pointer'>
									<div className='leading-none text-right text-gray-300'>
										<label className='lowercase'>{auth.username}</label>
										<p className='lowercase'>{auth.department}</p>
									</div>
									<Avatar src={`images/${auth.username}.jpg`} alt={auth.login} color={'#cccccc'} />
								</div>
							</Menu.Target>

							<Menu.Dropdown>
								<Menu.Item
									icon={<IconLogout size={24} />}
									className='text-base text-gray-600'
									onClick={async (e) => {
										e.preventDefault();
										await logout();
										navigate('/');
									}}
								>
									SAIR
								</Menu.Item>
							</Menu.Dropdown>
						</Menu>
					) : (
						<BtnButton text='Login' bg='bg-gradient-to-r from-purple-500 to-blue-500' />
					)}
				</div>
			</div>
		</header>
	);
};

export default HeaderView;
