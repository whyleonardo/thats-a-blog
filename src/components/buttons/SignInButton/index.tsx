import { Button, chakra, useMediaQuery, Text } from "@chakra-ui/react"
import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

const FaGithubIcon = chakra(FaGithub)
const FiXIcon = chakra(FiX)

const SignInButton = () => {
  const [isASmallerScreen] = useMediaQuery("(max-width: 700px)")
  const isUserLoggedIn = false

  return (
    <Button
      ml='auto'
      bg='gray.700'
      filter='auto'
      _hover={{ brightness: 0.9, transition: '0.2s ease-out' }}
      rounded='full'
      h='3rem'
      px='1.5rem'
      aria-label={isUserLoggedIn ? 'Username' : 'Sign in with Github'}
      gap='1rem'
      alignItems='center'
    >
      <FaGithubIcon
        color={isUserLoggedIn ? 'green.500' : 'yellow.500'}
        size='1.375rem'
      />
      {isUserLoggedIn ? 'whyleonardo' : 'Sign in with Github'}
      {
        isUserLoggedIn && (
          <FiXIcon
            color='gray.400'
            size='1.375rem'
          />
        )
      }
    </Button>
  )
}

export default SignInButton