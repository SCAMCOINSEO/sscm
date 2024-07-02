document.addEventListener('DOMContentLoaded', () => {
    // Инициализация состояния
    let coins = 0; // Начальное количество монет
    let tapMultiplier = 1; // Множитель для кликов
    const upgradeCost = 10000; // Стоимость улучшения кликера

    // Элементы интерфейса
    const clickerButton = document.getElementById('clickerButton'); // Кнопка кликера
    const upgradeMenu = document.getElementById('upgradeMenu'); // Меню улучшения
    const closeUpgradeMenu = document.getElementById('closeUpgradeMenu'); // Кнопка закрытия меню улучшения
    const upgradeClickerButton = document.getElementById('upgradeClickerButton'); // Кнопка улучшения кликера
    const scoreDisplay = document.getElementById('score'); // Отображение счета
    const walletBalanceDisplay = document.getElementById('walletBalance'); // Отображение баланса
    const stakeButton = document.getElementById('stakeButton'); // Кнопка "Инвестировать"
    const stakingAmountInput = document.getElementById('stakingAmount'); // Ввод суммы для инвестирования
    const currentStakingEarningsDisplay = document.getElementById('currentStakingEarnings'); // Отображение текущих заработков от инвестирования

    // Проверяем, есть ли сохраненные данные в localStorage
    if (localStorage.getItem('coins')) {
        coins = parseInt(localStorage.getItem('coins')); // Получаем количество монет из localStorage
    }
    if (localStorage.getItem('tapMultiplier')) {
        tapMultiplier = parseInt(localStorage.getItem('tapMultiplier')); // Получаем множитель кликов из localStorage
    }

    // Функция для сохранения состояния в localStorage
    function saveState() {
        localStorage.setItem('coins', coins.toString()); // Сохраняем количество монет
        localStorage.setItem('tapMultiplier', tapMultiplier.toString()); // Сохраняем множитель кликов
    }

    // Функция для обновления отображения монет
    function updateCoinDisplay() {
        scoreDisplay.textContent = `${coins} монет`; // Обновляем текст с количеством монет
        walletBalanceDisplay.textContent = `${coins} монет`; // Обновляем баланс
    }

    // Обработчик клика по кнопке кликера
    clickerButton.addEventListener('click', () => {
        coins += tapMultiplier; // Увеличиваем количество монет с учетом множителя
        saveState(); // Сохраняем состояние
        updateCoinDisplay(); // Обновляем отображение монет
    });

    // Открытие меню улучшения при зажатии кнопки кликера
    clickerButton.addEventListener('mousedown', () => {
        this.holdTimer = setTimeout(() => {
            upgradeMenu.style.display = 'block'; // Открываем меню улучшения через 500мс удержания
        }, 300);
    });

    clickerButton.addEventListener('mouseup', () => {
        clearTimeout(this.holdTimer); // Очищаем таймер при отпускании кнопки
    });

    // Закрытие меню улучшения
    closeUpgradeMenu.addEventListener('click', () => {
        upgradeMenu.style.display = 'none'; // Скрываем меню улучшения
    });

    // Обработчик клика по кнопке улучшения кликера
    upgradeClickerButton.addEventListener('click', () => {
        if (coins >= upgradeCost) {
            coins -= upgradeCost; // Уменьшаем количество монет на стоимость улучшения
            tapMultiplier *= 2; // Увеличиваем множитель кликов вдвое
            saveState(); // Сохраняем состояние
            updateCoinDisplay(); // Обновляем отображение монет
            alert('Кликер улучшен! Теперь вы получаете вдвое больше монет за клик.'); // Уведомление об улучшении
            upgradeMenu.style.display = 'none'; // Закрываем меню улучшения
        } else {
            alert('Недостаточно монет для улучшения.'); // Уведомление о недостатке монет
        }
    });

    // Обработчик клика по кнопке "Инвестировать"
    stakeButton.addEventListener('click', () => {
        const amount = parseInt(stakingAmountInput.value); // Получаем сумму для инвестирования
        if (amount > 0) {
            currentStakingEarningsDisplay.textContent = `${amount} монет`; // Обновляем отображение текущих заработков
            alert(`Вы инвестировали ${amount} монет.`); // Уведомление об успешном инвестировании
        } else {
            alert('Введите корректное количество монет для инвестирования.'); // Уведомление о некорректной сумме
        }
    });

    // Обновление отображения при загрузке страницы
    updateCoinDisplay();

    // Навигация по страницам
    const pages = {
        homePage: document.getElementById('homePage'), // Домашняя страница
        stakingPage: document.getElementById('stakingPage'), // Страница инвестирования
        tasksPage: document.getElementById('tasksPage'), // Страница заданий
        referralsPage: document.getElementById('referralsPage'), // Страница рефералов
        walletPage: document.getElementById('walletPage') // Страница кошелька
    };

    const navButtons = {
        homeButton: 'homePage', // Кнопка перехода на домашнюю страницу
        stakingButton: 'stakingPage', // Кнопка перехода на страницу инвестирования
        tasksButton: 'tasksPage', // Кнопка перехода на страницу заданий
        referralsButton: 'referralsPage', // Кнопка перехода на страницу рефералов
        walletButton: 'walletPage' // Кнопка перехода на страницу кошелька
    };

    // Функция для отображения страницы
    function showPage(pageId) {
        for (let page in pages) {
            pages[page].classList.remove('active'); // Скрываем все страницы
        }
        pages[pageId].classList.add('active'); // Отображаем выбранную страницу
    }

    // Навешиваем обработчики событий на кнопки навигации
    for (let buttonId in navButtons) {
        document.getElementById(buttonId).addEventListener('click', () => {
            showPage(navButtons[buttonId]); // Переход на соответствующую страницу при клике на кнопку
        });
    }
});
