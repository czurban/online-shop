export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  link: string;
  rating: {
    rate: number;
    count: number;
  };
  AddItemToCart: (id: number) => void;
}

export interface Promotions {
  title: string;
  image: string;
}

export interface ProductInCart {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}
