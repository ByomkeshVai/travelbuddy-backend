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
  destination?: string | undefined;
  startDate?: string | undefined;
  endDate?: string | undefined;
  maxBudget?: number | undefined;
  minBudget?: number | undefined;
};
