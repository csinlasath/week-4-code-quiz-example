const leaderboardListEl = document.getElementById("leadboard-list");

const MAX_NUM_SCORES_TO_SHOW = 10;

function getExistingScores() {
  let leaderboard = JSON.parse(localStorage.getItem("leaderboard"));

  if (!leaderboard && !Array.isArray(leaderboard)) {
    leaderboard = [];
  }

  return leaderboard;
}

function sortDecending(arr) {
  const toReturn = arr;

  toReturn.sort(function (a, b) {
    return b.percentage - a.percentage;
  });

  return toReturn;
}

function changeFloatToPercentage(num) {
  switch (parseFloat(num)) {
    case 1.00:
      return "100%";
    case 0.00:
      return "0%";
    default:
      return num.toString().slice(num.indexOf(".") + 1) + "%";
  }
}

function renderListItem(scores) {
  let sortedScores = sortDecending(scores);
  if (sortedScores.length > MAX_NUM_SCORES_TO_SHOW) {
    sortedScores = sortedScores.slice(0, MAX_NUM_SCORES_TO_SHOW - 1);
  }
  
  for (let i = 0; i < sortedScores.length; i++) {
    const score = sortedScores[i];
    const newScoreEl = document.createElement("li");
    newScoreEl.textContent = `${score.playerName}: ${changeFloatToPercentage(
      score.percentage
    )}`;

    leaderboardListEl.append(newScoreEl);
  }
}

renderListItem(getExistingScores());
