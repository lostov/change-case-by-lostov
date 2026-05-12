// i18n.js
const translations = {
    ru: {
        settings_title: "Настройки",
        notify_title: "Показывать уведомление после замены",
        notify_label: "Показывать уведомление",
        btn_shortcuts: "Настроить сочетания клавиш",
        btn_save: "Сохранить",
        btn_github: "Страница GitHub",
        lang_label: "Язык интерфейса",
        lang_auto: "Авто (Системный)",
        msg_saved: "Настройки сохранены!",
        msg_shortcuts: "Хотите изменить горячие клавиши?",
        btn_shortcuts: "Настроить сочетания клавиш"
    },
    en: {
        settings_title: "Settings",
        notify_title: "Show notification after replacement",
        notify_label: "Show notification",
        btn_shortcuts: "Manage shortcuts",
        btn_save: "Save",
        btn_github: "GitHub Page",
        lang_label: "Interface Language",
        lang_auto: "Auto (System)",
        msg_saved: "Settings saved!",
        msg_shortcuts: "Want to change keyboard shortcuts?",
        btn_shortcuts: "Manage Shortcuts"
    },
    uz: {
        settings_title: "Sozlamalar",
        notify_title: "O'zgartirishdan keyin bildirishnomani ko'rsatish",
        notify_label: "Bildirishnomani ko'rsatish",
        btn_shortcuts: "Klaviatura birikmalarini sozlash",
        btn_save: "Saqlash",
        btn_github: "GitHub sahifasi",
        lang_label: "Interfeys tili",
        lang_auto: "Avto (Tizim)",
        msg_saved: "Sozlamalar saqlandi!",
        msg_shortcuts: "Klaviatura birikmalarini o'zgartirmoqchimisiz?",
        btn_shortcuts: "Klaviatura birikmalarini sozlash"
    }
};

// Функция получения текущего языка
async function getCurrentLanguage() {
    const data = await browser.storage.local.get('preferredLanguage');
    let lang = data.preferredLanguage || 'auto';

    if (lang === 'auto') {
        // Получаем системный язык (например, "ru-RU" -> "ru")
        lang = browser.i18n.getUILanguage().substring(0, 2);
    }
    // Если языка нет в списке, возвращаем английский по умолчанию
    return translations[lang] ? lang : 'en';
}

// Функция перевода страницы
async function initTranslations() {
    const lang = await getCurrentLanguage();
    const dict = translations[lang];

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            if (el.tagName === 'INPUT' && (el.type === 'button' || el.type === 'submit')) {
                el.value = dict[key];
            } else {
                el.textContent = dict[key];
            }
        }
    });
}