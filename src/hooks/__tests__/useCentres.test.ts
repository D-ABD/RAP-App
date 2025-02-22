import { renderHook } from "@testing-library/react";
import { useCentres, useAddCentre, useUpdateCentre, useDeleteCentre } from "../src/hooks/useCentres";
import { supabase } from "../src/supabaseClient";
import { vi } from "vitest";
import { useQueryClient, QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 📌 Mock Supabase
vi.mock("../supabaseClient", () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(),
      insert: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    })),
  },
}));

// 📌 Mock React Query
vi.mock("@tanstack/react-query", () => ({
  useQueryClient: vi.fn(() => ({
    invalidateQueries: vi.fn(),
  })),
  QueryClientProvider: vi.fn(({ children }) => children),
  QueryClient: vi.fn(),
}));

// ✅ Configuration de QueryClient pour éviter des erreurs dans les tests
const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
