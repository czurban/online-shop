import type { Product } from "../types";

const URL = "https://fakestoreapi.com";

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${URL}/products`);

  if (!response.ok) {
    throw new Error("Error");
  }

  return response.json();
};
