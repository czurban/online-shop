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
}

export interface account {
  password: string;
  username: string;
  mail: string;
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
  quantity: number;
}
