import React, { useState, useEffect } from "react";
import "./HomePage.styles.scss";
import axios from "axios";

const HomePage = () => {
    const [word, setWord] = useState("");
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState("");
    const [score, setScore] = useState(0);
    const [numberOfGeneratedWords, setNumberOfGeneratedWords] = useState(0);
    const [borderStyle, setBorderStyle] = useState("");

    //Initially loading randow word
    useEffect(() => {
        setLoading(true);
        (async () => {
            let res = await axios.get(
                "https://random-word-api.herokuapp.com/word?number=1"
            );
            let randomWord = res.data[0];
            setLoading(false);
            setWord(randomWord);
            setNumberOfGeneratedWords(numberOfGeneratedWords + 1);
        })();
    }, []);

    // StartTimer
    const timerStart = () => {
        console.log(numberOfGeneratedWords);
        console.log("working");
    };

    //Handling inputchange and Checking if game should start
    const inputHandler = (e) => {
        setInput(e.target.value);
        let wordTextMatch = word.substring(0, e.target.value.length);

        if (numberOfGeneratedWords === 1 && e.target.value.length === 1) {
            timerStart();
        }

        if (e.target.value.toLowerCase() === word.toLowerCase()) {
            setScore(score + 1);
            getRandomWord();
            setNumberOfGeneratedWords(numberOfGeneratedWords + 1);
            setInput("");
            setBorderStyle("4px solid #429890");
        } else {
            if (e.target.value.toLowerCase() === wordTextMatch) {
                setBorderStyle("4px solid #65CCf3");
            } else {
                setBorderStyle("4px solid #C30101");
            }
        }

        return;
    };

    //Reseting game
    const resetGame = () => {
        getRandomWord();
        setInput("");
        setScore(0);
        setNumberOfGeneratedWords(1);
        setBorderStyle("");
    };

    //Generate random word
    const getRandomWord = async () => {
        let res = await axios.get(
            "https://random-word-api.herokuapp.com/word?number=1"
        );
        let randomWord = res.data[0];

        return setWord(randomWord);
    };

    return (
        <div className="Homepage-wrapper">
            <h1 className="game-title">Speed-Typer</h1>
            <div className="game-container">
                <div className="text-to-type">
                    <h3>Text to type:</h3>
                    {loading ? <p>Loading...</p> : <p>{word}</p>}
                </div>
                <input
                    type="text"
                    className="text-area-input"
                    placeholder="Type your words here"
                    value={input}
                    onChange={inputHandler}
                    style={{ border: borderStyle }}
                />
                <div className="timer-button-container">
                    <div className="timer">
                        <p>01:00:00</p>
                    </div>
                    <button className="start-button" onClick={resetGame}>
                        Reset Game
                    </button>
                </div>
            </div>
            <div className="score-display">
                <p>Score: {score}</p>
            </div>
        </div>
    );
};

export default HomePage;
