import React from 'react';
import HomePage from './pages/HomePage';
import blogsData from './data/blogs.json';

export const routes = [
  {
    path: '/',
    Component: HomePage,
    entry: 'src/pages/HomePage.jsx',
  },
  {
    path: '/article/:id',
    Component: React.lazy(() => import('./components/ArticleDetail')),
    entry: 'src/components/ArticleDetail.jsx',
    getStaticPaths: () => blogsData.map((b) => `/article/${b.id}`),
  },
];
