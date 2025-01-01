// Simple router implementation
export class Router {
  constructor() {
    this.routes = new Map();
    this.currentRoute = null;
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => this.handleRoute());
  }

  addRoute(path, component) {
    this.routes.set(path, component);
  }

  navigate(path) {
    window.history.pushState({}, '', path);
    this.handleRoute();
  }

  handleRoute() {
    const path = window.location.pathname;
    const component = this.routes.get(path) || this.routes.get('/');
    
    if (component && this.currentRoute !== path) {
      this.currentRoute = path;
      const mainContent = document.querySelector('.main-content');
      const contentContainer = mainContent.querySelector('.content-container') || document.createElement('div');
      contentContainer.className = 'content-container';
      contentContainer.innerHTML = '';
      contentContainer.appendChild(component());
      
      if (!mainContent.contains(contentContainer)) {
        mainContent.appendChild(contentContainer);
      }
    }
  }
}
