import { query as q } from 'faunadb'
import { stripe } from 'src/services/stripe'
import { client } from './../../../services/fauna'

export const saveSubscription = async (
  subscriptionId: string,
  customerId: string,
  createAction: boolean
) => {
  const userRef = await client.query(
    q.Select(
      'ref',
      q.Get(q.Match(q.Index('user_by_stripe_customer_id'), customerId))
    )
  )

  const subscription = await stripe.subscriptions.retrieve(subscriptionId)

  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id
  }

  if (createAction) {
    await client.query(
      q.Create(q.Collection('subscriptions'), { data: subscriptionData })
    )
  } else {
    await client.query(
      q.Replace(
        q.Select(
          'ref',
          q.Get(q.Match(q.Index('subscription_by_id'), subscription.id))
        ),
        { data: subscriptionData }
      )
    )
  }
}
