import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.styles.scss";

const LandingPage = () => {
    return (
        <div className="landing-page-wrapper">
            <div className="game-information-container">
                <h1>Welcome to Speed-Typer</h1>
                <Link className="game-information-container-link" to="/game">
                    <p>Click to play!</p>
                </Link>
            </div>
        </div>
    );
};

export default LandingPage;
