import { Flex, HStack, Center } from '@chakra-ui/react'
import SignInButton from '@components/buttons/SignInButton'
import ActiveLink from '@components/links/ActiveLink'
import Logo from '../Logo'

const Header = () => {
  return (
    <Flex
      as={'header'}
      w='full'
      h='5rem'
      justifyContent='center'
      borderBottom='1px'
      borderBottomColor='gray.700'
    >
      <Center
        as={'nav'}
        maxW='1120px'
        w='full'
        h='5rem'
        px='2rem'
      >
        <Logo />

        <HStack
          as={'nav'}
          ml='5rem'
          h='5rem'
          gap='1rem'
        >
          <ActiveLink href='/'>
            Home
          </ActiveLink>
          <ActiveLink href='/posts'>
            Posts
          </ActiveLink>
        </HStack>

        <SignInButton />
      </Center>
    </Flex >
  )
}

export default Header