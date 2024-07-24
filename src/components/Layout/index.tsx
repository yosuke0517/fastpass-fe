import type { ReactNode } from 'react';
import { Presenter } from '@/components/Layout/presenter';
import useLogout from '@/components/Layout/useLogout';

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
