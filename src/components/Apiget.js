import React, { useState } from 'react'

function Apiget() {
    const [data,setData] = useState([])
    const handleClick=()=>{
        fetch('http://localhost:5000/carsget')
        .then((res)=>res.json())
        .then((dt)=>setData(dt))
        .catch((err)=>console.log(err))
    }
  return (
    <div>
        <button onClick={()=>handleClick()}>Api get call</button>
        {data.length>0 &&
            data.map((item)=>{
                return(
                    <div>
                        <div>
                        <p>{item.id}</p>
                        <p>{item.description}</p>
                        <img src={item["image-url"]}/>
                        
                    </div>
                    <br/>
                    </div>
                )
            })
        }
    </div>
  )
}

export default Apiget