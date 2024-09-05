import { useState } from "react";
import axios from "axios";
const SignUp = () => {

    const [userData, setUserData] = useState({
        fname: "",
        lname: "",
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }))
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.post("/api/v1/users/signup", userData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response)=>{
            const message =response.data.message;
            alert(message);
        })
        .catch((err)=>{
            const error = err.response.data.message;
            alert(`Error signing up! Details: ${error}`);
        })
        .finally(()=>{
            setLoading(false);
            setUserData({
                fname: "",
                lname: "",
                email: "",
                password: ""
            })
        })
    }

    return (
        <>
            <div className="container">
                <div className="inner-div-2">
                    <div className="card w-80">
                        <div className="card-header">
                            <h1>Sign Up</h1>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit} >
                                <div className='form-group'>
                                    <label>First Name</label>
                                    <input type="text" className="form-control" name="fname" value={userData.fname} onChange={handleChange} required/>
                                </div>
                                <div className='form-group'>
                                    <label>Last Name</label>
                                    <input type="text" className="form-control" name="lname" value={userData.lname} onChange={handleChange} required/>
                                </div>
                                <div className='form-group'>
                                    <label>Email</label>
                                    <input type="email" className="form-control" name="email" value={userData.email} onChange={handleChange} required/>
                                </div>
                                <div className='form-group'>
                                    <label>Password</label>
                                    <input type="password" className="form-control" name="password" value={userData.password} onChange={handleChange} required/>
                                </div>

                                <button type="submit" className="btn btn-primary mt-3" disabled={loading}>{loading?"Working ...":"Sign Up"}</button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp
