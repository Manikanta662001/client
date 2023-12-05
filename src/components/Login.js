import React, { useState } from 'react'

function Login() {
    const [logindata,setLoginData] = useState({
        email:"",
        password:"",
    })
    const [dbdata,setDbdata] = useState([])
    const {email,password} = logindata
    const handleChange=(e)=>{
        setLoginData({...logindata,[e.target.name]:e.target.value})
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        fetch("http://localhost:5000/login",{
            method:"POST",
            mode:"cors",
            headers:{
                "Content-Type":"Application/json"
            },
            body:JSON.stringify(logindata)
        })
        .then((res)=>res.json())
        .then((dt)=>console.log(dt,"LOGIN DATA"))
        .catch((err)=>console.log(err,"LOGIN ERROR"))
       setLoginData({
        email:"",
        password:"",
    })


    }
    const handledbdata=()=>{
        fetch('http://localhost:5000/getdbdata')
        .then((res)=>res.json())
        .then((dt)=>setDbdata(dt))
        .catch((err)=>console.log(err,"LOGIN ERROR"))
    }
    console.log(dbdata,"3939")
    const handledbdataupdate=(item)=>{
        const updateddata = {...item,firstName:"XYZ"}
        fetch('http://localhost:5000/putupdate/'+item._id,{
            method:"PUT",
            mode:"cors",
            headers:{
                "Content-Type":"Application/json"
            },
            body:JSON.stringify(updateddata)
        })
        .then((res)=>res.json())
        .then((dt)=>console.log(dt,"UPDATED DATA"))
        .catch((err)=>console.log(err,"UPDATED ERROR"))
    }
    const handledbdatadelete=(item)=>{
        fetch('http://localhost:5000/delete/'+item._id,{
            method:"DELETE",
            mode:"cors",
            headers:{
                "Content-Type":"Application/json"
            },
            
        })
        .then((res)=>res.json())
        .then((dt)=>console.log(dt,"DELETED DATA"))
        .catch((err)=>console.log(err,"DELETED ERROR"))
    }
  return (
    <div>
        <h1>Login Page</h1>
        <form onSubmit={(e)=>handleSubmit(e)}>
            <label>Email : </label>
            <input type='email' placeholder='Enter Email' name='email' onChange={(e)=>handleChange(e)} value={email}/><br/><br/>
            <label>Password : </label>
            <input type='password' placeholder='Enter Password' name='password' onChange={(e)=>handleChange(e)} value={password}/><br/><br/>
            <input type='submit' value={"Login"}/><br/><br/>

        </form>
        <button onClick={()=>handledbdata()}>getdbdata</button>
        {
            dbdata.length>0 && 
            dbdata.map((item)=>{
                return(
                    <div>
                        <p>{item.id}</p>
                        <p>{item.firstName}</p>
                        <p>{item.lastName}</p>
                        <p>{item.email}</p>
                        <p>{item.password}</p>
                        <button onClick={()=>handledbdataupdate(item)}>Update</button>
                        <button onClick={()=>handledbdatadelete(item)}>Delete</button>
                    </div>
                )
            })
        }
    </div>
  )
}

export default Login