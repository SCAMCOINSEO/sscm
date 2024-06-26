document.addEventListener("DOMContentLoaded", function () {
    let coins = 0;
    let stakedCoins = 0;
    let stakingEarnings = 0;
    let rank = 1;
    let stakingRate = 0.1 / 60; // 10% в час
    const rankRequirements = [100, 1000, 10000]; // Добавьте остальные требования к рангу
    const rankRewards = [10, 100, 1000]; // Добавьте остальные награды за ранги

    const scoreElement = document.getElementById("score");
    const rankElement = document.getElementById("rank");
    const stakingEarningsElement = document.getElementById("stakingEarnings");
    const stakedAmountElement = document.getElementById("stakedAmount");
    const stakingProfitElement = document.getElementById("stakingProfit");
    const earnedAmountElement = document.getElementById("earnedAmount");
    const earnedAnimationElement = document.getElementById("earnedAnimation");
    const earnedAnimationAmountElement = document.getElementById("earnedAnimationAmount");

    const stakingButton = document.getElementById("stakingButton");
    const clickerButton = document.getElementById("clickerButton");
    const passButton = document.getElementById("passButton");
    const stakeButton = document.getElementById("stakeButton");
    const claimEarningsButton = document.getElementById("claimEarningsButton");

    const passModal = document.getElementById("passModal");
    const stakingModal = document.getElementById("stakingModal");
    const earningsModal = document.getElementById("earningsModal");
    const rankTable = document.getElementById("rankTable");

    const closePassModal = document.getElementById("closePassModal");
    const closeStakingModal = document.getElementById("closeStakingModal");

    function updateScore() {
        scoreElement.textContent = `${coins} монет`;
    }

    function updateRank() {
        rankElement.textContent = `Ранг ${rank}`;
    }

    function updateStakingEarnings() {
        stakingEarningsElement.textContent = `${stakingEarnings.toFixed(2)} монет`;
    }

    function updateStakedAmount() {
        stakedAmountElement.textContent = stakedCoins;
    }

    function updateStakingProfit() {
        stakingProfitElement.textContent = `${(stakedCoins * stakingRate * 60).toFixed(2)}`;
    }

    function earnCoins(amount) {
        coins += amount;
        updateScore();
    }

    function stakeCoins(amount) {
        if (coins >= amount) {
            coins -= amount;
            stakedCoins += amount;
            updateScore();
            updateStakedAmount();
            updateStakingProfit();
        }
    }

    function claimStakingEarnings() {
        coins += stakingEarnings;
        stakingEarnings = 0;
        updateScore();
        updateStakingEarnings();
    }

    function showModal(modal) {
        modal.style.display = "block";
    }

    function closeModal(modal) {
        modal.style.display = "none";
    }

    function checkRank() {
        if (rank < rankRequirements.length && coins >= rankRequirements[rank]) {
            coins += rankRewards[rank];
            rank++;
            updateScore();
            updateRank();
        }
    }

    stakingButton.addEventListener("click", function () {
        showModal(stakingModal);
    });

    clickerButton.addEventListener("click", function () {
        earnCoins(1);
        checkRank();
    });

    passButton.addEventListener("click", function () {
        showModal(passModal);
    });

    stakeButton.addEventListener("click", function () {
        const amount = parseInt(document.getElementById("stakeAmount").value);
        if (isNaN(amount) || amount <= 0) return;
        stakeCoins(amount);
        closeModal(stakingModal);
    });

    claimEarningsButton.addEventListener("click", function () {
        claimStakingEarnings();
        closeModal(earningsModal);
        earnedAnimationElement.style.display = "block";
        earnedAnimationAmountElement.textContent = stakingEarnings.toFixed(2);
        setTimeout(() => {
            earnedAnimationElement.style.display = "none";
        }, 3000);
    });

    closePassModal.addEventListener("click", function () {
        closeModal(passModal);
    });

    closeStakingModal.addEventListener("click", function () {
        closeModal(stakingModal);
    });

    setInterval(function () {
        if (stakedCoins > 0) {
            stakingEarnings += stakedCoins * stakingRate;
            updateStakingEarnings();
        }
    }, 1000);

    // Обработка клика по иконкам в футере
    document.getElementById("homeButton").addEventListener("click", function () {
        alert("Домой");
    });

    document.getElementById("referralsButton").addEventListener("click", function () {
        alert("Рефералы");
    });

    document.getElementById("tasksButton").addEventListener("click", function () {
        alert("Задания");
    });

    document.getElementById("walletButton").addEventListener("click", function () {
        alert("Кошелек");
    });
});
