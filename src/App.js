import React from "react";
import GamePage from "./components/pages/GamePage/GamePage.component";
import LandingPage from "./components/pages/LandingPage/LandingPage.component";
import { ReactQueryDevtools } from "react-query-devtools";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./App.css";

function App() {
    return (
        <Router>
            <div className="App">
                <AnimatePresence>
                    <Switch>
                        <Route exact path="/" component={LandingPage} />
                        <Route exact path="/game" component={GamePage} />
                        <ReactQueryDevtools initialIsOpen={false} />
                    </Switch>
                </AnimatePresence>
            </div>
        </Router>
    );
}

export default App;
