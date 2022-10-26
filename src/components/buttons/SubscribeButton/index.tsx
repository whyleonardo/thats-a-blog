import { Button } from "@chakra-ui/react"

const SubscribeButton = () => {
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
    >
      Subscribe now
    </Button>
  )
}

export default SubscribeButton