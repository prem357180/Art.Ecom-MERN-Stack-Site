import { useEffect, useRef } from "react"
import { useState } from "react";
import { useNavigate } from "react-router-dom"
// import axios from 'axios'

import './css/bootstrap.css'
import './css/index.css'
import './css/bootstrap-icons.css'

var res = await fetch("http://localhost:5000/login",{
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({name:'nothing'})
          })
var bool = await res.text();


function Login(){
    const smail = useRef()
    const spassword = useRef()
    let navigate = useNavigate();
    useEffect(()=>{
        if(bool==='true'){
            navigate('/home')
        }
    },[])
    
async function handle1(e){

    e.preventDefault();
    const x={
        email:smail.current.value,
        password:spassword.current.value,
    }
    console.log(x);
    try {
        var res = await fetch("http://localhost:5000/login",{
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(x)
          })
    } catch (error) {
        console.log(error);
    }
        if(res){
            navigate('/home')
        }
    }


    return(
        <>
        <form action="/" method="post" onSubmit={(e)=>{handle1(e)}} className="regpage">
        <h1>Login</h1>
        <input type="email" placeholder='enter mail' ref={smail} className="form-control" id="reginp"/>
        <input type="password" placeholder='enter password' ref={spassword} className="form-control" id="reginp"/>
        <input type="submit" value="submit" className="btn btn-primary"/>
        <button className="btn btn-outline-primary" onClick={(e)=>{e.preventDefault();navigate('/register')}}>Register</button>
        </form>
        </>
    )
}
export default Login