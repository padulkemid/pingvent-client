import ApolloClient from 'apollo-boost';
import fetch from 'isomorphic-fetch';

const client = new ApolloClient({
  fetch,
  uri: 'https://tranquil-atoll-83602.herokuapp.com/query',
  request: (opr) => {
    const token = localStorage.getItem('token');
    opr.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    });
  },
});

export default client;
