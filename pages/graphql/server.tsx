import { gql } from '@apollo/client'

import { FindPokemonsQuery } from '~/src/graphql/pokemon/generated/client'
import client from '~/src/lib/apollo-client'

type Props = {
  pokemons: FindPokemonsQuery
}

const PokemonServer: React.VFC<Props> = () => {
  return <div>aa</div>
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
