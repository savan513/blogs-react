import React, {useContext} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

function Menu() {
    return (
        <>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark sticky-top p-3">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">Blog For Future</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse ml-auto" id="collapsibleNavbar">
                        <ul className="navbar-nav ms-auto h5">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">Home</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Menu;