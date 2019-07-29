import { createAppContainer, createDrawerNavigator } from 'react-navigation';

import Dashboard from './pages/Dashboard';
import Config from './pages/Config';

export default createAppContainer(
	createDrawerNavigator(
		{
			Dashboard,
			Config
		},
		{
			drawerWidth: 200,
			contentOptions: {
				activeTintColor: '#ff450d'
			}
		}
	)
);
