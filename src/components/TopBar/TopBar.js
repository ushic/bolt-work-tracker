import { createSearchBar } from './SearchBar';
import { createNavigationTabs } from './NavigationTabs';
import { createLanguageSwitcher } from './LanguageSwitcher';

export function createTopBar() {
  const topBar = document.createElement('div');
  topBar.className = 'top-bar';
  
  const toggleButton = document.createElement('button');
  toggleButton.className = 'sidebar-toggle';
  toggleButton.innerHTML = '<i class="fas fa-bars"></i>';
  toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('sidebar-collapsed');
  });
  
  const searchBar = createSearchBar();
  const navigationTabs = createNavigationTabs();
  const languageSwitcher = createLanguageSwitcher();
  
  topBar.appendChild(toggleButton);
  topBar.appendChild(searchBar);
  topBar.appendChild(navigationTabs);
  topBar.appendChild(languageSwitcher);
  
  return topBar;
}
