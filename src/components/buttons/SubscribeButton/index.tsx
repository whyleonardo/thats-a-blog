import { Button } from "@chakra-ui/react"
import { useSession, signIn } from "next-auth/react"
import { stripe } from "src/services/stripe"

interface SubscribeButtonProps {
  priceId: string
}

const SubscribeButton = ({ priceId }: SubscribeButtonProps) => {
  const { data: session, status } = useSession()

  const handleSubscribe = async () => {
    if (!session) {
      signIn('github')
      return
    } else {

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
      Subscribe now
    </Button>
  )
}

export default SubscribeButton