let score = 0;
let rank = 1;
let stakingClickCount = 0; // Добавлена переменная для подсчета нажатий
const scoreElement = document.getElementById('score');
const rankElement = document.getElementById('rank');
const rankTable = document.getElementById('rankTable');
const clickerButton = document.getElementById('clickerButton');
const container = document.querySelector('.container');
const passButton = document.getElementById('passButton');
const passModal = document.getElementById('passModal');
const closePassModal = document.getElementById('closePassModal');
const stakingButton = document.getElementById('stakingButton');
const stakingModal = document.getElementById('stakingModal');
const closeStakingModal = document.getElementById('closeStakingModal');
const stakeButton = document.getElementById('stakeButton');
const stakeAmount = document.getElementById('stakeAmount');
const earningsModal = document.getElementById('earningsModal');
const claimEarningsButton = document.getElementById('claimEarningsButton');
const restakeEarningsButton = document.getElementById('restakeEarningsButton');
const earnedAmountElement = document.getElementById('earnedAmount');

const rankThresholds = [100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000, 10000000000, 100000000000];
const rewards = rankThresholds.map(threshold => threshold / 10);

// Загрузка сохраненного баланса монет и ранга из localStorage
window.onload = () => {
    if (localStorage.getItem('score')) {
        score = parseInt(localStorage.getItem('score'), 10);
        scoreElement.textContent = score + ' монет';
    }
    if (localStorage.getItem('rank')) {
        rank = parseInt(localStorage.getItem('rank'), 10);
        rankElement.textContent = 'Ранг ' + rank;
    }
    showEarningsModal();
};

clickerButton.addEventListener('click', () => {
    score++;
    scoreElement.textContent = score + ' монет';
    localStorage.setItem('score', score);

    checkRankUp();
});

function checkRankUp() {
    if (score >= rankThresholds[rank - 1]) {
        const reward = rewards[rank - 1];
        score += reward;
        scoreElement.textContent = score + ' монет';
        localStorage.setItem('score', score);

        rank++;
        rankElement.textContent = 'Ранг ' + rank;
        localStorage.setItem('rank', rank);

        const rankUpAnimation = document.createElement('div');
        rankUpAnimation.classList.add('rank-up');
        rankUpAnimation.textContent = `Поздравляем! Повышение до ранга ${rank}. Вознаграждение: ${reward} монет`;
        container.appendChild(rankUpAnimation);

        setTimeout(() => {
            rankUpAnimation.remove();
        }, 2000);
    }
}

rankElement.addEventListener('click', () => {
    rankTable.style.display = rankTable.style.display === 'none' ? 'block' : 'none';
});

passButton.addEventListener('click', () => {
    passModal.style.display = 'block';
});

closePassModal.addEventListener('click', () => {
    passModal.style.display = 'none';
});

stakingButton.addEventListener('click', () => {
    stakingClickCount++; // Увеличиваем счетчик нажатий
    if (stakingClickCount >= 3) {
        stakingModal.style.display = 'block';
        stakingClickCount = 0; // Сбрасываем счетчик после открытия окна
    }
});

closeStakingModal.addEventListener('click', () => {
    stakingModal.style.display = 'none';
});

stakeButton.addEventListener('click', () => {
    const stakeValue = parseInt(stakeAmount.value, 10);
    if (isNaN(stakeValue) || stakeValue <= 0 || stakeValue > score) {
        alert('Введите корректное количество монет для стейкинга.');
        return;
    }
    score -= stakeValue;
    scoreElement.textContent = score + ' монет';
    localStorage.setItem('score', score);
    alert('Вы успешно застейкали ' + stakeValue + ' монет.');
    stakingModal.style.display = 'none';
});

function showEarningsModal() {
    const lastVisit = localStorage.getItem('lastVisit');
    const now = new Date().getTime();
    if (lastVisit) {
        const elapsedHours = (now - lastVisit) / 3600000;
        const earnings = Math.floor(elapsedHours * score * 0.1);
        earnedAmountElement.textContent = earnings;
    }
    localStorage.setItem('lastVisit', now);
    earningsModal.style.display = 'block';
}

claimEarningsButton.addEventListener('click', () => {
    const earnings = parseInt(earnedAmountElement.textContent, 10);
    score += earnings;
    scoreElement.textContent = score + ' монет';
    localStorage.setItem('score', score);
    earningsModal.style.display = 'none';
});

restakeEarningsButton.addEventListener('click', () => {
    const earnings = parseInt(earnedAmountElement.textContent, 10);
    if (earnings > 0) {
        score += earnings;
        scoreElement.textContent = score + ' монет';
        localStorage.setItem('score', score);
        alert('Вы успешно застейкали ' + earnings + ' монет.');
    }
    earningsModal.style.display = 'none';
});
