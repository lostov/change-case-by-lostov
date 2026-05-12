# Change Case by mr.lostov

![Version](https://img.shields.io/badge/version-1.1.1-blue.svg)
![Platform](https://img.shields.io/badge/platform-Firefox-orange.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

Универсальное расширение для Firefox, которое позволяет мгновенно изменять регистр выделенного текста с помощью горячих клавиш или контекстного меню.

## ✨ Особенности

- **Множество стилей**: Поддержка UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case и других.
- **Горячие клавиши**: Настраиваемые сочетания клавиш для каждого типа трансформации.
- **Контекстное меню**: Быстрый доступ через правую кнопку мыши.
- **Умная обработка**: Если текст не выделен в поле ввода, расширение автоматически обработает весь текст в этом поле.
- **Ignore & Correct Lists**: Возможность настройки исключений и правил автозамены.
- **Приватность**: Работает локально, не требует специальных разрешений для сбора данных.

## 🚀 Установка (Временная)

1. Скачайте или клонируйте репозиторий.
2. Откройте Firefox и перейдите по адресу `about:debugging`.
3. Нажмите **"Этот Firefox" (This Firefox)**.
4. Нажмите кнопку **"Загрузить временное дополнение..." (Load Temporary Add-on...)**.
5. Выберите файл `manifest.json` из папки проекта.

## ⌨️ Горячие клавиши (по умолчанию)

| Команда | Клавиши | Описание |
|---------|---------|----------|
| UPPERCASE | `Ctrl+Alt+U` | ВЕРХНИЙ РЕГИСТР |
| lowercase | `Ctrl+Alt+L` | нижний регистр |
| Title Case | `Ctrl+Alt+K` | Как В Заголовке |
| Sentence case | `Ctrl+Alt+S` | Как в предложении |
| PascalCase | `Ctrl+Alt+P` | PascalCase |

*Вы можете изменить эти клавиши в настройках Firefox: `about:addons` -> Шестеренка -> Управление сочетаниями клавиш.*

## ⚙️ Настройки

Расширение включает в себя страницу настроек, где вы можете:
- Задать **Ignore List**: слова через запятую, которые не будут меняться (например: `iPhone, SQL`).
- Задать **Correct List**: правила автозамены в формате `слово:Замена` (например: `js:JavaScript`).

## 🛠 Технологии

- WebExtensions API (Manifest V3)
- JavaScript
- HTML/CSS

## 👤 Автор

**Manuchehr Jalolov (mr.lostov)**
- GitHub: [@bartoszlorek](https://github.com/bartoszlorek/change-case) (на базе этого проекта)

## 📄 Лицензия

MIT