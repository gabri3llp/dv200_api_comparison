import 'bootstrap/dist/css/bootstrap.min.css';
import MyCards from '../Components/HpCards';
import HomeHero from '../Components/HpHero';
import Mydata from '../Components/HpData';

function Home() {
  return (
    <div>

      <HomeHero></HomeHero>

      <div className='HpCardSectionC'>

        <div className='row'>
          <div className='col'>
            <h1 style={{ color: '#1B2C44', backgroundColor: '#F0B53B', width: "fit-content", borderRadius: "20px",padding: "8px 75px"}}>

              Top of their Games
            </h1>
          </div>
        </div>

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