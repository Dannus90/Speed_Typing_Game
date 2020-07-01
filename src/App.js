import React from "react";
import HomePage from "./components/pages/HomePage/HomePage.component";
import { ReactQueryDevtools } from "react-query-devtools";

import "./App.css";

function App() {
    return (
        <div className="App">
            <HomePage />
            <ReactQueryDevtools initialIsOpen={false} />
        </div>
    );
}

export default App;
