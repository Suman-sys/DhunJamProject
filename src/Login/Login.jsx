import React, { useState } from 'react';
import styles from "./Login.module.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const url = "https://stg.dhunjam.in/account/admin/login";

    const login = async () => {
        try{
            const response = await axios.post(url, {username, password});
            if(response?.data.status === 200){
                localStorage.setItem("token", response.data.data.token);
                localStorage.setItem("id", response.data.data.id);
                navigate("/");
            }
        }catch(err){
            console.log(err);
            alert("Error: " + err.message);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.formcontainer}>
                <h5 className={styles.header}>Venue Admin Login</h5>
                <input className={styles.input} value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
                <input className={styles.input} value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                <button onClick={()=> login()} className={styles.signbutton}>Sign In</button>
                <button className={styles.regbutton}>New Registration?</button>
            </div>

        </div>
    )
}

export default Login