import { VFC } from 'react'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { GET_USERS } from '../queries/queries'
import { GetUsersQuery } from '../types/generated/graphql'
import { Layout } from '../components/Layout'

const FetchMain: VFC = () => {
  const { data, error } = useQuery<GetUsersQuery>(GET_USERS, {
    // network-only: useQueryが走るたびに最新のデータを常に取りにいくため、頻繁にデータが変わる場合に利用する
    // fetchPolicy: 'network-only',

    // cache-and-network: useQueryが走るたびにデータを取りにいくのは変わらないが、通信が終わるまでの間にキャッシュで保存したデータを表示しておく。
    fetchPolicy: 'cache-and-network',

    // cache-first: defaultになる。サーバーサイドからのデータあまり変わらない場合に使う
    //fetchPolicy: 'cache-first',

    // no-cache: キャッシュしない。
    //fetchPolicy: 'no-cache',
  })
  if (error)
    return (
      <Layout title="Hasura fetchPolicy">
        <p>Error: {error.message}</p>
      </Layout>
    )
  return (
    <Layout title="Hasura fetchPolicy">
      <p className="mb-6 font-bold">Hasura main page</p>

      {data?.users.map((user) => {
        return (
          <p className="my-1" key={user.id}>
            {user.name}
          </p>
        )
      })}
      <Link href="/hasura-sub">
        <a className="mt-6">Next</a>
      </Link>
    </Layout>
  )
}
export default FetchMain
