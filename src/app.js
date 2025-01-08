import { createSidebar } from './components/Navigation/Sidebar';
import { createTopBar } from './components/TopBar/TopBar';
import { Router } from './router';
import { ContactsPage } from './components/Pages/Businesses/Contacts';
import { CompaniesPage } from './components/Pages/Businesses/Companies';
import { SettingsPage } from './components/Pages/Administration/Settings';
import { UsersPage } from './components/Pages/Administration/Users';
import { RolesPage } from './components/Pages/Administration/Roles';
import { MyDashboardPage } from './components/Pages/Dashboard/MyDashboard';
import { MyActionsPage } from './components/Pages/Dashboard/MyActions';
import { MyAssetsPage } from './components/Pages/Dashboard/MyAssets';
import { CalendarPage } from './components/Pages/Dashboard/Calendar';
import { RequestsPage } from './components/Pages/Work/Requests';
import { TasksPage } from './components/Pages/Work/Tasks';
import { WorkOrdersPage } from './components/Pages/Work/WorkOrders';
import { ProjectsPage } from './components/Pages/Work/Projects';
import { LocationsPage } from './components/Pages/Assets/Locations';
import { EquipmentPage } from './components/Pages/Assets/Equipment';
import { ToolsPage } from './components/Pages/Assets/Tools';
import { GroupsPage } from './components/Pages/Assets/Groups';
import { StockPage } from './components/Pages/Supplies/Stock';
import { WarehousesPage } from './components/Pages/Supplies/Warehouses';
import { ServicesPage } from './components/Pages/Catalog/Services';
import { NormsPage } from './components/Pages/Catalog/Norms';
import { PartsPage } from './components/Pages/Catalog/Parts';
import { LaborsPage } from './components/Pages/Catalog/Labors';
import { FormsPage } from './components/Pages/Catalog/Forms';
import { ContractsPage } from './components/Pages/Contracts';

export function initializeApp(container) {
  // Initialize router
  const router = new Router();
  
  // Handle redirect to last path after language change
  const lastPath = localStorage.getItem('lastPath');
  if (lastPath) {
    localStorage.removeItem('lastPath');
    router.navigate(lastPath);
  }
  
  // Add routes
  router.addRoute('/contacts', ContactsPage);
  router.addRoute('/companies', CompaniesPage);
  router.addRoute('/settings', SettingsPage);
  router.addRoute('/users', UsersPage);
  router.addRoute('/roles', RolesPage);
  router.addRoute('/my-dashboard', MyDashboardPage);
  router.addRoute('/my-actions', MyActionsPage);
  router.addRoute('/my-assets', MyAssetsPage);
  router.addRoute('/calendar', CalendarPage);
  router.addRoute('/work/requests', RequestsPage);
  router.addRoute('/work/tasks', TasksPage);
  router.addRoute('/work/orders', WorkOrdersPage);
  router.addRoute('/work/projects', ProjectsPage);
  router.addRoute('/assets/locations', LocationsPage);
  router.addRoute('/assets/equipment', EquipmentPage);
  router.addRoute('/assets/tools', ToolsPage);
  router.addRoute('/assets/groups', GroupsPage);
  router.addRoute('/supplies/stock', StockPage);
  router.addRoute('/supplies/warehouses', WarehousesPage);
  router.addRoute('/catalog/services', ServicesPage);
  router.addRoute('/catalog/norms', NormsPage);
  router.addRoute('/catalog/parts', PartsPage);
  router.addRoute('/catalog/labors', LaborsPage);
  router.addRoute('/catalog/forms', FormsPage);
  router.addRoute('/contracts', ContractsPage);
  
  // Create main layout
  const sidebar = createSidebar(router);
  const mainContent = document.createElement('div');
  mainContent.className = 'main-content';
  
  // Create and append top bar to main content
  const topBar = createTopBar();
  mainContent.appendChild(topBar);
  
  // Append components to container
  container.appendChild(sidebar);
  container.appendChild(mainContent);
  
  // Handle initial route
  router.handleRoute();
}
