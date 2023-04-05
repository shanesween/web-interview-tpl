import React from 'react';
import header from './header.png';
import './App.css';
import Search from './features/search/Search';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

function App() {

  // Create a client
  const queryClient = new QueryClient()

  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <header className="App-header">
          <img src={header} className="App-logo" alt="logo" />
        </header>
        <div className="container">
          <Search />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
