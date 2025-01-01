import i18n from '../../i18n';

export function createNavigationTabs() {
  const tabs = [
    { key: 'overallWork', text: 'navigation.overallWork' },
    { key: 'myWork', text: 'navigation.myWork' },
    { key: 'overallAssets', text: 'navigation.overallAssets' },
    { key: 'myAssets', text: 'navigation.myAssets' }
  ];
  
  const tabsContainer = document.createElement('div');
  tabsContainer.className = 'navigation-tabs';
  
  tabs.forEach(tab => {
    const tabElement = document.createElement('button');
    tabElement.className = 'nav-tab';
    tabElement.setAttribute('data-i18n', tab.text);
    tabElement.textContent = i18n.t(tab.text);
    tabsContainer.appendChild(tabElement);
  });
  
  return tabsContainer;
}
