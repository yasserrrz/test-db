import React, { useState, useEffect } from 'react';
import './GuessNumber.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const GuessNumber = () => {
    const [secretNumber, setSecretNumber] = useState(null);
    const [guess, setGuess] = useState('');
    const [feedback, setFeedback] = useState('');
    const [attempts, setAttempts] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        setSecretNumber(Math.floor(Math.random() * 100) + 1);
    }, []);

    const handleGuessChange = (e) => {
        setGuess(e.target.value);
    };

    const handleGuessSubmit = (e) => {
        e.preventDefault();
        const guessNumber = parseInt(guess, 10);

        if (gameOver) {
            setFeedback("Refresh to play again!");
            return;
        }

        if (isNaN(guessNumber) || guessNumber < 0 || guessNumber > 100) {
            setFeedback("Please enter a number between 0 and 100.");
            return;
        }

        setAttempts(attempts + 1);

        if (guessNumber === secretNumber) {
            setFeedback(`Correct! You guessed the number in ${attempts} attempts.`);
            setGameOver(true);
        } else if (guessNumber < secretNumber) {
            setFeedback("Too low! Try again.");
        } else {
            setFeedback("Too high! Try again.");
        }

        if (attempts >= 5) {
            setFeedback(`You lose! The correct number was ${secretNumber}.`);
            setGameOver(true);
        }

        if (attempts >= 6) {
            setFeedback("Refresh to play again!");
        }

        setGuess(''); // Clear the input field after each guess
    };

    return (
        <div className="container game-container mt-5 mb-5">
            <h2 className="game-title">Number Guessing Game</h2>
            <p className="attempt-feedback">
                {`You tried ${attempts} time${attempts === 1 ? '' : 's'}`}
            </p>
            <p className="feedback">{feedback}</p>
            <form onSubmit={handleGuessSubmit} className="guess-form">
                <label>
                    Guess the number between 0 and 100:
                    <input
                        type="number"
                        value={guess}
                        onChange={handleGuessChange}
                        className="form-control guess-input"
                        min="0"
                        max="100"
                        disabled={gameOver}
                    />
                </label>
                <button type="submit" className="btn btn-dark guess-button" disabled={gameOver}>
                    Guess
                </button>
            </form>
        </div>
    );
};

export default GuessNumber;
