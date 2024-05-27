import { useRef } from "react"
import { useNavigate } from 'react-router-dom'; 

import './css/bootstrap.css'
import './css/index.css'
import './css/bootstrap-icons.css'


function Main(){
    
    let navigate = useNavigate();
    return(
        <>
        <div className="mainpage">
        <h1>Home</h1>
        <button onClick={()=>{navigate('/register')}}>Register</button>
        <button onClick={()=>{navigate('/login')}}>LogIn</button>
        </div>
        </>
    )
}

export default Main