import { gql } from '@apollo/client'

import CustomLink from '~/src/components/_shared/CustomLink'
import { Paths } from '~/src/constants'
import { FindPokemonsQuery } from '~/src/graphql/pokemon/generated/client'
import client from '~/src/lib/apollo-client'

type Props = FindPokemonsQuery

const PokemonServer: React.VFC<Props> = (props) => {
  return (
    <div className="mx-16">
      <div className="flex justify-center">
        <ul className="pb-16">
          {props.pokemons.map((pokemon, i) => (
            <li className="py-2" key={pokemon.name}>
              <span>00{i + 1}</span>: {pokemon.name}
            </li>
          ))}
        </ul>
      </div>

      <p className="text-center">
        <CustomLink path={Paths.pokemons}>
          <a className="link">back</a>
        </CustomLink>
      </p>
    </div>
  )
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query FindPokemons {
        pokemons(first: 9) {
          name
        }
      }
    `,
  })

  return {
    props: {
      pokemons: data.pokemons,
    },
  }
}

export default PokemonServer
