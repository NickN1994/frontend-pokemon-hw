import './App.css'
import {useEffect, useState} from "react";
import PokemonCard from "./PokemonCard.jsx";
import axios from "axios";
import buttonMinusHelper from "./buttonMinusHelper.js";
import buttonAddHelper from "./buttonAddHelper.js";

function App() {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [pokemons, setPokemons] = useState([]);
    const [endpoint, setEndpoint] = useState("https://pokeapi.co/api/v2/pokemon/");
    const [number, setNumber] = useState(0);
    // const [minusTwenty, setMinusTwenty] = useState(0);



    useEffect(() => {
        const abortController = new AbortController();

        async function fetchPokemon() {

            try {
                setIsLoading(true);
                setError(false);
                // const response = await axios.get(endpoint, {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${number}&limit=20`, {
                    signal: abortController.signal,
                });
                // console.log(response.data.results)
                setPokemons(response.data.results);
            } catch (e) {
                console.error(e)
            } finally {
                setIsLoading(false);
            }
        }

        fetchPokemon();
        return () => {
            console.log("Clean up");
            abortController.abort();
        };
    }, [number]);

    const prevClick = () => {

        setNumber(buttonMinusHelper(number))
    }

    const nextClick = () => {
        setNumber(buttonAddHelper(number))
    }

    // const isdisabled = () => {
    //     if (number === 0) {
    //         return disabled;
    //     }
    // }


    return (
        <>
            <div className="outer-container">
                <div className="inner-container">
                    <h1>Gotta catch em all!</h1>
                    {isLoading && <h3>Loading...</h3>}
                    {error && <h2>{error}</h2>}
                    <div>
                        <button type="button" onClick={prevClick}>Vorige</button>
                        <button type="button" onClick={nextClick}>Volgende</button>
                    </div>
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
