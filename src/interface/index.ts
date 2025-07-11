export interface IReview {
  id: string;
  rating: number;
  comment: string;
  productId: string;
  userId: string;
  user?: {
    username: string;
  };
}

export interface IProduct {
  id: string;
  shopId: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  inventoryCount: number;
  discount: number;
  vendorId: string;
  images: string[];
}
