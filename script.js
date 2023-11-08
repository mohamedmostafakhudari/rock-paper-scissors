// Pre-execution values
const CHOICES = ["rock", "paper", "scissors"];
const ROUNDS = 5;

/*
Game of 5 rounds
  It should:
    - Keep scores
    - Declare Winner
*/
function game() {
	const playerChoices = [];
	const computerChoices = [];
	let userScore = 0;
	let computerScore = 0;
	let currentRound = 1;
	let scoreBoard = generateScoreBoard(0, 0);
	// Create a loop that will play 5 rounds
	while (currentRound <= ROUNDS) {
		playRound();
		scoreBoard = generateScoreBoard(userScore, computerScore);
		console.log(scoreBoard);
		currentRound++;
	}
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

	// TODO - Create a function that will play a round
	function playRound() {
		const playerChoice = getUserChoice();
		if (playerChoice === undefined) {
			console.log("Invalid input");
			currentRound--;
			return;
		}
		updateChoices(playerChoices, playerChoice);
		const computerChoice = getComputerChoice();
		updateChoices(computerChoices, computerChoice);
		const winner = getRoundWinner();
		updateScore(winner);

		console.log("playerChoices: ", playerChoices, "\n", "computerChoices: ", computerChoices);
		console.log("Round: ", currentRound);
	}

	// TODO - Create a function that will get computer's choice
	function getComputerChoice() {
		const randomNumber = getRandomNumberInARange(0, 2);
		return CHOICES[randomNumber];
	}
	// TODO - Create a function that will prompt user's choice
	function getUserChoice() {
		const userChoiceIndex = prompt(`Choose rock, paper or scissors\n\n 0 - rock\n 1 - paper\n 2 - scissors`);
		return CHOICES[userChoiceIndex];
	}
	// Create a function to get a random number between 0 and 2
	function getRandomNumberInARange(startIndex, endIndex) {
		return Math.floor(Math.random() * (endIndex + 1 - startIndex) + startIndex);
	}

	// Create a function to
	function getRoundWinner() {
		const playerSelection = playerChoices[playerChoices.length - 1];
		const computerSelection = computerChoices[computerChoices.length - 1];
		const winnerSign = checkWinner(playerSelection, computerSelection);
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

		// Create a function to check the winner
		function checkWinner() {
			if (playerSelection === computerSelection) {
				return 0;
			} else if (
				(playerSelection === "rock" && computerSelection === "scissors") ||
				(playerSelection === "paper" && computerSelection === "rock") ||
				(playerSelection === "scissors" && computerSelection === "paper")
			) {
				return 1;
			} else {
				return -1;
			}
		}
	}

	// Create a function to update score
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
	// Create a function to update choices
	function updateChoices(choices, choice) {
		choices.push(choice);
	}
}
