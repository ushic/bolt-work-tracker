import './src/styles/main.css';
import { createSidebar } from './src/components/Navigation/Sidebar';
import { createSearchBar } from './src/components/TopBar/SearchBar';
import { createNavigationTabs } from './src/components/TopBar/NavigationTabs';
import { initializeApp } from './src/app';

const app = document.querySelector('#app');
initializeApp(app);
