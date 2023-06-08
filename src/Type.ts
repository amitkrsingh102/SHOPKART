export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}
export interface ProductArray {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
export interface OrderItemsType {
  item: Product;
  count: number;
}
export const categories: string[] = [
  "all",

  "smartphones",
  "laptops",

  "motorcycle",
  "automotive",
  "groceries",
  "skincare",
  "fragrances",

  "tops",
  "womens-jewellery",
  "womens-bags",
  "womens-watches",
  "womens-shoes",
  "womens-dresses",

  "mens-shoes",
  "mens-watches",
  "mens-shirts",
  "sunglasses",

  "home-decoration",
  "furniture",
  "lighting",
];
