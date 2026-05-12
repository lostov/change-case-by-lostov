document.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', async () => {
    const caseType = btn.id;
    const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
    
    // Выполняем скрипт трансформации в текущей вкладке
    browser.scripting.executeScript({
      target: { tabId: tab.id },
      args: [caseType],
      func: transformSelectedText
    });
  });
});

function transformSelectedText(type) {
  const activeEl = document.activeElement;
  // Логика получения текста (как обсуждали ранее)
  // ... трансформация в зависимости от type ...
}

// Внутри popup.js
document.getElementById('btn-upper').addEventListener('click', async () => {
    const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
    browser.scripting.executeScript({
        target: { tabId: tab.id },
        args: ['up'],
        func: changeCaseOnPage
    });
});