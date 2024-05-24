export interface TTrip {
  id: string;
  userId: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  activities: string[];
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
