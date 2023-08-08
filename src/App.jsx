import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import SearchForm from "./components/SearchForm";

function App() {
    return (
        <div className="App">
            <h1>GitHub Search</h1>
            <SearchForm />
        </div>
    );
}

export default App;
