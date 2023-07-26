var gameData = {
    ATP: 0,
    ATPPerClick: 1,
    ATPPerSecond: 0,
    photosynthesisCount: 0,
    photosynthesisATPPerSecond: 1,
    buyPhotosynthesisCost: 10,
    respirationCount: 0,
    respirationATPPerSecond: 10,
    buyRespirationCost: 100,
    phagocytosisCount: 0,
    phagocytosisATPPerSecond: 100,
    buyPhagocytosisCost: 1000,
    cytoskeletonCount: 0,
    upgradeCytoskeletonCost: 100,
    enzymeCount: 0,
    upgradeEnzymeCost: 1000,
    organelleCount: 0,
    upgradeOrganlleCost: 10000,
    won: false
}

var savegame = JSON.parse(localStorage.getItem("cellIncrementalSave"))
if (savegame !== null) {
    gameData = savegame;
    updateUI();
}

function gainATP() {
    gameData.ATP += gameData.ATPPerClick
    if (gameData.ATP > 100000) {
        gameData.ATP = 100000;
    }
    document.getElementById("atp-count").innerHTML = gameData.ATP;
}

function buyPhotosynthesis() {
    if (gameData.ATP >= gameData.buyPhotosynthesisCost) {
        gameData.ATP -= gameData.buyPhotosynthesisCost
        gameData.photosynthesisCount += 1
        gameData.buyPhotosynthesisCost *= 2
        updateResources();
        updateUI();
    }
}

function buyRespiration() {
    if (gameData.ATP >= gameData.buyRespirationCost) {
        gameData.ATP -= gameData.buyRespirationCost
        gameData.respirationCount += 1
        gameData.buyRespirationCost *= 2
        updateResources();
        updateUI();
    }
}

function buyPhagocytosis() {
    if (gameData.ATP >= gameData.buyPhagocytosisCost) {
        gameData.ATP -= gameData.buyPhagocytosisCost
        gameData.phagocytosisCount += 1
        gameData.buyPhagocytosisCost *= 2
        updateResources();
        updateUI();
    }
}

function upgradeCytoskeleton() {
    if (gameData.ATP >= gameData.upgradeCytoskeletonCost) {
        gameData.ATP -= gameData.upgradeCytoskeletonCost;
        gameData.cytoskeletonCount += 1;
        gameData.upgradeCytoskeletonCost *= 10;
        gameData.ATPPerClick *= 10;
        updateResources();
        updateUI();
    }
}

function upgradeEnzyme() {
    if (gameData.ATP >= gameData.upgradeEnzymeCost) {
        gameData.ATP -= gameData.upgradeEnzymeCost;
        gameData.enzymeCount += 1;
        gameData.upgradeEnzymeCost *= 10;
        gameData.photosynthesisATPPerSecond *= 2;
        gameData.respirationATPPerSecond *= 2;
        gameData.phagocytosisATPPerSecond *= 2;
        updateResources();
        updateUI();
    }
}

function upgradeOrganelle() {
    if (gameData.ATP >= gameData.upgradeOrganlleCost) {
        gameData.ATP -= gameData.upgradeOrganlleCost;
        gameData.organelleCount += 1;
        gameData.upgradeOrganlleCost *= 10;
        gameData.ATPPerClick *= 2;
        gameData.photosynthesisATPPerSecond *= 2;
        gameData.respirationATPPerSecond *= 2;
        gameData.phagocytosisATPPerSecond *= 2;
        updateResources();
        updateUI();
    }
}

function updateResources() {
    // Calculate ATP from Photosynthesis
    const ATPFromPhotosynthesis = gameData.photosynthesisCount * gameData.photosynthesisATPPerSecond

    // Calculate ATP from Cellular Respiration
    const ATPFromRespiration = gameData.respirationCount * gameData.respirationATPPerSecond

    // Calculate ATP from Phagocytosis
    const ATPFromPhagocytosis = gameData.phagocytosisCount * gameData.phagocytosisATPPerSecond

    gameData.ATPPerSecond = ATPFromPhotosynthesis + ATPFromRespiration + ATPFromPhagocytosis
    gameData.ATP += gameData.ATPPerSecond

    // End game if ATP is over 100,000
    if (gameData.ATP > 100000) {
        gameData.ATP = 100000;
        if (!gameData.won) {
            win();
        }
    }
}

function updateUI() {
    // ====================
    // ATP
    // ====================

    document.getElementById("atp-count").innerHTML = gameData.ATP
    document.getElementById("atp-per-click").innerHTML = gameData.ATPPerClick
    document.getElementById("atp-per-second").innerHTML = gameData.ATPPerSecond

    // ====================
    // Generators
    // ====================

    // Photosynthesis
    document.getElementById("photosynthesis-cost").innerHTML = gameData.buyPhotosynthesisCost
    document.getElementById("photosynthesis-count").innerHTML = gameData.photosynthesisCount
    document.getElementById("photosynthesis-atp-per-second").innerHTML = gameData.photosynthesisATPPerSecond

    // Cellular Respiration
    document.getElementById("respiration-cost").innerHTML = gameData.buyRespirationCost
    document.getElementById("respiration-count").innerHTML = gameData.respirationCount
    document.getElementById("respiration-atp-per-second").innerHTML = gameData.respirationATPPerSecond

    // Phagocytosis
    document.getElementById("phagocytosis-cost").innerHTML = gameData.buyPhagocytosisCost
    document.getElementById("phagocytosis-count").innerHTML = gameData.phagocytosisCount
    document.getElementById("phagocytosis-atp-per-second").innerHTML = gameData.phagocytosisATPPerSecond

    // ====================
    // Upgrades
    // ====================

    // Cytoskeleton
    document.getElementById("cytoskeleton-cost").innerHTML = gameData.upgradeCytoskeletonCost
    document.getElementById("cytoskeleton-count").innerHTML = gameData.cytoskeletonCount

    // Enzyme
    document.getElementById("enzyme-cost").innerHTML = gameData.upgradeEnzymeCost
    document.getElementById("enzyme-count").innerHTML = gameData.enzymeCount

    // Organelle
    document.getElementById("organelle-cost").innerHTML = gameData.upgradeOrganlleCost
    document.getElementById("organelle-count").innerHTML = gameData.organelleCount
}

var mainGameLoop = window.setInterval(function () {
    updateResources();
    updateUI();
    document.getElementById("atp-count").innerHTML = gameData.ATP
}, 1000)

var saveGameLoop = window.setInterval(function () {
    localStorage.setItem("cellIncrementalSave", JSON.stringify(gameData))
}, 15000)

function win() {
    gameData.won = true;
    document.getElementById("goal").innerHTML = "Goal: Reach 100,000 ATP. - Complete";
    alert("You won!");
}