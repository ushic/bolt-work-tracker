import './i18n';
import './styles/globals.css';
import { createSidebar } from './src/components/Navigation/Sidebar';
import { initializeApp } from './src/app';
import { setupLanguageObserver } from './utils/languageObserver';

const app = document.querySelector('#app');
initializeApp(app);
setupLanguageObserver();
