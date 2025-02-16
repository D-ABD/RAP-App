import React from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes";
import styled, { createGlobalStyle } from "styled-components";

// Création du client React Query
const queryClient = new QueryClient();

// Style global pour l'application
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

// Conteneur principal
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

// Contenu principal
const MainContent = styled.main`
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const App: React.FC = () => {
  return (
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
  );
};

export default App;
