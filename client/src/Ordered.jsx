import { useNavigate } from "react-router-dom"
import { useEffect,useState } from "react"
import Nav from "./Nav"
import OrderedCard from "./OrderedCard"
import axios from 'axios'


async function load(){
    let result = await fetch("http://localhost:5000/getid",{
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    
    let res = await result.json();
    return res
}

function Ordered(){
    const navigate = useNavigate() 
    var [image,setimg]= useState("")
    var [price,setprice]= useState("")
    var [email,setemail]= useState("")
    var [arr,setdata]= useState([])
    useEffect(() => {
        const fetchEmail = async (resolve,reject) => {
            let email = await load();
            if(email){
            setemail(email);
            resolve(email);
            console.log(email);}
            else{
                navigate('/login')
            }
        };
        async function getOrderedItems(email){
            let res = await axios.post("http://localhost:5000/getOrderedItems",{mail:email})
            setdata(res.data)
        }
        new Promise(fetchEmail).then(e=>getOrderedItems(e))
    }, []);

    function cancleorder(id){
        function cancled(){
            {setdata(prevArr => prevArr.filter(item => item._id !== id));alert('Cancled')}
        }
        axios.post("http://localhost:5000/cancleorder",{mail:email,id:id}).then((res)=>{if(res){cancled()}else{alert('not deleted')}})
    }
    if(arr.length==0){
        return(
            <>
        <Nav/>
        <div className='w-100'>
        <h1 className='p-10 m-5'>Ordered Items</h1>
        </div>
        <h2 className='text-center w-100'>No orders Yet</h2>
        </>
        )
    }else{
    return(
        <>
        <Nav/>
        <h1 className="m-2 px-3">Ordered Items</h1>
            <div className="container mt-4">
            <div className="items" style={{}}>
                {arr.map((e,i)=>{if(e){return <OrderedCard key={i} img={e.img} price={e.price} rating={e.rating} itemId={e._id} cancleorder={cancleorder}/>}})}    
            </div>
            </div>
        </>
    )}
}

export default Ordered