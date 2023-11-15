// Pre-execution values
const CHOICES = ["rock", "paper", "scissors"];

/*
Game Function
  It should:
    - Keep scores
    - Declare Winner
*/
// This game would run until either side reaches 5 points
async function game() {
	const buttonsContainer = document.querySelector(".buttons-container");
	const playerChoices = [];
	const computerChoices = [];
	let currentRound = 1;
	let scoreBoard = generateScoreBoard(0, 0);
	let resultMessage = "";
	while (scoreBoard.userScore < 5 && scoreBoard.computerScore < 5) {
		const roundData = await playRound();
		const { playerChoice, computerChoice, winner } = roundData;
		updateChoices(playerChoice, computerChoice);
		updateResultMessage(winner, playerChoice, computerChoice);
		displayResultMessage(resultMessage);
		updateScoreBoard(scoreBoard, winner);
		displayScoreBoard(scoreBoard);
		updateRound();
		displayRound();
	}

	declareWinner(scoreBoard);

	function updateRound() {
		currentRound++;
	}
	function displayRound() {
		const roundText = document.querySelector(".round-counter .current-round");
		roundText.textContent = currentRound;
	}
	function updateResultMessage(winner, playerChoice, computerChoice) {
		if (winner === "Player") {
			resultMessage = `You win! ${playerChoice} beats ${computerChoice}`;
		} else if (winner === "Computer") {
			resultMessage = `You lose! ${computerChoice} beats ${playerChoice}`;
		} else {
			resultMessage = "It's a tie!";
		}
	}
	function displayResultMessage(message) {
		const resultText = document.querySelector(".result-text");
		resultText.textContent = message;
	}
	function displayScoreBoard(scoreBoard) {
		const userScoreElement = document.querySelector("#user-score");
		const computerScoreElement = document.querySelector("#computer-score");
		userScoreElement.textContent = scoreBoard.userScore;
		computerScoreElement.textContent = scoreBoard.computerScore;
	}
	function generateScoreBoard(userScore = 0, computerScore = 0) {
		return {
			userScore,
			computerScore,
		};
	}
	function updateScoreBoard(scoreBoard, winner) {
		switch (winner) {
			case "Player":
				scoreBoard.userScore++;
				break;
			case "Computer":
				scoreBoard.computerScore++;
				break;
		}
	}
	function declareWinner(scoreBoard) {
		const winner = getGameWinner(scoreBoard);
		const message = generateWinnerMessage(winner);
		updateResultMessage(message);
		displayResultMessage(message);

		function generateWinnerMessage(winner) {
			switch (winner) {
				case "Player":
					return `You are the winner!`;
				case "Computer":
					return `Computer is the winner!`;
				case "Tie":
					return `It's a tie!`;
			}
		}
		function getGameWinner(scoreBoard) {
			let winner = calcGameWinner();
			return winner;
			function calcGameWinner() {
				const { userScore, computerScore } = scoreBoard;
				if (userScore === computerScore) return "Tie";
				return userScore > computerScore ? "Player" : "Computer";
			}
		}
	}

	function updateChoices(playerChoice, computerChoice) {
		playerChoices.push(playerChoice);
		computerChoices.push(computerChoice);
	}
	async function playRound() {
		const playerChoice = await waitForUserSelect();
		const computerChoice = getComputerChoice();
		const winner = getRoundWinner();
		return {
			winner,
			playerChoice,
			computerChoice,
		};
		function waitForUserSelect() {
			return new Promise((resolve) => {
				buttonsContainer.addEventListener("click", (e) => {
					const target = e.target;
					switch (target.id) {
						case "rock":
						case "paper":
						case "scissors":
							resolve(target.id);
					}
				});
			});
		}
		function getComputerChoice() {
			const randomNumber = getRandomNumberInARange(0, 2);
			return CHOICES[randomNumber];
		}
		function getRoundWinner() {
			const winnerSign = calcRoundWinner(playerChoice, computerChoice);
			switch (winnerSign) {
				case 0:
					return "Tie";

				case 1:
					return "Player";

				case -1:
					return "Computer";

				default:
					return "Error";
			}

			function calcRoundWinner(playerChoice, computerChoice) {
				if (playerChoice === computerChoice) {
					return 0;
				} else if (
					(playerChoice === "rock" && computerChoice === "scissors") ||
					(playerChoice === "paper" && computerChoice === "rock") ||
					(playerChoice === "scissors" && computerChoice === "paper")
				) {
					return 1;
				} else {
					return -1;
				}
			}
		}
	}
}
game();

function getRandomNumberInARange(startIndex, endIndex) {
	return Math.floor(Math.random() * (endIndex + 1 - startIndex) + startIndex);
}
