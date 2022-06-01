import "./App.css";
import React, { useState, useEffect } from "react";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Nav from "./components/Navbar";
import Search from "./pages/Search";
import Saved from "./pages/Saved";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {

  const [page, setPage] = useState('')

  return (
    <ApolloProvider client={client}>
    <Router>
    <div>
      <Header />
      <main>
        <Nav />
          <Routes>
            <Route path='/' element={<Search />} />
            <Route path='/saved' element={<Saved />} />
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Routes>
        <Footer />
      </main>
    </div>
    </Router>
    </ApolloProvider>
  );
}

export default App;

