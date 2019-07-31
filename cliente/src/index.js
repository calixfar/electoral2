import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {RootSession} from './App';
import ApolloClient, {InMemoryCache} from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'
import * as serviceWorker from './serviceWorker';

const cliente = new ApolloClient({
    uri: 'http://192.168.101.12:4000/graphql',
    fetchOptions: {
      credentials: 'include'
    },
    request: operation => {
      const token = localStorage.getItem('token');
      operation.setContext({
        headers: {
          authorization: token
        }
      })
    },
    cache: new InMemoryCache({
      addTypename: false
    }),
    onError: ({networkError,graphqlErrors}) => {
      console.log('Graphql Errors', graphqlErrors)
      console.log('Network Errors', networkError)
    }
  })
  
ReactDOM.render(
    
    <ApolloProvider client={cliente}>
        <RootSession/>
    </ApolloProvider>, 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
