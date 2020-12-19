import { Path, WithoutSlash } from '~/src/constants'

export type Page = {
  name: WithoutSlash<Path>
  path: Path
  description: string
}

export type Pages = Page[]
