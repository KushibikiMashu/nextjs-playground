import { gql } from '@apollo/client'

import CustomLink from '~/src/components/_shared/CustomLink'
import PokemonList from '~/src/components/pokemon/PokemonList'
import { Paths } from '~/src/constants'
import { FindPokemonsQuery } from '~/src/graphql/pokemon/generated/client'
import client from '~/src/lib/apollo-client'

type Props = FindPokemonsQuery

const PokemonServer: React.VFC<Props> = (props) => {
  return (
    <div className="mx-16">
      <h1 className="pt-8 pb-4 text-xl text-center">
        <span className="font-bold">Server</span> Side Rendering
      </h1>

      <PokemonList pokemons={props.pokemons} />

      <p className="text-center">
        <CustomLink path={Paths.pokemons}>
          <a className="link">back</a>
        </CustomLink>
      </p>
    </div>
  )
}

export async function getServerSideProps() {
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
