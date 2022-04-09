import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptFriendRequest: User;
  addWorkoutSchemaExercise: WorkoutSchemaExercise;
  createWorkoutRecord: WorkoutRecord;
  createWorkoutSchema: WorkoutSchema;
  deleteWorkoutSchema: Scalars['Boolean'];
  deleteWorkoutSchemaExercise: WorkoutSchemaExercise;
  likeWorkoutRecord: WorkoutRecord;
  login: UserAndErrorResponse;
  logout: Scalars['Boolean'];
  register: UserAndErrorResponse;
  removeFriend: User;
  sendFriendRequest: User;
  unlikeWorkoutRecord: WorkoutRecord;
  updateWorkoutSchema: WorkoutSchema;
  updateWorkoutSchemaExercise: WorkoutSchemaExercise;
};


export type MutationAcceptFriendRequestArgs = {
  fromId: Scalars['ID'];
};


export type MutationAddWorkoutSchemaExerciseArgs = {
  name: Scalars['String'];
  workoutSchemaId: Scalars['ID'];
};


export type MutationCreateWorkoutRecordArgs = {
  exercises: Array<WorkoutRecordExerciseInput>;
  name: Scalars['String'];
  workoutSchemaId: Scalars['ID'];
};


export type MutationCreateWorkoutSchemaArgs = {
  name: Scalars['String'];
};


export type MutationDeleteWorkoutSchemaArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteWorkoutSchemaExerciseArgs = {
  exerciseId: Scalars['ID'];
};


export type MutationLikeWorkoutRecordArgs = {
  id: Scalars['ID'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationRegisterArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationRemoveFriendArgs = {
  id: Scalars['ID'];
};


export type MutationSendFriendRequestArgs = {
  username: Scalars['String'];
};


export type MutationUnlikeWorkoutRecordArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateWorkoutSchemaArgs = {
  name: Scalars['String'];
  workoutSchemaId: Scalars['ID'];
};


export type MutationUpdateWorkoutSchemaExerciseArgs = {
  data: WorkoutSchemaExerciseInput;
  exerciseId: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  allWorkoutRecords: Array<WorkoutRecord>;
  me: User;
  userById?: Maybe<User>;
  workoutRecordsByUserId: Array<WorkoutRecord>;
  workoutSchemaById: WorkoutSchema;
  workoutSchemas: Array<WorkoutSchema>;
};


export type QueryUserByIdArgs = {
  id: Scalars['ID'];
};


export type QueryWorkoutRecordsByUserIdArgs = {
  userId: Scalars['ID'];
};


export type QueryWorkoutSchemaByIdArgs = {
  workoutSchemaId: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  friends: Array<User>;
  id: Scalars['ID'];
  incomingFriendRequests: Array<User>;
  outgoingFriendRequests: Array<User>;
  username: Scalars['String'];
  workoutRecords: Array<WorkoutRecord>;
};

export type UserAndErrorResponse = {
  __typename?: 'UserAndErrorResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type WorkoutRecord = {
  __typename?: 'WorkoutRecord';
  createdAt: Scalars['String'];
  exercises: Array<WorkoutRecordExercise>;
  id: Scalars['ID'];
  likedBy: Array<User>;
  name: Scalars['String'];
  user: User;
  workoutSchemaId: Scalars['ID'];
};

export type WorkoutRecordExercise = {
  __typename?: 'WorkoutRecordExercise';
  duration: Scalars['Int'];
  id: Scalars['ID'];
  name: Scalars['String'];
  reps: Scalars['Int'];
  weight: Scalars['Float'];
};

export type WorkoutRecordExerciseInput = {
  duration: Scalars['Int'];
  name: Scalars['String'];
  reps: Scalars['Int'];
  weight: Scalars['Float'];
};

export type WorkoutSchema = {
  __typename?: 'WorkoutSchema';
  exercises: Array<WorkoutSchemaExercise>;
  id: Scalars['ID'];
  name: Scalars['String'];
  user: User;
};

export type WorkoutSchemaExercise = {
  __typename?: 'WorkoutSchemaExercise';
  duration?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  reps?: Maybe<Scalars['Int']>;
  weight?: Maybe<Scalars['Float']>;
};

export type WorkoutSchemaExerciseInput = {
  duration?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  reps?: InputMaybe<Scalars['Int']>;
  weight?: InputMaybe<Scalars['Float']>;
};

export type RegisterUserMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', register: { __typename?: 'UserAndErrorResponse', user?: { __typename?: 'User', id: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type LoginUserMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginUserMutation = { __typename?: 'Mutation', login: { __typename?: 'UserAndErrorResponse', user?: { __typename?: 'User', id: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type SendFriendRequestMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type SendFriendRequestMutation = { __typename?: 'Mutation', sendFriendRequest: { __typename?: 'User', id: string } };

export type AcceptFriendRequestMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type AcceptFriendRequestMutation = { __typename?: 'Mutation', acceptFriendRequest: { __typename?: 'User', id: string } };

export type RemoveFriendMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type RemoveFriendMutation = { __typename?: 'Mutation', removeFriend: { __typename?: 'User', id: string } };

export type CreateWorkoutRecordMutationVariables = Exact<{
  workoutSchemaId: Scalars['ID'];
  name: Scalars['String'];
  exercises: Array<WorkoutRecordExerciseInput> | WorkoutRecordExerciseInput;
}>;


export type CreateWorkoutRecordMutation = { __typename?: 'Mutation', createWorkoutRecord: { __typename?: 'WorkoutRecord', id: string } };

export type AllWorkoutRecordsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllWorkoutRecordsQuery = { __typename?: 'Query', allWorkoutRecords: Array<{ __typename?: 'WorkoutRecord', id: string, name: string, createdAt: string, workoutSchemaId: string, likedBy: Array<{ __typename?: 'User', id: string }>, exercises: Array<{ __typename?: 'WorkoutRecordExercise', id: string, name: string, reps: number, weight: number, duration: number }>, user: { __typename?: 'User', id: string, username: string } }> };

export type LikeWorkoutRecordMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type LikeWorkoutRecordMutation = { __typename?: 'Mutation', likeWorkoutRecord: { __typename?: 'WorkoutRecord', id: string } };

export type UnlikeWorkoutRecordMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UnlikeWorkoutRecordMutation = { __typename?: 'Mutation', unlikeWorkoutRecord: { __typename?: 'WorkoutRecord', id: string } };

export type UserByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UserByIdQuery = { __typename?: 'Query', userById?: { __typename?: 'User', id: string, username: string, workoutRecords: Array<{ __typename?: 'WorkoutRecord', id: string, name: string, createdAt: string, workoutSchemaId: string, likedBy: Array<{ __typename?: 'User', id: string }>, exercises: Array<{ __typename?: 'WorkoutRecordExercise', id: string, name: string, reps: number, weight: number, duration: number }>, user: { __typename?: 'User', id: string, username: string } }> } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, username: string } };

export type GetFriendRequestsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFriendRequestsQuery = { __typename?: 'Query', me: { __typename?: 'User', incomingFriendRequests: Array<{ __typename?: 'User', id: string, username: string }>, outgoingFriendRequests: Array<{ __typename?: 'User', id: string, username: string }>, friends: Array<{ __typename?: 'User', id: string, username: string }> } };

export type WorkoutSchemasQueryVariables = Exact<{ [key: string]: never; }>;


export type WorkoutSchemasQuery = { __typename?: 'Query', workoutSchemas: Array<{ __typename?: 'WorkoutSchema', id: string, name: string, exercises: Array<{ __typename?: 'WorkoutSchemaExercise', id: string, name: string, reps?: number | null, weight?: number | null, duration?: number | null }> }> };

export type CreateWorkoutSchemaMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateWorkoutSchemaMutation = { __typename?: 'Mutation', createWorkoutSchema: { __typename?: 'WorkoutSchema', id: string } };

export type WorkoutSchemaByIdQueryVariables = Exact<{
  workoutSchemaId: Scalars['ID'];
}>;


export type WorkoutSchemaByIdQuery = { __typename?: 'Query', workoutSchemaById: { __typename?: 'WorkoutSchema', id: string, name: string, exercises: Array<{ __typename?: 'WorkoutSchemaExercise', id: string, name: string, reps?: number | null, weight?: number | null, duration?: number | null }> } };

export type UpdateWorkoutSchemaMutationVariables = Exact<{
  workoutSchemaId: Scalars['ID'];
  name: Scalars['String'];
}>;


export type UpdateWorkoutSchemaMutation = { __typename?: 'Mutation', updateWorkoutSchema: { __typename?: 'WorkoutSchema', id: string } };

export type DeleteWorkoutSchemaMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteWorkoutSchemaMutation = { __typename?: 'Mutation', deleteWorkoutSchema: boolean };

export type AddWorkoutSchemaExerciseMutationVariables = Exact<{
  workoutSchemaId: Scalars['ID'];
  name: Scalars['String'];
}>;


export type AddWorkoutSchemaExerciseMutation = { __typename?: 'Mutation', addWorkoutSchemaExercise: { __typename?: 'WorkoutSchemaExercise', id: string } };

export type UpdateWorkoutSchemaExerciseMutationVariables = Exact<{
  exerciseId: Scalars['ID'];
  data: WorkoutSchemaExerciseInput;
}>;


export type UpdateWorkoutSchemaExerciseMutation = { __typename?: 'Mutation', updateWorkoutSchemaExercise: { __typename?: 'WorkoutSchemaExercise', id: string } };

export type DeleteWorkoutSchemaExerciseMutationVariables = Exact<{
  exerciseId: Scalars['ID'];
}>;


export type DeleteWorkoutSchemaExerciseMutation = { __typename?: 'Mutation', deleteWorkoutSchemaExercise: { __typename?: 'WorkoutSchemaExercise', id: string } };


export const RegisterUserDocument = gql`
    mutation RegisterUser($username: String!, $password: String!) {
  register(username: $username, password: $password) {
    user {
      id
    }
    errors {
      field
      message
    }
  }
}
    `;
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, options);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;
export const LoginUserDocument = gql`
    mutation LoginUser($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    user {
      id
    }
    errors {
      field
      message
    }
  }
}
    `;
export type LoginUserMutationFn = Apollo.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: Apollo.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, options);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const SendFriendRequestDocument = gql`
    mutation SendFriendRequest($username: String!) {
  sendFriendRequest(username: $username) {
    id
  }
}
    `;
export type SendFriendRequestMutationFn = Apollo.MutationFunction<SendFriendRequestMutation, SendFriendRequestMutationVariables>;

/**
 * __useSendFriendRequestMutation__
 *
 * To run a mutation, you first call `useSendFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendFriendRequestMutation, { data, loading, error }] = useSendFriendRequestMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useSendFriendRequestMutation(baseOptions?: Apollo.MutationHookOptions<SendFriendRequestMutation, SendFriendRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendFriendRequestMutation, SendFriendRequestMutationVariables>(SendFriendRequestDocument, options);
      }
export type SendFriendRequestMutationHookResult = ReturnType<typeof useSendFriendRequestMutation>;
export type SendFriendRequestMutationResult = Apollo.MutationResult<SendFriendRequestMutation>;
export type SendFriendRequestMutationOptions = Apollo.BaseMutationOptions<SendFriendRequestMutation, SendFriendRequestMutationVariables>;
export const AcceptFriendRequestDocument = gql`
    mutation AcceptFriendRequest($id: ID!) {
  acceptFriendRequest(fromId: $id) {
    id
  }
}
    `;
export type AcceptFriendRequestMutationFn = Apollo.MutationFunction<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>;

/**
 * __useAcceptFriendRequestMutation__
 *
 * To run a mutation, you first call `useAcceptFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptFriendRequestMutation, { data, loading, error }] = useAcceptFriendRequestMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAcceptFriendRequestMutation(baseOptions?: Apollo.MutationHookOptions<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>(AcceptFriendRequestDocument, options);
      }
export type AcceptFriendRequestMutationHookResult = ReturnType<typeof useAcceptFriendRequestMutation>;
export type AcceptFriendRequestMutationResult = Apollo.MutationResult<AcceptFriendRequestMutation>;
export type AcceptFriendRequestMutationOptions = Apollo.BaseMutationOptions<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>;
export const RemoveFriendDocument = gql`
    mutation RemoveFriend($id: ID!) {
  removeFriend(id: $id) {
    id
  }
}
    `;
export type RemoveFriendMutationFn = Apollo.MutationFunction<RemoveFriendMutation, RemoveFriendMutationVariables>;

/**
 * __useRemoveFriendMutation__
 *
 * To run a mutation, you first call `useRemoveFriendMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFriendMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFriendMutation, { data, loading, error }] = useRemoveFriendMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveFriendMutation(baseOptions?: Apollo.MutationHookOptions<RemoveFriendMutation, RemoveFriendMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveFriendMutation, RemoveFriendMutationVariables>(RemoveFriendDocument, options);
      }
export type RemoveFriendMutationHookResult = ReturnType<typeof useRemoveFriendMutation>;
export type RemoveFriendMutationResult = Apollo.MutationResult<RemoveFriendMutation>;
export type RemoveFriendMutationOptions = Apollo.BaseMutationOptions<RemoveFriendMutation, RemoveFriendMutationVariables>;
export const CreateWorkoutRecordDocument = gql`
    mutation CreateWorkoutRecord($workoutSchemaId: ID!, $name: String!, $exercises: [WorkoutRecordExerciseInput!]!) {
  createWorkoutRecord(
    workoutSchemaId: $workoutSchemaId
    name: $name
    exercises: $exercises
  ) {
    id
  }
}
    `;
export type CreateWorkoutRecordMutationFn = Apollo.MutationFunction<CreateWorkoutRecordMutation, CreateWorkoutRecordMutationVariables>;

/**
 * __useCreateWorkoutRecordMutation__
 *
 * To run a mutation, you first call `useCreateWorkoutRecordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWorkoutRecordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWorkoutRecordMutation, { data, loading, error }] = useCreateWorkoutRecordMutation({
 *   variables: {
 *      workoutSchemaId: // value for 'workoutSchemaId'
 *      name: // value for 'name'
 *      exercises: // value for 'exercises'
 *   },
 * });
 */
export function useCreateWorkoutRecordMutation(baseOptions?: Apollo.MutationHookOptions<CreateWorkoutRecordMutation, CreateWorkoutRecordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateWorkoutRecordMutation, CreateWorkoutRecordMutationVariables>(CreateWorkoutRecordDocument, options);
      }
export type CreateWorkoutRecordMutationHookResult = ReturnType<typeof useCreateWorkoutRecordMutation>;
export type CreateWorkoutRecordMutationResult = Apollo.MutationResult<CreateWorkoutRecordMutation>;
export type CreateWorkoutRecordMutationOptions = Apollo.BaseMutationOptions<CreateWorkoutRecordMutation, CreateWorkoutRecordMutationVariables>;
export const AllWorkoutRecordsDocument = gql`
    query AllWorkoutRecords {
  allWorkoutRecords {
    id
    name
    createdAt
    workoutSchemaId
    likedBy {
      id
    }
    exercises {
      id
      name
      reps
      weight
      duration
    }
    user {
      id
      username
    }
  }
}
    `;

/**
 * __useAllWorkoutRecordsQuery__
 *
 * To run a query within a React component, call `useAllWorkoutRecordsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllWorkoutRecordsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllWorkoutRecordsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllWorkoutRecordsQuery(baseOptions?: Apollo.QueryHookOptions<AllWorkoutRecordsQuery, AllWorkoutRecordsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllWorkoutRecordsQuery, AllWorkoutRecordsQueryVariables>(AllWorkoutRecordsDocument, options);
      }
export function useAllWorkoutRecordsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllWorkoutRecordsQuery, AllWorkoutRecordsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllWorkoutRecordsQuery, AllWorkoutRecordsQueryVariables>(AllWorkoutRecordsDocument, options);
        }
export type AllWorkoutRecordsQueryHookResult = ReturnType<typeof useAllWorkoutRecordsQuery>;
export type AllWorkoutRecordsLazyQueryHookResult = ReturnType<typeof useAllWorkoutRecordsLazyQuery>;
export type AllWorkoutRecordsQueryResult = Apollo.QueryResult<AllWorkoutRecordsQuery, AllWorkoutRecordsQueryVariables>;
export const LikeWorkoutRecordDocument = gql`
    mutation LikeWorkoutRecord($id: ID!) {
  likeWorkoutRecord(id: $id) {
    id
  }
}
    `;
export type LikeWorkoutRecordMutationFn = Apollo.MutationFunction<LikeWorkoutRecordMutation, LikeWorkoutRecordMutationVariables>;

/**
 * __useLikeWorkoutRecordMutation__
 *
 * To run a mutation, you first call `useLikeWorkoutRecordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeWorkoutRecordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeWorkoutRecordMutation, { data, loading, error }] = useLikeWorkoutRecordMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLikeWorkoutRecordMutation(baseOptions?: Apollo.MutationHookOptions<LikeWorkoutRecordMutation, LikeWorkoutRecordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikeWorkoutRecordMutation, LikeWorkoutRecordMutationVariables>(LikeWorkoutRecordDocument, options);
      }
export type LikeWorkoutRecordMutationHookResult = ReturnType<typeof useLikeWorkoutRecordMutation>;
export type LikeWorkoutRecordMutationResult = Apollo.MutationResult<LikeWorkoutRecordMutation>;
export type LikeWorkoutRecordMutationOptions = Apollo.BaseMutationOptions<LikeWorkoutRecordMutation, LikeWorkoutRecordMutationVariables>;
export const UnlikeWorkoutRecordDocument = gql`
    mutation UnlikeWorkoutRecord($id: ID!) {
  unlikeWorkoutRecord(id: $id) {
    id
  }
}
    `;
export type UnlikeWorkoutRecordMutationFn = Apollo.MutationFunction<UnlikeWorkoutRecordMutation, UnlikeWorkoutRecordMutationVariables>;

/**
 * __useUnlikeWorkoutRecordMutation__
 *
 * To run a mutation, you first call `useUnlikeWorkoutRecordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnlikeWorkoutRecordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unlikeWorkoutRecordMutation, { data, loading, error }] = useUnlikeWorkoutRecordMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUnlikeWorkoutRecordMutation(baseOptions?: Apollo.MutationHookOptions<UnlikeWorkoutRecordMutation, UnlikeWorkoutRecordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnlikeWorkoutRecordMutation, UnlikeWorkoutRecordMutationVariables>(UnlikeWorkoutRecordDocument, options);
      }
export type UnlikeWorkoutRecordMutationHookResult = ReturnType<typeof useUnlikeWorkoutRecordMutation>;
export type UnlikeWorkoutRecordMutationResult = Apollo.MutationResult<UnlikeWorkoutRecordMutation>;
export type UnlikeWorkoutRecordMutationOptions = Apollo.BaseMutationOptions<UnlikeWorkoutRecordMutation, UnlikeWorkoutRecordMutationVariables>;
export const UserByIdDocument = gql`
    query UserById($id: ID!) {
  userById(id: $id) {
    id
    username
    workoutRecords {
      id
      name
      createdAt
      workoutSchemaId
      likedBy {
        id
      }
      exercises {
        id
        name
        reps
        weight
        duration
      }
      user {
        id
        username
      }
    }
  }
}
    `;

/**
 * __useUserByIdQuery__
 *
 * To run a query within a React component, call `useUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserByIdQuery(baseOptions: Apollo.QueryHookOptions<UserByIdQuery, UserByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserByIdQuery, UserByIdQueryVariables>(UserByIdDocument, options);
      }
export function useUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserByIdQuery, UserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserByIdQuery, UserByIdQueryVariables>(UserByIdDocument, options);
        }
export type UserByIdQueryHookResult = ReturnType<typeof useUserByIdQuery>;
export type UserByIdLazyQueryHookResult = ReturnType<typeof useUserByIdLazyQuery>;
export type UserByIdQueryResult = Apollo.QueryResult<UserByIdQuery, UserByIdQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    username
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const GetFriendRequestsDocument = gql`
    query GetFriendRequests {
  me {
    incomingFriendRequests {
      id
      username
    }
    outgoingFriendRequests {
      id
      username
    }
    friends {
      id
      username
    }
  }
}
    `;

/**
 * __useGetFriendRequestsQuery__
 *
 * To run a query within a React component, call `useGetFriendRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFriendRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFriendRequestsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFriendRequestsQuery(baseOptions?: Apollo.QueryHookOptions<GetFriendRequestsQuery, GetFriendRequestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFriendRequestsQuery, GetFriendRequestsQueryVariables>(GetFriendRequestsDocument, options);
      }
export function useGetFriendRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFriendRequestsQuery, GetFriendRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFriendRequestsQuery, GetFriendRequestsQueryVariables>(GetFriendRequestsDocument, options);
        }
export type GetFriendRequestsQueryHookResult = ReturnType<typeof useGetFriendRequestsQuery>;
export type GetFriendRequestsLazyQueryHookResult = ReturnType<typeof useGetFriendRequestsLazyQuery>;
export type GetFriendRequestsQueryResult = Apollo.QueryResult<GetFriendRequestsQuery, GetFriendRequestsQueryVariables>;
export const WorkoutSchemasDocument = gql`
    query WorkoutSchemas {
  workoutSchemas {
    id
    name
    exercises {
      id
      name
      reps
      weight
      duration
    }
  }
}
    `;

/**
 * __useWorkoutSchemasQuery__
 *
 * To run a query within a React component, call `useWorkoutSchemasQuery` and pass it any options that fit your needs.
 * When your component renders, `useWorkoutSchemasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWorkoutSchemasQuery({
 *   variables: {
 *   },
 * });
 */
export function useWorkoutSchemasQuery(baseOptions?: Apollo.QueryHookOptions<WorkoutSchemasQuery, WorkoutSchemasQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WorkoutSchemasQuery, WorkoutSchemasQueryVariables>(WorkoutSchemasDocument, options);
      }
export function useWorkoutSchemasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WorkoutSchemasQuery, WorkoutSchemasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WorkoutSchemasQuery, WorkoutSchemasQueryVariables>(WorkoutSchemasDocument, options);
        }
export type WorkoutSchemasQueryHookResult = ReturnType<typeof useWorkoutSchemasQuery>;
export type WorkoutSchemasLazyQueryHookResult = ReturnType<typeof useWorkoutSchemasLazyQuery>;
export type WorkoutSchemasQueryResult = Apollo.QueryResult<WorkoutSchemasQuery, WorkoutSchemasQueryVariables>;
export const CreateWorkoutSchemaDocument = gql`
    mutation CreateWorkoutSchema($name: String!) {
  createWorkoutSchema(name: $name) {
    id
  }
}
    `;
export type CreateWorkoutSchemaMutationFn = Apollo.MutationFunction<CreateWorkoutSchemaMutation, CreateWorkoutSchemaMutationVariables>;

/**
 * __useCreateWorkoutSchemaMutation__
 *
 * To run a mutation, you first call `useCreateWorkoutSchemaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWorkoutSchemaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWorkoutSchemaMutation, { data, loading, error }] = useCreateWorkoutSchemaMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateWorkoutSchemaMutation(baseOptions?: Apollo.MutationHookOptions<CreateWorkoutSchemaMutation, CreateWorkoutSchemaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateWorkoutSchemaMutation, CreateWorkoutSchemaMutationVariables>(CreateWorkoutSchemaDocument, options);
      }
export type CreateWorkoutSchemaMutationHookResult = ReturnType<typeof useCreateWorkoutSchemaMutation>;
export type CreateWorkoutSchemaMutationResult = Apollo.MutationResult<CreateWorkoutSchemaMutation>;
export type CreateWorkoutSchemaMutationOptions = Apollo.BaseMutationOptions<CreateWorkoutSchemaMutation, CreateWorkoutSchemaMutationVariables>;
export const WorkoutSchemaByIdDocument = gql`
    query WorkoutSchemaById($workoutSchemaId: ID!) {
  workoutSchemaById(workoutSchemaId: $workoutSchemaId) {
    id
    name
    exercises {
      id
      name
      reps
      weight
      duration
    }
  }
}
    `;

/**
 * __useWorkoutSchemaByIdQuery__
 *
 * To run a query within a React component, call `useWorkoutSchemaByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useWorkoutSchemaByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWorkoutSchemaByIdQuery({
 *   variables: {
 *      workoutSchemaId: // value for 'workoutSchemaId'
 *   },
 * });
 */
export function useWorkoutSchemaByIdQuery(baseOptions: Apollo.QueryHookOptions<WorkoutSchemaByIdQuery, WorkoutSchemaByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WorkoutSchemaByIdQuery, WorkoutSchemaByIdQueryVariables>(WorkoutSchemaByIdDocument, options);
      }
export function useWorkoutSchemaByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WorkoutSchemaByIdQuery, WorkoutSchemaByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WorkoutSchemaByIdQuery, WorkoutSchemaByIdQueryVariables>(WorkoutSchemaByIdDocument, options);
        }
export type WorkoutSchemaByIdQueryHookResult = ReturnType<typeof useWorkoutSchemaByIdQuery>;
export type WorkoutSchemaByIdLazyQueryHookResult = ReturnType<typeof useWorkoutSchemaByIdLazyQuery>;
export type WorkoutSchemaByIdQueryResult = Apollo.QueryResult<WorkoutSchemaByIdQuery, WorkoutSchemaByIdQueryVariables>;
export const UpdateWorkoutSchemaDocument = gql`
    mutation UpdateWorkoutSchema($workoutSchemaId: ID!, $name: String!) {
  updateWorkoutSchema(workoutSchemaId: $workoutSchemaId, name: $name) {
    id
  }
}
    `;
export type UpdateWorkoutSchemaMutationFn = Apollo.MutationFunction<UpdateWorkoutSchemaMutation, UpdateWorkoutSchemaMutationVariables>;

/**
 * __useUpdateWorkoutSchemaMutation__
 *
 * To run a mutation, you first call `useUpdateWorkoutSchemaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWorkoutSchemaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWorkoutSchemaMutation, { data, loading, error }] = useUpdateWorkoutSchemaMutation({
 *   variables: {
 *      workoutSchemaId: // value for 'workoutSchemaId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateWorkoutSchemaMutation(baseOptions?: Apollo.MutationHookOptions<UpdateWorkoutSchemaMutation, UpdateWorkoutSchemaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateWorkoutSchemaMutation, UpdateWorkoutSchemaMutationVariables>(UpdateWorkoutSchemaDocument, options);
      }
export type UpdateWorkoutSchemaMutationHookResult = ReturnType<typeof useUpdateWorkoutSchemaMutation>;
export type UpdateWorkoutSchemaMutationResult = Apollo.MutationResult<UpdateWorkoutSchemaMutation>;
export type UpdateWorkoutSchemaMutationOptions = Apollo.BaseMutationOptions<UpdateWorkoutSchemaMutation, UpdateWorkoutSchemaMutationVariables>;
export const DeleteWorkoutSchemaDocument = gql`
    mutation DeleteWorkoutSchema($id: ID!) {
  deleteWorkoutSchema(id: $id)
}
    `;
export type DeleteWorkoutSchemaMutationFn = Apollo.MutationFunction<DeleteWorkoutSchemaMutation, DeleteWorkoutSchemaMutationVariables>;

/**
 * __useDeleteWorkoutSchemaMutation__
 *
 * To run a mutation, you first call `useDeleteWorkoutSchemaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteWorkoutSchemaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteWorkoutSchemaMutation, { data, loading, error }] = useDeleteWorkoutSchemaMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteWorkoutSchemaMutation(baseOptions?: Apollo.MutationHookOptions<DeleteWorkoutSchemaMutation, DeleteWorkoutSchemaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteWorkoutSchemaMutation, DeleteWorkoutSchemaMutationVariables>(DeleteWorkoutSchemaDocument, options);
      }
export type DeleteWorkoutSchemaMutationHookResult = ReturnType<typeof useDeleteWorkoutSchemaMutation>;
export type DeleteWorkoutSchemaMutationResult = Apollo.MutationResult<DeleteWorkoutSchemaMutation>;
export type DeleteWorkoutSchemaMutationOptions = Apollo.BaseMutationOptions<DeleteWorkoutSchemaMutation, DeleteWorkoutSchemaMutationVariables>;
export const AddWorkoutSchemaExerciseDocument = gql`
    mutation AddWorkoutSchemaExercise($workoutSchemaId: ID!, $name: String!) {
  addWorkoutSchemaExercise(workoutSchemaId: $workoutSchemaId, name: $name) {
    id
  }
}
    `;
export type AddWorkoutSchemaExerciseMutationFn = Apollo.MutationFunction<AddWorkoutSchemaExerciseMutation, AddWorkoutSchemaExerciseMutationVariables>;

/**
 * __useAddWorkoutSchemaExerciseMutation__
 *
 * To run a mutation, you first call `useAddWorkoutSchemaExerciseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddWorkoutSchemaExerciseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addWorkoutSchemaExerciseMutation, { data, loading, error }] = useAddWorkoutSchemaExerciseMutation({
 *   variables: {
 *      workoutSchemaId: // value for 'workoutSchemaId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useAddWorkoutSchemaExerciseMutation(baseOptions?: Apollo.MutationHookOptions<AddWorkoutSchemaExerciseMutation, AddWorkoutSchemaExerciseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddWorkoutSchemaExerciseMutation, AddWorkoutSchemaExerciseMutationVariables>(AddWorkoutSchemaExerciseDocument, options);
      }
export type AddWorkoutSchemaExerciseMutationHookResult = ReturnType<typeof useAddWorkoutSchemaExerciseMutation>;
export type AddWorkoutSchemaExerciseMutationResult = Apollo.MutationResult<AddWorkoutSchemaExerciseMutation>;
export type AddWorkoutSchemaExerciseMutationOptions = Apollo.BaseMutationOptions<AddWorkoutSchemaExerciseMutation, AddWorkoutSchemaExerciseMutationVariables>;
export const UpdateWorkoutSchemaExerciseDocument = gql`
    mutation UpdateWorkoutSchemaExercise($exerciseId: ID!, $data: WorkoutSchemaExerciseInput!) {
  updateWorkoutSchemaExercise(exerciseId: $exerciseId, data: $data) {
    id
  }
}
    `;
export type UpdateWorkoutSchemaExerciseMutationFn = Apollo.MutationFunction<UpdateWorkoutSchemaExerciseMutation, UpdateWorkoutSchemaExerciseMutationVariables>;

/**
 * __useUpdateWorkoutSchemaExerciseMutation__
 *
 * To run a mutation, you first call `useUpdateWorkoutSchemaExerciseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWorkoutSchemaExerciseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWorkoutSchemaExerciseMutation, { data, loading, error }] = useUpdateWorkoutSchemaExerciseMutation({
 *   variables: {
 *      exerciseId: // value for 'exerciseId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateWorkoutSchemaExerciseMutation(baseOptions?: Apollo.MutationHookOptions<UpdateWorkoutSchemaExerciseMutation, UpdateWorkoutSchemaExerciseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateWorkoutSchemaExerciseMutation, UpdateWorkoutSchemaExerciseMutationVariables>(UpdateWorkoutSchemaExerciseDocument, options);
      }
export type UpdateWorkoutSchemaExerciseMutationHookResult = ReturnType<typeof useUpdateWorkoutSchemaExerciseMutation>;
export type UpdateWorkoutSchemaExerciseMutationResult = Apollo.MutationResult<UpdateWorkoutSchemaExerciseMutation>;
export type UpdateWorkoutSchemaExerciseMutationOptions = Apollo.BaseMutationOptions<UpdateWorkoutSchemaExerciseMutation, UpdateWorkoutSchemaExerciseMutationVariables>;
export const DeleteWorkoutSchemaExerciseDocument = gql`
    mutation DeleteWorkoutSchemaExercise($exerciseId: ID!) {
  deleteWorkoutSchemaExercise(exerciseId: $exerciseId) {
    id
  }
}
    `;
export type DeleteWorkoutSchemaExerciseMutationFn = Apollo.MutationFunction<DeleteWorkoutSchemaExerciseMutation, DeleteWorkoutSchemaExerciseMutationVariables>;

/**
 * __useDeleteWorkoutSchemaExerciseMutation__
 *
 * To run a mutation, you first call `useDeleteWorkoutSchemaExerciseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteWorkoutSchemaExerciseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteWorkoutSchemaExerciseMutation, { data, loading, error }] = useDeleteWorkoutSchemaExerciseMutation({
 *   variables: {
 *      exerciseId: // value for 'exerciseId'
 *   },
 * });
 */
export function useDeleteWorkoutSchemaExerciseMutation(baseOptions?: Apollo.MutationHookOptions<DeleteWorkoutSchemaExerciseMutation, DeleteWorkoutSchemaExerciseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteWorkoutSchemaExerciseMutation, DeleteWorkoutSchemaExerciseMutationVariables>(DeleteWorkoutSchemaExerciseDocument, options);
      }
export type DeleteWorkoutSchemaExerciseMutationHookResult = ReturnType<typeof useDeleteWorkoutSchemaExerciseMutation>;
export type DeleteWorkoutSchemaExerciseMutationResult = Apollo.MutationResult<DeleteWorkoutSchemaExerciseMutation>;
export type DeleteWorkoutSchemaExerciseMutationOptions = Apollo.BaseMutationOptions<DeleteWorkoutSchemaExerciseMutation, DeleteWorkoutSchemaExerciseMutationVariables>;