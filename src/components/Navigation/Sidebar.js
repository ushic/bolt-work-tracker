import i18n from '../../i18n';

export function createSidebar(router) {
  const navItems = [
    {
      icon: 'home',
      text: i18n.t('navigation.dashboard'),
      subItems: [
        { icon: 'tachometer-alt', text: i18n.t('navigation.myDashboard'), path: '/my-dashboard' },
        { icon: 'tasks', text: i18n.t('navigation.myActions'), path: '/my-actions' },
        { icon: 'box', text: i18n.t('navigation.myAssets'), path: '/my-assets' },
        { icon: 'calendar', text: i18n.t('navigation.calendar'), path: '/calendar' }
      ]
    },
    {
      icon: 'tasks',
      text: i18n.t('navigation.work'),
      subItems: [
        { icon: 'clipboard-list', text: i18n.t('navigation.requests'), path: '/work/requests' },
        { icon: 'tasks', text: i18n.t('navigation.tasks'), path: '/work/tasks' },
        { icon: 'file-alt', text: i18n.t('navigation.workOrders'), path: '/work/orders' },
        { icon: 'project-diagram', text: i18n.t('navigation.projects'), path: '/work/projects' }
      ]
    },
    {
      icon: 'box',
      text: i18n.t('navigation.assets'),
      subItems: [
        { icon: 'map-marker-alt', text: i18n.t('navigation.locations'), path: '/assets/locations' },
        { icon: 'cogs', text: i18n.t('navigation.equipment'), path: '/assets/equipment' },
        { icon: 'tools', text: i18n.t('navigation.tools'), path: '/assets/tools' },
        { icon: 'object-group', text: i18n.t('navigation.groups'), path: '/assets/groups' }
      ]
    },
    {
      icon: 'boxes',
      text: i18n.t('navigation.supplies'),
      subItems: [
        { icon: 'box', text: i18n.t('navigation.stock'), path: '/supplies/stock' },
        { icon: 'warehouse', text: i18n.t('navigation.warehouses'), path: '/supplies/warehouses' }
      ]
    },
    {
      icon: 'book',
      text: i18n.t('navigation.catalog'),
      subItems: [
        { icon: 'concierge-bell', text: i18n.t('navigation.services'), path: '/catalog/services' },
        { icon: 'ruler', text: i18n.t('navigation.norms'), path: '/catalog/norms' },
        { icon: 'cogs', text: i18n.t('navigation.parts'), path: '/catalog/parts' },
        { icon: 'hard-hat', text: i18n.t('navigation.labors'), path: '/catalog/labors' },
        { icon: 'file-alt', text: i18n.t('navigation.forms'), path: '/catalog/forms' }
      ]
    },
    {
      icon: 'building',
      text: i18n.t('navigation.businesses'),
      subItems: [
        { icon: 'address-book', text: i18n.t('navigation.contacts'), path: '/contacts' },
        { icon: 'building', text: i18n.t('navigation.companies'), path: '/companies' }
      ]
    },
    { icon: 'file-contract', text: i18n.t('navigation.contracts'), path: '/contracts' },
    { icon: 'chart-bar', text: i18n.t('navigation.reports') },
    {
      icon: 'cog',
      text: i18n.t('navigation.administration'),
      subItems: [
        { icon: 'cog', text: i18n.t('navigation.settings'), path: '/settings' },
        { icon: 'users', text: i18n.t('navigation.users'), path: '/users' },
        { icon: 'user-shield', text: i18n.t('navigation.roles'), path: '/roles' }
      ]
    }
  ];

  const sidebar = document.createElement('nav');
  sidebar.className = 'sidebar';
  
  // Logo
  const logo = document.createElement('div');
  logo.className = 'logo';
  logo.setAttribute('data-i18n', 'app.title');
  logo.textContent = i18n.t('app.title');
  sidebar.appendChild(logo);
  
  // User Info
  const userInfo = document.createElement('div');
  userInfo.className = 'user-info';
  userInfo.innerHTML = `
    <div class="user-avatar"></div>
    <div class="user-details">
      <span class="user-name" data-i18n="user.name">John Doe</span>
      <span class="user-role" data-i18n="user.role">Administrator</span>
    </div>
  `;
  sidebar.appendChild(userInfo);
  
  // Navigation Items
  const navList = document.createElement('ul');
  navList.className = 'nav-items';
  
  navItems.forEach(item => {
    const li = document.createElement('li');
    const itemContent = document.createElement('div');
    itemContent.className = 'nav-item-content';
    itemContent.innerHTML = `
      <div class="nav-item-main">
        <i class="fas fa-${item.icon}"></i>
        <span>${item.text}</span>
        ${item.subItems ? '<i class="fas fa-chevron-down submenu-icon"></i>' : ''}
      </div>
    `;
    
    li.appendChild(itemContent);
    
    if (item.subItems) {
      const subMenu = document.createElement('ul');
      subMenu.className = 'submenu';
      
      item.subItems.forEach(subItem => {
        const subLi = document.createElement('li');
        subLi.innerHTML = `
          <i class="fas fa-${subItem.icon}"></i>
          <span>${subItem.text}</span>
        `;
        
        subLi.addEventListener('click', (e) => {
          e.stopPropagation();
          router.navigate(subItem.path);
        });
        
        subMenu.appendChild(subLi);
      });
      
      li.appendChild(subMenu);
      
      itemContent.addEventListener('click', () => {
        li.classList.toggle('expanded');
      });
    }

  // For direct menu items (like Contracts)
if (item.path) {
  itemContent.addEventListener('click', () => {
    router.navigate(item.path);
  });
}  
    
    navList.appendChild(li);
  });
  
  sidebar.appendChild(navList);
  return sidebar;
}
