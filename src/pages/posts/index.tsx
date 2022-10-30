import { Stack, Heading, Text, Image, VStack, Link } from "@chakra-ui/react"
import { GetStaticProps } from "next"
import Head from 'next/head'
import { getPrismicClient } from './../../services/prismic'
import Prismic from '@prismicio/client'
import { asText } from '@prismicio/helpers'

type Post = {
  slug: string
  excerpt: string
  title: string
  updatedAt: string
}

interface PostsProps {
  posts: Post[]
}

const Posts = ({ posts }: PostsProps) => {
  return (
    <>
      <Head>
        <title>Posts | .NEXT</title>
      </Head>

      <Stack
        as={'main'}
        px='2rem'
        mx='auto'
        h='calc(100vh - 5rem)'
        maxW='1120px'
        bg={[null, null, 'gray.900']}
      >
        <VStack
          mt='3rem'
          maxW='720px'
          mx='auto'
        >
          {posts.map(post => (
            <Link
              key={post.slug}
              display=' block'
              borderTop='1px'
              borderColor='gray.700'
              py='1.5rem'
              mt='1.5rem'
              _first={{ borderTopWidth: 0, marginTop: 0, marginBottom: 0, paddingTop: 0 }}
              role='group'
              _hover={{ textDecoration: 'none' }}
            >
              <Text
                display='flex'
                as={'time'}
                fontSize='1rem'
                alignItems='center'
                color='gray.600'

              >
                {post.updatedAt}
              </Text>

              <Heading
                display='flex'
                fontSize='1.5rem'
                mt='1rem'
                lineHeight='2rem'
                transition='color 0.2s'
                _groupHover={{ color: 'yellow.500' }}
              >
                {post.title}
              </Heading>

              <Text
                color='gray.500'
                mt='0.5rem'
                lineHeight='1.625'
                _groupHover={{ textDecoration: 'underline' }}
              >
                {post.excerpt}
              </Text>
            </Link>
          ))}
        </VStack>
      </Stack>
    </>
  )
}

export default Posts

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient()

  const response = await prismic.getAllByType('post', {
    fetch: ['post.title', 'post.content'],
    pageSize: 100
  })

  const posts = response.map(post => {
    return {
      slug: post.uid,
      title: asText(post.data.title),
      excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
      updatedAt: new Date(post.last_publication_date).toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }
  })

  // console.log(response.)

  return {
    props: {
      posts
    },
    revalidate: 3600  // 1 hour
  }
}

