// @ts-nocheck
import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from "next-auth/react"
import Header from '@components/layout/Header'
import theme from '../styles/theme'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Header />
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  )
}

export default MyApp
