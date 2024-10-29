import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import './LoginPopup.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
const LoginPopup = ({setShowLogin}) => {
    const [currState, setCurrState]= useState("Log In")
    const {url,setToken}= useContext(StoreContext)
    const [data, setData]= useState({
        name:"",
        email:"",
        password:""
    })
    const onChangeHandler = (event)=>{
        const name= event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }
     
    const onLogin = async(event)=>{
        event.preventDefault()
       let newUrl= url;
       if(currState==='Log In'){
        newUrl += '/api/user/login'
       }else{
        newUrl += '/api/user/register'
       }

       const response = await axios.post(newUrl,data);

       if(response.data.success){
        setToken(response.data.token)
        localStorage.setItem("token",response.data.token)
        setShowLogin(false)
       }else{
        alert(response.data.message)
       }
    }

  return (
    <form onSubmit={onLogin} className='login-popup'>
        <div className="login-popup-container">
            <div className="login-popup-title">
                <h2>
                    {currState}
                </h2>
                <img src={assets.cross_icon} onClick={()=>setShowLogin(false)} alt="" />
            </div>
            <div className="login-popup-inputs">
                {
                    currState==="Log In"? <></> : <input type="text" onChange={onChangeHandler} value={data.name} name='name' placeholder='Enter Your Name...' required/>
                }
                <input type="text" placeholder='Enter your email' name='email' onChange={onChangeHandler} value={data.email} required />
                <input name='password' onChange={onChangeHandler} value={data.password} type="text" placeholder='Enter your password' required />
            </div>
            <button type='submit'>{currState==="Sign Up" ? "Sign up": "Log In"}</button>
            <div className='login-popup-condition'>
                <input type="checkbox" required/>
                <p>By continuing , i agree to the terms of use & privacy policy</p>
            </div>
            {
                currState==="Log In"? <p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>click here</span> </p> :<p>Already have an account? <span onClick={()=>setCurrState("Log In")}>click here</span></p>
            }
            
            
        </div>
    </form>
  )
}

export default LoginPopup