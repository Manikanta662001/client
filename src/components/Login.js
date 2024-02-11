import React, { useState } from 'react'

function Login() {
    const [logindata, setLoginData] = useState({
        email: "",
        password: "",
    })
    const [dbdata, setDbdata] = useState([])
    const { email, password } = logindata
    const handleChange = (e) => {
        setLoginData({ ...logindata, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(logindata)
        })
        const result = await response.json();
        if (!response.ok) {
            alert(result.error)
        }
        else {
            alert(result.message)
            setLoginData({
                email: "",
                password: "",
            })
        }
    }
    const handledbdata = () => {
        fetch('http://localhost:5000/getdbdata')
            .then((res) => res.json())
            .then((dt) => setDbdata(dt))
            .catch((err) => console.log(err, "LOGIN ERROR"))
    }
    const handledbdataupdate = async (item, index) => {
        const updateddata = { ...item, firstName: "King" }
        const response = await fetch('http://localhost:5000/putupdate/' + item._id, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(updateddata)
        })
        const result = await response.json()
        console.log(response)
        if (!response.ok) {
            alert(result.error)
        }
        else {
            let updated = dbdata
            updated[index] = result
            setDbdata(updated)
        }
    }
    const handledbdatadelete = async (item, index) => {
        const response = await fetch('http://localhost:5000/delete/' + item._id, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "Application/json"
            },

        })
        const result = await response.json()
        if (!response.ok) {
            alert(result.error)
        }
        else {
            console.log(result, "Deleted")
            let data = dbdata;
            data.splice(index, 1);
            setDbdata(data);
        }
    }
    console.log(dbdata, "72")
    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>Email : </label>
                <input type='email' placeholder='Enter Email' name='email' onChange={(e) => handleChange(e)} value={email} /><br /><br />
                <label>Password : </label>
                <input type='password' placeholder='Enter Password' name='password' onChange={(e) => handleChange(e)} value={password} /><br /><br />
                <input type='submit' value={"Login"} /><br /><br />

            </form>
            <button onClick={() => handledbdata()}>getdbdata</button>
            {dbdata.length > 0 && dbdata.map((item, index) => {
                return (
                    <div key={index}>
                        <p>{item._id}</p>
                        <p>{item.firstName}</p>
                        <p>{item.lastName}</p>
                        <p>{item.email}</p>
                        <p>{item.password}</p>
                        <img src={item.profileImageUrl} alt='img' />
                        <button onClick={() => handledbdataupdate(item, index)}>Update</button>
                        <button onClick={() => handledbdatadelete(item, index)}>Delete</button>
                    </div>
                )
            })
            }
        </div>
    )
}

export default Login