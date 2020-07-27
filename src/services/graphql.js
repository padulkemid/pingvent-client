import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
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
