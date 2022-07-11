const leaderboardListEl = document.getElementById("leadboard-list");

function getExistingScores() {
  let leaderboard = JSON.parse(localStorage.getItem("leaderboard"));

  if (!leaderboard && !Array.isArray(leaderboard)) {
    leaderboard = [];
  }

  return leaderboard;
}

function changeFloatToPercentage(num) {
  switch (num) {
    case 1:
        return "100%"
    case 0:
        return "0%"
    default:
      return num.toString().slice(num.indexOf(".") + 1) + "%";
  }
}

function renderListItem(scores) {
  for (let i = 0; i < scores.length; i++) {
    const score = scores[i];
    const newScoreEl = document.createElement("li");
    newScoreEl.textContent = `${score.playerName}: ${changeFloatToPercentage(score.percentage)}`;

    leaderboardListEl.append(newScoreEl);
  }
}

renderListItem(getExistingScores());
