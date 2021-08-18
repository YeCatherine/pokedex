import React from 'react';
import './App.css';
import useLocalStorage from "./Hooks/useLocalStorage";
import IPokemonData from "./Types/Pokemon";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import PokemonList from "./Components/PokemonList";
import PokemonPage from "./Components/PokemonPage";

function App() {
    const [capturedPokemonList, setCapturedPokemonList] = useLocalStorage<Array<IPokemonData>>('capturedPokemonList', []);

    const checkCapturedPokemon = (pokemon: IPokemonData) => {
        const finding = capturedPokemonList.find(currentPokemon => currentPokemon.name === pokemon.name);
        return typeof finding === 'object';
    }

    const setCapturePokemon = (pokemon: IPokemonData) => {
        if (checkCapturedPokemon(pokemon)) {
            setCapturedPokemonList(capturedPokemonList.filter(currentPokemon => currentPokemon.name !== pokemon.name));
        } else {
            setCapturedPokemonList([...capturedPokemonList, pokemon])
        }
    }

    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/" exact>
                        <PokemonList checkCapturedPokemon={checkCapturedPokemon} setCapturePokemon={setCapturePokemon}/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
