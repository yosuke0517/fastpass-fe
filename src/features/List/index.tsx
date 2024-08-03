import { useRouter } from 'next/router';
import React from 'react';
import { useUserState } from '~/components/userAtom';
import { Presenter } from '~/features/List/presenter';
import { useGetMessages } from '~/features/List/useGetMessages';

export function List() {
  const { setUser } = useUserState();
  const router = useRouter();
  const { isLoading, isError, data, error } = useGetMessages();

  if (isLoading) <span>Loading...</span>;
  if (isError) {
    console.error('Error: useGetMessages', error);
    setUser(null);
    router.push('/');
  }

  return <>{data && <Presenter data={data} router={router} />}</>;
}
