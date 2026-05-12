// Сохранение
document.getElementById('save').addEventListener('click', () => {
    const ignore = document.getElementById('ignoreList').value;
    const correct = document.getElementById('correctList').value;
    browser.storage.local.set({ 
        ignoreList: ignore, 
        correctList: correct 
    });
});
document.getElementById('open-shortcuts').addEventListener('click', () => {
  // Эта команда открывает встроенную страницу настроек клавиш Firefox
  browser.tabs.create({
    url: "https://support.mozilla.org/en-US/kb/manage-extension-shortcuts-firefox" 
    // К сожалению, прямой переход по about:addons через JS ограничен, 
    // поэтому чаще всего выводят инструкцию или ссылку на справку.
  });
  
  // В некоторых версиях работает переход напрямую:
  // browser.runtime.openOptionsPage(); // Это откроет вашу страницу, но не список клавиш
});



// Загрузка текущих значений
browser.storage.local.get('notify').then(res => {
  document.getElementById('show-notifications').checked = res.notify || false;
});