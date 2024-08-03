import React from 'react';
import { Layout } from '~/features/Layout';
import { Post } from '~/features/Post';
import type { NextPageWithLayout } from '~/pages/_app';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <Post />
    </>
  );
};

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Page;
