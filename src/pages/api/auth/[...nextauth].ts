import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { client } from 'src/services/fauna'
import { query as q } from 'faunadb'

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        url: 'https://github.com/login/oauth/authorize',
        params: { scope: 'read:user' }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session(session) {
      try {
        const userActiveSubscription = await client.query(
          q.Get(
            q.Intersection([
              q.Match(
                q.Index('subscription_by_user_ref'),
                q.Select(
                  'ref',
                  q.Get(
                    q.Match(
                      q.Index('user_by_email'),
                      q.Casefold(session.session.user.email)
                    )
                  )
                )
              ),
              q.Match(q.Index('subscription_by_status'), 'active')
            ])
          )
        )

        return {
          ...session,
          activeSubscription: userActiveSubscription
        }
      } catch {
        return {
          ...session,
          activeSubscription: null
        }
      }
    },
    async signIn({ user, account, profile, email, credentials }) {
      const userEmail = user.email
      try {
        await client.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(q.Index('user_by_email'), q.Casefold(user.email))
              )
            ),
            q.Create(q.Collection('users'), { data: { userEmail } }),
            q.Get(q.Match(q.Index('user_by_email'), q.Casefold(user.email)))
          )
        )
        return true
      } catch (err) {
        console.log(err)
        return false
      }
    }
  }
}
export default NextAuth(authOptions)
