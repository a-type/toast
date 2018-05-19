import { gql } from 'apollo-boost';

export default gql`
  mutation Login($email: String!, $password: String!) {
    login(credential: { email: { email: $email, password: $password } }) {
      token
    }
  }
`;
