document.addEventListener('DOMContentLoaded', () => {
    // Инициализация состояния
    let coins = 0;
    let tapMultiplier = 1;  // Множитель для кликов
    const upgradeCost = 10000;

    // Элементы интерфейса
    const clickerButton = document.getElementById('clickerButton');
    const upgradeMenu = document.getElementById('upgradeMenu');
    const closeUpgradeMenu = document.getElementById('closeUpgradeMenu');
    const upgradeClickerButton = document.getElementById('upgradeClickerButton');
    const scoreDisplay = document.getElementById('score');
    const walletBalanceDisplay = document.getElementById('walletBalance');

    // Проверяем, есть ли сохраненные данные в localStorage
    if (localStorage.getItem('coins')) {
        coins = parseInt(localStorage.getItem('coins'));
    }
    if (localStorage.getItem('tapMultiplier')) {
        tapMultiplier = parseInt(localStorage.getItem('tapMultiplier'));
    }

    // Функция для сохранения состояния в localStorage
    function saveState() {
        localStorage.setItem('coins', coins.toString());
        localStorage.setItem('tapMultiplier', tapMultiplier.toString());
    }

    // Функция для обновления отображения монет
    function updateCoinDisplay() {
        scoreDisplay.textContent = `${coins} монет`;
        walletBalanceDisplay.textContent = `${coins} монет`;
    }

    // Обработчик клика по кнопке кликера
    clickerButton.addEventListener('click', () => {
        coins += tapMultiplier;
        saveState();
        updateCoinDisplay();
    });

    // Открытие меню улучшения при зажатии кнопки кликера
    clickerButton.addEventListener('mousedown', () => {
        this.holdTimer = setTimeout(() => {
            upgradeMenu.style.display = 'block';
        }, 500);  // Открытие меню через 500мс удержания
    });

    clickerButton.addEventListener('mouseup', () => {
        clearTimeout(this.holdTimer);
    });

    // Закрытие меню улучшения
    closeUpgradeMenu.addEventListener('click', () => {
        upgradeMenu.style.display = 'none';
    });

    // Обработчик клика по кнопке улучшения кликера
    upgradeClickerButton.addEventListener('click', () => {
        if (coins >= upgradeCost) {
            coins -= upgradeCost;
            tapMultiplier *= 2;
            saveState();
            updateCoinDisplay();
            alert('Кликер улучшен! Теперь вы получаете вдвое больше монет за клик.');
            upgradeMenu.style.display = 'none';
        } else {
            alert('Недостаточно монет для улучшения.');
        }
    });

    // Обновление отображения при загрузке страницы
    updateCoinDisplay();

    // Навигация
    const pages = {
        homePage: document.getElementById('homePage'),
        stakingPage: document.getElementById('stakingPage'),
        tasksPage: document.getElementById('tasksPage'),
        referralsPage: document.getElementById('referralsPage'),
        walletPage: document.getElementById('walletPage')
    };

    const navButtons = {
        homeButton: 'homePage',
        stakingButton: 'stakingPage',
        tasksButton: 'tasksPage',
        referralsButton: 'referralsPage',
        walletButton: 'walletPage'
    };

    function showPage(pageId) {
        for (let page in pages) {
            pages[page].classList.remove('active');
        }
        pages[pageId].classList.add('active');
    }

    for (let buttonId in navButtons) {
        document.getElementById(buttonId).addEventListener('click', () => {
            showPage(navButtons[buttonId]);
        });
    }
});
