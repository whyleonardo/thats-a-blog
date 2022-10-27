import { Flex, HStack, Center } from '@chakra-ui/react'
import SignInButton from '@components/buttons/SignInButton'
import ActiveLink from '@components/links/ActiveLink'
import DrawerMobile from '@components/layout/DrawerMobile'
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
        maxW='1120px'
        w='full'
        h='5rem'
        px='2rem'
        justifyContent={['space-between', null]}
      >

        <Center
          justifyContent='space-between'
          w='full'
        >
          <Center>
            <Logo />

            <HStack
              as={'nav'}
              ml='5rem'
              h='5rem'
              gap='1rem'
              display={['none', 'none', 'flex']}
              alignSelf='start'
            >
              <ActiveLink href='/'>
                Home
              </ActiveLink>
              <ActiveLink href='/posts'>
                Posts
              </ActiveLink>
            </HStack>
          </Center>

          <DrawerMobile />

          <Center
            display={['none', null, 'flex']}
          >
            <SignInButton />
          </Center>
        </Center>
      </Center>
    </Flex >
  )
}

export default Header