import { gql, useQuery } from '@apollo/client'
import { useState } from 'react'
import { PokemonList } from '~/src/components/pokemon'
import { FindPokemonsQuery } from '~/src/graphql/pokemon/generated/client'
import useAutoFocus from '~/src/hooks/useAutoFocus'

function useInputNumber() {
  const [first, setFirst] = useState(9)
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

  return { first, numberError, onChange: handleChange }
}

const Query = gql`
  query FindPokemons($first: Int!) {
    pokemons(first: $first) {
      name
    }
  }
`

type Props = unknown

const ClientPokemonList: React.VFC<Props> = () => {
  const { first, numberError, onChange } = useInputNumber()
  const { data, loading, error } = useQuery<FindPokemonsQuery>(Query, {
    variables: { first: first },
  })
  const ref = useAutoFocus<HTMLInputElement>()

  return (
    <div>
      <div className="pt-4 pb-8 text-center space-x-4 flex flex-col justify-center">
        <div className="pb-4">
          <input
            id="count"
            className="w-32 px-2 py-1 border border-teal-600 rounded-md focus:outline-none"
            type="number"
            min="1"
            max="151"
            placeholder="9"
            onChange={onChange}
            value={first}
            ref={ref}
          />
          {numberError && <p className="pt-2 text-red-600">{numberError}</p>}
        </div>
        <label className="text-sm" htmlFor="count">
          The number of Pokemons you want to fetch
        </label>
      </div>

      {loading ? (
        <p className="pb-8 text-center">loading...</p>
      ) : error ? (
        <p className="pb-8 text-center">error: {error.message}</p>
      ) : (
        <PokemonList pokemons={data.pokemons} />
      )}
    </div>
  )
}

export default ClientPokemonList
