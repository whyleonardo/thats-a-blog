import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  IconButton,
  Center,
  VStack
} from '@chakra-ui/react'
import { FiMenu } from 'react-icons/fi'
import SignInButton from '@components/buttons/SignInButton'
import NavLink from '@components/links/NavLink'

const DrawerMobile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <IconButton
        icon={<FiMenu size='2rem' />}
        bg='none'
        aria-label='Open mobile menu'
        onClick={onOpen}
        display={['inline-flex', null, 'none']}
      />
      <Drawer
        isOpen={isOpen}
        size='full'
        placement='right'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader
            bg='gray.800'
          >
            <Center justifyContent='space-between'>
              <SignInButton />
              <DrawerCloseButton position='unset' />
            </Center>
          </DrawerHeader>

          <DrawerBody bg='gray.800'>
            <VStack
              justifyContent='center'
              alignItems='center'
              h='calc(100vh - 10rem)'
              gap='1rem'
            >
              <NavLink
                href='/'
                onClose={onClose}
              >
                Home
              </NavLink>

              <NavLink
                href='/posts'
                onClose={onClose}
              >
                Posts
              </NavLink>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default DrawerMobile