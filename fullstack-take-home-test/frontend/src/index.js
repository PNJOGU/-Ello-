import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import { ApolloClient, InMemoryCache, ApolloProvider,HttpLink,from} from '@apollo/client';
import {onError} from '@apollo/client/link/error';
import { BrowserRouter } from 'react-router-dom';

const errorlink = onError(({graphqlErrors}) => {
  if (graphqlErrors){
    graphqlErrors.map(({message}) => {
      alert(`error ${message}`)
    })
  }
})
const link = from([
  errorlink,
  new HttpLink({ uri: 'http://localhost:4000/'})
])
const client = new ApolloClient({ 
  //uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
  link:link
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
            <App />
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
);