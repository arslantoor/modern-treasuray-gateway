import * as React from 'react';
import {useEffect, useState} from "react";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import makeApiCall from "../api/MakeApiCall";
import LoadingOverlay from 'react-loading-overlay'
import {Circles} from 'react-loader-spinner'
import {Link} from "react-router-dom";

function HomePage() {
    const [isLoading, setLoading] = useState(false)
    const [paymentOrders, setPaymentOrders] = useState([]);


    useEffect((e) => {
        getPaymentOrder()
    }, [0])

    /* Get interval account */
    async function getPaymentOrder() {
        setLoading(true)
        let response = await makeApiCall('payment_orders', '', 'GET', {per_page: '25'});
        setPaymentOrders(response.data)
        setLoading(false)
    }

    return (
        <React.Fragment>
            <LoadingOverlay
                styles={{
                    position: 'inherit', background: "#bbb"
                }}
                active={isLoading}
                spinner={<Circles color="#00BFFF"/>}
            >
            </LoadingOverlay>
            <div className="container box shadow my-5" >
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Counterparty</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Internal Description</th>
                        <th scope="col">Type</th>
                        <th scope="col">Status</th>
                        <th scope="col">Payment Date</th>
                    </tr>
                    </thead>
                    <tbody className="table-group-divider">
                    {paymentOrders && paymentOrders.map((order, index) => {
                        return <tr key={index}>
                            <td>{order.receiving_account.name}</td>
                            <td>{"$"+order.amount.toFixed()}</td>
                            <td ><span className="text-secondary">N/A</span></td>
                            <td>{order.type}</td>
                            <td>{order.status}</td>
                            <td>{order.created_at.slice(0,10)}</td>
                        </tr>
                    })}

                    </tbody>
                </table>
            </div>

        </React.Fragment>)
}

export default HomePage;