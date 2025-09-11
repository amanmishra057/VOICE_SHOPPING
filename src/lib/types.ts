export interface StoreInfo {
  name: string;
  url: string;
  price: string | null;
}

export interface ShoppingItem {
  id: string;
  name: string;
  category: string;
  stores?: StoreInfo[];
}
