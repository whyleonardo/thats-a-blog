import { asHTML, asText } from "@prismicio/helpers"
import { GetStaticProps, GetStaticPaths } from "next"
import { getPrismicClient } from "src/services/prismic"
import Head from 'next/head'
import { motion } from "framer-motion"
import { Stack, VStack, Heading, Text, Box, Link as ChakraLink, chakra } from "@chakra-ui/react"
import { useRouter } from "next/router"
import css from '@emotion/styled'
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useEffect } from "react"

interface PostPreviewProps {
  post: {
    slug: string
    title: string
    content: string
    updatedAt: string
  }
}

const cssContent = css.div`
   margin-top: 2rem;
   line-height: 2rem;
   font-size: 1.125rem;

   h1,
   h2,
   h3,
   h4,
   h5,
   h6 {
     font-weight: 900;
     font-size: 1.5rem;
   }

   p,
   ul {
     margin: 1.5rem 0;
   }

   ul {
     padding-left: 1.5rem;

     li {
       margin: 0.5rem 0;
     }
   }
`
const StyledContent = chakra(cssContent)

const PostPreview = ({ post }: PostPreviewProps) => {
  const location = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    // @ts-ignore
    if (session?.activeSubscription) {
      location.push(`/posts/${post.slug}`)
    }
  }, [session])

  return (
    <>
      <Head>
        <title>{post.title} | .NEXT</title>
      </Head>

      <Stack
        key={location.route}
        as={motion.main}
        transform='auto'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        px='2rem'
        mx='auto'
        h='calc(100vh - 5rem)'
        maxW='1120px'
        bg={[null, null, 'gray.900']}
      >
        <VStack
          as={'article'}
          mt='3rem'
          maxW='720px'
          mx='auto'
        >
          <Heading
            fontSize='3rem'
            fontWeight='900'
          >
            {post.title}
          </Heading>

          <Text
            fontSize='1rem'
            color='gray.600'
            mt='1.5rem !important'
            as={'time'}
          >
            {post.updatedAt}
          </Text>

          <StyledContent
            className='contentPreview'
            bgGradient='linear(to-b, gray.100, transparent)'
            bgClip='text'
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <Box
            p='1.5rem'
            minW='100%'
            textAlign='center'
            bg='gray.700'
            rounded='full'
            fontSize='1.25rem'
            fontWeight='bold'
            mt='4rem !important'
            mb='2rem !important'
            role='group'
            _hover={{ opacity: 0.9 }}
          >
            Wanna continue reading?
            <Link href='#' passHref>
              <ChakraLink
                color='yellow.500'
                ml='0.5rem'
                _groupHover={{ textDecoration: 'underline' }}
              >
                Subscribe now
              </ChakraLink>
            </Link>
          </Box>

        </VStack>
      </Stack>
    </>
  )
}

export default PostPreview


export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

  const { slug } = params

  const prismic = getPrismicClient()

  const response = await prismic.getByUID('post', String(slug), {})

  const post = {
    slug,
    title: asText(response.data.title),
    content: asHTML(response.data.content.splice(0, 3)),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  return {
    props: {
      post
    }
  }
}