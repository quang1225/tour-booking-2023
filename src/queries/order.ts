import { gql } from 'src/__generated__/gql'

export const GET_ORDER_QUERY = gql(
  `
  query Orders($take: Int, $skip: Int) {
    orders(take: $take, skip: $skip) {
      id
      infantPrice
      numberOfAdults
      numberOfChilds
      numberOfInfants
      otherRequest
      paymentMethod
      startDate
      status
      transactionId
      adultPrice
      childPrice
      createdAt
      tour {
        name
      }
      user {
        fullname
        email
      }
    }
  }`
)
export const GET_ORDERS_COUNT_QUERY = gql(
  `
  query AggregateOrder {
    aggregateOrder {
      _count {
        id
      }
    }
  }
`
)
