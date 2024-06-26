let score = 0;
let rank = 1;
let stakedAmount = 0; // Количество застейканных монет
let stakingEarnings = 0; // Монеты, которые можно собрать
let stakingClickCount = 0; // Счетчик нажатий для открытия окна стейкинга
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
const claimStakingButton = document.getElementById('claimStakingButton');
const stakeAmount = document.getElementById('stakeAmount');
const stakedAmountElement = document.getElementById('stakedAmount');
const stakingProfitElement = document.getElementById('stakingProfit');
const stakingEarningsElement = document.getElementById('stakingEarnings');
const earningsModal = document.getElementById('earningsModal');
const claimEarningsButton = document.getElementById('claimEarningsButton');
const earnedAmountElement = document.getElementById('earnedAmount');
const earnedAnimation = document.getElementById('earnedAnimation');
const earnedAnimationAmount = document.getElementById('earnedAnimationAmount');
const closeEarningsModal = document.getElementById('closeEarningsModal');

clickerButton.addEventListener('click', () => {
    score++;
    updateScore();
});

passButton.addEventListener('click', () => {
    passModal.style.display = 'block';
});

closePassModal.addEventListener('click', () => {
    passModal.style.display = 'none';
});

stakingButton.addEventListener('mousedown', () => {
    stakingClickCount++;
    if (stakingClickCount === 3) {
        openStakingModal();
        stakingClickCount = 0;
    }
});

closeStakingModal.addEventListener('click', () => {
    stakingModal.style.display = 'none';
});

stakeButton.addEventListener('click', () => {
    const amount = parseInt(stakeAmount.value);
    if (!isNaN(amount) && amount > 0 && amount <= score) {
        stakedAmount += amount;
        score -= amount;
        stakingEarnings += amount;
        updateScore();
        updateStaking();
    }
});

claimStakingButton.addEventListener('click', () => {
    score += stakingEarnings;
    stakingEarnings = 0;
    updateScore();
    updateStaking();
    showEarnings(stakingEarnings);
});

claimEarningsButton.addEventListener('click', () => {
    earningsModal.style.display = 'none';
});

closeEarningsModal.addEventListener('click', () => {
    earningsModal.style.display = 'none';
});

function updateScore() {
    scoreElement.textContent = `${score} монет`;
}

function updateStaking() {
    stakedAmountElement.textContent = stakedAmount;
    stakingProfitElement.textContent = (stakedAmount * 0.1).toFixed(2);
    stakingEarningsElement.textContent = stakingEarnings;
}

function openStakingModal() {
    stakingModal.style.display = 'block';
}

function showEarnings(amount) {
    earnedAmountElement.textContent = amount;
    earnedAnimationAmount.textContent = amount;
    earningsModal.style.display = 'block';
    earnedAnimation.style.display = 'block';
    setTimeout(() => {
        earnedAnimation.style.display = 'none';
    }, 3000);
}

// Логика начисления прибыли каждую минуту
setInterval(() => {
    const profit = stakedAmount * 0.1;
    score += profit;
    stakingEarnings += profit;
    updateScore();
    updateStaking();
}, 60000);

// При заходе в игру
document.addEventListener('DOMContentLoaded', () => {
    updateScore();
    updateStaking();
});
