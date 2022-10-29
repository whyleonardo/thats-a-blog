import { Button, Spinner } from "@chakra-ui/react"
import { useSession, signIn } from "next-auth/react"
import { useToast } from '@chakra-ui/react'
import { api } from "src/services/api"
import { getStripeJs } from "src/services/stripe-js"
import { useState } from "react"

interface SubscribeButtonProps {
  priceId: string
}

const SubscribeButton = ({ priceId }: SubscribeButtonProps) => {
  const { data: session, status } = useSession()
  const [buttonLoading, setButtonLoading] = useState(false)
  const toast = useToast()

  const handleSubscribe = async () => {
    if (!session) {
      signIn('github')
      return
    } else {
      try {
        setButtonLoading(true)
        const response = await api.post('/subscribe')
        const { sessionId } = response.data

        const stripe = await getStripeJs()

        await stripe.redirectToCheckout({ sessionId: sessionId })

      } catch (err) {
        setButtonLoading(false)
        toast({
          title: 'Error',
          description: err.message,
          status: 'error',
          duration: 10000,
          isClosable: true,
          position: 'top-left',
        })
      }
    }
  }

  return (
    <Button
      bg='yellow.500'
      color='gray.900'
      fontSize='1.25rem'
      fontWeight='bold'
      rounded='2rem'
      w='16rem'
      h='3.5rem'
      filter='auto'
      _hover={{ bg: 'yellow.500', brightness: 0.9 }}
      onClick={handleSubscribe}
    >
      {buttonLoading
        ? <Spinner />
        : 'Subscribe now'
      }
    </Button>
  )
}

export default SubscribeButton