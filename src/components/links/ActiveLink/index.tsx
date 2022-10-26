import { useRouter } from 'next/router'
import Link from 'next/link'
import { Link as ChakraLink, useMediaQuery } from '@chakra-ui/react'

interface ActiveLinkProps {
  children: string
  href: string
  onClose?: () => void
}

const ActiveLink = ({ children, href, onClose }: ActiveLinkProps) => {
  const [isASmallerScreen] = useMediaQuery('(max-width: 700px)', { ssr: true, fallback : true})

  const stylesActiveLink = {
    content: "''",
    bg: 'yellow.500',
    height: '3px',
    borderRadius: '3px 3px 0 0',
    width: isASmallerScreen ? '25%' : '100%',
    position: 'absolute',
    bottom: '1px',
    left: isASmallerScreen ? '50%' : 0,
    marginLeft: isASmallerScreen && '-12.5%'
  }

  const router = useRouter()
  const actualPath = href === router.asPath

  return isASmallerScreen ? (

    <Link href={href} passHref >
      <ChakraLink
        position='relative'
        w='full'
        rounded='5px'
        fontSize='2xl'
        textAlign='center'
        onClick={() => setTimeout(onClose, 150)
        }
        fontWeight={actualPath && 'bold'}
        color={actualPath ? 'white' : 'gray.500'}
        _after={actualPath && stylesActiveLink}
      >
        {children}
      </ChakraLink>
    </Link >
  ) : (
    <Link href={href} passHref >
      <ChakraLink
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
