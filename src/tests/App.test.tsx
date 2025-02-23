// src/App.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import App from '../App'
import { MemoryRouter } from 'react-router-dom'

const queryClient = new QueryClient()

describe('App', () => {
  it('renders without crashing', () => {
    // Ne pas wrap avec BrowserRouter car App contient déjà un Router
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    )
  })
})