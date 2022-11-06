import React, { useContext, useState } from 'react';

interface IUserContext {
  user: IUser | null;
  setUser: (user: IUser) => void;
  processedAuth: boolean;
  setProcessedAuth: (processedAuth: boolean) => void;
}

interface IUserProvider {
  children: React.ReactNode;
}

type IUser = {
  username: string;
};

const UserContext = React.createContext<IUserContext | null>(null);

function UserProvider({ children }: IUserProvider) {
  const [user, setUser] = useState<IUser | null>(null);
  const [processedAuth, setProcessedAuth] = useState<boolean>(false);

  return (
    <UserContext.Provider
      value={{ user, setUser, processedAuth, setProcessedAuth }}
    >
      {children}
    </UserContext.Provider>
  );
}

function useUser(): IUserContext {
  const context = useContext(UserContext);
  return context as IUserContext;
}

export { UserContext, UserProvider, useUser };
