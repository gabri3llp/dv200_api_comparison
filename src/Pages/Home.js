import 'bootstrap/dist/css/bootstrap.min.css';
import MyCards from '../Components/HpCards';
import Hero from '../Components/Hero';
import Mydata from '../Components/HpData';

function Home() {
  return (
    <div>

      <Hero></Hero>

      <div className='row HpCardSectionC'>

        <h1 style={{ color: '#1B2C44', backgroundColor: '#F0B53B', borderRadius: "12px" }}> Top of their Games </h1>
      
    <div className='row HpCardSectionP'>

    

      <div className='col'>
      <MyCards/>
      </div>

      <div className='col'>
      <MyCards/>
      </div>

       <div className='col'>
      <MyCards/>
      </div>

      <div className='col'>
      <MyCards/>
      </div>

    </div>

    </div>


    <section className='DataSection'>

      <Mydata></Mydata>

    </section>

    </div>
  );
}

export default Home;