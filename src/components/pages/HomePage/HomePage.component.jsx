import React, { useState, useEffect, useRef } from "react";
import "./HomePage.styles.scss";
import axios from "axios";

import { useQuery } from "react-query";

const HomePage = () => {
    const [word, setWord] = useState("");
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState("");
    const [score, setScore] = useState(0);
    const [numberOfGeneratedWords, setNumberOfGeneratedWords] = useState(0);
    const [borderStyle, setBorderStyle] = useState("");
    const [timerElement, setTimerElement] = useState("01:00:00");
    const [timerRunning, setTimerRunning] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [placeholder, setPlaceholder] = useState(
        "Start typing to start the game..."
    );
    const [timer, setTimer] = useState([0, 0, 0, 60000]);
    const [showModal, setShowModal] = useState(true);

    function leadingZero(time) {
        if (time <= 9) {
            time = "0" + time;
        }

        return time;
    }

    const runTimer = () => {
        let updatedTime;

        if (timerRunning) {
            timer[3] -= 10;
            timer[0] = Math.floor(timer[3] / 1000 / 60);
            timer[1] = Math.floor(timer[3] / 1000);
            timer[2] = Math.floor((timer[3] - timer[1] * 1000) / 10);

            updatedTime =
                leadingZero(timer[0]) +
                ":" +
                leadingZero(timer[1]) +
                ":" +
                leadingZero(timer[2]);
            console.log(updatedTime);

            setTimerElement(updatedTime);
        }

        if (timerElement === "00:00:00") {
            setTimerElement("00:00:00");
            setGameOver(true);
            setShowModal(true);
            setTimerRunning(false);
        }
    };

    //Interval
    const useInterval = (callback, delay) => {
        const savedCallback = useRef();

        // Remember the latest callback.
        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);

        // Set up the interval.
        useEffect(() => {
            function tick() {
                savedCallback.current();
            }
            if (delay !== null) {
                let id = setInterval(tick, delay);
                return () => clearInterval(id);
            }
        }, [delay]);
    };

    // Conditionally running interval
    useInterval(
        () => {
            runTimer();
        },
        timerRunning ? 10 : null
    );

    const fetchData = async () => {
        const response = await fetch(
            "https://random-word-api.herokuapp.com/word?number=1000"
        );
        const data = await response.json();
        return data;
    };

    const { status, data, error } = useQuery("latest", fetchData);

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // StartTimer
    const timerStart = () => {
        setTimerRunning(true);
    };

    //Handling inputchange and Checking if game should start
    const inputHandler = (e) => {
        setInput(e.target.value);
        let wordTextMatch = word.substring(0, e.target.value.length);

        //Check if typing starts
        if (
            numberOfGeneratedWords === 1 &&
            e.target.value.length === 1 &&
            !gameOver &&
            !timerRunning
        ) {
            timerStart();
            setPlaceholder("");
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
        setPlaceholder("Start typing to start the game...");
        setTimerRunning(false);
        setTimerElement("01:00:00");
        setTimer([0, 0, 0, 60000]);
        setGameOver(false);
        setShowModal(false);
    };

    //Generate random word
    const getRandomWord = async () => {
        let RandomWord = data[Math.floor(Math.random() * data.length)];

        return setWord(RandomWord);
    };

    return (
        <div className="Homepage-wrapper">
            {showModal ? (
                <div className="gameover-modal">
                    <div className="modal-content-container">
                        <h2>Game over!</h2>
                        <p>Final score: {score}</p>
                        <button className="play-again" onClick={resetGame}>
                            Play Again!
                        </button>
                    </div>
                </div>
            ) : null}
            <h1 className="game-title">Speed-Typer</h1>
            <div className="game-container">
                <div className="text-to-type">
                    <h3>Text to type:</h3>
                    {loading ? (
                        <p>Loading...</p>
                    ) : status === loading ? (
                        <p>Loading...</p>
                    ) : status === "error" ? (
                        <p>Error! {error}</p>
                    ) : (
                        <p>{word}</p>
                    )}
                </div>
                <div className="input-container">
                    <input
                        type="text"
                        className="text-area-input"
                        placeholder={placeholder}
                        value={input}
                        onChange={inputHandler}
                        style={{ border: borderStyle }}
                    />
                </div>
                <div className="timer-button-container">
                    <div className="timer">
                        <p>{timerElement}</p>
                    </div>
                    <button className="start-button" onClick={resetGame}>
                        Reset Game
                    </button>
                    <div className="score-display">
                        <p>Score: {score}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
