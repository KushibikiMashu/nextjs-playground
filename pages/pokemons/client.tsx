import { gql, useQuery } from '@apollo/client'
import { useState } from 'react'
import CustomLink from '~/src/components/_shared/CustomLink/CustomLink'
import PokemonList from '~/src/components/pokemon'
import { Paths } from '~/src/constants'
import { FindPokemonsQuery } from '~/src/graphql/pokemon/generated/client'

const Query = gql`
  query FindPokemons($first: Int!) {
    pokemons(first: $first) {
      name
    }
  }
`

const PokemonClient: React.VFC = () => {
  const [first, setFirst] = useState(9)
  const { data, loading, error } = useQuery<FindPokemonsQuery>(Query, {
    variables: { first },
  })
  const [numberError, setNumberError] = useState('')
  const handleChange = (e) => {
    const value = e.target.value

    if (value === '') {
      setFirst(0)
      return
    }

    if (value < 0 || value > 151) {
      const message = `Invalid value: ${value}. Number must be between 1 and 151.`
      setNumberError(message)
      return
    }

    setNumberError('')
    setFirst(e.target.value)
  }

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

      <div className="pt-4 pb-8 text-center space-x-4 flex flex-col justify-center">
        <div className="pb-4">
          <input
            id="count"
            className="w-32 px-2 py-1 border border-teal-600 rounded-md focus:outline-none"
            type="number"
            min="1"
            max="151"
            placeholder="9"
            onChange={handleChange}
            value={first}
          />
          {numberError && <p className="pt-2 text-red-600">{numberError}</p>}
        </div>
        <label className="text-sm" htmlFor="count">
          The number of Pokemons you want to fetch
        </label>
      </div>

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
