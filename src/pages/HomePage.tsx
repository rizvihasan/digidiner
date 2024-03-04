import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-yellow-50 to-rose-100">
      <header className="text-center mb-12 mt-16">
        <h1 className="text-6xl font-extrabold text-restaurant-primary drop-shadow-lg mb-4">Welcome to digidiner</h1>
        <p className="text-2xl text-gray-700 max-w-2xl mx-auto mb-8">
          Discover a world of flavors! Order from our curated menu of international and local favorites, all from the comfort of your home.
        </p>
        <Link to="/menu" className="inline-block px-8 py-4 bg-restaurant-primary text-white text-xl font-semibold rounded-full shadow-lg hover:bg-restaurant-accent transition">
          View Menu
        </Link>
      </header>
      <section className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
          <span className="text-5xl mb-4">🍕</span>
          <h2 className="text-xl font-bold mb-2">Global Cuisine</h2>
          <p className="text-gray-600">From pizza to paneer, sushi to samosas—taste the world in one place.</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
          <span className="text-5xl mb-4">🚀</span>
          <h2 className="text-xl font-bold mb-2">Fast & Easy</h2>
          <p className="text-gray-600">Order in seconds, track your meal, and enjoy quick delivery or pickup.</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
          <span className="text-5xl mb-4">💳</span>
          <h2 className="text-xl font-bold mb-2">Secure Payments</h2>
          <p className="text-gray-600">Pay safely with your preferred method. Your data is always protected.</p>
        </div>
      </section>
      <footer className="mt-20 text-gray-400 text-sm">&copy; {new Date().getFullYear()} digidiner. All rights reserved.</footer>
    </div>
  );
};

export default HomePage;
