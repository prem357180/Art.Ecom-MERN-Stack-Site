import { useState } from "react"
import axios from "axios"

function RemoveSelling({img,price,removefromSelling,itemId,editprice}){
    let [v,setvisibility] = useState('hidden')
    let [d,setdisplay] = useState('none')
    let [newprice,setprice] = useState('')
    function togvisi(){
        if(v==='hidden'){
            setvisibility('visible')
            setdisplay('flex')
        }
        else{
            setvisibility('hidden')
            setdisplay('none')
        }
    }
    function editprice(itemId,newprice){
        togvisi()
        axios.post('http://localhost:5000/editprice',{id:itemId,price:newprice}).then(alert('updated refresh page to see changes'))
    }
    return (
            <div className='container  text-center card p-4 m-2' style={{width:400}}>
            <img className='rounded card-body border' src={img} style={{}}/>
            <h5 className='rounded card-body border mt-1'>Price: &#8377; {price}</h5>
            <button className='btn btn-secondary card-body m-3 p-2' onClick={()=>{togvisi()}}>Edit Price</button>
            <div style={{visibility:v,display:d}} className='card-body m-3 p-2'>
                <input type="number" placeholder="enter new price" style={{justifyContent:'center',width:'100%'}} className="p-2 form-control" onChange={e=>{setprice(e.target.value)}}/>
                <button className='btn btn-secondary px-3 mx-1'onClick={()=>editprice(itemId,newprice)}>Set</button>
            </div>
            <button className='btn btn-outline-danger card-body m-3 p-2' onClick={()=>{removefromSelling(itemId)}}>Stop Selling</button>
            </div>
    )
}

export default RemoveSelling