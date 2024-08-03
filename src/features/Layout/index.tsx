import type { ReactNode } from 'react';
import { Presenter } from '~/features/Layout/presenter';
import useLogout from '~/features/Layout/useLogout';

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  const { logout } = useLogout();

  return (
    <>
      <Presenter logout={logout} />
      {children}
    </>
  );
}
