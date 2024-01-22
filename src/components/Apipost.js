import React, { useRef, useState } from 'react'

function Apipost() {
    const [formdata, setFormdata] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        profileImageUrl: null,
    })
    const { firstName, lastName, email, password } = formdata
    const [responsedata, setResponseData] = useState([])
    const formRef = useRef(null);

    const handleChange = (e) => {
        if (e.target.type === "file") {
            console.log("file")
            const file = e.target.files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend=() => {
                    setFormdata({ ...formdata, profileImageUrl: reader.result })
                }
            reader.readAsDataURL(file)
            }
        }
        else {
            setFormdata({ ...formdata, [e.target.name]: e.target.value })
        }
    }
    console.log(formdata)
    const handleSubmit = (e) => {
        e.preventDefault()
        fetch("http://localhost:5000/postuserdata", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(formdata)
        })
            .then((res) => res.json())
            .then((dt) => {
                console.log(dt)
                formRef.current.reset()
            })
            .catch((err) => console.log(err))
        setFormdata({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            profileImageUrl:null
        })


    }
    return (
        <div>
            <h1>Register Page</h1>
            <form onSubmit={(e) => handleSubmit(e)} ref={formRef}>
                <label>FirstName : </label>
                <input type='text' placeholder='Enter FirstName' name='firstName' onChange={(e) => handleChange(e)} value={firstName} /><br /><br />
                <label>LastName : </label>
                <input type='text' placeholder='Enter LastName' name='lastName' onChange={(e) => handleChange(e)} value={lastName} /><br /><br />
                <label>Email : </label>
                <input type='email' placeholder='Enter Email' name='email' onChange={(e) => handleChange(e)} value={email} /><br /><br />
                <label>Password : </label>
                <input type='password' placeholder='Enter Password' name='password' onChange={(e) => handleChange(e)} value={password} /><br /><br />
                <label>ProfileImage : </label>
                <input type='file'  onChange={(e) => handleChange(e)} /><br /><br />
                <input type='submit' value={"register"} /><br /><br />
            </form>
        </div>
    )
}

export default Apipost