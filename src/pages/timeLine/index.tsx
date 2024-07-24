import React from 'react';
import { Layout } from '@/components/Layout';
import { List } from '@/components/List';
import type { NextPageWithLayout } from '@/pages/_app';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <List />
    </>
  );
};

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Page;
