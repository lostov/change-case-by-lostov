document.addEventListener('DOMContentLoaded', () => {
    // Обработка кнопок смены регистра
    const buttons = document.querySelectorAll('.case-btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const command = button.getAttribute('data-command');
            // Отправляем сообщение в background.js или напрямую вызываем скрипт
            browser.runtime.sendMessage({ action: "change-case", command: command });
            window.close(); // Закрыть попап после нажатия
        });
    });

    // Открыть настройки
    document.getElementById('open-options').addEventListener('click', () => {
        browser.runtime.openOptionsPage();
    });

    // Открыть GitHub
    document.getElementById('open-github').addEventListener('click', () => {
        window.open('https://github.com/lostov/change-case-by-lostov');
    });
});