// Словарь соответствия ID меню и типов трансформации
const MENU_ITEMS = {
    'upper': 'UPPERCASE',
    'lower': 'lowercase',
    'title': 'Title Case',
    'sentence': 'Sentence case',
    'separator1': null, // Разделитель
    'camel': 'camelCase',
    'pascal': 'PascalCase',
    'constant': 'CONSTANT_CASE',
    'separator2': null,
    'snake': 'snake_case',
    'dot': 'dot.case'
};

// Создаем контекстное меню при установке
browser.runtime.onInstalled.addListener(() => {
    browser.contextMenus.create({
        id: "change-case-parent",
        title: "Change Case",
        contexts: ["selection"] // Появляется только при выделении текста
    });

    Object.entries(MENU_ITEMS).forEach(([id, title]) => {
        if (title === null) {
            browser.contextMenus.create({
                id: id,
                type: "separator",
                parentId: "change-case-parent",
                contexts: ["selection"]
            });
        } else {
            browser.contextMenus.create({
                id: id,
                title: title,
                parentId: "change-case-parent",
                contexts: ["selection"]
            });
        }
    });
});

// Слушатель кликов по контекстному меню
browser.contextMenus.onClicked.addListener(async (info, tab) => {
    const settings = await browser.storage.local.get(['ignoreList', 'correctList']);
    
    browser.scripting.executeScript({
        target: { tabId: tab.id },
        args: [info.menuItemId, settings.ignoreList || "", settings.correctList || ""],
        func: changeCaseOnPage
    });
});

// Слушатель горячих клавиш (сопоставление с вашим manifest.json)
browser.commands.onCommand.addListener(async (command) => {
    const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
    const settings = await browser.storage.local.get(['ignoreList', 'correctList']);
    
    const commandMap = {
        'toggle-uppercase': 'upper',
        'toggle-lowercase': 'lower',
        'toggle-titlecase': 'title',
        'toggle-sentencecase': 'sentence',
        'toggle-pascalcase': 'pascal',
        'toggle-camelcase': 'camel',
        'toggle-constantcase': 'constant',
        'toggle-snakecase': 'snake',
        'toggle-dotcase': 'dot'
    };

    const type = commandMap[command];
    if (type && tab.id) {
        browser.scripting.executeScript({
            target: { tabId: tab.id },
            args: [type, settings.ignoreList || "", settings.correctList || ""],
            func: changeCaseOnPage
        });
    }
});

// Эта функция будет выполняться прямо на странице
function changeCaseOnPage(type, ignoreStr, correctStr) {
    const activeEl = document.activeElement;
    const isInput = activeEl && (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA");

    // Обширный набор функций трансформации
    const transforms = {
        'upper': (t) => t.toUpperCase(),
        'lower': (t) => t.toLowerCase(),
        'snake': (t) => t.toLowerCase().replace(/\s+/g, '_'),
        'camel': (t) => t.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase()),
        'pascal': (t) => {
            const camel = t.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
            return camel.charAt(0).toUpperCase() + camel.slice(1);
        },
        'constant': (t) => t.toUpperCase().replace(/\s+/g, '_'),
        'dot': (t) => t.toLowerCase().replace(/\s+/g, '.'),
        'title': (t) => t.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase()),
        'sentence': (t) => t.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, l => l.toUpperCase())
    };

    // Функция финальной обработки текста (трансформация + списки)
    function applyLogic(text, mode) {
        if (!transforms[mode]) return text;
        
        // 1. Основная смена регистра
        let result = transforms[mode](text);

        // 2. Обработка Ignore List (слова, которые нельзя менять)
        if (ignoreStr) {
            const ignores = ignoreStr.split(',').map(s => s.trim()).filter(s => s);
            ignores.forEach(word => {
                const reg = new RegExp(word, 'gi');
                result = result.replace(reg, word); 
            });
        }

        // 3. Обработка Correct List (принудительная автозамена word:Correction)
        if (correctStr) {
            const corrects = correctStr.split(',').map(s => s.trim()).filter(s => s);
            corrects.forEach(pair => {
                const [wrong, right] = pair.split(':');
                if (wrong && right) {
                    const reg = new RegExp(wrong.trim(), 'gi');
                    result = result.replace(reg, right.trim());
                }
            });
        }
        return result;
    }

    if (isInput) {
        // Логика для полей ввода (input, textarea)
        let start = activeEl.selectionStart;
        let end = activeEl.selectionEnd;
        let selectedText = activeEl.value.substring(start, end);

        // Если выделения нет — берем всё содержимое поля
        if (start === end) {
            selectedText = activeEl.value;
            start = 0;
            end = activeEl.value.length;
        }

        const finalResult = applyLogic(selectedText, type);
        activeEl.value = activeEl.value.substring(0, start) + finalResult + activeEl.value.substring(end);
        activeEl.setSelectionRange(start, start + finalResult.length);
    } else {
        // Логика для обычного текста на странице
        const selection = window.getSelection();
        const selectedText = selection.toString();

        if (selectedText) {
            const finalResult = applyLogic(selectedText, type);
            // Используем стандартный метод браузера для вставки текста поверх выделения
            document.execCommand("insertText", false, finalResult);
        }
    }
}