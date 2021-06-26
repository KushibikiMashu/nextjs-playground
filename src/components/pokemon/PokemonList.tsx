import { FindPokemonsQuery } from '~/src/graphql/pokemon/generated/client'

type Props = FindPokemonsQuery

const PokemonList: React.VFC<Props> = (props) => {
  return (
    <div>
      <h2 className="pb-4 text-xl text-teal-600 text-center">Pokemon List</h2>
      <div className="flex justify-center">
        <ul className="pb-16">
          {props.pokemons.map((pokemon, i) => (
            <li className="py-2" key={pokemon.name}>
              <span>{`${i + 1}`.padStart(3, '00')}</span>: {pokemon.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default PokemonList
