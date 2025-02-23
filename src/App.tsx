import React from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import type { JSX } from 'react';

const queryClient = new QueryClient();

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: Arial, sans-serif;
    background-color: #f8f9fa;
    color: #333;
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const theme = {
  colors: {
    primary: '#333',
    background: '#f8f9fa'
  }
};

const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <GlobalStyle />
          <AppContainer>
            <Navbar />
            <MainContent>
              <AppRoutes />
            </MainContent>
          </AppContainer>
        </QueryClientProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;