import { gql, useQuery } from '@apollo/client'
import CustomLink from '~/src/components/_shared/CustomLink/CustomLink'
import PokemonList from '~/src/components/pokemon'
import { Paths } from '~/src/constants'
import { FindPokemonsQuery } from '~/src/graphql/pokemon/generated/client'

const Query = gql`
  query FindPokemons {
    pokemons(first: 9) {
      name
    }
  }
`

const PokemonClient: React.VFC = () => {
  const { data, loading, error } = useQuery<FindPokemonsQuery>(Query)

  if (loading) {
    return <p className="pt-8 text-center">loading...</p>
  }

  if (error) {
    return <p className="pt-8 text-center">error: {error.message}</p>
  }

  return (
    <div className="mx-16">
      <h1 className="pt-8 pb-4 text-xl text-center">
        <span className="font-bold">Client</span> Side Rendering
      </h1>

      <PokemonList pokemons={data.pokemons} />

      <p className="text-center">
        <CustomLink path={Paths.pokemons}>
          <a className="link">back</a>
        </CustomLink>
      </p>
    </div>
  )
}

export default PokemonClient
