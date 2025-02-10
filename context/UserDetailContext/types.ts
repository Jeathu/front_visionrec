import { Dispatch, SetStateAction } from 'react';

export interface UserDetail {
  name: string;
  email: string;
  member: boolean;
  uid?: string;
  createdAt: string;
}

export interface UserDetailContextType {
  userDetail: UserDetail | null;
  setUserDetail: Dispatch<SetStateAction<UserDetail | null>>;
}