import { Stack, Heading, Text, Image, VStack, useMediaQuery } from "@chakra-ui/react"
import SubscribeButton from "@components/buttons/SubscribeButton"
import { GetStaticProps } from "next"
import Head from 'next/head'
import { stripe } from "src/services/stripe"

interface HomeProps {
  product: {
    priceId: string,
    amount: number
  }
}

const Home = ({ product }: HomeProps) => {
  const [isASmallerScreen] = useMediaQuery("(max-width: 700px)", { ssr: true, fallback: true })

  return (
    <>
      <Head>
        <title>Home | .NEXT</title>
      </Head>

      <Stack
        direction={isASmallerScreen ? 'column' : 'row'}
        as={'main'}
        px='2rem'
        mt={isASmallerScreen ? '2rem' : 0}
        mx='auto'
        h={isASmallerScreen ? 'calc(100vh - 5rem)' : 'calc(100vh - 5rem)'}
        maxW='1120px'
        alignItems='center'
        justifyContent={isASmallerScreen ? 'center' : 'space-between'}
        bgGradient={isASmallerScreen && 'linear(to-b, gray.900, gray.700)'}
      >
        <VStack
          as={'section'}
          maxW='600px'
          alignItems={isASmallerScreen ? 'center' : ''}
          textAlign={isASmallerScreen ? 'center' : 'start'}
        >
          <Text
            fontWeight='700'
            fontSize='1.5rem'
            lineHeight='2.1rem'
            mb={isASmallerScreen ? '0.5rem' : '1.5rem'}
          >
            👋 Hey, welcome
          </Text>

          <Heading
            as={'h1'}
            fontWeight='900'
            fontSize={isASmallerScreen ? '3.7rem' : '4rem'}
            lineHeight='4rem'
            mb='0.7rem !important'
          >
            News about <br /> the {' '}
            <Text color='cyan.400' as='span'>
              NextJS
            </Text> {' '}
            world
          </Heading>

          <Text
            as={'span'}
            mb='2rem !important'
            fontWeight='400'
          >
            Get acess to all the publications <br />
            <Text color='cyan.400' fontWeight='700'>for {product.amount} month</Text>
          </Text>
          <SubscribeButton priceId={product.priceId} />
        </VStack>

        <Image display={isASmallerScreen && 'none'} w='30rem' src='/assets/images/programer.svg' />
      </Stack>
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1LxCW5JxUNTbxr08uGkyckQP')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  }

  return {
    props: {
      product
    },
    revalidate: 3600 * 24 // 24 hours
  }
}