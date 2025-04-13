import React from "react";

const Navbar = () => {


    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container d-flex justify-content-center align-items-center">
                <a className="navbar-brand d-flex align-items-center gap-2" href="/">
                    <img src="/logoCotizAR.png" width="56" alt="CotizAR" />
                    <span className="fw-bold">CotizAR</span>
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
