export interface Book {
  _id: number | undefined;
  userId: number;
  title: string;
  author: string;
  image: string;
  status: string;
  genre: string;
  rating?: number;
  startDate: string | Date;
  endDate: string | Date;
  duration: number | string;
  description?: string;
}
