import React from 'react';
import { Header } from '.';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <div className="flex w-full">
        <div className="mt-20 min-h-screen w-full bg-gray-200 px-5 py-8 font-poppins xl:px-56 xl:py-12">
          {children}
        </div>
      </div>
    </>
  );
}
