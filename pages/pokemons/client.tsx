import CustomLink from '~/src/components/_shared/CustomLink/CustomLink'
import { ClientPokemonList } from '~/src/components/pokemon'
import { Paths } from '~/src/constants'

const PokemonClient: React.VFC = () => {
  return (
    <div className="mx-16">
      <h1 className="pt-8 pb-4 text-xl text-center">
        <span className="font-bold">Client</span> Side Rendering
      </h1>

      <ClientPokemonList />

      <p className="text-center">
        <CustomLink path={Paths.pokemons}>
          <a className="link">back</a>
        </CustomLink>
      </p>
    </div>
  )
}

export default PokemonClient
