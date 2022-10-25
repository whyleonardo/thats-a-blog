import Link from 'next/link'
import { Link as ChakraLink } from '@chakra-ui/react'
import { useRouter } from 'next/router'

const stylesActiveLink = {
  content: "''",
  bg: 'yellow.500',
  height: '3px',
  borderRadius: '3px 3px 0 0',
  width: '100%',
  position: 'absolute',
  bottom: '1px',
  left: 0
}

const ActiveLink = ({ children, href }) => {
  const router = useRouter()
  const actualPath = href === router.asPath

  return (
    <Link href={href} passHref >
      <ChakraLink
        display='inline-block'
        position='relative'
        px='0.5rem'
        h='5rem'
        lineHeight='5rem'
        fontWeight={actualPath && 'bold'}
        color={actualPath ? 'white' : 'gray.500'}
        _hover={{ color: 'white' }}
        _after={actualPath && stylesActiveLink}
      >
        {children}
      </ChakraLink>
    </Link >

  )
}


export default ActiveLink