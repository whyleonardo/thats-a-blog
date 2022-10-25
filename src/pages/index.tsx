import { Stack, Heading, Text, Image, VStack, useBreakpoint } from "@chakra-ui/react"
import SubscribeButton from "@components/buttons/SubscribeButton"
import Head from 'next/head'

const Home = () => {
  const breakpoint = useBreakpoint()
  const isMobile = breakpoint === 'sm'

  return (
    <>
      <Head>
        <title>Home | .NEXT</title>
      </Head>

      <Stack
        direction={isMobile ? 'column' : 'row'}
        as={'main'}
        px='2rem'
        mt={isMobile ? '2rem' : 0}
        mx='auto'
        h='calc(100vh - 5rem)'
        maxW='1120px'
        alignItems='center'
        justifyContent={isMobile ? 'center' : 'space-between'}
        bgGradient={isMobile && 'linear(to-b, gray.900, gray.700)'}
      >
        <VStack
          as={'section'}
          maxW='600px'
          alignItems={isMobile ? 'center' : ''}
          textAlign={isMobile ? 'center' : 'start'}
        >
          <Text
            fontWeight='700'
            fontSize='1.5rem'
            lineHeight='2.1rem'
            mb={isMobile ? '0.5rem' : '1.5rem'}
          >
            👋 Hey, welcome
          </Text>

          <Heading
            as={'h1'}
            fontWeight='900'
            fontSize='4rem'
            lineHeight='4rem'
            mb='0.7rem !important'
          >
            News about <br /> the {' '}
            <Text color='cyan.400' as='span'>
              NextJS
            </Text> {' '}
            world
          </Heading>

          <Text mb='2rem !important' fontWeight='400'>
            Get acess to all the publications <br />
            <Text color='cyan.400' fontWeight='700'>for $9.90 month</Text>
          </Text>

          <SubscribeButton />
        </VStack>

        <Image display={isMobile && 'none'} w='30rem' src='/assets/images/programer.svg' />
      </Stack>
    </>
  )
}

export default Home