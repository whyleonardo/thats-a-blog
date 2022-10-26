import { Flex, HStack, Center, useMediaQuery } from '@chakra-ui/react'
import SignInButton from '@components/buttons/SignInButton'
import ActiveLink from '@components/links/ActiveLink'
import DrawerMobile from '@components/layout/DrawerMobile'
import Logo from '../Logo'

const Header = () => {
  const [isASmallerScreen] = useMediaQuery("(max-width: 700px)")

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
        justifyContent={isASmallerScreen && 'space-between'}
      >
        <Logo />

        {
          isASmallerScreen ? (
            <DrawerMobile />
          ) : (
            <>
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
            </>
          )
        }
      </Center>
    </Flex >
  )
}

export default Header