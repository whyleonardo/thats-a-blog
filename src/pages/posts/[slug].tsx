import { asHTML, asText } from "@prismicio/helpers"
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import { getPrismicClient } from "src/services/prismic"
import Head from 'next/head'
import { motion } from "framer-motion"
import { Stack, VStack, Heading, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"

import styles from './styles.module.scss'

interface PostProps {
  post: {
    slug: string
    title: string
    content: string
    updatedAt: string
  }
}


const Post = ({ post }: PostProps) => {
  const location = useRouter()
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

          <div className={styles.postContent} dangerouslySetInnerHTML={{ __html: post.content }} />

        </VStack>
      </Stack>
    </>
  )
}

export default Post



export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const sessions = await getSession({ req })

  const { slug } = params

  const prismic = getPrismicClient(req)

  const response = await prismic.getByUID('post', String(slug), {})

  const post = {
    slug,
    title: asText(response.data.title),
    content: asHTML(response.data.content),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  // if

  return {
    props: {
      post
    }
  }
}