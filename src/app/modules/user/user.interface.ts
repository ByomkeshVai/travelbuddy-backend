export interface TProfile {
  bio: string;
  age: number;
}

export interface TUserProfile {
  username: any;
  email: string;
  password: string;
  profile?: TProfile;
}
