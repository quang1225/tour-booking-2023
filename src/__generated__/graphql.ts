/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: { input: any; output: any; }
  /** GraphQL Scalar representing the Prisma.Decimal type, based on Decimal.js library. */
  Decimal: { input: any; output: any; }
};

export type AffectedRowsOutput = {
  __typename?: 'AffectedRowsOutput';
  count: Scalars['Int']['output'];
};

export type AggregateCategory = {
  __typename?: 'AggregateCategory';
  _avg?: Maybe<CategoryAvgAggregate>;
  _count?: Maybe<CategoryCountAggregate>;
  _max?: Maybe<CategoryMaxAggregate>;
  _min?: Maybe<CategoryMinAggregate>;
  _sum?: Maybe<CategorySumAggregate>;
};

export type AggregateOrder = {
  __typename?: 'AggregateOrder';
  _avg?: Maybe<OrderAvgAggregate>;
  _count?: Maybe<OrderCountAggregate>;
  _max?: Maybe<OrderMaxAggregate>;
  _min?: Maybe<OrderMinAggregate>;
  _sum?: Maybe<OrderSumAggregate>;
};

export type AggregateTour = {
  __typename?: 'AggregateTour';
  _avg?: Maybe<TourAvgAggregate>;
  _count?: Maybe<TourCountAggregate>;
  _max?: Maybe<TourMaxAggregate>;
  _min?: Maybe<TourMinAggregate>;
  _sum?: Maybe<TourSumAggregate>;
};

export type AggregateUser = {
  __typename?: 'AggregateUser';
  _avg?: Maybe<UserAvgAggregate>;
  _count?: Maybe<UserCountAggregate>;
  _max?: Maybe<UserMaxAggregate>;
  _min?: Maybe<UserMinAggregate>;
  _sum?: Maybe<UserSumAggregate>;
};

export type BoolFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['Boolean']['input']>;
};

export type BoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type BoolWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedBoolFilter>;
  _min?: InputMaybe<NestedBoolFilter>;
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<NestedBoolWithAggregatesFilter>;
};

export type Category = {
  __typename?: 'Category';
  _count?: Maybe<CategoryCount>;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  tours: Array<Tour>;
};


export type CategoryToursArgs = {
  cursor?: InputMaybe<TourWhereUniqueInput>;
  distinct?: InputMaybe<Array<TourScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<TourOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TourWhereInput>;
};

export type CategoryAvgAggregate = {
  __typename?: 'CategoryAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
};

export type CategoryAvgOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type CategoryCount = {
  __typename?: 'CategoryCount';
  tours: Scalars['Int']['output'];
};


export type CategoryCountToursArgs = {
  where?: InputMaybe<TourWhereInput>;
};

export type CategoryCountAggregate = {
  __typename?: 'CategoryCountAggregate';
  _all: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  description: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  isActive: Scalars['Int']['output'];
  name: Scalars['Int']['output'];
};

export type CategoryCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isActive?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type CategoryCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description: Scalars['String']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  tours?: InputMaybe<TourCreateNestedManyWithoutCategoriesInput>;
};

export type CategoryCreateManyInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description: Scalars['String']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
};

export type CategoryCreateNestedManyWithoutToursInput = {
  connect?: InputMaybe<Array<CategoryWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<CategoryCreateOrConnectWithoutToursInput>>;
  create?: InputMaybe<Array<CategoryCreateWithoutToursInput>>;
};

export type CategoryCreateOrConnectWithoutToursInput = {
  create: CategoryCreateWithoutToursInput;
  where: CategoryWhereUniqueInput;
};

export type CategoryCreateWithoutToursInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description: Scalars['String']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
};

export type CategoryGroupBy = {
  __typename?: 'CategoryGroupBy';
  _avg?: Maybe<CategoryAvgAggregate>;
  _count?: Maybe<CategoryCountAggregate>;
  _max?: Maybe<CategoryMaxAggregate>;
  _min?: Maybe<CategoryMinAggregate>;
  _sum?: Maybe<CategorySumAggregate>;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
};

export type CategoryListRelationFilter = {
  every?: InputMaybe<CategoryWhereInput>;
  none?: InputMaybe<CategoryWhereInput>;
  some?: InputMaybe<CategoryWhereInput>;
};

export type CategoryMaxAggregate = {
  __typename?: 'CategoryMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type CategoryMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isActive?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type CategoryMinAggregate = {
  __typename?: 'CategoryMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type CategoryMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isActive?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type CategoryOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type CategoryOrderByWithAggregationInput = {
  _avg?: InputMaybe<CategoryAvgOrderByAggregateInput>;
  _count?: InputMaybe<CategoryCountOrderByAggregateInput>;
  _max?: InputMaybe<CategoryMaxOrderByAggregateInput>;
  _min?: InputMaybe<CategoryMinOrderByAggregateInput>;
  _sum?: InputMaybe<CategorySumOrderByAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isActive?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type CategoryOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isActive?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  tours?: InputMaybe<TourOrderByRelationAggregateInput>;
};

export enum CategoryScalarFieldEnum {
  CreatedAt = 'createdAt',
  Description = 'description',
  Id = 'id',
  IsActive = 'isActive',
  Name = 'name'
}

export type CategoryScalarWhereInput = {
  AND?: InputMaybe<Array<CategoryScalarWhereInput>>;
  NOT?: InputMaybe<Array<CategoryScalarWhereInput>>;
  OR?: InputMaybe<Array<CategoryScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  isActive?: InputMaybe<BoolFilter>;
  name?: InputMaybe<StringFilter>;
};

export type CategoryScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<CategoryScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<CategoryScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<CategoryScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  description?: InputMaybe<StringWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  isActive?: InputMaybe<BoolWithAggregatesFilter>;
  name?: InputMaybe<StringWithAggregatesFilter>;
};

export type CategorySumAggregate = {
  __typename?: 'CategorySumAggregate';
  id?: Maybe<Scalars['Int']['output']>;
};

export type CategorySumOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type CategoryUpdateInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  tours?: InputMaybe<TourUpdateManyWithoutCategoriesNestedInput>;
};

export type CategoryUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type CategoryUpdateManyWithWhereWithoutToursInput = {
  data: CategoryUpdateManyMutationInput;
  where: CategoryScalarWhereInput;
};

export type CategoryUpdateManyWithoutToursNestedInput = {
  connect?: InputMaybe<Array<CategoryWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<CategoryCreateOrConnectWithoutToursInput>>;
  create?: InputMaybe<Array<CategoryCreateWithoutToursInput>>;
  delete?: InputMaybe<Array<CategoryWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<CategoryScalarWhereInput>>;
  disconnect?: InputMaybe<Array<CategoryWhereUniqueInput>>;
  set?: InputMaybe<Array<CategoryWhereUniqueInput>>;
  update?: InputMaybe<Array<CategoryUpdateWithWhereUniqueWithoutToursInput>>;
  updateMany?: InputMaybe<Array<CategoryUpdateManyWithWhereWithoutToursInput>>;
  upsert?: InputMaybe<Array<CategoryUpsertWithWhereUniqueWithoutToursInput>>;
};

export type CategoryUpdateWithWhereUniqueWithoutToursInput = {
  data: CategoryUpdateWithoutToursInput;
  where: CategoryWhereUniqueInput;
};

export type CategoryUpdateWithoutToursInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type CategoryUpsertWithWhereUniqueWithoutToursInput = {
  create: CategoryCreateWithoutToursInput;
  update: CategoryUpdateWithoutToursInput;
  where: CategoryWhereUniqueInput;
};

export type CategoryWhereInput = {
  AND?: InputMaybe<Array<CategoryWhereInput>>;
  NOT?: InputMaybe<Array<CategoryWhereInput>>;
  OR?: InputMaybe<Array<CategoryWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  isActive?: InputMaybe<BoolFilter>;
  name?: InputMaybe<StringFilter>;
  tours?: InputMaybe<TourListRelationFilter>;
};

export type CategoryWhereUniqueInput = {
  AND?: InputMaybe<Array<CategoryWhereInput>>;
  NOT?: InputMaybe<Array<CategoryWhereInput>>;
  OR?: InputMaybe<Array<CategoryWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<Scalars['Int']['input']>;
  isActive?: InputMaybe<BoolFilter>;
  name?: InputMaybe<StringFilter>;
  tours?: InputMaybe<TourListRelationFilter>;
};

export type DateTimeFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type DateTimeWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedDateTimeFilter>;
  _min?: InputMaybe<NestedDateTimeFilter>;
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type DecimalFieldUpdateOperationsInput = {
  decrement?: InputMaybe<Scalars['Decimal']['input']>;
  divide?: InputMaybe<Scalars['Decimal']['input']>;
  increment?: InputMaybe<Scalars['Decimal']['input']>;
  multiply?: InputMaybe<Scalars['Decimal']['input']>;
  set?: InputMaybe<Scalars['Decimal']['input']>;
};

export type DecimalFilter = {
  equals?: InputMaybe<Scalars['Decimal']['input']>;
  gt?: InputMaybe<Scalars['Decimal']['input']>;
  gte?: InputMaybe<Scalars['Decimal']['input']>;
  in?: InputMaybe<Array<Scalars['Decimal']['input']>>;
  lt?: InputMaybe<Scalars['Decimal']['input']>;
  lte?: InputMaybe<Scalars['Decimal']['input']>;
  not?: InputMaybe<NestedDecimalFilter>;
  notIn?: InputMaybe<Array<Scalars['Decimal']['input']>>;
};

export type DecimalWithAggregatesFilter = {
  _avg?: InputMaybe<NestedDecimalFilter>;
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedDecimalFilter>;
  _min?: InputMaybe<NestedDecimalFilter>;
  _sum?: InputMaybe<NestedDecimalFilter>;
  equals?: InputMaybe<Scalars['Decimal']['input']>;
  gt?: InputMaybe<Scalars['Decimal']['input']>;
  gte?: InputMaybe<Scalars['Decimal']['input']>;
  in?: InputMaybe<Array<Scalars['Decimal']['input']>>;
  lt?: InputMaybe<Scalars['Decimal']['input']>;
  lte?: InputMaybe<Scalars['Decimal']['input']>;
  not?: InputMaybe<NestedDecimalWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['Decimal']['input']>>;
};

export type IntFieldUpdateOperationsInput = {
  decrement?: InputMaybe<Scalars['Int']['input']>;
  divide?: InputMaybe<Scalars['Int']['input']>;
  increment?: InputMaybe<Scalars['Int']['input']>;
  multiply?: InputMaybe<Scalars['Int']['input']>;
  set?: InputMaybe<Scalars['Int']['input']>;
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type IntWithAggregatesFilter = {
  _avg?: InputMaybe<NestedFloatFilter>;
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedIntFilter>;
  _min?: InputMaybe<NestedIntFilter>;
  _sum?: InputMaybe<NestedIntFilter>;
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createManyCategory: AffectedRowsOutput;
  createManyOrder: AffectedRowsOutput;
  createManyTour: AffectedRowsOutput;
  createManyUser: AffectedRowsOutput;
  createOneCategory: Category;
  createOneOrder: Order;
  createOneTour: Tour;
  createOneUser: User;
  deleteManyCategory: AffectedRowsOutput;
  deleteManyOrder: AffectedRowsOutput;
  deleteManyTour: AffectedRowsOutput;
  deleteManyUser: AffectedRowsOutput;
  deleteOneCategory?: Maybe<Category>;
  deleteOneOrder?: Maybe<Order>;
  deleteOneTour?: Maybe<Tour>;
  deleteOneUser?: Maybe<User>;
  updateManyCategory: AffectedRowsOutput;
  updateManyOrder: AffectedRowsOutput;
  updateManyTour: AffectedRowsOutput;
  updateManyUser: AffectedRowsOutput;
  updateOneCategory?: Maybe<Category>;
  updateOneOrder?: Maybe<Order>;
  updateOneTour?: Maybe<Tour>;
  updateOneUser?: Maybe<User>;
  upsertOneCategory: Category;
  upsertOneOrder: Order;
  upsertOneTour: Tour;
  upsertOneUser: User;
};


export type MutationCreateManyCategoryArgs = {
  data: Array<CategoryCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateManyOrderArgs = {
  data: Array<OrderCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateManyTourArgs = {
  data: Array<TourCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateManyUserArgs = {
  data: Array<UserCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateOneCategoryArgs = {
  data: CategoryCreateInput;
};


export type MutationCreateOneOrderArgs = {
  data: OrderCreateInput;
};


export type MutationCreateOneTourArgs = {
  data: TourCreateInput;
};


export type MutationCreateOneUserArgs = {
  data: UserCreateInput;
};


export type MutationDeleteManyCategoryArgs = {
  where?: InputMaybe<CategoryWhereInput>;
};


export type MutationDeleteManyOrderArgs = {
  where?: InputMaybe<OrderWhereInput>;
};


export type MutationDeleteManyTourArgs = {
  where?: InputMaybe<TourWhereInput>;
};


export type MutationDeleteManyUserArgs = {
  where?: InputMaybe<UserWhereInput>;
};


export type MutationDeleteOneCategoryArgs = {
  where: CategoryWhereUniqueInput;
};


export type MutationDeleteOneOrderArgs = {
  where: OrderWhereUniqueInput;
};


export type MutationDeleteOneTourArgs = {
  where: TourWhereUniqueInput;
};


export type MutationDeleteOneUserArgs = {
  where: UserWhereUniqueInput;
};


export type MutationUpdateManyCategoryArgs = {
  data: CategoryUpdateManyMutationInput;
  where?: InputMaybe<CategoryWhereInput>;
};


export type MutationUpdateManyOrderArgs = {
  data: OrderUpdateManyMutationInput;
  where?: InputMaybe<OrderWhereInput>;
};


export type MutationUpdateManyTourArgs = {
  data: TourUpdateManyMutationInput;
  where?: InputMaybe<TourWhereInput>;
};


export type MutationUpdateManyUserArgs = {
  data: UserUpdateManyMutationInput;
  where?: InputMaybe<UserWhereInput>;
};


export type MutationUpdateOneCategoryArgs = {
  data: CategoryUpdateInput;
  where: CategoryWhereUniqueInput;
};


export type MutationUpdateOneOrderArgs = {
  data: OrderUpdateInput;
  where: OrderWhereUniqueInput;
};


export type MutationUpdateOneTourArgs = {
  data: TourUpdateInput;
  where: TourWhereUniqueInput;
};


export type MutationUpdateOneUserArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};


export type MutationUpsertOneCategoryArgs = {
  create: CategoryCreateInput;
  update: CategoryUpdateInput;
  where: CategoryWhereUniqueInput;
};


export type MutationUpsertOneOrderArgs = {
  create: OrderCreateInput;
  update: OrderUpdateInput;
  where: OrderWhereUniqueInput;
};


export type MutationUpsertOneTourArgs = {
  create: TourCreateInput;
  update: TourUpdateInput;
  where: TourWhereUniqueInput;
};


export type MutationUpsertOneUserArgs = {
  create: UserCreateInput;
  update: UserUpdateInput;
  where: UserWhereUniqueInput;
};

export type NestedBoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type NestedBoolWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedBoolFilter>;
  _min?: InputMaybe<NestedBoolFilter>;
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<NestedBoolWithAggregatesFilter>;
};

export type NestedDateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type NestedDateTimeWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedDateTimeFilter>;
  _min?: InputMaybe<NestedDateTimeFilter>;
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type NestedDecimalFilter = {
  equals?: InputMaybe<Scalars['Decimal']['input']>;
  gt?: InputMaybe<Scalars['Decimal']['input']>;
  gte?: InputMaybe<Scalars['Decimal']['input']>;
  in?: InputMaybe<Array<Scalars['Decimal']['input']>>;
  lt?: InputMaybe<Scalars['Decimal']['input']>;
  lte?: InputMaybe<Scalars['Decimal']['input']>;
  not?: InputMaybe<NestedDecimalFilter>;
  notIn?: InputMaybe<Array<Scalars['Decimal']['input']>>;
};

export type NestedDecimalWithAggregatesFilter = {
  _avg?: InputMaybe<NestedDecimalFilter>;
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedDecimalFilter>;
  _min?: InputMaybe<NestedDecimalFilter>;
  _sum?: InputMaybe<NestedDecimalFilter>;
  equals?: InputMaybe<Scalars['Decimal']['input']>;
  gt?: InputMaybe<Scalars['Decimal']['input']>;
  gte?: InputMaybe<Scalars['Decimal']['input']>;
  in?: InputMaybe<Array<Scalars['Decimal']['input']>>;
  lt?: InputMaybe<Scalars['Decimal']['input']>;
  lte?: InputMaybe<Scalars['Decimal']['input']>;
  not?: InputMaybe<NestedDecimalWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['Decimal']['input']>>;
};

export type NestedFloatFilter = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  not?: InputMaybe<NestedFloatFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']['input']>>;
};

export type NestedIntFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type NestedIntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type NestedIntWithAggregatesFilter = {
  _avg?: InputMaybe<NestedFloatFilter>;
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedIntFilter>;
  _min?: InputMaybe<NestedIntFilter>;
  _sum?: InputMaybe<NestedIntFilter>;
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type NestedStringNullableFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type NestedStringNullableWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedStringNullableFilter>;
  _min?: InputMaybe<NestedStringNullableFilter>;
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringNullableWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type NestedStringWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedStringFilter>;
  _min?: InputMaybe<NestedStringFilter>;
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type NullableStringFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['String']['input']>;
};

export enum NullsOrder {
  First = 'first',
  Last = 'last'
}

export type Order = {
  __typename?: 'Order';
  adultPrice: Scalars['Decimal']['output'];
  childPrice: Scalars['Decimal']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  infantPrice: Scalars['Decimal']['output'];
  numberOfAdults: Scalars['Int']['output'];
  numberOfChilds: Scalars['Int']['output'];
  numberOfInfants: Scalars['Int']['output'];
  otherRequest?: Maybe<Scalars['String']['output']>;
  paymentMethod: Scalars['String']['output'];
  startDate: Scalars['DateTime']['output'];
  status: Scalars['String']['output'];
  tour: Tour;
  tourId: Scalars['Int']['output'];
  transactionId: Scalars['String']['output'];
  user: User;
  userEmail: Scalars['String']['output'];
};

export type OrderAvgAggregate = {
  __typename?: 'OrderAvgAggregate';
  adultPrice?: Maybe<Scalars['Decimal']['output']>;
  childPrice?: Maybe<Scalars['Decimal']['output']>;
  infantPrice?: Maybe<Scalars['Decimal']['output']>;
  numberOfAdults?: Maybe<Scalars['Float']['output']>;
  numberOfChilds?: Maybe<Scalars['Float']['output']>;
  numberOfInfants?: Maybe<Scalars['Float']['output']>;
  tourId?: Maybe<Scalars['Float']['output']>;
};

export type OrderAvgOrderByAggregateInput = {
  adultPrice?: InputMaybe<SortOrder>;
  childPrice?: InputMaybe<SortOrder>;
  infantPrice?: InputMaybe<SortOrder>;
  numberOfAdults?: InputMaybe<SortOrder>;
  numberOfChilds?: InputMaybe<SortOrder>;
  numberOfInfants?: InputMaybe<SortOrder>;
  tourId?: InputMaybe<SortOrder>;
};

export type OrderCountAggregate = {
  __typename?: 'OrderCountAggregate';
  _all: Scalars['Int']['output'];
  adultPrice: Scalars['Int']['output'];
  childPrice: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  infantPrice: Scalars['Int']['output'];
  numberOfAdults: Scalars['Int']['output'];
  numberOfChilds: Scalars['Int']['output'];
  numberOfInfants: Scalars['Int']['output'];
  otherRequest: Scalars['Int']['output'];
  paymentMethod: Scalars['Int']['output'];
  startDate: Scalars['Int']['output'];
  status: Scalars['Int']['output'];
  tourId: Scalars['Int']['output'];
  transactionId: Scalars['Int']['output'];
  userEmail: Scalars['Int']['output'];
};

export type OrderCountOrderByAggregateInput = {
  adultPrice?: InputMaybe<SortOrder>;
  childPrice?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  infantPrice?: InputMaybe<SortOrder>;
  numberOfAdults?: InputMaybe<SortOrder>;
  numberOfChilds?: InputMaybe<SortOrder>;
  numberOfInfants?: InputMaybe<SortOrder>;
  otherRequest?: InputMaybe<SortOrder>;
  paymentMethod?: InputMaybe<SortOrder>;
  startDate?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  tourId?: InputMaybe<SortOrder>;
  transactionId?: InputMaybe<SortOrder>;
  userEmail?: InputMaybe<SortOrder>;
};

export type OrderCreateInput = {
  adultPrice: Scalars['Decimal']['input'];
  childPrice: Scalars['Decimal']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['String']['input'];
  infantPrice: Scalars['Decimal']['input'];
  numberOfAdults: Scalars['Int']['input'];
  numberOfChilds: Scalars['Int']['input'];
  numberOfInfants: Scalars['Int']['input'];
  otherRequest?: InputMaybe<Scalars['String']['input']>;
  paymentMethod: Scalars['String']['input'];
  startDate: Scalars['DateTime']['input'];
  status?: InputMaybe<Scalars['String']['input']>;
  tour: TourCreateNestedOneWithoutOrdersInput;
  transactionId: Scalars['String']['input'];
  user: UserCreateNestedOneWithoutOrdersInput;
};

export type OrderCreateManyInput = {
  adultPrice: Scalars['Decimal']['input'];
  childPrice: Scalars['Decimal']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['String']['input'];
  infantPrice: Scalars['Decimal']['input'];
  numberOfAdults: Scalars['Int']['input'];
  numberOfChilds: Scalars['Int']['input'];
  numberOfInfants: Scalars['Int']['input'];
  otherRequest?: InputMaybe<Scalars['String']['input']>;
  paymentMethod: Scalars['String']['input'];
  startDate: Scalars['DateTime']['input'];
  status?: InputMaybe<Scalars['String']['input']>;
  tourId: Scalars['Int']['input'];
  transactionId: Scalars['String']['input'];
  userEmail: Scalars['String']['input'];
};

export type OrderCreateManyTourInput = {
  adultPrice: Scalars['Decimal']['input'];
  childPrice: Scalars['Decimal']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['String']['input'];
  infantPrice: Scalars['Decimal']['input'];
  numberOfAdults: Scalars['Int']['input'];
  numberOfChilds: Scalars['Int']['input'];
  numberOfInfants: Scalars['Int']['input'];
  otherRequest?: InputMaybe<Scalars['String']['input']>;
  paymentMethod: Scalars['String']['input'];
  startDate: Scalars['DateTime']['input'];
  status?: InputMaybe<Scalars['String']['input']>;
  transactionId: Scalars['String']['input'];
  userEmail: Scalars['String']['input'];
};

export type OrderCreateManyTourInputEnvelope = {
  data: Array<OrderCreateManyTourInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type OrderCreateManyUserInput = {
  adultPrice: Scalars['Decimal']['input'];
  childPrice: Scalars['Decimal']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['String']['input'];
  infantPrice: Scalars['Decimal']['input'];
  numberOfAdults: Scalars['Int']['input'];
  numberOfChilds: Scalars['Int']['input'];
  numberOfInfants: Scalars['Int']['input'];
  otherRequest?: InputMaybe<Scalars['String']['input']>;
  paymentMethod: Scalars['String']['input'];
  startDate: Scalars['DateTime']['input'];
  status?: InputMaybe<Scalars['String']['input']>;
  tourId: Scalars['Int']['input'];
  transactionId: Scalars['String']['input'];
};

export type OrderCreateManyUserInputEnvelope = {
  data: Array<OrderCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type OrderCreateNestedManyWithoutTourInput = {
  connect?: InputMaybe<Array<OrderWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<OrderCreateOrConnectWithoutTourInput>>;
  create?: InputMaybe<Array<OrderCreateWithoutTourInput>>;
  createMany?: InputMaybe<OrderCreateManyTourInputEnvelope>;
};

export type OrderCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<OrderWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<OrderCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<OrderCreateWithoutUserInput>>;
  createMany?: InputMaybe<OrderCreateManyUserInputEnvelope>;
};

export type OrderCreateOrConnectWithoutTourInput = {
  create: OrderCreateWithoutTourInput;
  where: OrderWhereUniqueInput;
};

export type OrderCreateOrConnectWithoutUserInput = {
  create: OrderCreateWithoutUserInput;
  where: OrderWhereUniqueInput;
};

export type OrderCreateWithoutTourInput = {
  adultPrice: Scalars['Decimal']['input'];
  childPrice: Scalars['Decimal']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['String']['input'];
  infantPrice: Scalars['Decimal']['input'];
  numberOfAdults: Scalars['Int']['input'];
  numberOfChilds: Scalars['Int']['input'];
  numberOfInfants: Scalars['Int']['input'];
  otherRequest?: InputMaybe<Scalars['String']['input']>;
  paymentMethod: Scalars['String']['input'];
  startDate: Scalars['DateTime']['input'];
  status?: InputMaybe<Scalars['String']['input']>;
  transactionId: Scalars['String']['input'];
  user: UserCreateNestedOneWithoutOrdersInput;
};

export type OrderCreateWithoutUserInput = {
  adultPrice: Scalars['Decimal']['input'];
  childPrice: Scalars['Decimal']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['String']['input'];
  infantPrice: Scalars['Decimal']['input'];
  numberOfAdults: Scalars['Int']['input'];
  numberOfChilds: Scalars['Int']['input'];
  numberOfInfants: Scalars['Int']['input'];
  otherRequest?: InputMaybe<Scalars['String']['input']>;
  paymentMethod: Scalars['String']['input'];
  startDate: Scalars['DateTime']['input'];
  status?: InputMaybe<Scalars['String']['input']>;
  tour: TourCreateNestedOneWithoutOrdersInput;
  transactionId: Scalars['String']['input'];
};

export type OrderGroupBy = {
  __typename?: 'OrderGroupBy';
  _avg?: Maybe<OrderAvgAggregate>;
  _count?: Maybe<OrderCountAggregate>;
  _max?: Maybe<OrderMaxAggregate>;
  _min?: Maybe<OrderMinAggregate>;
  _sum?: Maybe<OrderSumAggregate>;
  adultPrice: Scalars['Decimal']['output'];
  childPrice: Scalars['Decimal']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  infantPrice: Scalars['Decimal']['output'];
  numberOfAdults: Scalars['Int']['output'];
  numberOfChilds: Scalars['Int']['output'];
  numberOfInfants: Scalars['Int']['output'];
  otherRequest?: Maybe<Scalars['String']['output']>;
  paymentMethod: Scalars['String']['output'];
  startDate: Scalars['DateTime']['output'];
  status: Scalars['String']['output'];
  tourId: Scalars['Int']['output'];
  transactionId: Scalars['String']['output'];
  userEmail: Scalars['String']['output'];
};

export type OrderListRelationFilter = {
  every?: InputMaybe<OrderWhereInput>;
  none?: InputMaybe<OrderWhereInput>;
  some?: InputMaybe<OrderWhereInput>;
};

export type OrderMaxAggregate = {
  __typename?: 'OrderMaxAggregate';
  adultPrice?: Maybe<Scalars['Decimal']['output']>;
  childPrice?: Maybe<Scalars['Decimal']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  infantPrice?: Maybe<Scalars['Decimal']['output']>;
  numberOfAdults?: Maybe<Scalars['Int']['output']>;
  numberOfChilds?: Maybe<Scalars['Int']['output']>;
  numberOfInfants?: Maybe<Scalars['Int']['output']>;
  otherRequest?: Maybe<Scalars['String']['output']>;
  paymentMethod?: Maybe<Scalars['String']['output']>;
  startDate?: Maybe<Scalars['DateTime']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  tourId?: Maybe<Scalars['Int']['output']>;
  transactionId?: Maybe<Scalars['String']['output']>;
  userEmail?: Maybe<Scalars['String']['output']>;
};

export type OrderMaxOrderByAggregateInput = {
  adultPrice?: InputMaybe<SortOrder>;
  childPrice?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  infantPrice?: InputMaybe<SortOrder>;
  numberOfAdults?: InputMaybe<SortOrder>;
  numberOfChilds?: InputMaybe<SortOrder>;
  numberOfInfants?: InputMaybe<SortOrder>;
  otherRequest?: InputMaybe<SortOrder>;
  paymentMethod?: InputMaybe<SortOrder>;
  startDate?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  tourId?: InputMaybe<SortOrder>;
  transactionId?: InputMaybe<SortOrder>;
  userEmail?: InputMaybe<SortOrder>;
};

export type OrderMinAggregate = {
  __typename?: 'OrderMinAggregate';
  adultPrice?: Maybe<Scalars['Decimal']['output']>;
  childPrice?: Maybe<Scalars['Decimal']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  infantPrice?: Maybe<Scalars['Decimal']['output']>;
  numberOfAdults?: Maybe<Scalars['Int']['output']>;
  numberOfChilds?: Maybe<Scalars['Int']['output']>;
  numberOfInfants?: Maybe<Scalars['Int']['output']>;
  otherRequest?: Maybe<Scalars['String']['output']>;
  paymentMethod?: Maybe<Scalars['String']['output']>;
  startDate?: Maybe<Scalars['DateTime']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  tourId?: Maybe<Scalars['Int']['output']>;
  transactionId?: Maybe<Scalars['String']['output']>;
  userEmail?: Maybe<Scalars['String']['output']>;
};

export type OrderMinOrderByAggregateInput = {
  adultPrice?: InputMaybe<SortOrder>;
  childPrice?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  infantPrice?: InputMaybe<SortOrder>;
  numberOfAdults?: InputMaybe<SortOrder>;
  numberOfChilds?: InputMaybe<SortOrder>;
  numberOfInfants?: InputMaybe<SortOrder>;
  otherRequest?: InputMaybe<SortOrder>;
  paymentMethod?: InputMaybe<SortOrder>;
  startDate?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  tourId?: InputMaybe<SortOrder>;
  transactionId?: InputMaybe<SortOrder>;
  userEmail?: InputMaybe<SortOrder>;
};

export type OrderOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type OrderOrderByWithAggregationInput = {
  _avg?: InputMaybe<OrderAvgOrderByAggregateInput>;
  _count?: InputMaybe<OrderCountOrderByAggregateInput>;
  _max?: InputMaybe<OrderMaxOrderByAggregateInput>;
  _min?: InputMaybe<OrderMinOrderByAggregateInput>;
  _sum?: InputMaybe<OrderSumOrderByAggregateInput>;
  adultPrice?: InputMaybe<SortOrder>;
  childPrice?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  infantPrice?: InputMaybe<SortOrder>;
  numberOfAdults?: InputMaybe<SortOrder>;
  numberOfChilds?: InputMaybe<SortOrder>;
  numberOfInfants?: InputMaybe<SortOrder>;
  otherRequest?: InputMaybe<SortOrderInput>;
  paymentMethod?: InputMaybe<SortOrder>;
  startDate?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  tourId?: InputMaybe<SortOrder>;
  transactionId?: InputMaybe<SortOrder>;
  userEmail?: InputMaybe<SortOrder>;
};

export type OrderOrderByWithRelationInput = {
  adultPrice?: InputMaybe<SortOrder>;
  childPrice?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  infantPrice?: InputMaybe<SortOrder>;
  numberOfAdults?: InputMaybe<SortOrder>;
  numberOfChilds?: InputMaybe<SortOrder>;
  numberOfInfants?: InputMaybe<SortOrder>;
  otherRequest?: InputMaybe<SortOrderInput>;
  paymentMethod?: InputMaybe<SortOrder>;
  startDate?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  tour?: InputMaybe<TourOrderByWithRelationInput>;
  tourId?: InputMaybe<SortOrder>;
  transactionId?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationInput>;
  userEmail?: InputMaybe<SortOrder>;
};

export enum OrderScalarFieldEnum {
  AdultPrice = 'adultPrice',
  ChildPrice = 'childPrice',
  CreatedAt = 'createdAt',
  Id = 'id',
  InfantPrice = 'infantPrice',
  NumberOfAdults = 'numberOfAdults',
  NumberOfChilds = 'numberOfChilds',
  NumberOfInfants = 'numberOfInfants',
  OtherRequest = 'otherRequest',
  PaymentMethod = 'paymentMethod',
  StartDate = 'startDate',
  Status = 'status',
  TourId = 'tourId',
  TransactionId = 'transactionId',
  UserEmail = 'userEmail'
}

export type OrderScalarWhereInput = {
  AND?: InputMaybe<Array<OrderScalarWhereInput>>;
  NOT?: InputMaybe<Array<OrderScalarWhereInput>>;
  OR?: InputMaybe<Array<OrderScalarWhereInput>>;
  adultPrice?: InputMaybe<DecimalFilter>;
  childPrice?: InputMaybe<DecimalFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  infantPrice?: InputMaybe<DecimalFilter>;
  numberOfAdults?: InputMaybe<IntFilter>;
  numberOfChilds?: InputMaybe<IntFilter>;
  numberOfInfants?: InputMaybe<IntFilter>;
  otherRequest?: InputMaybe<StringNullableFilter>;
  paymentMethod?: InputMaybe<StringFilter>;
  startDate?: InputMaybe<DateTimeFilter>;
  status?: InputMaybe<StringFilter>;
  tourId?: InputMaybe<IntFilter>;
  transactionId?: InputMaybe<StringFilter>;
  userEmail?: InputMaybe<StringFilter>;
};

export type OrderScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<OrderScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<OrderScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<OrderScalarWhereWithAggregatesInput>>;
  adultPrice?: InputMaybe<DecimalWithAggregatesFilter>;
  childPrice?: InputMaybe<DecimalWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  infantPrice?: InputMaybe<DecimalWithAggregatesFilter>;
  numberOfAdults?: InputMaybe<IntWithAggregatesFilter>;
  numberOfChilds?: InputMaybe<IntWithAggregatesFilter>;
  numberOfInfants?: InputMaybe<IntWithAggregatesFilter>;
  otherRequest?: InputMaybe<StringNullableWithAggregatesFilter>;
  paymentMethod?: InputMaybe<StringWithAggregatesFilter>;
  startDate?: InputMaybe<DateTimeWithAggregatesFilter>;
  status?: InputMaybe<StringWithAggregatesFilter>;
  tourId?: InputMaybe<IntWithAggregatesFilter>;
  transactionId?: InputMaybe<StringWithAggregatesFilter>;
  userEmail?: InputMaybe<StringWithAggregatesFilter>;
};

export type OrderSumAggregate = {
  __typename?: 'OrderSumAggregate';
  adultPrice?: Maybe<Scalars['Decimal']['output']>;
  childPrice?: Maybe<Scalars['Decimal']['output']>;
  infantPrice?: Maybe<Scalars['Decimal']['output']>;
  numberOfAdults?: Maybe<Scalars['Int']['output']>;
  numberOfChilds?: Maybe<Scalars['Int']['output']>;
  numberOfInfants?: Maybe<Scalars['Int']['output']>;
  tourId?: Maybe<Scalars['Int']['output']>;
};

export type OrderSumOrderByAggregateInput = {
  adultPrice?: InputMaybe<SortOrder>;
  childPrice?: InputMaybe<SortOrder>;
  infantPrice?: InputMaybe<SortOrder>;
  numberOfAdults?: InputMaybe<SortOrder>;
  numberOfChilds?: InputMaybe<SortOrder>;
  numberOfInfants?: InputMaybe<SortOrder>;
  tourId?: InputMaybe<SortOrder>;
};

export type OrderUpdateInput = {
  adultPrice?: InputMaybe<DecimalFieldUpdateOperationsInput>;
  childPrice?: InputMaybe<DecimalFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  infantPrice?: InputMaybe<DecimalFieldUpdateOperationsInput>;
  numberOfAdults?: InputMaybe<IntFieldUpdateOperationsInput>;
  numberOfChilds?: InputMaybe<IntFieldUpdateOperationsInput>;
  numberOfInfants?: InputMaybe<IntFieldUpdateOperationsInput>;
  otherRequest?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  paymentMethod?: InputMaybe<StringFieldUpdateOperationsInput>;
  startDate?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  status?: InputMaybe<StringFieldUpdateOperationsInput>;
  tour?: InputMaybe<TourUpdateOneRequiredWithoutOrdersNestedInput>;
  transactionId?: InputMaybe<StringFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutOrdersNestedInput>;
};

export type OrderUpdateManyMutationInput = {
  adultPrice?: InputMaybe<DecimalFieldUpdateOperationsInput>;
  childPrice?: InputMaybe<DecimalFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  infantPrice?: InputMaybe<DecimalFieldUpdateOperationsInput>;
  numberOfAdults?: InputMaybe<IntFieldUpdateOperationsInput>;
  numberOfChilds?: InputMaybe<IntFieldUpdateOperationsInput>;
  numberOfInfants?: InputMaybe<IntFieldUpdateOperationsInput>;
  otherRequest?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  paymentMethod?: InputMaybe<StringFieldUpdateOperationsInput>;
  startDate?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  status?: InputMaybe<StringFieldUpdateOperationsInput>;
  transactionId?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type OrderUpdateManyWithWhereWithoutTourInput = {
  data: OrderUpdateManyMutationInput;
  where: OrderScalarWhereInput;
};

export type OrderUpdateManyWithWhereWithoutUserInput = {
  data: OrderUpdateManyMutationInput;
  where: OrderScalarWhereInput;
};

export type OrderUpdateManyWithoutTourNestedInput = {
  connect?: InputMaybe<Array<OrderWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<OrderCreateOrConnectWithoutTourInput>>;
  create?: InputMaybe<Array<OrderCreateWithoutTourInput>>;
  createMany?: InputMaybe<OrderCreateManyTourInputEnvelope>;
  delete?: InputMaybe<Array<OrderWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<OrderScalarWhereInput>>;
  disconnect?: InputMaybe<Array<OrderWhereUniqueInput>>;
  set?: InputMaybe<Array<OrderWhereUniqueInput>>;
  update?: InputMaybe<Array<OrderUpdateWithWhereUniqueWithoutTourInput>>;
  updateMany?: InputMaybe<Array<OrderUpdateManyWithWhereWithoutTourInput>>;
  upsert?: InputMaybe<Array<OrderUpsertWithWhereUniqueWithoutTourInput>>;
};

export type OrderUpdateManyWithoutUserNestedInput = {
  connect?: InputMaybe<Array<OrderWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<OrderCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<OrderCreateWithoutUserInput>>;
  createMany?: InputMaybe<OrderCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<OrderWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<OrderScalarWhereInput>>;
  disconnect?: InputMaybe<Array<OrderWhereUniqueInput>>;
  set?: InputMaybe<Array<OrderWhereUniqueInput>>;
  update?: InputMaybe<Array<OrderUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<OrderUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<OrderUpsertWithWhereUniqueWithoutUserInput>>;
};

export type OrderUpdateWithWhereUniqueWithoutTourInput = {
  data: OrderUpdateWithoutTourInput;
  where: OrderWhereUniqueInput;
};

export type OrderUpdateWithWhereUniqueWithoutUserInput = {
  data: OrderUpdateWithoutUserInput;
  where: OrderWhereUniqueInput;
};

export type OrderUpdateWithoutTourInput = {
  adultPrice?: InputMaybe<DecimalFieldUpdateOperationsInput>;
  childPrice?: InputMaybe<DecimalFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  infantPrice?: InputMaybe<DecimalFieldUpdateOperationsInput>;
  numberOfAdults?: InputMaybe<IntFieldUpdateOperationsInput>;
  numberOfChilds?: InputMaybe<IntFieldUpdateOperationsInput>;
  numberOfInfants?: InputMaybe<IntFieldUpdateOperationsInput>;
  otherRequest?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  paymentMethod?: InputMaybe<StringFieldUpdateOperationsInput>;
  startDate?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  status?: InputMaybe<StringFieldUpdateOperationsInput>;
  transactionId?: InputMaybe<StringFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutOrdersNestedInput>;
};

export type OrderUpdateWithoutUserInput = {
  adultPrice?: InputMaybe<DecimalFieldUpdateOperationsInput>;
  childPrice?: InputMaybe<DecimalFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  infantPrice?: InputMaybe<DecimalFieldUpdateOperationsInput>;
  numberOfAdults?: InputMaybe<IntFieldUpdateOperationsInput>;
  numberOfChilds?: InputMaybe<IntFieldUpdateOperationsInput>;
  numberOfInfants?: InputMaybe<IntFieldUpdateOperationsInput>;
  otherRequest?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  paymentMethod?: InputMaybe<StringFieldUpdateOperationsInput>;
  startDate?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  status?: InputMaybe<StringFieldUpdateOperationsInput>;
  tour?: InputMaybe<TourUpdateOneRequiredWithoutOrdersNestedInput>;
  transactionId?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type OrderUpsertWithWhereUniqueWithoutTourInput = {
  create: OrderCreateWithoutTourInput;
  update: OrderUpdateWithoutTourInput;
  where: OrderWhereUniqueInput;
};

export type OrderUpsertWithWhereUniqueWithoutUserInput = {
  create: OrderCreateWithoutUserInput;
  update: OrderUpdateWithoutUserInput;
  where: OrderWhereUniqueInput;
};

export type OrderWhereInput = {
  AND?: InputMaybe<Array<OrderWhereInput>>;
  NOT?: InputMaybe<Array<OrderWhereInput>>;
  OR?: InputMaybe<Array<OrderWhereInput>>;
  adultPrice?: InputMaybe<DecimalFilter>;
  childPrice?: InputMaybe<DecimalFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  infantPrice?: InputMaybe<DecimalFilter>;
  numberOfAdults?: InputMaybe<IntFilter>;
  numberOfChilds?: InputMaybe<IntFilter>;
  numberOfInfants?: InputMaybe<IntFilter>;
  otherRequest?: InputMaybe<StringNullableFilter>;
  paymentMethod?: InputMaybe<StringFilter>;
  startDate?: InputMaybe<DateTimeFilter>;
  status?: InputMaybe<StringFilter>;
  tour?: InputMaybe<TourRelationFilter>;
  tourId?: InputMaybe<IntFilter>;
  transactionId?: InputMaybe<StringFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userEmail?: InputMaybe<StringFilter>;
};

export type OrderWhereUniqueInput = {
  AND?: InputMaybe<Array<OrderWhereInput>>;
  NOT?: InputMaybe<Array<OrderWhereInput>>;
  OR?: InputMaybe<Array<OrderWhereInput>>;
  adultPrice?: InputMaybe<DecimalFilter>;
  childPrice?: InputMaybe<DecimalFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  infantPrice?: InputMaybe<DecimalFilter>;
  numberOfAdults?: InputMaybe<IntFilter>;
  numberOfChilds?: InputMaybe<IntFilter>;
  numberOfInfants?: InputMaybe<IntFilter>;
  otherRequest?: InputMaybe<StringNullableFilter>;
  paymentMethod?: InputMaybe<StringFilter>;
  startDate?: InputMaybe<DateTimeFilter>;
  status?: InputMaybe<StringFilter>;
  tour?: InputMaybe<TourRelationFilter>;
  tourId?: InputMaybe<IntFilter>;
  transactionId?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<UserRelationFilter>;
  userEmail?: InputMaybe<StringFilter>;
};

export type Query = {
  __typename?: 'Query';
  aggregateCategory: AggregateCategory;
  aggregateOrder: AggregateOrder;
  aggregateTour: AggregateTour;
  aggregateUser: AggregateUser;
  categories: Array<Category>;
  category?: Maybe<Category>;
  findFirstCategory?: Maybe<Category>;
  findFirstCategoryOrThrow?: Maybe<Category>;
  findFirstOrder?: Maybe<Order>;
  findFirstOrderOrThrow?: Maybe<Order>;
  findFirstTour?: Maybe<Tour>;
  findFirstTourOrThrow?: Maybe<Tour>;
  findFirstUser?: Maybe<User>;
  findFirstUserOrThrow?: Maybe<User>;
  getCategory?: Maybe<Category>;
  getOrder?: Maybe<Order>;
  getTour?: Maybe<Tour>;
  getUser?: Maybe<User>;
  groupByCategory: Array<CategoryGroupBy>;
  groupByOrder: Array<OrderGroupBy>;
  groupByTour: Array<TourGroupBy>;
  groupByUser: Array<UserGroupBy>;
  order?: Maybe<Order>;
  orders: Array<Order>;
  tour?: Maybe<Tour>;
  tours: Array<Tour>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryAggregateCategoryArgs = {
  cursor?: InputMaybe<CategoryWhereUniqueInput>;
  orderBy?: InputMaybe<Array<CategoryOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CategoryWhereInput>;
};


export type QueryAggregateOrderArgs = {
  cursor?: InputMaybe<OrderWhereUniqueInput>;
  orderBy?: InputMaybe<Array<OrderOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<OrderWhereInput>;
};


export type QueryAggregateTourArgs = {
  cursor?: InputMaybe<TourWhereUniqueInput>;
  orderBy?: InputMaybe<Array<TourOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TourWhereInput>;
};


export type QueryAggregateUserArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserWhereInput>;
};


export type QueryCategoriesArgs = {
  cursor?: InputMaybe<CategoryWhereUniqueInput>;
  distinct?: InputMaybe<Array<CategoryScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<CategoryOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CategoryWhereInput>;
};


export type QueryCategoryArgs = {
  where: CategoryWhereUniqueInput;
};


export type QueryFindFirstCategoryArgs = {
  cursor?: InputMaybe<CategoryWhereUniqueInput>;
  distinct?: InputMaybe<Array<CategoryScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<CategoryOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CategoryWhereInput>;
};


export type QueryFindFirstCategoryOrThrowArgs = {
  cursor?: InputMaybe<CategoryWhereUniqueInput>;
  distinct?: InputMaybe<Array<CategoryScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<CategoryOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CategoryWhereInput>;
};


export type QueryFindFirstOrderArgs = {
  cursor?: InputMaybe<OrderWhereUniqueInput>;
  distinct?: InputMaybe<Array<OrderScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<OrderOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<OrderWhereInput>;
};


export type QueryFindFirstOrderOrThrowArgs = {
  cursor?: InputMaybe<OrderWhereUniqueInput>;
  distinct?: InputMaybe<Array<OrderScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<OrderOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<OrderWhereInput>;
};


export type QueryFindFirstTourArgs = {
  cursor?: InputMaybe<TourWhereUniqueInput>;
  distinct?: InputMaybe<Array<TourScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<TourOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TourWhereInput>;
};


export type QueryFindFirstTourOrThrowArgs = {
  cursor?: InputMaybe<TourWhereUniqueInput>;
  distinct?: InputMaybe<Array<TourScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<TourOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TourWhereInput>;
};


export type QueryFindFirstUserArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserWhereInput>;
};


export type QueryFindFirstUserOrThrowArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserWhereInput>;
};


export type QueryGetCategoryArgs = {
  where: CategoryWhereUniqueInput;
};


export type QueryGetOrderArgs = {
  where: OrderWhereUniqueInput;
};


export type QueryGetTourArgs = {
  where: TourWhereUniqueInput;
};


export type QueryGetUserArgs = {
  where: UserWhereUniqueInput;
};


export type QueryGroupByCategoryArgs = {
  by: Array<CategoryScalarFieldEnum>;
  having?: InputMaybe<CategoryScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<CategoryOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CategoryWhereInput>;
};


export type QueryGroupByOrderArgs = {
  by: Array<OrderScalarFieldEnum>;
  having?: InputMaybe<OrderScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<OrderOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<OrderWhereInput>;
};


export type QueryGroupByTourArgs = {
  by: Array<TourScalarFieldEnum>;
  having?: InputMaybe<TourScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<TourOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TourWhereInput>;
};


export type QueryGroupByUserArgs = {
  by: Array<UserScalarFieldEnum>;
  having?: InputMaybe<UserScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<UserOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserWhereInput>;
};


export type QueryOrderArgs = {
  where: OrderWhereUniqueInput;
};


export type QueryOrdersArgs = {
  cursor?: InputMaybe<OrderWhereUniqueInput>;
  distinct?: InputMaybe<Array<OrderScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<OrderOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<OrderWhereInput>;
};


export type QueryTourArgs = {
  where: TourWhereUniqueInput;
};


export type QueryToursArgs = {
  cursor?: InputMaybe<TourWhereUniqueInput>;
  distinct?: InputMaybe<Array<TourScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<TourOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TourWhereInput>;
};


export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};


export type QueryUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserWhereInput>;
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type SortOrderInput = {
  nulls?: InputMaybe<NullsOrder>;
  sort: SortOrder;
};

export type StringFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['String']['input']>;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type StringNullableWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedStringNullableFilter>;
  _min?: InputMaybe<NestedStringNullableFilter>;
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringNullableWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type StringWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedStringFilter>;
  _min?: InputMaybe<NestedStringFilter>;
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Tour = {
  __typename?: 'Tour';
  _count?: Maybe<TourCount>;
  adultPrice: Scalars['Decimal']['output'];
  categories: Array<Category>;
  childPrice: Scalars['Decimal']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  duration: Scalars['String']['output'];
  featuredImage: Scalars['String']['output'];
  galleryImgs: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  infantPrice: Scalars['Decimal']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  orders: Array<Order>;
  users: Array<User>;
};


export type TourCategoriesArgs = {
  cursor?: InputMaybe<CategoryWhereUniqueInput>;
  distinct?: InputMaybe<Array<CategoryScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<CategoryOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CategoryWhereInput>;
};


export type TourOrdersArgs = {
  cursor?: InputMaybe<OrderWhereUniqueInput>;
  distinct?: InputMaybe<Array<OrderScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<OrderOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<OrderWhereInput>;
};


export type TourUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserWhereInput>;
};

export type TourAvgAggregate = {
  __typename?: 'TourAvgAggregate';
  adultPrice?: Maybe<Scalars['Decimal']['output']>;
  childPrice?: Maybe<Scalars['Decimal']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  infantPrice?: Maybe<Scalars['Decimal']['output']>;
};

export type TourAvgOrderByAggregateInput = {
  adultPrice?: InputMaybe<SortOrder>;
  childPrice?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  infantPrice?: InputMaybe<SortOrder>;
};

export type TourCount = {
  __typename?: 'TourCount';
  categories: Scalars['Int']['output'];
  orders: Scalars['Int']['output'];
  users: Scalars['Int']['output'];
};


export type TourCountCategoriesArgs = {
  where?: InputMaybe<CategoryWhereInput>;
};


export type TourCountOrdersArgs = {
  where?: InputMaybe<OrderWhereInput>;
};


export type TourCountUsersArgs = {
  where?: InputMaybe<UserWhereInput>;
};

export type TourCountAggregate = {
  __typename?: 'TourCountAggregate';
  _all: Scalars['Int']['output'];
  adultPrice: Scalars['Int']['output'];
  childPrice: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  description: Scalars['Int']['output'];
  duration: Scalars['Int']['output'];
  featuredImage: Scalars['Int']['output'];
  galleryImgs: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  infantPrice: Scalars['Int']['output'];
  isActive: Scalars['Int']['output'];
  name: Scalars['Int']['output'];
};

export type TourCountOrderByAggregateInput = {
  adultPrice?: InputMaybe<SortOrder>;
  childPrice?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  duration?: InputMaybe<SortOrder>;
  featuredImage?: InputMaybe<SortOrder>;
  galleryImgs?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  infantPrice?: InputMaybe<SortOrder>;
  isActive?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type TourCreateInput = {
  adultPrice: Scalars['Decimal']['input'];
  categories?: InputMaybe<CategoryCreateNestedManyWithoutToursInput>;
  childPrice: Scalars['Decimal']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  duration: Scalars['String']['input'];
  featuredImage: Scalars['String']['input'];
  galleryImgs: Scalars['String']['input'];
  infantPrice: Scalars['Decimal']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  orders?: InputMaybe<OrderCreateNestedManyWithoutTourInput>;
  users?: InputMaybe<UserCreateNestedManyWithoutSavedListInput>;
};

export type TourCreateManyInput = {
  adultPrice: Scalars['Decimal']['input'];
  childPrice: Scalars['Decimal']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  duration: Scalars['String']['input'];
  featuredImage: Scalars['String']['input'];
  galleryImgs: Scalars['String']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  infantPrice: Scalars['Decimal']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
};

export type TourCreateNestedManyWithoutCategoriesInput = {
  connect?: InputMaybe<Array<TourWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<TourCreateOrConnectWithoutCategoriesInput>>;
  create?: InputMaybe<Array<TourCreateWithoutCategoriesInput>>;
};

export type TourCreateNestedManyWithoutUsersInput = {
  connect?: InputMaybe<Array<TourWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<TourCreateOrConnectWithoutUsersInput>>;
  create?: InputMaybe<Array<TourCreateWithoutUsersInput>>;
};

export type TourCreateNestedOneWithoutOrdersInput = {
  connect?: InputMaybe<TourWhereUniqueInput>;
  connectOrCreate?: InputMaybe<TourCreateOrConnectWithoutOrdersInput>;
  create?: InputMaybe<TourCreateWithoutOrdersInput>;
};

export type TourCreateOrConnectWithoutCategoriesInput = {
  create: TourCreateWithoutCategoriesInput;
  where: TourWhereUniqueInput;
};

export type TourCreateOrConnectWithoutOrdersInput = {
  create: TourCreateWithoutOrdersInput;
  where: TourWhereUniqueInput;
};

export type TourCreateOrConnectWithoutUsersInput = {
  create: TourCreateWithoutUsersInput;
  where: TourWhereUniqueInput;
};

export type TourCreateWithoutCategoriesInput = {
  adultPrice: Scalars['Decimal']['input'];
  childPrice: Scalars['Decimal']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  duration: Scalars['String']['input'];
  featuredImage: Scalars['String']['input'];
  galleryImgs: Scalars['String']['input'];
  infantPrice: Scalars['Decimal']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  orders?: InputMaybe<OrderCreateNestedManyWithoutTourInput>;
  users?: InputMaybe<UserCreateNestedManyWithoutSavedListInput>;
};

export type TourCreateWithoutOrdersInput = {
  adultPrice: Scalars['Decimal']['input'];
  categories?: InputMaybe<CategoryCreateNestedManyWithoutToursInput>;
  childPrice: Scalars['Decimal']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  duration: Scalars['String']['input'];
  featuredImage: Scalars['String']['input'];
  galleryImgs: Scalars['String']['input'];
  infantPrice: Scalars['Decimal']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  users?: InputMaybe<UserCreateNestedManyWithoutSavedListInput>;
};

export type TourCreateWithoutUsersInput = {
  adultPrice: Scalars['Decimal']['input'];
  categories?: InputMaybe<CategoryCreateNestedManyWithoutToursInput>;
  childPrice: Scalars['Decimal']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  duration: Scalars['String']['input'];
  featuredImage: Scalars['String']['input'];
  galleryImgs: Scalars['String']['input'];
  infantPrice: Scalars['Decimal']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  orders?: InputMaybe<OrderCreateNestedManyWithoutTourInput>;
};

export type TourGroupBy = {
  __typename?: 'TourGroupBy';
  _avg?: Maybe<TourAvgAggregate>;
  _count?: Maybe<TourCountAggregate>;
  _max?: Maybe<TourMaxAggregate>;
  _min?: Maybe<TourMinAggregate>;
  _sum?: Maybe<TourSumAggregate>;
  adultPrice: Scalars['Decimal']['output'];
  childPrice: Scalars['Decimal']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  duration: Scalars['String']['output'];
  featuredImage: Scalars['String']['output'];
  galleryImgs: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  infantPrice: Scalars['Decimal']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
};

export type TourListRelationFilter = {
  every?: InputMaybe<TourWhereInput>;
  none?: InputMaybe<TourWhereInput>;
  some?: InputMaybe<TourWhereInput>;
};

export type TourMaxAggregate = {
  __typename?: 'TourMaxAggregate';
  adultPrice?: Maybe<Scalars['Decimal']['output']>;
  childPrice?: Maybe<Scalars['Decimal']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  duration?: Maybe<Scalars['String']['output']>;
  featuredImage?: Maybe<Scalars['String']['output']>;
  galleryImgs?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  infantPrice?: Maybe<Scalars['Decimal']['output']>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type TourMaxOrderByAggregateInput = {
  adultPrice?: InputMaybe<SortOrder>;
  childPrice?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  duration?: InputMaybe<SortOrder>;
  featuredImage?: InputMaybe<SortOrder>;
  galleryImgs?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  infantPrice?: InputMaybe<SortOrder>;
  isActive?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type TourMinAggregate = {
  __typename?: 'TourMinAggregate';
  adultPrice?: Maybe<Scalars['Decimal']['output']>;
  childPrice?: Maybe<Scalars['Decimal']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  duration?: Maybe<Scalars['String']['output']>;
  featuredImage?: Maybe<Scalars['String']['output']>;
  galleryImgs?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  infantPrice?: Maybe<Scalars['Decimal']['output']>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type TourMinOrderByAggregateInput = {
  adultPrice?: InputMaybe<SortOrder>;
  childPrice?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  duration?: InputMaybe<SortOrder>;
  featuredImage?: InputMaybe<SortOrder>;
  galleryImgs?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  infantPrice?: InputMaybe<SortOrder>;
  isActive?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type TourOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type TourOrderByWithAggregationInput = {
  _avg?: InputMaybe<TourAvgOrderByAggregateInput>;
  _count?: InputMaybe<TourCountOrderByAggregateInput>;
  _max?: InputMaybe<TourMaxOrderByAggregateInput>;
  _min?: InputMaybe<TourMinOrderByAggregateInput>;
  _sum?: InputMaybe<TourSumOrderByAggregateInput>;
  adultPrice?: InputMaybe<SortOrder>;
  childPrice?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrderInput>;
  duration?: InputMaybe<SortOrder>;
  featuredImage?: InputMaybe<SortOrder>;
  galleryImgs?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  infantPrice?: InputMaybe<SortOrder>;
  isActive?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type TourOrderByWithRelationInput = {
  adultPrice?: InputMaybe<SortOrder>;
  categories?: InputMaybe<CategoryOrderByRelationAggregateInput>;
  childPrice?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrderInput>;
  duration?: InputMaybe<SortOrder>;
  featuredImage?: InputMaybe<SortOrder>;
  galleryImgs?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  infantPrice?: InputMaybe<SortOrder>;
  isActive?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  orders?: InputMaybe<OrderOrderByRelationAggregateInput>;
  users?: InputMaybe<UserOrderByRelationAggregateInput>;
};

export type TourRelationFilter = {
  is?: InputMaybe<TourWhereInput>;
  isNot?: InputMaybe<TourWhereInput>;
};

export enum TourScalarFieldEnum {
  AdultPrice = 'adultPrice',
  ChildPrice = 'childPrice',
  CreatedAt = 'createdAt',
  Description = 'description',
  Duration = 'duration',
  FeaturedImage = 'featuredImage',
  GalleryImgs = 'galleryImgs',
  Id = 'id',
  InfantPrice = 'infantPrice',
  IsActive = 'isActive',
  Name = 'name'
}

export type TourScalarWhereInput = {
  AND?: InputMaybe<Array<TourScalarWhereInput>>;
  NOT?: InputMaybe<Array<TourScalarWhereInput>>;
  OR?: InputMaybe<Array<TourScalarWhereInput>>;
  adultPrice?: InputMaybe<DecimalFilter>;
  childPrice?: InputMaybe<DecimalFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  duration?: InputMaybe<StringFilter>;
  featuredImage?: InputMaybe<StringFilter>;
  galleryImgs?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  infantPrice?: InputMaybe<DecimalFilter>;
  isActive?: InputMaybe<BoolFilter>;
  name?: InputMaybe<StringFilter>;
};

export type TourScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<TourScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<TourScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<TourScalarWhereWithAggregatesInput>>;
  adultPrice?: InputMaybe<DecimalWithAggregatesFilter>;
  childPrice?: InputMaybe<DecimalWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  description?: InputMaybe<StringNullableWithAggregatesFilter>;
  duration?: InputMaybe<StringWithAggregatesFilter>;
  featuredImage?: InputMaybe<StringWithAggregatesFilter>;
  galleryImgs?: InputMaybe<StringWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  infantPrice?: InputMaybe<DecimalWithAggregatesFilter>;
  isActive?: InputMaybe<BoolWithAggregatesFilter>;
  name?: InputMaybe<StringWithAggregatesFilter>;
};

export type TourSumAggregate = {
  __typename?: 'TourSumAggregate';
  adultPrice?: Maybe<Scalars['Decimal']['output']>;
  childPrice?: Maybe<Scalars['Decimal']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  infantPrice?: Maybe<Scalars['Decimal']['output']>;
};

export type TourSumOrderByAggregateInput = {
  adultPrice?: InputMaybe<SortOrder>;
  childPrice?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  infantPrice?: InputMaybe<SortOrder>;
};

export type TourUpdateInput = {
  adultPrice?: InputMaybe<DecimalFieldUpdateOperationsInput>;
  categories?: InputMaybe<CategoryUpdateManyWithoutToursNestedInput>;
  childPrice?: InputMaybe<DecimalFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  duration?: InputMaybe<StringFieldUpdateOperationsInput>;
  featuredImage?: InputMaybe<StringFieldUpdateOperationsInput>;
  galleryImgs?: InputMaybe<StringFieldUpdateOperationsInput>;
  infantPrice?: InputMaybe<DecimalFieldUpdateOperationsInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  orders?: InputMaybe<OrderUpdateManyWithoutTourNestedInput>;
  users?: InputMaybe<UserUpdateManyWithoutSavedListNestedInput>;
};

export type TourUpdateManyMutationInput = {
  adultPrice?: InputMaybe<DecimalFieldUpdateOperationsInput>;
  childPrice?: InputMaybe<DecimalFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  duration?: InputMaybe<StringFieldUpdateOperationsInput>;
  featuredImage?: InputMaybe<StringFieldUpdateOperationsInput>;
  galleryImgs?: InputMaybe<StringFieldUpdateOperationsInput>;
  infantPrice?: InputMaybe<DecimalFieldUpdateOperationsInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type TourUpdateManyWithWhereWithoutCategoriesInput = {
  data: TourUpdateManyMutationInput;
  where: TourScalarWhereInput;
};

export type TourUpdateManyWithWhereWithoutUsersInput = {
  data: TourUpdateManyMutationInput;
  where: TourScalarWhereInput;
};

export type TourUpdateManyWithoutCategoriesNestedInput = {
  connect?: InputMaybe<Array<TourWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<TourCreateOrConnectWithoutCategoriesInput>>;
  create?: InputMaybe<Array<TourCreateWithoutCategoriesInput>>;
  delete?: InputMaybe<Array<TourWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<TourScalarWhereInput>>;
  disconnect?: InputMaybe<Array<TourWhereUniqueInput>>;
  set?: InputMaybe<Array<TourWhereUniqueInput>>;
  update?: InputMaybe<Array<TourUpdateWithWhereUniqueWithoutCategoriesInput>>;
  updateMany?: InputMaybe<Array<TourUpdateManyWithWhereWithoutCategoriesInput>>;
  upsert?: InputMaybe<Array<TourUpsertWithWhereUniqueWithoutCategoriesInput>>;
};

export type TourUpdateManyWithoutUsersNestedInput = {
  connect?: InputMaybe<Array<TourWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<TourCreateOrConnectWithoutUsersInput>>;
  create?: InputMaybe<Array<TourCreateWithoutUsersInput>>;
  delete?: InputMaybe<Array<TourWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<TourScalarWhereInput>>;
  disconnect?: InputMaybe<Array<TourWhereUniqueInput>>;
  set?: InputMaybe<Array<TourWhereUniqueInput>>;
  update?: InputMaybe<Array<TourUpdateWithWhereUniqueWithoutUsersInput>>;
  updateMany?: InputMaybe<Array<TourUpdateManyWithWhereWithoutUsersInput>>;
  upsert?: InputMaybe<Array<TourUpsertWithWhereUniqueWithoutUsersInput>>;
};

export type TourUpdateOneRequiredWithoutOrdersNestedInput = {
  connect?: InputMaybe<TourWhereUniqueInput>;
  connectOrCreate?: InputMaybe<TourCreateOrConnectWithoutOrdersInput>;
  create?: InputMaybe<TourCreateWithoutOrdersInput>;
  update?: InputMaybe<TourUpdateToOneWithWhereWithoutOrdersInput>;
  upsert?: InputMaybe<TourUpsertWithoutOrdersInput>;
};

export type TourUpdateToOneWithWhereWithoutOrdersInput = {
  data: TourUpdateWithoutOrdersInput;
  where?: InputMaybe<TourWhereInput>;
};

export type TourUpdateWithWhereUniqueWithoutCategoriesInput = {
  data: TourUpdateWithoutCategoriesInput;
  where: TourWhereUniqueInput;
};

export type TourUpdateWithWhereUniqueWithoutUsersInput = {
  data: TourUpdateWithoutUsersInput;
  where: TourWhereUniqueInput;
};

export type TourUpdateWithoutCategoriesInput = {
  adultPrice?: InputMaybe<DecimalFieldUpdateOperationsInput>;
  childPrice?: InputMaybe<DecimalFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  duration?: InputMaybe<StringFieldUpdateOperationsInput>;
  featuredImage?: InputMaybe<StringFieldUpdateOperationsInput>;
  galleryImgs?: InputMaybe<StringFieldUpdateOperationsInput>;
  infantPrice?: InputMaybe<DecimalFieldUpdateOperationsInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  orders?: InputMaybe<OrderUpdateManyWithoutTourNestedInput>;
  users?: InputMaybe<UserUpdateManyWithoutSavedListNestedInput>;
};

export type TourUpdateWithoutOrdersInput = {
  adultPrice?: InputMaybe<DecimalFieldUpdateOperationsInput>;
  categories?: InputMaybe<CategoryUpdateManyWithoutToursNestedInput>;
  childPrice?: InputMaybe<DecimalFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  duration?: InputMaybe<StringFieldUpdateOperationsInput>;
  featuredImage?: InputMaybe<StringFieldUpdateOperationsInput>;
  galleryImgs?: InputMaybe<StringFieldUpdateOperationsInput>;
  infantPrice?: InputMaybe<DecimalFieldUpdateOperationsInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  users?: InputMaybe<UserUpdateManyWithoutSavedListNestedInput>;
};

export type TourUpdateWithoutUsersInput = {
  adultPrice?: InputMaybe<DecimalFieldUpdateOperationsInput>;
  categories?: InputMaybe<CategoryUpdateManyWithoutToursNestedInput>;
  childPrice?: InputMaybe<DecimalFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  duration?: InputMaybe<StringFieldUpdateOperationsInput>;
  featuredImage?: InputMaybe<StringFieldUpdateOperationsInput>;
  galleryImgs?: InputMaybe<StringFieldUpdateOperationsInput>;
  infantPrice?: InputMaybe<DecimalFieldUpdateOperationsInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  orders?: InputMaybe<OrderUpdateManyWithoutTourNestedInput>;
};

export type TourUpsertWithWhereUniqueWithoutCategoriesInput = {
  create: TourCreateWithoutCategoriesInput;
  update: TourUpdateWithoutCategoriesInput;
  where: TourWhereUniqueInput;
};

export type TourUpsertWithWhereUniqueWithoutUsersInput = {
  create: TourCreateWithoutUsersInput;
  update: TourUpdateWithoutUsersInput;
  where: TourWhereUniqueInput;
};

export type TourUpsertWithoutOrdersInput = {
  create: TourCreateWithoutOrdersInput;
  update: TourUpdateWithoutOrdersInput;
  where?: InputMaybe<TourWhereInput>;
};

export type TourWhereInput = {
  AND?: InputMaybe<Array<TourWhereInput>>;
  NOT?: InputMaybe<Array<TourWhereInput>>;
  OR?: InputMaybe<Array<TourWhereInput>>;
  adultPrice?: InputMaybe<DecimalFilter>;
  categories?: InputMaybe<CategoryListRelationFilter>;
  childPrice?: InputMaybe<DecimalFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  duration?: InputMaybe<StringFilter>;
  featuredImage?: InputMaybe<StringFilter>;
  galleryImgs?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  infantPrice?: InputMaybe<DecimalFilter>;
  isActive?: InputMaybe<BoolFilter>;
  name?: InputMaybe<StringFilter>;
  orders?: InputMaybe<OrderListRelationFilter>;
  users?: InputMaybe<UserListRelationFilter>;
};

export type TourWhereUniqueInput = {
  AND?: InputMaybe<Array<TourWhereInput>>;
  NOT?: InputMaybe<Array<TourWhereInput>>;
  OR?: InputMaybe<Array<TourWhereInput>>;
  adultPrice?: InputMaybe<DecimalFilter>;
  categories?: InputMaybe<CategoryListRelationFilter>;
  childPrice?: InputMaybe<DecimalFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  duration?: InputMaybe<StringFilter>;
  featuredImage?: InputMaybe<StringFilter>;
  galleryImgs?: InputMaybe<StringFilter>;
  id?: InputMaybe<Scalars['Int']['input']>;
  infantPrice?: InputMaybe<DecimalFilter>;
  isActive?: InputMaybe<BoolFilter>;
  name?: InputMaybe<StringFilter>;
  orders?: InputMaybe<OrderListRelationFilter>;
  users?: InputMaybe<UserListRelationFilter>;
};

export type User = {
  __typename?: 'User';
  _count?: Maybe<UserCount>;
  avatar?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  fullname?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  isActive: Scalars['Boolean']['output'];
  isAdmin: Scalars['Boolean']['output'];
  isEmailVerified: Scalars['Boolean']['output'];
  orders: Array<Order>;
  password?: Maybe<Scalars['String']['output']>;
  savedList: Array<Tour>;
};


export type UserOrdersArgs = {
  cursor?: InputMaybe<OrderWhereUniqueInput>;
  distinct?: InputMaybe<Array<OrderScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<OrderOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<OrderWhereInput>;
};


export type UserSavedListArgs = {
  cursor?: InputMaybe<TourWhereUniqueInput>;
  distinct?: InputMaybe<Array<TourScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<TourOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TourWhereInput>;
};

export type UserAvgAggregate = {
  __typename?: 'UserAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
};

export type UserAvgOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type UserCount = {
  __typename?: 'UserCount';
  orders: Scalars['Int']['output'];
  savedList: Scalars['Int']['output'];
};


export type UserCountOrdersArgs = {
  where?: InputMaybe<OrderWhereInput>;
};


export type UserCountSavedListArgs = {
  where?: InputMaybe<TourWhereInput>;
};

export type UserCountAggregate = {
  __typename?: 'UserCountAggregate';
  _all: Scalars['Int']['output'];
  avatar: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  email: Scalars['Int']['output'];
  fullname: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  isActive: Scalars['Int']['output'];
  isAdmin: Scalars['Int']['output'];
  isEmailVerified: Scalars['Int']['output'];
  password: Scalars['Int']['output'];
};

export type UserCountOrderByAggregateInput = {
  avatar?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  fullname?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isActive?: InputMaybe<SortOrder>;
  isAdmin?: InputMaybe<SortOrder>;
  isEmailVerified?: InputMaybe<SortOrder>;
  password?: InputMaybe<SortOrder>;
};

export type UserCreateInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  fullname?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isAdmin?: InputMaybe<Scalars['Boolean']['input']>;
  isEmailVerified?: InputMaybe<Scalars['Boolean']['input']>;
  orders?: InputMaybe<OrderCreateNestedManyWithoutUserInput>;
  password?: InputMaybe<Scalars['String']['input']>;
  savedList?: InputMaybe<TourCreateNestedManyWithoutUsersInput>;
};

export type UserCreateManyInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  fullname?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isAdmin?: InputMaybe<Scalars['Boolean']['input']>;
  isEmailVerified?: InputMaybe<Scalars['Boolean']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type UserCreateNestedManyWithoutSavedListInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserCreateOrConnectWithoutSavedListInput>>;
  create?: InputMaybe<Array<UserCreateWithoutSavedListInput>>;
};

export type UserCreateNestedOneWithoutOrdersInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutOrdersInput>;
  create?: InputMaybe<UserCreateWithoutOrdersInput>;
};

export type UserCreateOrConnectWithoutOrdersInput = {
  create: UserCreateWithoutOrdersInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutSavedListInput = {
  create: UserCreateWithoutSavedListInput;
  where: UserWhereUniqueInput;
};

export type UserCreateWithoutOrdersInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  fullname?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isAdmin?: InputMaybe<Scalars['Boolean']['input']>;
  isEmailVerified?: InputMaybe<Scalars['Boolean']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  savedList?: InputMaybe<TourCreateNestedManyWithoutUsersInput>;
};

export type UserCreateWithoutSavedListInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  fullname?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isAdmin?: InputMaybe<Scalars['Boolean']['input']>;
  isEmailVerified?: InputMaybe<Scalars['Boolean']['input']>;
  orders?: InputMaybe<OrderCreateNestedManyWithoutUserInput>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type UserGroupBy = {
  __typename?: 'UserGroupBy';
  _avg?: Maybe<UserAvgAggregate>;
  _count?: Maybe<UserCountAggregate>;
  _max?: Maybe<UserMaxAggregate>;
  _min?: Maybe<UserMinAggregate>;
  _sum?: Maybe<UserSumAggregate>;
  avatar?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  fullname?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  isActive: Scalars['Boolean']['output'];
  isAdmin: Scalars['Boolean']['output'];
  isEmailVerified: Scalars['Boolean']['output'];
  password?: Maybe<Scalars['String']['output']>;
};

export type UserListRelationFilter = {
  every?: InputMaybe<UserWhereInput>;
  none?: InputMaybe<UserWhereInput>;
  some?: InputMaybe<UserWhereInput>;
};

export type UserMaxAggregate = {
  __typename?: 'UserMaxAggregate';
  avatar?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  fullname?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  isAdmin?: Maybe<Scalars['Boolean']['output']>;
  isEmailVerified?: Maybe<Scalars['Boolean']['output']>;
  password?: Maybe<Scalars['String']['output']>;
};

export type UserMaxOrderByAggregateInput = {
  avatar?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  fullname?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isActive?: InputMaybe<SortOrder>;
  isAdmin?: InputMaybe<SortOrder>;
  isEmailVerified?: InputMaybe<SortOrder>;
  password?: InputMaybe<SortOrder>;
};

export type UserMinAggregate = {
  __typename?: 'UserMinAggregate';
  avatar?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  fullname?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  isAdmin?: Maybe<Scalars['Boolean']['output']>;
  isEmailVerified?: Maybe<Scalars['Boolean']['output']>;
  password?: Maybe<Scalars['String']['output']>;
};

export type UserMinOrderByAggregateInput = {
  avatar?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  fullname?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isActive?: InputMaybe<SortOrder>;
  isAdmin?: InputMaybe<SortOrder>;
  isEmailVerified?: InputMaybe<SortOrder>;
  password?: InputMaybe<SortOrder>;
};

export type UserOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type UserOrderByWithAggregationInput = {
  _avg?: InputMaybe<UserAvgOrderByAggregateInput>;
  _count?: InputMaybe<UserCountOrderByAggregateInput>;
  _max?: InputMaybe<UserMaxOrderByAggregateInput>;
  _min?: InputMaybe<UserMinOrderByAggregateInput>;
  _sum?: InputMaybe<UserSumOrderByAggregateInput>;
  avatar?: InputMaybe<SortOrderInput>;
  createdAt?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  fullname?: InputMaybe<SortOrderInput>;
  id?: InputMaybe<SortOrder>;
  isActive?: InputMaybe<SortOrder>;
  isAdmin?: InputMaybe<SortOrder>;
  isEmailVerified?: InputMaybe<SortOrder>;
  password?: InputMaybe<SortOrderInput>;
};

export type UserOrderByWithRelationInput = {
  avatar?: InputMaybe<SortOrderInput>;
  createdAt?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  fullname?: InputMaybe<SortOrderInput>;
  id?: InputMaybe<SortOrder>;
  isActive?: InputMaybe<SortOrder>;
  isAdmin?: InputMaybe<SortOrder>;
  isEmailVerified?: InputMaybe<SortOrder>;
  orders?: InputMaybe<OrderOrderByRelationAggregateInput>;
  password?: InputMaybe<SortOrderInput>;
  savedList?: InputMaybe<TourOrderByRelationAggregateInput>;
};

export type UserRelationFilter = {
  is?: InputMaybe<UserWhereInput>;
  isNot?: InputMaybe<UserWhereInput>;
};

export enum UserScalarFieldEnum {
  Avatar = 'avatar',
  CreatedAt = 'createdAt',
  Email = 'email',
  Fullname = 'fullname',
  Id = 'id',
  IsActive = 'isActive',
  IsAdmin = 'isAdmin',
  IsEmailVerified = 'isEmailVerified',
  Password = 'password'
}

export type UserScalarWhereInput = {
  AND?: InputMaybe<Array<UserScalarWhereInput>>;
  NOT?: InputMaybe<Array<UserScalarWhereInput>>;
  OR?: InputMaybe<Array<UserScalarWhereInput>>;
  avatar?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<StringFilter>;
  fullname?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<IntFilter>;
  isActive?: InputMaybe<BoolFilter>;
  isAdmin?: InputMaybe<BoolFilter>;
  isEmailVerified?: InputMaybe<BoolFilter>;
  password?: InputMaybe<StringNullableFilter>;
};

export type UserScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<UserScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<UserScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<UserScalarWhereWithAggregatesInput>>;
  avatar?: InputMaybe<StringNullableWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  email?: InputMaybe<StringWithAggregatesFilter>;
  fullname?: InputMaybe<StringNullableWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  isActive?: InputMaybe<BoolWithAggregatesFilter>;
  isAdmin?: InputMaybe<BoolWithAggregatesFilter>;
  isEmailVerified?: InputMaybe<BoolWithAggregatesFilter>;
  password?: InputMaybe<StringNullableWithAggregatesFilter>;
};

export type UserSumAggregate = {
  __typename?: 'UserSumAggregate';
  id?: Maybe<Scalars['Int']['output']>;
};

export type UserSumOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type UserUpdateInput = {
  avatar?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  fullname?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  isAdmin?: InputMaybe<BoolFieldUpdateOperationsInput>;
  isEmailVerified?: InputMaybe<BoolFieldUpdateOperationsInput>;
  orders?: InputMaybe<OrderUpdateManyWithoutUserNestedInput>;
  password?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  savedList?: InputMaybe<TourUpdateManyWithoutUsersNestedInput>;
};

export type UserUpdateManyMutationInput = {
  avatar?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  fullname?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  isAdmin?: InputMaybe<BoolFieldUpdateOperationsInput>;
  isEmailVerified?: InputMaybe<BoolFieldUpdateOperationsInput>;
  password?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type UserUpdateManyWithWhereWithoutSavedListInput = {
  data: UserUpdateManyMutationInput;
  where: UserScalarWhereInput;
};

export type UserUpdateManyWithoutSavedListNestedInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserCreateOrConnectWithoutSavedListInput>>;
  create?: InputMaybe<Array<UserCreateWithoutSavedListInput>>;
  delete?: InputMaybe<Array<UserWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<UserScalarWhereInput>>;
  disconnect?: InputMaybe<Array<UserWhereUniqueInput>>;
  set?: InputMaybe<Array<UserWhereUniqueInput>>;
  update?: InputMaybe<Array<UserUpdateWithWhereUniqueWithoutSavedListInput>>;
  updateMany?: InputMaybe<Array<UserUpdateManyWithWhereWithoutSavedListInput>>;
  upsert?: InputMaybe<Array<UserUpsertWithWhereUniqueWithoutSavedListInput>>;
};

export type UserUpdateOneRequiredWithoutOrdersNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutOrdersInput>;
  create?: InputMaybe<UserCreateWithoutOrdersInput>;
  update?: InputMaybe<UserUpdateToOneWithWhereWithoutOrdersInput>;
  upsert?: InputMaybe<UserUpsertWithoutOrdersInput>;
};

export type UserUpdateToOneWithWhereWithoutOrdersInput = {
  data: UserUpdateWithoutOrdersInput;
  where?: InputMaybe<UserWhereInput>;
};

export type UserUpdateWithWhereUniqueWithoutSavedListInput = {
  data: UserUpdateWithoutSavedListInput;
  where: UserWhereUniqueInput;
};

export type UserUpdateWithoutOrdersInput = {
  avatar?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  fullname?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  isAdmin?: InputMaybe<BoolFieldUpdateOperationsInput>;
  isEmailVerified?: InputMaybe<BoolFieldUpdateOperationsInput>;
  password?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  savedList?: InputMaybe<TourUpdateManyWithoutUsersNestedInput>;
};

export type UserUpdateWithoutSavedListInput = {
  avatar?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  fullname?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  isAdmin?: InputMaybe<BoolFieldUpdateOperationsInput>;
  isEmailVerified?: InputMaybe<BoolFieldUpdateOperationsInput>;
  orders?: InputMaybe<OrderUpdateManyWithoutUserNestedInput>;
  password?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type UserUpsertWithWhereUniqueWithoutSavedListInput = {
  create: UserCreateWithoutSavedListInput;
  update: UserUpdateWithoutSavedListInput;
  where: UserWhereUniqueInput;
};

export type UserUpsertWithoutOrdersInput = {
  create: UserCreateWithoutOrdersInput;
  update: UserUpdateWithoutOrdersInput;
  where?: InputMaybe<UserWhereInput>;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  avatar?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<StringFilter>;
  fullname?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<IntFilter>;
  isActive?: InputMaybe<BoolFilter>;
  isAdmin?: InputMaybe<BoolFilter>;
  isEmailVerified?: InputMaybe<BoolFilter>;
  orders?: InputMaybe<OrderListRelationFilter>;
  password?: InputMaybe<StringNullableFilter>;
  savedList?: InputMaybe<TourListRelationFilter>;
};

export type UserWhereUniqueInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  avatar?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<Scalars['String']['input']>;
  fullname?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<Scalars['Int']['input']>;
  isActive?: InputMaybe<BoolFilter>;
  isAdmin?: InputMaybe<BoolFilter>;
  isEmailVerified?: InputMaybe<BoolFilter>;
  orders?: InputMaybe<OrderListRelationFilter>;
  password?: InputMaybe<StringNullableFilter>;
  savedList?: InputMaybe<TourListRelationFilter>;
};

export type OrdersQueryVariables = Exact<{
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
}>;


export type OrdersQuery = { __typename?: 'Query', orders: Array<{ __typename?: 'Order', id: string, infantPrice: any, numberOfAdults: number, numberOfChilds: number, numberOfInfants: number, otherRequest?: string | null, paymentMethod: string, startDate: any, status: string, transactionId: string, adultPrice: any, childPrice: any, createdAt: any, tour: { __typename?: 'Tour', name: string }, user: { __typename?: 'User', fullname?: string | null, email: string } }> };

export type AggregateOrderQueryVariables = Exact<{ [key: string]: never; }>;


export type AggregateOrderQuery = { __typename?: 'Query', aggregateOrder: { __typename?: 'AggregateOrder', _count?: { __typename?: 'OrderCountAggregate', id: number } | null } };

export type CountPublicToursQueryVariables = Exact<{
  where?: InputMaybe<TourWhereInput>;
}>;


export type CountPublicToursQuery = { __typename?: 'Query', aggregateTour: { __typename?: 'AggregateTour', _count?: { __typename?: 'TourCountAggregate', id: number } | null } };

export type PublicToursQueryVariables = Exact<{
  where?: InputMaybe<TourWhereInput>;
  orderBy?: InputMaybe<Array<TourOrderByWithRelationInput> | TourOrderByWithRelationInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
}>;


export type PublicToursQuery = { __typename?: 'Query', tours: Array<{ __typename?: 'Tour', id: number, name: string, description?: string | null, featuredImage: string, galleryImgs: string, duration: string, createdAt: any, isActive: boolean, adultPrice: any, childPrice: any, infantPrice: any, categories: Array<{ __typename?: 'Category', id: number, name: string, description: string }> }> };

export type PublicCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type PublicCategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', id: number, name: string, description: string }> };

export type ToursQueryVariables = Exact<{
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ToursQuery = { __typename?: 'Query', tours: Array<{ __typename?: 'Tour', adultPrice: any, childPrice: any, description?: string | null, duration: string, featuredImage: string, galleryImgs: string, infantPrice: any, name: string, id: number, isActive: boolean, createdAt: any, _count?: { __typename?: 'TourCount', orders: number, users: number } | null, categories: Array<{ __typename?: 'Category', id: number, name: string }> }> };

export type CategoriesQueryVariables = Exact<{
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
}>;


export type CategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', id: number, description: string, name: string, isActive: boolean, createdAt: any, _count?: { __typename?: 'CategoryCount', tours: number } | null }> };

export type CountToursQueryVariables = Exact<{ [key: string]: never; }>;


export type CountToursQuery = { __typename?: 'Query', aggregateTour: { __typename?: 'AggregateTour', _count?: { __typename?: 'TourCountAggregate', id: number } | null } };

export type AggregateCategoryQueryVariables = Exact<{ [key: string]: never; }>;


export type AggregateCategoryQuery = { __typename?: 'Query', aggregateCategory: { __typename?: 'AggregateCategory', _count?: { __typename?: 'CategoryCountAggregate', id: number } | null } };

export type QueryQueryVariables = Exact<{
  where: TourWhereUniqueInput;
}>;


export type QueryQuery = { __typename?: 'Query', getTour?: { __typename?: 'Tour', adultPrice: any, childPrice: any, createdAt: any, description?: string | null, duration: string, featuredImage: string, galleryImgs: string, id: number, infantPrice: any, name: string, isActive: boolean, _count?: { __typename?: 'TourCount', categories: number, orders: number, users: number } | null, categories: Array<{ __typename?: 'Category', id: number, name: string }> } | null };

export type CategoryQueryVariables = Exact<{
  where: CategoryWhereUniqueInput;
}>;


export type CategoryQuery = { __typename?: 'Query', category?: { __typename?: 'Category', name: string, isActive: boolean, id: number, createdAt: any } | null };

export type CreateOneCategoryMutationVariables = Exact<{
  data: CategoryCreateInput;
}>;


export type CreateOneCategoryMutation = { __typename?: 'Mutation', createOneCategory: { __typename?: 'Category', id: number } };

export type UpdateOneCategoryMutationVariables = Exact<{
  data: CategoryUpdateInput;
  where: CategoryWhereUniqueInput;
}>;


export type UpdateOneCategoryMutation = { __typename?: 'Mutation', updateOneCategory?: { __typename?: 'Category', id: number, name: string } | null };

export type CreateOneTourMutationVariables = Exact<{
  data: TourCreateInput;
}>;


export type CreateOneTourMutation = { __typename?: 'Mutation', createOneTour: { __typename?: 'Tour', id: number, name: string } };

export type UpdateOneTourMutationVariables = Exact<{
  data: TourUpdateInput;
  where: TourWhereUniqueInput;
}>;


export type UpdateOneTourMutation = { __typename?: 'Mutation', updateOneTour?: { __typename?: 'Tour', id: number, name: string } | null };

export type DeleteOneTourMutationVariables = Exact<{
  where: TourWhereUniqueInput;
}>;


export type DeleteOneTourMutation = { __typename?: 'Mutation', deleteOneTour?: { __typename?: 'Tour', id: number, name: string } | null };

export type DeleteOneCategoryMutationVariables = Exact<{
  where: CategoryWhereUniqueInput;
}>;


export type DeleteOneCategoryMutation = { __typename?: 'Mutation', deleteOneCategory?: { __typename?: 'Category', id: number, name: string } | null };

export type _SumQueryVariables = Exact<{
  where?: InputMaybe<OrderWhereInput>;
}>;


export type _SumQuery = { __typename?: 'Query', aggregateOrder: { __typename?: 'AggregateOrder', _sum?: { __typename?: 'OrderSumAggregate', adultPrice?: any | null, childPrice?: any | null, infantPrice?: any | null, numberOfAdults?: number | null, numberOfChilds?: number | null, numberOfInfants?: number | null } | null } };

export type UsersQueryVariables = Exact<{
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
}>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: number, fullname?: string | null, email: string, isActive: boolean, createdAt: any, _count?: { __typename?: 'UserCount', orders: number, savedList: number } | null }> };

export type UpdateOneUserMutationVariables = Exact<{
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
}>;


export type UpdateOneUserMutation = { __typename?: 'Mutation', updateOneUser?: { __typename?: 'User', isActive: boolean } | null };

export type _CountQueryVariables = Exact<{ [key: string]: never; }>;


export type _CountQuery = { __typename?: 'Query', aggregateUser: { __typename?: 'AggregateUser', _count?: { __typename?: 'UserCountAggregate', id: number } | null } };


export const OrdersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Orders"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orders"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"infantPrice"}},{"kind":"Field","name":{"kind":"Name","value":"numberOfAdults"}},{"kind":"Field","name":{"kind":"Name","value":"numberOfChilds"}},{"kind":"Field","name":{"kind":"Name","value":"numberOfInfants"}},{"kind":"Field","name":{"kind":"Name","value":"otherRequest"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"transactionId"}},{"kind":"Field","name":{"kind":"Name","value":"adultPrice"}},{"kind":"Field","name":{"kind":"Name","value":"childPrice"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"tour"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<OrdersQuery, OrdersQueryVariables>;
export const AggregateOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AggregateOrder"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregateOrder"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_count"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<AggregateOrderQuery, AggregateOrderQueryVariables>;
export const CountPublicToursDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CountPublicTours"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TourWhereInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregateTour"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_count"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CountPublicToursQuery, CountPublicToursQueryVariables>;
export const PublicToursDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PublicTours"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TourWhereInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TourOrderByWithRelationInput"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tours"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"}},{"kind":"Field","name":{"kind":"Name","value":"galleryImgs"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"adultPrice"}},{"kind":"Field","name":{"kind":"Name","value":"childPrice"}},{"kind":"Field","name":{"kind":"Name","value":"infantPrice"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"isActive"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"equals"},"value":{"kind":"BooleanValue","value":true}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<PublicToursQuery, PublicToursQueryVariables>;
export const PublicCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PublicCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"isActive"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"equals"},"value":{"kind":"BooleanValue","value":true}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<PublicCategoriesQuery, PublicCategoriesQueryVariables>;
export const ToursDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Tours"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tours"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_count"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orders"}},{"kind":"Field","name":{"kind":"Name","value":"users"}}]}},{"kind":"Field","name":{"kind":"Name","value":"adultPrice"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"childPrice"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"}},{"kind":"Field","name":{"kind":"Name","value":"galleryImgs"}},{"kind":"Field","name":{"kind":"Name","value":"infantPrice"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<ToursQuery, ToursQueryVariables>;
export const CategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Categories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_count"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tours"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CategoriesQuery, CategoriesQueryVariables>;
export const CountToursDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CountTours"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregateTour"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_count"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CountToursQuery, CountToursQueryVariables>;
export const AggregateCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AggregateCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregateCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_count"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<AggregateCategoryQuery, AggregateCategoryQueryVariables>;
export const QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Query"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TourWhereUniqueInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTour"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_count"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"}},{"kind":"Field","name":{"kind":"Name","value":"orders"}},{"kind":"Field","name":{"kind":"Name","value":"users"}}]}},{"kind":"Field","name":{"kind":"Name","value":"adultPrice"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"childPrice"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"}},{"kind":"Field","name":{"kind":"Name","value":"galleryImgs"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"infantPrice"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]} as unknown as DocumentNode<QueryQuery, QueryQueryVariables>;
export const CategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Category"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CategoryWhereUniqueInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CategoryQuery, CategoryQueryVariables>;
export const CreateOneCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOneCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CategoryCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOneCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateOneCategoryMutation, CreateOneCategoryMutationVariables>;
export const UpdateOneCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOneCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CategoryUpdateInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CategoryWhereUniqueInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOneCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateOneCategoryMutation, UpdateOneCategoryMutationVariables>;
export const CreateOneTourDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOneTour"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TourCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOneTour"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateOneTourMutation, CreateOneTourMutationVariables>;
export const UpdateOneTourDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOneTour"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TourUpdateInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TourWhereUniqueInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOneTour"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateOneTourMutation, UpdateOneTourMutationVariables>;
export const DeleteOneTourDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteOneTour"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TourWhereUniqueInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteOneTour"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<DeleteOneTourMutation, DeleteOneTourMutationVariables>;
export const DeleteOneCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteOneCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CategoryWhereUniqueInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteOneCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<DeleteOneCategoryMutation, DeleteOneCategoryMutationVariables>;
export const _SumDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"_sum"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderWhereInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregateOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_sum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adultPrice"}},{"kind":"Field","name":{"kind":"Name","value":"childPrice"}},{"kind":"Field","name":{"kind":"Name","value":"infantPrice"}},{"kind":"Field","name":{"kind":"Name","value":"numberOfAdults"}},{"kind":"Field","name":{"kind":"Name","value":"numberOfChilds"}},{"kind":"Field","name":{"kind":"Name","value":"numberOfInfants"}}]}}]}}]}}]} as unknown as DocumentNode<_SumQuery, _SumQueryVariables>;
export const UsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Users"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"_count"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orders"}},{"kind":"Field","name":{"kind":"Name","value":"savedList"}}]}}]}}]}}]} as unknown as DocumentNode<UsersQuery, UsersQueryVariables>;
export const UpdateOneUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOneUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserUpdateInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserWhereUniqueInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOneUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]} as unknown as DocumentNode<UpdateOneUserMutation, UpdateOneUserMutationVariables>;
export const _CountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"_count"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregateUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_count"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<_CountQuery, _CountQueryVariables>;