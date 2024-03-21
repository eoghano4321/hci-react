import './NavBar.css'
import { connect } from 'react-redux';
import React, { useState } from 'react';

const NavBar = (props) =>{
    const isAdmin = props;
    const isLoggedIn = props;
    const [showSubMenu, setShowSubMenu] = useState(false);


    const toggleSubMenu = () => {
        setShowSubMenu(!showSubMenu);
    };

    return(
        <nav className='navbar'>
            <ul>
                <li><a href="/">Home</a></li>
                <li onMouseEnter={toggleSubMenu} onMouseLeave={toggleSubMenu}>
                    <a href="/#/upload">File</a>
                    {showSubMenu && (
                        <ul className="submenu">
                            <li><a href="/#/upload">Upload</a></li>
                            <li><a href="/#/download">Download</a></li>
                        </ul>
                    )}
                </li>
                <li><a href="/#/contact">Contact</a></li>
                {isAdmin.isAdmin ? (<li><a href="/#/admin">Admin</a></li>) : (null)}
                {isLoggedIn.isLoggedIn ? (<li><a href="/#/signin">Sign out</a></li>) : (<li><a href="/#/signin">Sign In/Sign Up</a></li>)}
            </ul>
        </nav>
    );
}
const mapStateToProps = (state) => ({
    isAdmin: state.auth.isAdmin,
    isLoggedIn: state.auth.isLoggedIn
  });
  
export default connect(mapStateToProps)(NavBar);