// @ts-nocheck
import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from "next-auth/react"

import Header from '@components/layout/Header'
import { useRouter } from 'next/router'
import theme from '../styles/theme'
import { AnimatePresence } from 'framer-motion';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const location = useRouter()

  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Header />
        <AnimatePresence exitBeforeEnter onExitComplete key={location.route}>
          <Component {...pageProps} />
        </AnimatePresence>
      </ChakraProvider>
    </SessionProvider>
  )
}

export default MyApp
