export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  AddItemToCart: (id: number) => void;
}

export interface ProductInCart {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}
