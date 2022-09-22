import React from 'react';
import {Link} from "react-router-dom";
function TopNav() {
    return (
            <header className="p-3 text-bg-dark">
                <div className="container">
                    <div
                        className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                            <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
                                <use xlinkHref="#bootstrap"></use>
                            </svg>
                        </a>

                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li><Link to="/" className="nav-link px-2 text-secondary">Home</Link></li>
                            <li><Link to="/make-payment" className="nav-link px-2 text-light">Make Payment</Link></li>
                            <li><Link to="/counter-party-transaction" className="nav-link px-2 text-light">One to One payment</Link></li>
                        </ul>
                        <div className="text-end">
                            <Link to="/add-internal-account" className="btn btn-outline-light me-2">Create Internal Account</Link>
                            <Link to="/add-external-account" className="btn btn-warning">Create External Account</Link>
                        </div>
                    </div>
                </div>
            </header>
    )
}

export default TopNav;