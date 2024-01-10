import {useEffect, useState} from "react";
import axios from "axios";


function PokemonCard({name}) {
    const [pokemon, setPokemon] = useState({});

    useEffect(() => {
        async function fetchPokemonCard() {
            try {
                const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
                setPokemon(result.data);
                console.log(result)
            } catch (e) {
                console.error(e);
            }

        }

        fetchPokemonCard();
    }, []);

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
                        <ul>
                            <li><p>{pokemon.abilities[0].ability.name}</p></li>
                            <li><p>{pokemon.abilities[1].ability.name}</p></li>
                        </ul>
                    </div>
                )
            }
        </>
    );
}

export default PokemonCard;