import i18n from '../i18n';

function updateTranslations() {
  // Update all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    element.textContent = i18n.t(key);
  });

  // Update all input placeholders with data-i18n-placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    element.placeholder = i18n.t(key);
  });

  // Update all aria-labels with data-i18n-aria
  document.querySelectorAll('[data-i18n-aria]').forEach(element => {
    const key = element.getAttribute('data-i18n-aria');
    element.setAttribute('aria-label', i18n.t(key));
  });
}

export function setupLanguageObserver() {
  // Initial update
  updateTranslations();

  // Listen for language changes
  window.addEventListener('languageChanged', () => {
    updateTranslations();
    
    // Update document direction
    document.documentElement.dir = i18n.language === 'fa' ? 'rtl' : 'ltr';
    
    // Dispatch event for components to handle specific updates
    window.dispatchEvent(new CustomEvent('translationsUpdated'));
  });

  // Listen for DOM changes to update new elements
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length > 0) {
        updateTranslations();
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}
