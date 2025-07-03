/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query Orders($take: Int, $skip: Int) {\n    orders(take: $take, skip: $skip) {\n      id\n      infantPrice\n      numberOfAdults\n      numberOfChilds\n      numberOfInfants\n      otherRequest\n      paymentMethod\n      startDate\n      status\n      transactionId\n      adultPrice\n      childPrice\n      createdAt\n      tour {\n        name\n      }\n      user {\n        fullname\n        email\n      }\n    }\n  }": types.OrdersDocument,
    "\n  query AggregateOrder {\n    aggregateOrder {\n      _count {\n        id\n      }\n    }\n  }\n": types.AggregateOrderDocument,
    "query CountPublicTours($where: TourWhereInput) {\n    aggregateTour(where: $where) {\n      _count {\n        id\n      }\n    }\n  }\n": types.CountPublicToursDocument,
    "query PublicTours($where: TourWhereInput, $orderBy: [TourOrderByWithRelationInput!], $take: Int, $skip: Int) {\n      tours(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {\n          id\n          name\n          description\n          featuredImage\n          galleryImgs\n          duration\n          createdAt\n          isActive\n          adultPrice\n          childPrice\n          infantPrice\n          categories(\n            where: {isActive: {equals: true}}) {\n              id\n              name\n              description\n          }\n      }\n    }\n": types.PublicToursDocument,
    "query PublicCategories {\n    categories(where: {isActive: {equals: true}}) {\n        id\n        name\n        description\n    }\n}\n": types.PublicCategoriesDocument,
    "\n  query Tours($take: Int, $skip: Int) {\n    tours(take: $take, skip: $skip) {\n      _count {\n        orders\n        users\n      }\n      adultPrice\n      categories {\n        id\n        name\n      }\n      childPrice\n      description\n      duration\n      featuredImage\n      galleryImgs\n      infantPrice\n      name\n      id\n      isActive\n      createdAt\n     \n    }\n  }\n": types.ToursDocument,
    "\n  query Categories($take: Int, $skip: Int) {\n    categories(take: $take, skip: $skip) {\n      _count {\n        tours\n      }\n      id\n      description\n      name\n      isActive\n      createdAt\n    }\n  }\n": types.CategoriesDocument,
    "\n  query CountTours {\n    aggregateTour {\n        _count {\n            id\n        }\n    }\n  }\n": types.CountToursDocument,
    "\n  query AggregateCategory {\n    aggregateCategory {\n      _count {\n        id\n      }\n    }\n  }\n": types.AggregateCategoryDocument,
    "\n  query Query($where: TourWhereUniqueInput!) {\n    getTour(where: $where) {\n      _count {\n        categories\n        orders\n        users\n      }\n      adultPrice\n      categories {\n        id\n        name\n      }\n      childPrice\n      createdAt\n      description\n      duration\n      featuredImage\n      galleryImgs\n      id\n      infantPrice\n      name\n      isActive\n    }\n  }\n": types.QueryDocument,
    "\nquery Category($where: CategoryWhereUniqueInput!) {\n  category(where: $where) {\n    name\n    isActive\n    id\n    createdAt\n  }\n}\n": types.CategoryDocument,
    "\nmutation CreateOneCategory($data: CategoryCreateInput!) {\n  createOneCategory(data: $data) {\n    id\n  }\n}": types.CreateOneCategoryDocument,
    "\n  mutation UpdateOneCategory($data: CategoryUpdateInput!, $where: CategoryWhereUniqueInput!) {\n    updateOneCategory(data: $data, where: $where) {\n      id\n      name\n    }\n}": types.UpdateOneCategoryDocument,
    "\nmutation CreateOneTour($data: TourCreateInput!) {\n  createOneTour(data: $data) {\n    id\n    name\n  }\n}\n": types.CreateOneTourDocument,
    "\n  mutation UpdateOneTour($data: TourUpdateInput!, $where: TourWhereUniqueInput!) {\n    updateOneTour(data: $data, where: $where) {\n      id\n      name\n    }\n  }\n": types.UpdateOneTourDocument,
    "\n  mutation DeleteOneTour($where: TourWhereUniqueInput!) {\n    deleteOneTour(where: $where) {\n      id\n      name\n    }\n  }\n": types.DeleteOneTourDocument,
    "\nmutation DeleteOneCategory($where: CategoryWhereUniqueInput!) {\n  deleteOneCategory(where: $where) {\n    id\n    name\n  }\n}": types.DeleteOneCategoryDocument,
    "\nquery _sum($where: OrderWhereInput) {\n  aggregateOrder(where: $where) {\n    _sum {\n      adultPrice\n      childPrice\n      infantPrice\n      numberOfAdults\n      numberOfChilds\n      numberOfInfants\n    }\n  }\n}\n": types._SumDocument,
    "\n  query Users($take: Int, $skip: Int) {\n    users(take: $take, skip: $skip) {\n      id\n      fullname\n      email\n      isActive\n      createdAt\n      _count {\n        orders\n        savedList\n      }\n    }\n  }\n": types.UsersDocument,
    "\nmutation UpdateOneUser($data: UserUpdateInput!, $where: UserWhereUniqueInput!) {\n  updateOneUser(data: $data, where: $where) {\n    isActive\n  }\n}\n": types.UpdateOneUserDocument,
    "\n  query _count {\n    aggregateUser {\n      _count {\n        id\n      }\n    }\n  }\n": types._CountDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Orders($take: Int, $skip: Int) {\n    orders(take: $take, skip: $skip) {\n      id\n      infantPrice\n      numberOfAdults\n      numberOfChilds\n      numberOfInfants\n      otherRequest\n      paymentMethod\n      startDate\n      status\n      transactionId\n      adultPrice\n      childPrice\n      createdAt\n      tour {\n        name\n      }\n      user {\n        fullname\n        email\n      }\n    }\n  }"): (typeof documents)["\n  query Orders($take: Int, $skip: Int) {\n    orders(take: $take, skip: $skip) {\n      id\n      infantPrice\n      numberOfAdults\n      numberOfChilds\n      numberOfInfants\n      otherRequest\n      paymentMethod\n      startDate\n      status\n      transactionId\n      adultPrice\n      childPrice\n      createdAt\n      tour {\n        name\n      }\n      user {\n        fullname\n        email\n      }\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query AggregateOrder {\n    aggregateOrder {\n      _count {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query AggregateOrder {\n    aggregateOrder {\n      _count {\n        id\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query CountPublicTours($where: TourWhereInput) {\n    aggregateTour(where: $where) {\n      _count {\n        id\n      }\n    }\n  }\n"): (typeof documents)["query CountPublicTours($where: TourWhereInput) {\n    aggregateTour(where: $where) {\n      _count {\n        id\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query PublicTours($where: TourWhereInput, $orderBy: [TourOrderByWithRelationInput!], $take: Int, $skip: Int) {\n      tours(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {\n          id\n          name\n          description\n          featuredImage\n          galleryImgs\n          duration\n          createdAt\n          isActive\n          adultPrice\n          childPrice\n          infantPrice\n          categories(\n            where: {isActive: {equals: true}}) {\n              id\n              name\n              description\n          }\n      }\n    }\n"): (typeof documents)["query PublicTours($where: TourWhereInput, $orderBy: [TourOrderByWithRelationInput!], $take: Int, $skip: Int) {\n      tours(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {\n          id\n          name\n          description\n          featuredImage\n          galleryImgs\n          duration\n          createdAt\n          isActive\n          adultPrice\n          childPrice\n          infantPrice\n          categories(\n            where: {isActive: {equals: true}}) {\n              id\n              name\n              description\n          }\n      }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query PublicCategories {\n    categories(where: {isActive: {equals: true}}) {\n        id\n        name\n        description\n    }\n}\n"): (typeof documents)["query PublicCategories {\n    categories(where: {isActive: {equals: true}}) {\n        id\n        name\n        description\n    }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Tours($take: Int, $skip: Int) {\n    tours(take: $take, skip: $skip) {\n      _count {\n        orders\n        users\n      }\n      adultPrice\n      categories {\n        id\n        name\n      }\n      childPrice\n      description\n      duration\n      featuredImage\n      galleryImgs\n      infantPrice\n      name\n      id\n      isActive\n      createdAt\n     \n    }\n  }\n"): (typeof documents)["\n  query Tours($take: Int, $skip: Int) {\n    tours(take: $take, skip: $skip) {\n      _count {\n        orders\n        users\n      }\n      adultPrice\n      categories {\n        id\n        name\n      }\n      childPrice\n      description\n      duration\n      featuredImage\n      galleryImgs\n      infantPrice\n      name\n      id\n      isActive\n      createdAt\n     \n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Categories($take: Int, $skip: Int) {\n    categories(take: $take, skip: $skip) {\n      _count {\n        tours\n      }\n      id\n      description\n      name\n      isActive\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query Categories($take: Int, $skip: Int) {\n    categories(take: $take, skip: $skip) {\n      _count {\n        tours\n      }\n      id\n      description\n      name\n      isActive\n      createdAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query CountTours {\n    aggregateTour {\n        _count {\n            id\n        }\n    }\n  }\n"): (typeof documents)["\n  query CountTours {\n    aggregateTour {\n        _count {\n            id\n        }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query AggregateCategory {\n    aggregateCategory {\n      _count {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query AggregateCategory {\n    aggregateCategory {\n      _count {\n        id\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Query($where: TourWhereUniqueInput!) {\n    getTour(where: $where) {\n      _count {\n        categories\n        orders\n        users\n      }\n      adultPrice\n      categories {\n        id\n        name\n      }\n      childPrice\n      createdAt\n      description\n      duration\n      featuredImage\n      galleryImgs\n      id\n      infantPrice\n      name\n      isActive\n    }\n  }\n"): (typeof documents)["\n  query Query($where: TourWhereUniqueInput!) {\n    getTour(where: $where) {\n      _count {\n        categories\n        orders\n        users\n      }\n      adultPrice\n      categories {\n        id\n        name\n      }\n      childPrice\n      createdAt\n      description\n      duration\n      featuredImage\n      galleryImgs\n      id\n      infantPrice\n      name\n      isActive\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery Category($where: CategoryWhereUniqueInput!) {\n  category(where: $where) {\n    name\n    isActive\n    id\n    createdAt\n  }\n}\n"): (typeof documents)["\nquery Category($where: CategoryWhereUniqueInput!) {\n  category(where: $where) {\n    name\n    isActive\n    id\n    createdAt\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation CreateOneCategory($data: CategoryCreateInput!) {\n  createOneCategory(data: $data) {\n    id\n  }\n}"): (typeof documents)["\nmutation CreateOneCategory($data: CategoryCreateInput!) {\n  createOneCategory(data: $data) {\n    id\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateOneCategory($data: CategoryUpdateInput!, $where: CategoryWhereUniqueInput!) {\n    updateOneCategory(data: $data, where: $where) {\n      id\n      name\n    }\n}"): (typeof documents)["\n  mutation UpdateOneCategory($data: CategoryUpdateInput!, $where: CategoryWhereUniqueInput!) {\n    updateOneCategory(data: $data, where: $where) {\n      id\n      name\n    }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation CreateOneTour($data: TourCreateInput!) {\n  createOneTour(data: $data) {\n    id\n    name\n  }\n}\n"): (typeof documents)["\nmutation CreateOneTour($data: TourCreateInput!) {\n  createOneTour(data: $data) {\n    id\n    name\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateOneTour($data: TourUpdateInput!, $where: TourWhereUniqueInput!) {\n    updateOneTour(data: $data, where: $where) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateOneTour($data: TourUpdateInput!, $where: TourWhereUniqueInput!) {\n    updateOneTour(data: $data, where: $where) {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteOneTour($where: TourWhereUniqueInput!) {\n    deleteOneTour(where: $where) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteOneTour($where: TourWhereUniqueInput!) {\n    deleteOneTour(where: $where) {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation DeleteOneCategory($where: CategoryWhereUniqueInput!) {\n  deleteOneCategory(where: $where) {\n    id\n    name\n  }\n}"): (typeof documents)["\nmutation DeleteOneCategory($where: CategoryWhereUniqueInput!) {\n  deleteOneCategory(where: $where) {\n    id\n    name\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery _sum($where: OrderWhereInput) {\n  aggregateOrder(where: $where) {\n    _sum {\n      adultPrice\n      childPrice\n      infantPrice\n      numberOfAdults\n      numberOfChilds\n      numberOfInfants\n    }\n  }\n}\n"): (typeof documents)["\nquery _sum($where: OrderWhereInput) {\n  aggregateOrder(where: $where) {\n    _sum {\n      adultPrice\n      childPrice\n      infantPrice\n      numberOfAdults\n      numberOfChilds\n      numberOfInfants\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Users($take: Int, $skip: Int) {\n    users(take: $take, skip: $skip) {\n      id\n      fullname\n      email\n      isActive\n      createdAt\n      _count {\n        orders\n        savedList\n      }\n    }\n  }\n"): (typeof documents)["\n  query Users($take: Int, $skip: Int) {\n    users(take: $take, skip: $skip) {\n      id\n      fullname\n      email\n      isActive\n      createdAt\n      _count {\n        orders\n        savedList\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation UpdateOneUser($data: UserUpdateInput!, $where: UserWhereUniqueInput!) {\n  updateOneUser(data: $data, where: $where) {\n    isActive\n  }\n}\n"): (typeof documents)["\nmutation UpdateOneUser($data: UserUpdateInput!, $where: UserWhereUniqueInput!) {\n  updateOneUser(data: $data, where: $where) {\n    isActive\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query _count {\n    aggregateUser {\n      _count {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query _count {\n    aggregateUser {\n      _count {\n        id\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;