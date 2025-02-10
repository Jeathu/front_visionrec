import { createContext } from 'react';
import { UserDetail, UserDetailContextType } from './types';

export const UserDetailContext = createContext<UserDetailContextType>({
  userDetail: null,
  setUserDetail: () => null
});

export type { UserDetail, UserDetailContextType };