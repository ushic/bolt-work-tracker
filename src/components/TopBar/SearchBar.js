import i18n from '../../i18n';

export function createSearchBar() {
  const searchBar = document.createElement('div');
  searchBar.className = 'search-bar';
  
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'search-input';
  input.setAttribute('data-i18n-placeholder', 'common.search');
  input.placeholder = i18n.t('common.search');
  
  searchBar.appendChild(input);
  return searchBar;
}
