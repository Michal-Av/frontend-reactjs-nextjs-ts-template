import React from 'react';
import Header from '../../components/Layout/Navigation/Header';
import Todos from '../../components/Layout/Todos';

const Home: React.FC = () => {
  // Assuming you have some way to get the username of the logged-in user
  return (
    <div>
      <Header />
      {/* Add the rest of your Home component content here */}
      <Todos />
    </div>
  );
};

export default Home;
