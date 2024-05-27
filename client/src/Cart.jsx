import RemoveCard from './RemoveCard'
import Nav from './Nav'
import { useNavigate } from 'react-router-dom'
import { useState,useEffect,useReducer } from 'react'
import axios from 'axios'
import './css/bootstrap.css'
import './css/index.css'
import './css/bootstrap-icons.css'

let arr =[
    {price:200,rating:2},
    {price:200,rating:2},
]

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


function Cart(){
    var [arr,setdata] = useState([]);
    async function renderdata(){
        let res = await axios.post("http://localhost:5000/cart",{mail:mail})
        setdata(res.data)
    }
    let navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            const response = await load();
            mail = response
            if (!response) {
              navigate('/login');
            }else{
                renderdata()
            }
        };
    
        fetchData();
      }, [])
      async function removefromCart(id){
        axios.post("http://localhost:5000/removecart",{mail:mail,id:id}).then(setdata(prevArr => prevArr.filter(item => item._id !== id)))
      }
      async function buyItem(id,price){
        let entered  = prompt('enter price')
        console.log(Number(entered));
        if(price===Number(entered)){
            function payed(){{setdata(prevArr => prevArr.filter(item => item._id !== id));alert('Payment Done, Out for Delivery')}}
        axios.post("http://localhost:5000/buyItem",{mail:mail,id:id}).then(payed())}
        else{
            alert('insuffcient amount, not bought')
        }
      }
    if(arr.length==0){
        return(
            <>
        <Nav/>
        <div className='w-100'>
        <h1 className='p-10 m-5'>Cart</h1>
        </div>
        <h2 className='text-center w-100'>Cart is empty</h2>
        </>
        )
    }
    return(
        <>
        <Nav/>
        <div className='w-100'>
        <h1 className='p-10' style={{margin:'2.5%'}}>Cart</h1>
        </div>
        <div className  ="container my-4 ">
        <div className  ="d-flex flex-wrap">
        
        {arr.map((e,i)=>{if(e){return <RemoveCard key={i} img={e.img} price={e.price} rating={e.rating} itemId={e._id} removefromCart={removefromCart} buyItem={buyItem}/>}})}   
        </div>
        </div>
        </>
    )
}

export default Cart