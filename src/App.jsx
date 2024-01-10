import './App.css'
import {useEffect, useState} from "react";
import PokemonCard from "./PokemonCard.jsx";
import axios from "axios";

function App() {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        const abortController = new AbortController();

        async function fetchPokemon() {

            try {
                setIsLoading(true);
                const response = await axios.get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20", {
                    signal: abortController.signal,
                });
                console.log(response.data.results)
                setPokemons(response.data.results);
            } catch (e) {
                console.error(e)
            }
        }

        fetchPokemon();
        return () => {
            console.log("Clean up");
            abortController.abort();
        };
    }, []);

    return (
        <>
            <div className="outer-container">
                <div className="inner-container">
                    <h1>Gotta catch em all!</h1>
                    <div className="cardsRow">

                    {pokemons.length > 0 && pokemons.map((pokemon, index) => {
                        return (
                            <PokemonCard
                                key={index}
                                name={pokemon.name}
                            />
                        )
                    })}
                    </div>
                </div>
            </div>

        </>
    )
}

export default App
