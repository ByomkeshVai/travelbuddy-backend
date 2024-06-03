export interface TTrip {
  photos: any;
  id: string;
  userId: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  type: string;
  images: string[];
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
export type ITripFilterRequest = {
  searchTerm?: string | undefined;
};
