import { gql } from 'src/__generated__/gql'

export const GET_PUBLIC_TOURS_COUNT_QUERY = gql(
  `query CountPublicTours($where: TourWhereInput) {
    aggregateTour(where: $where) {
      _count {
        id
      }
    }
  }
`
)

export const GET_PUBLIC_TOURS_QUERY = gql(
  `query PublicTours($where: TourWhereInput, $orderBy: [TourOrderByWithRelationInput!], $take: Int, $skip: Int) {
      tours(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {
          id
          name
          description
          featuredImage
          galleryImgs
          duration
          createdAt
          isActive
          adultPrice
          childPrice
          infantPrice
          categories(
            where: {isActive: {equals: true}}) {
              id
              name
              description
          }
      }
    }
`
)

export const GET_PUBLIC_CATEGORIES_QUERY = gql(
  `query PublicCategories {
    categories(where: {isActive: {equals: true}}) {
        id
        name
        description
    }
}
`
)

export const GET_TOURS_QUERY = gql(
  `
  query Tours($take: Int, $skip: Int) {
    tours(take: $take, skip: $skip) {
      _count {
        orders
        users
      }
      adultPrice
      categories {
        id
        name
      }
      childPrice
      description
      duration
      featuredImage
      galleryImgs
      infantPrice
      name
      id
      isActive
      createdAt
     
    }
  }
`
)

export const GET_CATEGORIES_QUERY = gql(
  `
  query Categories($take: Int, $skip: Int) {
    categories(take: $take, skip: $skip) {
      _count {
        tours
      }
      id
      description
      name
      isActive
      createdAt
    }
  }
`
)

export const GET_TOURS_COUNT_QUERY = gql(
  `
  query CountTours {
    aggregateTour {
        _count {
            id
        }
    }
  }
`
)

export const GET_CATEGORIES_COUNT_QUERY = gql(
  `
  query AggregateCategory {
    aggregateCategory {
      _count {
        id
      }
    }
  }
`
)
export const GET_TOUR_DETAIL_QUERY = gql(
  `
  query Query($where: TourWhereUniqueInput!) {
    getTour(where: $where) {
      _count {
        categories
        orders
        users
      }
      adultPrice
      categories {
        id
        name
      }
      childPrice
      createdAt
      description
      duration
      featuredImage
      galleryImgs
      id
      infantPrice
      name
      isActive
    }
  }
`
)
export const GET_CATEGORY_DETAIL_QUERY = gql(
  `
query Category($where: CategoryWhereUniqueInput!) {
  category(where: $where) {
    name
    isActive
    id
    createdAt
  }
}
`
)

export const CREATE_CATEGORY_MUTATE = gql(
  `
mutation CreateOneCategory($data: CategoryCreateInput!) {
  createOneCategory(data: $data) {
    id
  }
}`
)

export const UPDATE_CATEGORY_MUTATE = gql(
  `
  mutation UpdateOneCategory($data: CategoryUpdateInput!, $where: CategoryWhereUniqueInput!) {
    updateOneCategory(data: $data, where: $where) {
      id
      name
    }
}`
)

export const ADD_TOUR_MUTATE = gql(
  `
mutation CreateOneTour($data: TourCreateInput!) {
  createOneTour(data: $data) {
    id
    name
  }
}
`
)

export const UPDATE_TOUR_MUTATE = gql(
  `
  mutation UpdateOneTour($data: TourUpdateInput!, $where: TourWhereUniqueInput!) {
    updateOneTour(data: $data, where: $where) {
      id
      name
    }
  }
`
)

export const DELETE_TOUR_MUTATE = gql(
  `
  mutation DeleteOneTour($where: TourWhereUniqueInput!) {
    deleteOneTour(where: $where) {
      id
      name
    }
  }
`
)
export const DELETE_CATEGORY_MUTATE = gql(
  `
mutation DeleteOneCategory($where: CategoryWhereUniqueInput!) {
  deleteOneCategory(where: $where) {
    id
    name
  }
}`
)

export const GET_TOTALMONEYFROMDATE_QUERY = gql(
  `
query _sum($where: OrderWhereInput) {
  aggregateOrder(where: $where) {
    _sum {
      adultPrice
      childPrice
      infantPrice
      numberOfAdults
      numberOfChilds
      numberOfInfants
    }
  }
}
`
)
