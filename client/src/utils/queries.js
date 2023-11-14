import { gql } from '@apollo/client';

// export function for the queries that will take place through the apollo server graphql api and into our 
// mongodb database

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;