import CustomLink from '~/src/components/_shared/CustomLink'
import { Paths } from '~/src/constants'

const Index: React.VFC = () => {
  return (
    <div className="mx-16">
      <div className="pt-8 pb-12 flex justify-center">
        <div>
          <h1 className="pb-8 text-center text-xl font-bold">GraphQL Query</h1>
          <pre>
            <code>
              {`query FindPokemons {
  pokemons(first: 9) {
    name
}
`}
            </code>
          </pre>
        </div>
      </div>

      <p className="pt-8 pb-24 text-center space-x-4">
        <CustomLink path={Paths['pokemons/server']}>
          <a className="link">server</a>
        </CustomLink>
        <CustomLink path={Paths['pokemons/server']}>
          <a className="link">client</a>
        </CustomLink>
      </p>

      <p className="pt-8">
        参考:{' '}
        <a className="link" href="https://kakakakakku.hatenablog.com/entry/2019/12/30/135420">
          GraphQL Pokémon を使って楽しく学ぶ GraphQL クエリ
        </a>
      </p>
    </div>
  )
}

export default Index
