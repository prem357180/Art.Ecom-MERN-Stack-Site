import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

import './css/bootstrap.css'
import './css/index.css'
import './css/bootstrap-icons.css'

function Reg(){
    const name = useRef()
    const password = useRef()
    const email = useRef()
    let navigate = useNavigate();

    
    function handle(e){
        e.preventDefault();
        console.log({
            name:name.current.value,
            password:password.current.value,
            email:email.current.value
        })
        axios.post("http://localhost:5000/register",{name:name.current.value,password:password.current.value,email:email.current.value})
        window.alert('regestered')
        navigate('/login')
    }
    return(
        <>
        <form onSubmit={(e)=>{handle(e)}} className="regpage">
        <h1>Registration</h1>
        <input type="text" placeholder='name' ref={name} className="form-control" id="reginp"/>
        <input type="text" placeholder='enter email' ref={email} className="form-control" id="reginp"/>
        <input type="text" placeholder='set password' ref={password} className="form-control" id="reginp"/>
        <input type="submit" value="submit" className="btn btn-primary"/>
        <button className="btn btn-outline-primary" onClick={(e)=>{e.preventDefault();navigate('/login')}}>Login</button>
        </form>
        </>
    )
}
export default Reg