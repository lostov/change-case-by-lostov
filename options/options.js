document.getElementById('openShortcuts').addEventListener('click', () => {
  browser.tabs.create({
    url: "https://support.mozilla.org/en-US/kb/manage-extension-shortcuts-firefox" 
  });
});

// В начале options.js
document.addEventListener('DOMContentLoaded', async () => {
    const res = await browser.storage.local.get(['notify', 'preferredLanguage']);
    
    document.getElementById('showNotifications').checked = res.notify || false;
    document.getElementById('languageSelect').value = res.preferredLanguage || 'auto';

    initTranslations();
});

// При сохранении
document.getElementById('save').addEventListener('click', async () => {
    const notify = document.getElementById('showNotifications').checked;
    const lang = document.getElementById('languageSelect').value;
    
    await browser.storage.local.set({ 
        notify: notify, 
        preferredLanguage: lang 
    });
    
    // Перезагружаем переводы
    initTranslations(); 
    
    const currentLang = await getCurrentLanguage();
    alert(translations[currentLang].msg_saved);
});

document.querySelectorAll('.link-item-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const url = btn.getAttribute('data-url');
        if (url) {
            window.open(url, '_blank');
        }
    });
});