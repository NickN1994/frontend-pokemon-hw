import {useEffect, useState} from "react";
import axios from "axios";


function PokemonCard({name}) {
    const [pokemon, setPokemon] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");


    useEffect(() => {
        const abortController = new AbortController();
        async function fetchPokemonCard() {
            try {
                setIsLoading(true);
                setError(false);
                const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`, {
                    signal: abortController.signal,
                });
                setPokemon(result.data);
                // console.log(result)
            } catch (e) {
                console.error(e);
                // setError("something went wrong");
            } finally {
                setIsLoading(false);
            }
        }

        fetchPokemonCard();
        return () => {
            console.log("Clean up");
            abortController.abort();
        };
    }, [name]);

    return (
        <>

            {
                Object.keys(pokemon).length > 0 && (
                    <div className="card">
                        <h2>{pokemon.name}</h2>
                        <img src={pokemon.sprites.front_default} alt="afbeeldign"/>
                        <p>Moves: {pokemon.moves.length}</p>
                        <p>Weight: {pokemon.weight}</p>
                        <p>Abilities</p>
                        <p>{pokemon.abilities[0].ability.name}</p>
                    </div>
                )
            }
        </>
    );
}

export default PokemonCard;