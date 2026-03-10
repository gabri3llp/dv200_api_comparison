import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../Components/NavBar';
import MyCards from '../Components/Cards';
import Hero from '../Components/Hero';

function Home() {
  return (
    <div>
      <NavBar/>
      <Hero></Hero>
      <MyCards/>
    </div>
  );
}

export default Home;