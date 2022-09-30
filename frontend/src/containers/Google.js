import React, { useEffect } from 'react';
import { Link, useLocation, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { googleAuthenticate } from '../actions/auth';
import queryString from 'query-string';
import { useSelector } from 'react-redux';

const Google = ({ googleAuthenticate }) => {
    let location = useLocation();

    const authInfo = useSelector(state => state.auth)
    useEffect(() => {
        const values = queryString.parse(location.search);
        const state = values.state ? values.state : null;
        const code = values.code ? values.code : null;

        console.log('State: ' + state);
        console.log('Code: ' + code);

        if (state && code) {
            googleAuthenticate(state, code);
        }
    }, [location]);

    const getMessage = () => {
        if (authInfo.isAuthenticated === true) {
            return (
                <div>
                <h1 class='display-4'>Welcome to Hangman Online!</h1>
                <p class='lead'>You're now signed in.</p>
                <hr class='my-4' />
                <Link class='btn btn-primary btn-lg' to='/' role='button'>Start Playing</Link>
                </div>
            )
        } else {
            if (authInfo.googleAuthSuccessful === false) {
                return (
                    <Redirect to='/login' />
                )
            } else if (authInfo.googleAuthSuccessful === true) {
                return (
                    <div>
                    <h2>Success!</h2>
                    <p class='lead'>You're now signed up through Google! Click on the Login button to Log in.</p>
                    {/* <hr class='my-4' /> */}
                    <br/>
                    <Link class='btn btn-primary btn-lg' to='/login' role='button'>Login</Link>
                    </div>
                )
            } else {
                return (
                    <div>
                    <p class='lead'>Processing...</p>
                    </div>
                )
            }
        }
    }

    return (
        <div className='container'>
            <div class='jumbotron mt-5'>
                {
                    getMessage()
                }
            </div>
        </div>
    );
};

export default connect(null, { googleAuthenticate })(Google);
