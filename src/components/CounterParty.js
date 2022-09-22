import * as React from 'react';
import {useEffect, useState} from "react";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import makeApiCall from "../api/MakeApiCall";
import LoadingOverlay from 'react-loading-overlay'
import {Circles} from 'react-loader-spinner'
function HomePage() {
    const [isLoading, setLoading] = useState(false)
    const [paymentTypes] = useState(["ACH","wire", "provexchange"]);
    const [direction] = useState(["credit", "debit"]);
    const [internalAccounts, setInternalAccounts] = useState([]);
    const [externalAccounts, setExternalAccounts] = useState([]);
    /* Payment Form states */
    const [paymentAmount, setPaymentAmount] = useState();
    const [paymentType, setPaymentType] = useState();
    const [paymentDirection, setPaymentDirection] = useState();
    const [senderAccount, setSenderAccount] = useState();
    const [recieverAccount, setRecieverAccount] = useState();

    useEffect((e) => {
        getCounterPartyAccounts();
        getInternalAccounts();
    }, [0])

    /* Get External account */
    async function getCounterPartyAccounts() {
        let response = await makeApiCall('external_accounts', '', 'GET', {per_page: '25'});
        setExternalAccounts(response.data)
    }
    /* get internal accounts */
    async function getInternalAccounts() {
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
        const data = {
            type: paymentType,
            amount: parseInt(paymentAmount),
            currency: "USD",
            direction: paymentDirection,
            originating_account_id: senderAccount,
            receiving_account_id: recieverAccount

        }
        let response = await makeApiCall('payment_orders', data, 'POST', '');
        if (response.status === 201) {
            setLoading(false);
            toast.success("Congratulate! Payment has processed.", {
                position: 'top-center'
            });
            setInternalAccounts('');
            setPaymentDirection('');
            setPaymentType('');
            setPaymentAmount('');
            setSenderAccount('');
            setRecieverAccount('');
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

            <h1 className="align-self-center my-4 text-capitalize text-primary">Modern Treasuray</h1>

            <div className="row my-5">
                <div className="col-6 mx-auto shadow p-5">
                    <small id="emailHelp" className="form-text text-muted">
                        This is development sandbox account, it has only wire and ProvXchange available for test
                        transaction.
                    </small>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlSelect1">Type</label>
                            <select className="form-control" id="exampleFormControlSelect1"
                                    onChange={(e) => setPaymentType(e.target.value)}>
                                {paymentTypes && paymentTypes.map((types, index) => {
                                    return <option key={index} value={types}>{types}</option>
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Amount</label>
                            <input type="number" className="form-control" id="exampleFormControlInput1"
                                   placeholder="Enter Amount" onChange={(e) => setPaymentAmount(e.target.value)}
                                   value={paymentAmount}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Direction</label>
                            <select className="form-control" id="exampleFormControlSelect1"
                                    onChange={(e) => setPaymentDirection(e.target.value)}>
                                <option>Select Direction</option>
                                {direction && direction.map((types, index) => {
                                    return <option key={index} value={types}>{types}</option>
                                })}
                            </select>
                            <small id="emailHelp" className="form-text text-muted">Describes the direction money is
                                flowing in the transaction. A credit moves money from your account to someone
                                else's. A debit pulls money from someone else's account to your own.</small>
                        </div>
                        <div className="form-row d-flex flex-lg-wrap">
                            <div className="col">
                                <label htmlFor="exampleFormControlInput1">From</label>
                                <select className="form-control" id="exampleFormControlSelect1"
                                        onChange={(e) => setSenderAccount(e.target.value)}>
                                    <option>---From---</option>
                                    {internalAccounts && internalAccounts.map((accounts, index) => {
                                        return <option key={index}
                                                       value={accounts.id}>{accounts.connection.vendor_name + " (" + accounts.account_details[0].account_number.slice(0, 5) + "...)"}</option>
                                    })}
                                </select>
                            </div>
                            <div className="col mx-2">
                                <label htmlFor="exampleFormControlInput1">To</label>
                                <select className="form-control" id="exampleFormControlSelect1"
                                        onChange={(e) => setRecieverAccount(e.target.value)}>
                                    <option>---To---</option>
                                    {externalAccounts && externalAccounts.map((accounts, index) => {
                                        return <option key={index}
                                                       value={accounts.id}>{accounts.party_name}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <button type="cli" className="form-control bg-primary text-light my-2">Pay</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>

    </React.Fragment>)
}

export default HomePage;