'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Logo from '@/assets/images/logo/3.png';
import './Header.css';
import { logout } from '@/services/api-auth';

interface HeaderProps {
  username?: string; // Making the username prop optional
}

const Header: React.FC<HeaderProps> = ({ username }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      console.log('User has logged out');
      router.push('/login'); // Navigate to the login page
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav>
      <div className="logo">
        <Image src={Logo} alt="Logo" width={50} height={50} />
      </div>
      <div className="user-info">
        <span>Welcome {username}</span>
      </div>
      <ul className="nav-links">
        <li>
          <a href="/home">Home</a>
        </li>
        <li>
          <a href="/profile">Profile</a>
        </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
