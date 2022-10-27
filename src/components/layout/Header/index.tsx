import { Flex, HStack, Center } from '@chakra-ui/react'
import SignInButton from '@components/buttons/SignInButton'
import NavLink from '@components/links/NavLink'
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
              <NavLink href='/'>
                Home
              </NavLink>
              <NavLink href='/posts'>
                Posts
              </NavLink>
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