import i18n from '../../i18n';

export function createLanguageSwitcher() {
  const switcher = document.createElement('div');
  switcher.className = 'language-switcher';
  
  const button = document.createElement('button');
  button.className = 'language-toggle';
  button.setAttribute('aria-label', i18n.language === 'fa' ? 'Switch to English' : 'تغییر به فارسی');
  
  function updateButtonText() {
    const currentLang = i18n.language;
    button.textContent = currentLang === 'fa' ? 'EN' : 'فا';
    button.setAttribute('aria-label', currentLang === 'fa' ? 'Switch to English' : 'تغییر به فارسی');
    document.documentElement.dir = currentLang === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
    
    // Update meta tags
    const existingMeta = document.querySelector('meta[name="language"]');
    if (existingMeta) {
      existingMeta.setAttribute('content', currentLang);
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('name', 'language');
      meta.setAttribute('content', currentLang);
      document.head.appendChild(meta);
    }
  }
  
  button.addEventListener('click', () => {
    const newLang = i18n.language === 'fa' ? 'en' : 'fa';
    i18n.changeLanguage(newLang).then(() => {
      // Save current path before refresh
      const currentPath = window.location.pathname;
      localStorage.setItem('lastPath', currentPath);
      
      // Refresh the page
      window.location.reload();
    });
  });
  
  // Initial setup
  updateButtonText();
  
  switcher.appendChild(button);
  return switcher;
}
