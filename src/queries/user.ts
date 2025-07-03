import { gql } from 'src/__generated__/gql'

export const GET_USER_QUERY = gql(
  `
  query Users($take: Int, $skip: Int) {
    users(take: $take, skip: $skip) {
      id
      fullname
      email
      isActive
      createdAt
      _count {
        orders
        savedList
      }
    }
  }
`
)

export const UPDATE_USER_MUTATE = gql(
  `
mutation UpdateOneUser($data: UserUpdateInput!, $where: UserWhereUniqueInput!) {
  updateOneUser(data: $data, where: $where) {
    isActive
  }
}
`
)

export const GET_USER_COUNT_QUERY = gql(
  `
  query _count {
    aggregateUser {
      _count {
        id
      }
    }
  }
`
)
