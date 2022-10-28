// @ts-ignore
import { Button, Avatar, chakra, Spinner } from "@chakra-ui/react"
import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import { signIn, useSession, signOut } from "next-auth/react"


const FaGithubIcon = chakra(FaGithub)
const FiXIcon = chakra(FiX)

const SignInButton = () => {
  const { data: session, status } = useSession()

  return (
    <Button
      ml={[null, null, 'auto']}
      bg='gray.700'
      filter='auto'
      _hover={{ brightness: 0.9, transition: '0.2s ease-out' }}
      rounded='full'
      h='3rem'
      px='1.5rem'
      aria-label={session ? 'Username' : 'Sign in with Github'}
      gap='1rem'
      alignItems='center'
      onClick={() => !session ? signIn('github', { redirect: false }) : signOut({ redirect: false })}
    >
      {status == 'loading'
        ? <Spinner />
        : (
          <>
            {session
              ? <Avatar
                name={session.user.name}
                size='sm'
                src={session.user.image}
              />
              : <FaGithubIcon
                color={'yellow.500'}
                size='1.375rem'
              />
            }

            {session ? session.user.name : 'Sign in with Github'}
            {
              session && (
                <FiXIcon
                  color='gray.400'
                  size='1.375rem'
                />
              )
            }
          </>
        )
      }
    </Button>
  )
}

export default SignInButton