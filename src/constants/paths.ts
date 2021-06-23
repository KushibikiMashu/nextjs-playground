export const Paths = {
  top: '/',
  'next-auth': '/next-auth',
  'next-auth/protected': '/next-auth/protected',
  redux: '/redux',
  'i18n-blog/first-blog': '/i18n-blog/first-blog',
  recoil: '/recoil',
  gameOfLife: '/game-of-life',
  rerender: '/re-render',
  clientFetch: '/client-fetch',
  useReducer: '/use-reducer',
  modals: '/modals',
  'api/posts': '/api/posts',
} as const

export type PathKey = keyof typeof Paths
export type Path = typeof Paths[PathKey]

type WithoutSlash<T> = T extends `/${infer U}` ? U : never
type Resource<T> = T extends `${infer U}/${infer S}` ? U | Resource<S> : T
type DynamicRoute<T> = T extends `[${infer U}]` ? U : never

type Params<T> = DynamicRoute<Resource<WithoutSlash<T>>>
type ParamKeys<T extends Path> = Params<T>

type PathParams<T extends Path> = {
  path: T
  params?: { [K in ParamKeys<T>]: string | number }
}
export type CustomLinkArgs<T extends Path> = ParamKeys<T> extends never ? PathParams<T> : Required<PathParams<T>>

export function createPath<T extends Path>({ path, params }: CustomLinkArgs<T>) {
  if (!params) {
    return path
  }

  return path
    .split('/')
    .map((str) => {
      const match = str.match(/\[(.*?)\]/)
      if (match) {
        const key = match[0]
        const trimmed = key.substring(1, key.length - 1) as ParamKeys<typeof path>
        return params[trimmed]
      }
      return str
    })
    .join('/')
}
