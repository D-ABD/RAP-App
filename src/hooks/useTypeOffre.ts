// hooks/useTypeOffres.ts
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";

export interface TypeOffre {
  id: number;
  nom: string;
  description?: string;
}

export const useTypeOffres = () => {
  return useQuery({
    queryKey: ["type_offres"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("type_offres")
        .select("*")
        .order("id");

      if (error) throw new Error(error.message);
      return data as TypeOffre[];
    }
  });
};