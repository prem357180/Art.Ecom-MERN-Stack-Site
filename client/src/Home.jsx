import { useEffect, useState } from 'react'
import Card from './Card'
import Nav from './Nav'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Footer from './Footer'
import "./css/bootstrap.css" 
import "./css/index.css"

var mail = ""
async function load(){
    let result = await fetch("http://localhost:5000/getid",{
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    
    let res = await result.json();
    mail = res
    return res
}


function Home(){
    var [arr,setdata] = useState([]);
    async function renderdata(){
        let res = await axios.get("http://localhost:5000/getitems")
        setdata(res.data)
        console.log(res.data);
    }
    let navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            const response = await load();
            if (!response) {
              navigate('/login');
            }else{
                renderdata()
            }
        };
    
        fetchData();
      }, [])
      async function addtoCart(id){
        axios.post("http://localhost:5000/setcart",{mail:mail,id:id}).then(alert('added to cart'))
      }
      {console.log('entered the chat');
      if(arr.length===0){
        return(
            <>
            <div>
            <Nav/>
            <div className='justify-content-center w-100'>
            <h1 className='d-flex text-center m-5 justify-content-center'>No one is Selling</h1>
            </div>
            </div>
            <Footer/>
            </>
        )
      }
      else{
        return(
        <>  
        <div>
            <Nav/>
            <div className="container mt-4" style={{}}>
            <div className="items" style={{}}>
                {arr.map((e,i)=>{return <Card key={i} img={e.img} price={e.price} rating={e.rating} itemId={e._id} addtoCart={addtoCart}/>})}    
            </div>
            </div>
        </div>
            <Footer/>
        </>
    )}}
}

export default Home