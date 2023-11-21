import React, { useEffect, useState } from 'react';
import Chart from "chart.js/auto";
import styles from "./Admin.module.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { CategoryScale, registerables } from "chart.js";

Chart.register(CategoryScale);

const Admin = () => {
    const navigate = useNavigate();
    const [adminData, setAdminData] = useState();
    const [custom, setCustom] = useState();
    const [amount, setAmount] = useState();

    const [charge, setCharge] = useState("no");

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
        }
    }, [])

    useEffect(() => {
        getAdminDetails();
    }, []);

    const getAdminDetails = async () => {
        try {
            const url = "https://stg.dhunjam.in/account/admin/" + localStorage.getItem("id");
            const response = await axios.get(url);
            if (response?.data.status === 200) {
                setAdminData(response.data.data);
                // setAmount(response.data.data.amount);
                setAmount(Object.fromEntries(Object.entries(response.data.data.amount).sort(([,a],[,b]) => b-a)));
            }
        } catch (err) {
            console.log(err);
            alert("Error: " + err.message);
        }
    }

    console.log("Amount: " + amount)

    const updateAdminDetail = async () => {
        try {
            const url = "https://stg.dhunjam.in/account/admin/" + localStorage.getItem("id");
            const response = await axios.put(url, {
                amount: {
                    custom: custom,
                    ...amount
                }
            });
            if (response?.data.status === 200) {
                const amt = {...amount, custom: custom}
                setAmount(Object.fromEntries(Object.entries(amt).sort(([,a],[,b]) => b - a)));
            }
        } catch (err) {
            console.log(err);
            alert("Error: " + err.message);
        }
    }

     console.log("Charge: " + charge)

    const data = {
        labels: amount && Object.entries(amount).map(([category, value]) => category),
        datasets: [
            {
                label: "Rupees",
                data: amount && Object.entries(amount).map(([category, value]) => value),
                backgroundColor: [
                    "#F0C3F1", "#F0C3F1", "#F0C3F1", "#F0C3F1", "#F0C3F1"
                ],
                borderColor: "black",
                borderWidth: 2
            }
        ]
    }
    const options = {
        plugins: {
            title: {
                display: true,
                text: "Rupees"
            },
            legend: {
                display: false
            }
        }
    }

    return (
        <div className={styles.container}>

            <div className={styles.graphcontainer}>
                <h5 className={styles.header}>Social, Hebbal On Dhunjam</h5>
                <div className={styles.innercontainer}>
                    <div style={{ flex: 0.6 }}>
                        <p>So you want to charge your customers for requesting songs</p>
                    </div>
                    <div style={{ flex: 0.4 }}>
                        <input type="radio" id="yes" name="charge" value="yes" onChange={(e) => setCharge(e.target.value)} />
                        <label className={styles.label} for="yes">Yes</label>
                        <input type="radio" id="no" name="charge" value="no" style={{ marginLeft: "10px" }} onChange={(e) => setCharge(e.target.value)} />
                        <label className={styles.label} for="no">No</label>
                    </div>
                </div>
                <div className={styles.innercontainer}>
                    <div style={{ flex: 0.6 }}>
                        <p>Custom song request amount</p>
                    </div>
                    <div style={{ flex: 0.4 }}>
                        <input  disabled={charge==="no"} type="text" name="custom" value={custom} style={{ width: "150px" }} onChange={(e) => setCustom(e.target.value)} />
                    </div>
                </div>
                <div className={styles.innercontainer}>
                    <div style={{ flex: 0.6 }}>
                        <p>Regular songs request amounts from high to low-</p>
                    </div>
                    <div style={{ flex: 0.4, display: "flex" }}>
                        {amount && Object.entries(amount)
                            .map(([category, value]) => (
                                <input
                                    style={{ width: "20px", marginLeft: "5px", fontSize: "11px" }}
                                    type="text"
                                    id={category}
                                    value={value}
                                    onChange={(e)=> setAmount({...amount, [category]: e.target.value})}
                                    disabled={charge==="no"}
                                />
                            ))}
                    </div>
                </div>

                <div style={{ maxWidth: "650px" }}>
                    {amount && <Bar data={data} options={options} />}
                </div>

                <button disabled={charge==="no"} onClick={() => updateAdminDetail()} className={styles.savebutton}>Save</button>
            </div>
        </div>
    )
}

export default Admin