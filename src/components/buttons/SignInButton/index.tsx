import { Button, chakra } from "@chakra-ui/react"
import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'


const FaGithubIcon = chakra(FaGithub)
const FiXIcon = chakra(FiX)

const SignInButton = () => {
  const isUserLoggedIn = true
  return isUserLoggedIn ? (
    <Button
      ml='auto'
      bg='gray.700'
      filter='auto'
      _hover={{ brightness: 0.9, transition: '0.2s ease-out' }}
      rounded='full'
      h='3rem'
      px='1.5rem'
      aria-label='Sign in with Github'
      gap='1rem'
      alignItems='center'
    >
      <FaGithubIcon
        color='green.500'
        size='1.375rem'
      />
      whyleonardo
      <FiXIcon
        color='gray.400'
        size='1.375rem'
      />
    </Button>
  ) : (
    <Button
      ml='auto'
      bg='gray.700'
      filter='auto'
      _hover={{ brightness: 0.9, transition: '0.2s ease-out' }}
      rounded='full'
      h='3rem'
      px='1.5rem'
      aria-label='Sign in with Github'
      gap='1rem'
      alignItems='center'
    >
      <FaGithubIcon
        color='yellow.500'
        size='1.375rem'
      />
      Sign in with Github
    </Button>
  )
}

export default SignInButton