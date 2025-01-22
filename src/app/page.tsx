'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Layout/Navigation/Header';
import Todos from '../components/Layout/Todos';

const Home: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); // מצב טעינה

  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

      if (!loggedIn) {
        router.push('/login'); 
      } else {
        setIsLoading(false); 
      }
    };

    checkLoginStatus();
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <Todos />
    </div>
  );
};

export default Home;
