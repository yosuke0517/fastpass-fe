import React from 'react';
import { Layout } from '~/features/Layout';
import { List } from '~/features/List';
import type { NextPageWithLayout } from '~/pages/_app';

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
