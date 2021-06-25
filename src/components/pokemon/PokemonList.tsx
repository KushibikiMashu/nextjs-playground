import { FindPokemonsQuery } from '~/src/graphql/pokemon/generated/client'

type Props = FindPokemonsQuery

const PokemonList: React.VFC<Props> = (props) => {
  return (
    <div className="flex justify-center">
      <ul className="pb-16">
        {props.pokemons.map((pokemon, i) => (
          <li className="py-2" key={pokemon.name}>
            <span>00{i + 1}</span>: {pokemon.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PokemonList
