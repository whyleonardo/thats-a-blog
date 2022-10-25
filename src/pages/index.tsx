import { Flex, Heading, Text } from "@chakra-ui/react"
import Head from 'next/head'

const Home = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Flex>
        Hello World
      </Flex>
    </>
  )
}

export default Home