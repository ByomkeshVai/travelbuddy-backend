export interface TProfile {
  bio: string;
  age: number;
}

export interface TUserProfile {
  name: string;
  email: string;
  password: string;
  profile: TProfile;
}
