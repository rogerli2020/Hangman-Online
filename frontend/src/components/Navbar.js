import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';


const Navbar = ({ logout, isAuthenticated }) => {
    const [redirect, setRedirect] = useState(false);

    const logout_user = () => {
        logout();
        setRedirect(true);
    };

    const guestLinks = () => (
        <Fragment>
            <li className='nav-item'>
                <Link className='nav-link' to='/login'>Login</Link>
            </li>
            <li className='nav-item'>
                <Link className='nav-link' to='/signup'>Sign Up</Link>
            </li>
            <li className='nav-item'>
                <Link className='nav-link' to='/howtoplay'>How To Play</Link>
            </li>
        </Fragment>
    );

    const authLinks = () => (
        <li className='nav-item'>
            <a className='nav-link' href='#!' onClick={logout_user}>Logout</a>
        </li>
    );

    return (
        <Fragment>
            <div className='navbar navbar-fixed-top navbar-expand-lg navbar-dark bg-dark' role="navigation">
                <Link className='navbar-brand' to='/'><b style={{fontSize:"large"}}>HANGMAN ONLINE</b></Link>
                <button 
                    className='navbar-toggler' 
                    type='button' 
                    data-toggle='collapse' 
                    data-target='#navbarNav' 
                    aria-controls='navbarNav' 
                    aria-expanded='false' 
                    aria-label='Toggle navigation'
                >
                    <span className='navbar-toggler-icon'></span>
                </button>

                {/* <div className='collapse navbar-collapse' id='navbarNav'> */}
                <div id='navbarNav'>
                    
                    <ul className='navbar-nav'>
                        <li className='nav-item active'>
                            <Link className='nav-link' to='/'>Home <span className='sr-only'>(current)</span></Link>
                        </li>
                        {isAuthenticated ? authLinks() : guestLinks()}
                    </ul>
                </div>
            </div>
            {redirect ? <Redirect to='/' /> : <Fragment></Fragment>}
        </Fragment>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Navbar);