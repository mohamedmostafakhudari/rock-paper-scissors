// Pre-execution values
const CHOICES = ["rock", "paper", "scissors"];
// const ROUNDS = 5;

/*
Game Function
  It should:
    - Keep scores
    - Declare Winner
*/
async function game() {
	const buttonsContainer = document.querySelector(".buttons-container");
	const playerChoices = [];
	const computerChoices = [];
	let userScore = 0;
	let computerScore = 0;
	let currentRound = 1;
	let scoreBoard = generateScoreBoard(0, 0);
	// Create a loop that will play 5 rounds
	while (userScore < 5 && computerScore < 5) {
		await playRound();
		scoreBoard = generateScoreBoard(userScore, computerScore);
		console.log(scoreBoard);
		currentRound++;
	}
	// Declare Winner
	console.log(declareWinner(scoreBoard));
	// Create a function to generate score board
	function generateScoreBoard(userScore = 0, computerScore = 0) {
		return {
			userScore,
			computerScore,
		};
	}
	// Create a function to declare winner
	function declareWinner(scoreBoard) {
		const { userScore, computerScore } = scoreBoard;
		if (userScore === computerScore) return "Tie";
		return `${userScore > computerScore ? "Player" : "Computer"} is the winner`;
	}
	async function playRound() {
		const playerChoice = await waitForUserSelect();
		const computerChoice = getComputerChoice();
		updateChoices(playerChoice, computerChoice);
		const winner = getRoundWinner();
		updateScore(winner);
		displayMessage(winner, playerChoice, computerChoice);
		console.log("playerChoices: ", playerChoices, "\n", "computerChoices: ", computerChoices);
		console.log("Round: ", currentRound);

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
		function getRoundWinner() {
			const winnerSign = checkWinner(playerChoice, computerChoice);
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

			function checkWinner(playerChoice, computerChoice) {
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

		function displayMessage(winner, playerChoice, computerChoice) {
			if (winner === "Player") {
				console.log(`You win! ${playerChoice} beats ${computerChoice}`);
			} else if (winner === "Computer") {
				console.log(`You lose! ${computerChoice} beats ${playerChoice}`);
			} else {
				console.log("It's a tie!");
			}
		}
	}

	function getComputerChoice() {
		const randomNumber = getRandomNumberInARange(0, 2);
		return CHOICES[randomNumber];
	}
	function getRandomNumberInARange(startIndex, endIndex) {
		return Math.floor(Math.random() * (endIndex + 1 - startIndex) + startIndex);
	}
	function updateScore(winner) {
		switch (winner) {
			case "Player":
				userScore++;
				break;
			case "Computer":
				computerScore++;
				break;
		}
	}
	function updateChoices(playerChoice, computerChoice) {
		playerChoices.push(playerChoice);
		computerChoices.push(computerChoice);
	}
}
game();
