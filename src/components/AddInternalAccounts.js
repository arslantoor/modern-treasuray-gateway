import * as React from 'react';
import {useEffect, useState} from "react";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import makeApiCall from "../api/MakeApiCall";
import LoadingOverlay from 'react-loading-overlay'
import {Circles} from 'react-loader-spinner'
import {Link, useNavigate} from "react-router-dom";

function AddInternalAccount() {
    const navigate = useNavigate()
    const [isLoading, setLoading] = useState(false)
    const [direction] = useState(["credit", "debit"]);
    const [internalAccounts, setInternalAccounts] = useState([]);
    const [accountName, setAccountName] = useState();
    /* Payment Form states */
    const [connectionID, setConnectionID] = useState()
    const [currency] = useState(['USD', 'CAD'])
    const [currencyName,setCurrency] = useState()
    useEffect((e) => {
        getAccounts()
    }, [0])

    /* Get interval account */
    async function getAccounts() {
        let response = await makeApiCall('internal_accounts', '', 'GET', {per_page: '25'});
        setInternalAccounts(response.data)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await makePayment();
        } catch (err) {
            setLoading(false);
        }
    }

    async function makePayment() {
        const data = {connection_id: connectionID, party_name: "software_engineer", name: accountName, currency: currencyName}

        let response = await makeApiCall('internal_accounts', data, 'POST', '');
        if (response.status === 200) {
            setLoading(false);
            toast.success("Congratulate! Account has created.", {
                position: 'top-center'
            });
            navigate('/counter-party-transaction')

        } else {
            toast.error("Payment failed", {
                position: 'top-center'
            });
        }
    }

    return (<React.Fragment>
        <LoadingOverlay
            styles={{
                position: 'inherit', background: "#bbb"
            }}
            active={isLoading}
            spinner={<Circles color="#00BFFF"/>}
        >
        </LoadingOverlay>
        <div className="container card mt-5">
            <div className="row my-5">

                <h3 className="text-primary text-center">Add Internal Account</h3>
                <div className="col-6 mx-auto shadow p-5">

                    <small id="emailHelp" className="form-text text-muted">
                    </small>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlSelect1">Connection name:</label>
                            <select className="form-control" id="exampleFormControlSelect1"
                                    onChange={(e) => setConnectionID(e.target.value)}>
                                <option>Select connection name</option>
                                {internalAccounts && internalAccounts.map((accounts, index) => {
                                    return <option key={index}
                                                   value={accounts.connection.id}>{accounts.connection.vendor_name+ " (" + accounts.account_details[0].account_number.slice(0, 5) + "...)"}</option>
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Name:</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1"
                                   placeholder="Enter Account Name" onChange={(e) => setAccountName(e.target.value)}
                                   value={accountName}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Currency:</label>
                            <select className="form-control" id="exampleFormControlSelect1"
                                    onChange={(e) => setCurrency(e.target.value)}>
                                <option>Select Currency</option>
                                {currency && currency.map((curr, index) => {
                                    return <option key={index} value={curr}>{curr}</option>
                                })}
                            </select>
                            <small id="emailHelp" className="form-text text-muted"></small>
                        </div>
                        <div className="form-group">
                            <button type="cli" className="form-control bg-primary text-light my-2">Add Internal
                                Account
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>

    </React.Fragment>)
}

export default AddInternalAccount;