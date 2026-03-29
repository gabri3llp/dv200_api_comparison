import '../App.css';

function Mydata(){
    return(
<div className=' row DataSection'>
        <h1 style={{ color: '#1B2C44', backgroundColor: '#F0B53B', borderRadius: "12px"}}> What will we cover on this application? </h1>
        <h3 style={{ color: '#66C0F4', marginTop: "15px"}}>In this Api i will be using the follwing data to compare my games:</h3>

    <div className='col' style={{ marginLeft:"50px"}}>
        <h4>Title</h4>
        <h4> When it Released</h4>
        <h4> Price </h4>
        <h4> Review score </h4>
        <h4>Review Description</h4>
        <h4>Totak positive reviews</h4>
        <h4> Total negative</h4>
        <h4>Total number of reviews </h4>
        

    </div>

<div className='col'>
    <img src="/peak.png" alt='COOL ASS IMAGE' style={{ width: '100%', borderRadius: '8px', paddingRight: "20px", paddingBottom: "20px" }}/>
</div>
</div>


    )
}

export default Mydata