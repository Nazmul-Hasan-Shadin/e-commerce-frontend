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
