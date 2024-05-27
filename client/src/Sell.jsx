import { useRef, useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"
import SellingCard from "./SellingCard"
import axios from "axios"
import Nav from './Nav'
import RemoveSelling from './RemoveSelling'
import "./css/bootstrap.css" 
import "./css/index.css"

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



function Sell(){
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
        async function getSellingItems(email){
            let res = await axios.post("http://localhost:5000/getSellingItems",{mail:email})
            setdata(res.data)
            console.log(res.data);
        }
        new Promise(fetchEmail).then(e=>getSellingItems(e))
}, []);

    async function handleimg(){
        return new Promise((resolve,reject)=>{
            if(image===""){window.alert("upload image");resolve(false);}
            else{
            let reader = new FileReader()
            reader.readAsDataURL(image)
            reader.onload = () =>{
                const res = reader.result
                resolve(res)
        }}})
    }
    async function handlesell(){
        let i = await handleimg()
        if(i){
            axios.post('http://localhost:5000/sell',{mail:email,image:i,price:price}).then(alert('posted'))
            console.log(email);
        }
        else{
            alert("not posted")
        }
    }
    async function removefromSelling(id){
        axios.post("http://localhost:5000/removeSelling",{mail:email,id:id}).then((res)=>{if(res){alert('deleted')}else{alert('not deleted')}})
      }
    return(
        <>
        <Nav/> 
        <div className="d-flex justify-content-center sell items">
            <div>
        <form action="" onSubmit={(e)=>{e.preventDefault()}} className="m-5">
            <h1>Selling</h1>
            <label htmlFor="image" className="form-label">Upload Image</label>
            <input className='form-control m-3' type="file" name="image" multiple accept="image/*"  onChange={(e)=>{setimg(e.target.files[0]);} }/>
            <input className='form-control m-3' type="number" placeholder="set amount" name="amount" onChange={(e)=>{setprice(e.target.value)}}/>
            <button className="btn btn-primary m-3 w-100" onClick={()=>{handlesell()}}>Sell</button>
        </form>
            </div>
            <div>
        <SellingCard img={image?URL.createObjectURL(image):require("./css/baseimg.png")} price = {price}/>
            </div>
        </div> 
        <Bottom arr={arr} removefromSelling={removefromSelling}/>
        </>
    )
}

function Bottom({arr,removefromSelling}){ 
    if(arr.length!==0){
        return(
            <div className="m-5">
            <h2>My Selling Items</h2>
            <div className="items" style={{}}>
            {arr.map((e,i)=>{if(e){return <RemoveSelling key={i} img={e.img} price={e.price} rating={e.rating} itemId={e._id} removefromSelling={removefromSelling}/>}})}
            </div>
        </div>
        )
    }else{
        return(
            <div className="m-5">
            <h2>My Selling Items</h2>
            <h3 className="text-center w-100">You are not Selling any item</h3>
            </div>
        )
    }
}

export default Sell