import Card from "./Card";
import { Routes, Route } from 'react-router-dom';

const Home = () => {
  return (
    <main className="Home">
      <Card
        imgSrc={'https://images.dog.ceo/breeds/elkhound-norwegian/n02091467_2094.jpg'}
        title={'Cats / Dogs facts'}
        description={'Know more about these lovely creatures'}
      />
    </main>
    );
};

export default Home;