import React from 'react';
import { Header } from './layout/Header';
import { Outlet, useLocation } from 'react-router-dom';
import { PageTransition } from './PageTransition';

export const Layout: React.FC = () => {
  const location = useLocation();
  return (
    <div className="w-full bg-gradient-to-br from-white to-restaurant-primary/10 transition-colors duration-500">
      <Header />
      <main className="w-full">
        <PageTransition />
      </main>
    </div>
  );
};
