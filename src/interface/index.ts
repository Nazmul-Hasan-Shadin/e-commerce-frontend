export interface IReview {
  id: string;
  rating: number;
  comment: string;
  productId: string;
  userId: string;
  user?: {
    username: string;
  };
  product: {
    images: string[];
    name:string
  };
  createdAt:string
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

interface IOrder {
  id: string;
  shopId: string;
  shop: {
    name: string;
    logo: string;
    id: string;
  };
  customerId: string;

  status: string;
  totalAmount: number;
  orderItems: IOrderItems[];
}

interface IOrderItems {
  id: string;
  product: {
    images: string[];
    name: string;
    quantity: number;
    price: number;
  };
  price: number;
  quantity: number;
}
