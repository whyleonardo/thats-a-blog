import * as prismic from '@prismicio/client'

export const getPrismicClient = (req?: unknown) => {
  const prismicClient = prismic.createClient(process.env.PRISMIC_ENDPOINT, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    // @ts-ignore
    req
  })

  return prismicClient
}
